"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribeToTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerThemeSnapshot() {
  return false;
}

const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;
uniform sampler2D u_texture;
uniform float u_time;
uniform vec2 u_scale;
uniform float u_wash;
uniform vec3 u_tint;
varying vec2 v_uv;

void main() {
  float zoom = 1.06 + 0.03 * sin(u_time * 0.15);
  vec2 drift = vec2(sin(u_time * 0.08) * 0.02, 0.0);
  vec2 uv = (v_uv - 0.5) * u_scale / zoom + 0.5 + drift;
  vec3 sampled = texture2D(u_texture, clamp(uv, 0.0, 1.0)).rgb;
  vec3 color = mix(sampled, u_tint, u_wash);
  gl_FragColor = vec4(color, 1.0);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function WebGLBackground({
  src,
  wash = 0.2,
  theme = "dark",
  tint = theme === "light" ? [1, 1, 1] : [0.043, 0.067, 0.125],
}: {
  src: string;
  wash?: number;
  theme?: "dark" | "light";
  tint?: [number, number, number];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [supported, setSupported] = useState(true);
  const [imageReady, setImageReady] = useState(false);
  const isDark = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);
  const isVisible = theme === "dark" ? isDark : !isDark;

  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) {
      setSupported(false);
      return;
    }
    const context = gl;

    const vertexShader = compileShader(context, context.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = compileShader(context, context.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = context.createProgram();
    if (!vertexShader || !fragmentShader || !program) {
      setSupported(false);
      return;
    }
    context.attachShader(program, vertexShader);
    context.attachShader(program, fragmentShader);
    context.linkProgram(program);
    if (!context.getProgramParameter(program, context.LINK_STATUS)) {
      setSupported(false);
      return;
    }
    context.useProgram(program);

    const positionBuffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);
    context.bufferData(
      context.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      context.STATIC_DRAW,
    );
    const positionLocation = context.getAttribLocation(program, "a_position");
    context.enableVertexAttribArray(positionLocation);
    context.vertexAttribPointer(positionLocation, 2, context.FLOAT, false, 0, 0);

    const timeLocation = context.getUniformLocation(program, "u_time");
    const scaleLocation = context.getUniformLocation(program, "u_scale");
    const washLocation = context.getUniformLocation(program, "u_wash");
    const tintLocation = context.getUniformLocation(program, "u_tint");
    const textureLocation = context.getUniformLocation(program, "u_texture");

    const texture = context.createTexture();
    context.bindTexture(context.TEXTURE_2D, texture);
    // 1x1 placeholder pixel until the source image finishes loading
    context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, 1, 1, 0, context.RGBA, context.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.LINEAR);
    context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.LINEAR);

    let imageAspect = 1;
    let cancelled = false;
    const image = new Image();
    image.src = src;
    image.onload = () => {
      if (cancelled) return;
      imageAspect = image.width / image.height;
      context.bindTexture(context.TEXTURE_2D, texture);
      context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, true);
      context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, context.RGBA, context.UNSIGNED_BYTE, image);
      setImageReady(true);
    };
    image.onerror = () => setSupported(false);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(canvasEl.clientWidth * dpr);
      const height = Math.round(canvasEl.clientHeight * dpr);
      if (canvasEl.width !== width || canvasEl.height !== height) {
        canvasEl.width = width;
        canvasEl.height = height;
        context.viewport(0, 0, width, height);
      }
    }

    let frame = 0;
    let start: number | null = null;
    let paused = document.visibilityState === "hidden";

    function render(now: number) {
      resize();
      if (start === null) start = now;
      const elapsed = reduceMotion ? 0 : (now - start) / 1000;

      const canvasAspect = context.drawingBufferWidth / context.drawingBufferHeight;
      let scaleX = 1;
      let scaleY = 1;
      if (canvasAspect > imageAspect) {
        scaleY = imageAspect / canvasAspect;
      } else {
        scaleX = canvasAspect / imageAspect;
      }

      context.uniform1f(timeLocation, elapsed);
      context.uniform2f(scaleLocation, scaleX, scaleY);
      context.uniform1f(washLocation, wash);
      context.uniform3f(tintLocation, tint[0], tint[1], tint[2]);
      context.activeTexture(context.TEXTURE0);
      context.bindTexture(context.TEXTURE_2D, texture);
      context.uniform1i(textureLocation, 0);

      context.drawArrays(context.TRIANGLES, 0, 6);
      frame = requestAnimationFrame(render);
    }

    function handleVisibilityChange() {
      paused = document.visibilityState === "hidden";
      if (!paused && frame === 0) frame = requestAnimationFrame(render);
      if (paused) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }

    if (!paused) frame = requestAnimationFrame(render);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      context.deleteTexture(texture);
      context.deleteProgram(program);
      context.deleteShader(vertexShader);
      context.deleteShader(fragmentShader);
      context.deleteBuffer(positionBuffer);
    };
  }, [src, wash, tint, isVisible]);

  if (!isVisible) return null;

  if (!supported || !imageReady) {
    return (
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="webgl-fallback-drift absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${src}')` }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(${tint[0] * 255},${tint[1] * 255},${tint[2] * 255},${wash})` }}
        />
      </div>
    );
  }

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" style={{ display: "block" }} />;
}

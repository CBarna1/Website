"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const LOGO_SIZE = 40;
const DOT_COUNT = 5;

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    function measure() {
      if (trackRef.current) setTrackWidth(trackRef.current.clientWidth);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const minDuration = 3200;
    const start = performance.now();
    let frame = 0;
    let loaded = false;

    function tick(now: number) {
      const elapsed = now - start;
      // Ease toward 90% while waiting so it never looks finished before the page actually is
      const target = loaded ? 100 : Math.min(90, (elapsed / minDuration) * 90);
      progressRef.current += (target - progressRef.current) * 0.045;
      const next = Math.min(100, Math.round(progressRef.current));
      setProgress((prev) => (next > prev ? next : prev));

      if (progressRef.current < 99.5) {
        frame = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        window.setTimeout(() => {
          setFading(true);
          window.setTimeout(() => setVisible(false), 500);
        }, 300);
      }
    }

    function onLoad() {
      loaded = true;
    }

    if (document.readyState === "complete") {
      loaded = true;
    } else {
      window.addEventListener("load", onLoad);
    }

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (!visible) return null;

  const travelDistance = Math.max(trackWidth - LOGO_SIZE, 0);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-cover bg-center transition-opacity duration-500 ${fading ? "pointer-events-none opacity-0" : "opacity-100"}`}
      style={{
        backgroundImage:
          "linear-gradient(rgba(11,17,32,0.82), rgba(11,17,32,0.82)), url('/rm373batch2-04.jpg')",
      }}
    >
      <div ref={trackRef} className="relative h-10 w-[85vw] max-w-4xl">
        <div
          className="absolute top-0 left-0"
          style={{
            width: LOGO_SIZE,
            height: LOGO_SIZE,
            transform: `translateX(${(progress / 100) * travelDistance}px) rotate(${(progress / 100) * 360}deg)`,
          }}
        >
          <Image src="/logo-title.png" alt="" width={LOGO_SIZE} height={LOGO_SIZE} className="h-full w-full object-contain" priority />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <span className="text-3xl font-bold tabular-nums text-white">{progress}%</span>
        <div className="flex gap-2.5">
          {Array.from({ length: DOT_COUNT }).map((_, index) => {
            const active = progress >= ((index + 1) / DOT_COUNT) * 100;
            return (
              <span
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${active ? "scale-125 bg-white" : "bg-white/30"}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

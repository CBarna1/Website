"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Scroll3D() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateRotation = () => {
      frame = 0;
      setRotation(window.scrollY * 0.24);
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateRotation);
    };

    updateRotation();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="scroll-3d-float pointer-events-none absolute right-2 top-0 z-0 h-56 w-56 sm:right-8 sm:h-64 sm:w-64"
      style={{ perspective: "900px" }}
    >
      <div
        className="scroll-3d-stage relative h-full w-full"
        style={{ transform: `rotateX(${rotation * 0.18}deg) rotateY(${rotation}deg)` }}
      >
        <div className="scroll-3d-face scroll-3d-front">
          <Image src="/logo-m.png" alt="" width={180} height={54} className="h-auto w-36 opacity-95" />
          <span className="mt-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70">
            Intelligent infrastructure
          </span>
        </div>
        <div className="scroll-3d-face scroll-3d-back">
          <span className="text-5xl font-black tracking-tight text-white/90">KI</span>
          <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-100">
            Built to connect
          </span>
        </div>
        <div className="scroll-3d-edge scroll-3d-edge-top" />
        <div className="scroll-3d-edge scroll-3d-edge-bottom" />
        <div className="scroll-3d-edge scroll-3d-edge-left" />
        <div className="scroll-3d-edge scroll-3d-edge-right" />
      </div>
    </div>
  );
}

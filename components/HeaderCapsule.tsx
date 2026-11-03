"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";

// How far the visitor scrolls before the bar slides in.
const SHOW_AFTER_PX = 80;
// Grace period when the pointer leaves, so moving between the hover strip and the bar doesn't flicker.
const HOVER_LEAVE_DELAY_MS = 200;

// The floating, rounded header bar (the same bar as the Zambian Cancer Society site). Hidden at the
// top of the page so the hero has the screen to itself, and slides in (solid) once the visitor
// scrolls. It also appears:
// - when the mouse moves to the top edge of the screen (an invisible strip, the height of the
//   space kept for the bar), and stays while the pointer is over it,
// - when it gets keyboard focus (Tab), so keyboard users never move through hidden links,
// - while the phone menu is open, and
// - on pages too short to scroll, where it would otherwise never be reachable.
export default function HeaderCapsule({ children, forceVisible = false }: { children: ReactNode; forceVisible?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [shortPage, setShortPage] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > SHOW_AFTER_PX);
      setShortPage(document.documentElement.scrollHeight - window.innerHeight < SHOW_AFTER_PX * 2);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    // Page height changes as images and fonts load.
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
      window.clearTimeout(leaveTimer.current);
    };
  }, []);

  // Mouse and pen only: a finger tapping the top of a hero on a phone shouldn't open the bar.
  const onPointerEnter = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    window.clearTimeout(leaveTimer.current);
    setHovered(true);
  };
  const onPointerLeave = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    window.clearTimeout(leaveTimer.current);
    leaveTimer.current = window.setTimeout(() => setHovered(false), HOVER_LEAVE_DELAY_MS);
  };

  const visible = scrolled || focused || hovered || shortPage || forceVisible;

  return (
    <>
      {/* Invisible hover strip along the top edge, only active while the bar is hidden. */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-[var(--header-space)] ${visible ? "pointer-events-none" : "pointer-events-auto"}`}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      />
      <div
        className={[
          "relative mx-auto flex h-14 w-full max-w-6xl min-w-0 items-center gap-3 rounded-full border pl-4 pr-2 transition-[transform,opacity,background-color,box-shadow,border-color] duration-300 ease-out motion-reduce:transition-none lg:h-16 lg:pl-5",
          visible ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-[calc(100%+1rem)] opacity-0",
          scrolled
            ? "border-slate-200 bg-white shadow-xl shadow-brand-900/10 dark:border-slate-700 dark:bg-slate-900"
            : "border-white/60 bg-white/80 shadow-lg shadow-brand-600/15 backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-900/80",
        ].join(" ")}
        data-header-capsule=""
        data-visible={visible || undefined}
        onBlur={(event) => {
          if (!ref.current?.contains(event.relatedTarget as Node | null)) setFocused(false);
        }}
        onFocus={() => setFocused(true)}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        ref={ref}
      >
        {children}
      </div>
    </>
  );
}

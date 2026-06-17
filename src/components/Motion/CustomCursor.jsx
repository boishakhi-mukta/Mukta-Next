"use client";

import { useEffect, useState } from "react";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

function isCoarsePointer() {
  if (typeof window === "undefined") return true;
  return window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
}

export default function CustomCursor() {
  const prefersReducedMotion = usePrefersReducedMotion();
  // Start disabled to match server render, then enable after mount check
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setEnabled(!prefersReducedMotion && !isCoarsePointer());
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.classList.add("cursor-enabled");

    let raf = 0;
    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;

    let dot = null;
    let ring = null;

    const getDot = () => dot || (dot = document.querySelector(".app-cursor-dot"));
    const getRing = () => ring || (ring = document.querySelector(".app-cursor-ring"));

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) setVisible(true);
      if (raf) return;

      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const d = getDot();
        const r = getRing();
        if (!d || !r) return;

        d.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        rx += (x - rx) * 0.18;
        ry += (y - ry) * 0.18;
        r.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      });
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);
    const onDown = () => root.classList.add("cursor-pressed");
    const onUp = () => root.classList.remove("cursor-pressed");

    const onPointerOver = (e) => {
      const el = e.target?.closest?.(
        'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]',
      );
      if (el) root.classList.add("cursor-hover");
    };
    const onPointerOut = () => root.classList.remove("cursor-hover");

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("pointerover", onPointerOver);
    window.addEventListener("pointerout", onPointerOut);

    return () => {
      root.classList.remove("cursor-enabled", "cursor-hover", "cursor-pressed");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerout", onPointerOut);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [enabled, visible]);

  if (!enabled) return null;

  const opacityClass = visible ? "opacity-100" : "opacity-0";

  return (
    <>
      <div aria-hidden="true" className={`app-cursor-ring ${opacityClass}`} />
      <div aria-hidden="true" className={`app-cursor-dot ${opacityClass}`} />
    </>
  );
}

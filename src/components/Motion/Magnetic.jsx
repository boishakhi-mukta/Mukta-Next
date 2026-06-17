"use client";

import { useEffect, useRef } from "react";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

export default function Magnetic({
  children,
  strength = 0.25,
  max = 10,
  className = "",
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;

    const set = (x, y) => {
      el.style.setProperty("--mx", `${x.toFixed(2)}px`);
      el.style.setProperty("--my", `${y.toFixed(2)}px`);
    };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const nx = Math.max(-1, Math.min(1, dx / (r.width / 2)));
      const ny = Math.max(-1, Math.min(1, dy / (r.height / 2)));
      const targetX = nx * max * strength;
      const targetY = ny * max * strength;

      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        tx += (targetX - tx) * 0.35;
        ty += (targetY - ty) * 0.35;
        set(tx, ty);
      });
    };

    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      tx = 0;
      ty = 0;
      set(0, 0);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [max, prefersReducedMotion, strength]);

  return (
    <span ref={ref} className={`magnetic ${className}`}>
      {children}
    </span>
  );
}

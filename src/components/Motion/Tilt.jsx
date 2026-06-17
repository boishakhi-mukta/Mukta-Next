"use client";

import { useEffect, useRef } from "react";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

export default function Tilt({ children, className = "", maxTilt = 8, glare = true }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef(null);
  const glareRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let isInside = false;

    const onMove = (e) => {
      if (!isInside) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const tiltY = (px - 0.5) * (maxTilt * 2);
      const tiltX = -(py - 0.5) * (maxTilt * 2);

      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        el.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
        el.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);

        if (glare && glareRef.current) {
          const gx = (px * 100).toFixed(1);
          const gy = (py * 100).toFixed(1);
          glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.22), rgba(255,255,255,0) 55%)`;
        }
      });
    };

    const onEnter = () => {
      isInside = true;
      el.classList.add("tilt-active");
    };
    const onLeave = () => {
      isInside = false;
      el.classList.remove("tilt-active");
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
      if (glare && glareRef.current) {
        glareRef.current.style.background =
          "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18), rgba(255,255,255,0) 55%)";
      }
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    el.addEventListener("pointerenter", onEnter, { passive: true });
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [glare, maxTilt, prefersReducedMotion]);

  return (
    <div ref={ref} className={`tilt ${className}`}>
      {glare ? <div ref={glareRef} className="tilt-glare" /> : null}
      <div className="tilt-inner">{children}</div>
    </div>
  );
}

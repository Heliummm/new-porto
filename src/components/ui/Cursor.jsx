import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor: dot presisi + ring dengan trailing spring.
 * Hanya aktif untuk pointer presisi (mouse) dan tanpa reduced-motion.
 * Ring membesar & berubah warna saat hover elemen interaktif.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const dotRef = useRef(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 280, damping: 26, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 280, damping: 26, mass: 0.55 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      setVisible(true);
    };

    const onOver = (e) => {
      const interactive = e.target.closest?.(
        "a, button, [role='button'], input, textarea, select, label, [tabindex]"
      );
      setHovering(!!interactive);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Dot — mengikuti mouse instan */}
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[200]" aria-hidden="true">
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 transition-[width,height,opacity] duration-200 ${
            hovering ? "h-1 w-1" : "h-1.5 w-1.5"
          } ${visible ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      {/* Ring — trailing dengan spring, membesar di elemen interaktif */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[199]"
        aria-hidden="true"
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,border-color,background-color,opacity] duration-300 ${
            hovering
              ? "h-12 w-12 border-emerald-400/60 bg-emerald-400/[0.07]"
              : "h-8 w-8 border-white/25"
          } ${visible ? "opacity-100" : "opacity-0"}`}
        />
      </motion.div>
    </>
  );
}

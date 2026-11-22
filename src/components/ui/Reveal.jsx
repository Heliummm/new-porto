import { motion, useReducedMotion } from "framer-motion";

/**
 * Reusable scroll-reveal wrapper (fade + slide up).
 * Dipakai sebagai pengganti animasi manual di setiap section.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  once = true,
  className = "",
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration: 0.65, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

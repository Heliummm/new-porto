import { motion } from "framer-motion";

const variants = {
  primary:
    "btn-shine bg-white text-zinc-950 hover:bg-zinc-200 shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_10px_30px_-12px_rgba(255,255,255,0.25)]",
  outline:
    "border border-white/15 text-zinc-100 hover:border-white/40 hover:bg-white/5",
  ghost: "text-zinc-300 hover:text-white hover:bg-white/5",
};

/**
 * Button reusable — otomatis render <a> jika ada href, selain itu <button>.
 * Micro-interaction: lift on hover, press on tap.
 */
export default function Button({
  variant = "primary",
  href,
  children,
  className = "",
  ...props
}) {
  const Comp = href ? motion.a : motion.button;
  return (
    <Comp
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}

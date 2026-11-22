/**
 * Badge tech stack / tag kecil yang konsisten di seluruh situs.
 */
export default function TechBadge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide text-zinc-300 transition-colors duration-200 hover:border-emerald-400/40 hover:text-emerald-200 ${className}`}
    >
      {children}
    </span>
  );
}

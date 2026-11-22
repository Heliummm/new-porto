const items = [
  "Laravel",
  "React.js",
  "PHP",
  "Python",
  "MySQL",
  "JavaScript",
  "Tailwind CSS",
  "REST API",
  "Git",
  "GitHub",
  "Postman",
  "VS Code",
  "HTML",
  "CSS",
  "SQL",
  "Payment Gateway",
];

function Row({ ariaHidden }) {
  return (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500 transition-colors duration-300 hover:text-emerald-300 sm:px-10 sm:text-sm">
            {item}
          </span>
          <span className="h-1 w-1 rounded-full bg-emerald-400/50" />
        </li>
      ))}
    </ul>
  );
}

/**
 * Marquee tech stack — strip infinite scroll sebagai pemisah antar section.
 * Pause saat hover; duplikat konten ditandai aria-hidden.
 */
export default function Marquee() {
  return (
    <div
      role="presentation"
      aria-label="Tech stack"
      className="relative overflow-hidden border-y border-white/[0.05] bg-surface py-5"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <Row />
        <Row ariaHidden />
      </div>

      {/* Fade di tepi kiri & kanan */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-base to-transparent sm:w-32"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-base to-transparent sm:w-32"
      />
    </div>
  );
}

import { motion } from "framer-motion";

const lines = [
  <>
    <span className="text-zinc-600">{"// developer.ts"}</span>
  </>,
  <>
    <span className="text-violet-300/90">const</span>{" "}
    <span className="text-zinc-200">developer</span>{" "}
    <span className="text-zinc-500">=</span> <span className="text-zinc-400">{"{"}</span>
  </>,
  <>
    {"  "}
    <span className="text-zinc-400">name:</span>{" "}
    <span className="text-emerald-300">&quot;Daffa Aldyananta&quot;</span>
    <span className="text-zinc-500">,</span>
  </>,
  <>
    {"  "}
    <span className="text-zinc-400">role:</span>{" "}
    <span className="text-emerald-300">&quot;Full Stack Developer&quot;</span>
    <span className="text-zinc-500">,</span>
  </>,
  <>
    {"  "}
    <span className="text-zinc-400">focus:</span> <span className="text-zinc-400">[</span>
    <span className="text-emerald-300">&quot;Web Apps&quot;</span>
    <span className="text-zinc-500">,</span>{" "}
    <span className="text-emerald-300">&quot;APIs&quot;</span>
    <span className="text-zinc-500">,</span>{" "}
    <span className="text-emerald-300">&quot;Systems&quot;</span>
    <span className="text-zinc-400">]</span>
    <span className="text-zinc-500">,</span>
  </>,
  <>
    {"  "}
    <span className="text-zinc-400">stack:</span> <span className="text-zinc-400">{"{"}</span>
  </>,
  <>
    {"    "}
    <span className="text-zinc-400">frontend:</span>{" "}
    <span className="text-emerald-300">&quot;React&quot;</span>
    <span className="text-zinc-500">,</span>
  </>,
  <>
    {"    "}
    <span className="text-zinc-400">backend:</span>{" "}
    <span className="text-emerald-300">&quot;Laravel · Python&quot;</span>
    <span className="text-zinc-500">,</span>
  </>,
  <>
    {"    "}
    <span className="text-zinc-400">database:</span>{" "}
    <span className="text-emerald-300">&quot;MySQL&quot;</span>
    <span className="text-zinc-500">,</span>
  </>,
  <>
    {"  "}
    <span className="text-zinc-400">{"}"}</span>
    <span className="text-zinc-500">,</span>
  </>,
  <>
    {"  "}
    <span className="text-zinc-400">openToWork:</span>{" "}
    <span className="text-amber-300">true</span>
    <span className="text-zinc-500">,</span>
  </>,
  <>
    <span className="text-zinc-400">{"}"}</span>
    <span className="text-zinc-500">;</span>
  </>,
];

/**
 * Kartu code editor dekoratif di Hero — memberi identitas "developer"
 * tanpa memakai foto atau gambar eksternal.
 */
export default function CodeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative hidden lg:block"
      aria-hidden="true"
    >
      {/* Glow di belakang kartu */}
      <div className="absolute -inset-8 rounded-[2rem] bg-emerald-500/[0.07] blur-3xl" />

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-card/90 shadow-2xl shadow-black/60 backdrop-blur"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="ml-3 rounded-md bg-black/40 px-2.5 py-1 font-mono text-[10px] text-zinc-500">
            developer.ts
          </span>
        </div>

        {/* Code body */}
        <div className="space-y-1.5 px-5 py-4 font-mono text-[12.5px] leading-relaxed">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="w-7 select-none pr-3 text-right text-zinc-700">{i + 1}</span>
              <span className="flex-1">{line}</span>
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between border-t border-white/[0.06] bg-black/40 px-4 py-2 font-mono text-[10px]">
          <span className="flex items-center gap-1.5 text-zinc-500">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            open to opportunities
          </span>
          <span className="text-zinc-600">UTF-8 · LF · TypeScript</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

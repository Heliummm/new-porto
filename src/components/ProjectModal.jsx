import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  FolderGit2,
  GraduationCap,
  Info,
  Lightbulb,
  X,
} from "lucide-react";
import TechBadge from "./ui/TechBadge";
import ProjectMockup from "./mockups/ProjectMockup";

/**
 * ============================================================
 *  PROJECT DETAIL MODAL — struktur sengaja dibuat sesederhana
 *  mungkin agar anti-bug:
 *
 *  Panel (flex-col, max-h-92vh)
 *  ├── Header   (shrink-0 — selalu terlihat)
 *  ├── Body     (flex-1 min-h-0 — SATU-SATUNYA area scroll)
 *  │   ├── Preview (tinggi TETAP per breakpoint: 210/240/280px
 *  │   │            — tanpa JS, tanpa transform, tanpa vh)
 *  │   └── Konten sections (flow normal)
 *  └── Footer   (shrink-0 — tidak menutupi konten)
 *
 *  - Tidak ada rantai h-full bertingkat di luar preview
 *  - Tidak ada zoom/transform (border selalu tajam)
 *  - Konten mockup fleksibel (flex-1 min-h-0) menyesuaikan
 *    tinggi apa pun
 * ============================================================
 */

const modalContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};

const modalItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

function ModalSection({ kicker, title, children }) {
  return (
    <motion.section variants={modalItem} className="flex flex-col gap-3">
      <div>
        <span className="block font-mono text-[10px] uppercase tracking-widest text-zinc-600">
          {kicker}
        </span>
        <h4 className="text-sm font-bold text-white">{title}</h4>
      </div>
      {children}
    </motion.section>
  );
}

export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null);

  // Lock scroll body + ESC untuk close + fokus awal ke tombol close
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80"
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl shadow-black/70 min-[1600px]:max-w-4xl"
      >
        {/* ================= HEADER (tetap terlihat) ================= */}
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/[0.06] bg-card px-6 py-3.5 sm:py-4">
          <div className="flex min-w-0 flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                {project.type}
              </span>
              {project.workContext && (
                <span className="rounded-full border border-amber-400/25 bg-amber-400/[0.07] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-200">
                  Work Experience Project
                </span>
              )}
              {project.thesisContext && (
                <span className="rounded-full border border-sky-400/25 bg-sky-400/[0.07] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-sky-200">
                  Undergraduate Thesis · Skripsi
                </span>
              )}
            </div>
            <h3 id="project-modal-title" className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-zinc-500">{project.tagline}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-all hover:rotate-90 hover:border-white/40 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* ================= BODY (satu-satunya area scroll) ================= */}
        <motion.div
          variants={modalContainer}
          initial="hidden"
          animate="show"
          className="modal-scroll min-h-0 flex-1 overscroll-contain overflow-y-auto px-6 py-5 sm:px-8 sm:py-6"
        >
          {/* Preview — tinggi tetap per breakpoint. Konten mockup fleksibel. */}
          <motion.div
            variants={modalItem}
            className="mockup-shell overflow-hidden rounded-xl border border-white/[0.07] p-3 sm:p-4"
          >
            <div className="h-[210px] sm:h-[240px] lg:h-[280px]">
              <ProjectMockup type={project.mockup} />
            </div>
            <p className="mt-2 text-center font-mono text-[10px] tracking-wide text-zinc-600">
              UI concept mockup — illustrative design, not an actual app screenshot
            </p>
          </motion.div>

          {/* Catatan konteks */}
          {project.note && (
            <motion.div variants={modalItem} className="mt-6 flex items-start gap-3 rounded-xl border border-sky-400/20 bg-sky-400/[0.05] px-4 py-3.5">
              <Info size={16} className="mt-0.5 shrink-0 text-sky-300" />
              <p className="text-[13px] leading-relaxed text-sky-100/90">{project.note}</p>
            </motion.div>
          )}
          {project.workContext && (
            <motion.div variants={modalItem} className="mt-6 flex items-start gap-3 rounded-xl border border-amber-400/20 bg-amber-400/[0.05] px-4 py-3.5">
              <Info size={16} className="mt-0.5 shrink-0 text-amber-300" />
              <p className="text-[13px] leading-relaxed text-amber-100/90">{project.workContext}</p>
            </motion.div>
          )}
          {project.thesisContext && (
            <motion.div variants={modalItem} className="mt-6 flex items-start gap-3 rounded-xl border border-sky-400/20 bg-sky-400/[0.05] px-4 py-3.5">
              <GraduationCap size={16} className="mt-0.5 shrink-0 text-sky-300" />
              <p className="text-[13px] leading-relaxed text-sky-100/90">{project.thesisContext}</p>
            </motion.div>
          )}

          {/* Overview */}
          <div className="mt-6">
            <ModalSection kicker="01" title="Overview">
              <p className="text-sm leading-relaxed text-zinc-400">{project.overview}</p>
            </ModalSection>
          </div>

          {/* Problem & Solution */}
          <motion.div variants={modalItem} className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-card p-5">
              <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-300/90">
                <AlertTriangle size={13} /> The Problem
              </div>
              <p className="text-[13px] leading-relaxed text-zinc-400">{project.problem}</p>
            </div>
            <div className="flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-card p-5">
              <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-300/90">
                <Lightbulb size={13} /> The Solution
              </div>
              <p className="text-[13px] leading-relaxed text-zinc-400">{project.solution}</p>
            </div>
          </motion.div>

          {/* Key Features */}
          <div className="mt-6">
            <ModalSection kicker="02" title="Key Features">
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 rounded-lg border border-white/[0.05] bg-card px-3.5 py-3"
                  >
                    <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-emerald-400/10">
                      <Check size={10} className="text-emerald-400" />
                    </span>
                    <span className="text-[13px] font-medium text-zinc-300">{f}</span>
                  </li>
                ))}
              </ul>
            </ModalSection>
          </div>

          {/* Tech Stack */}
          <div className="mt-6">
            <ModalSection kicker="03" title="Tech Stack">
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li key={t}>
                    <TechBadge>{t}</TechBadge>
                  </li>
                ))}
              </ul>
            </ModalSection>
          </div>

          {/* My Contribution */}
          <div className="mt-6">
            <ModalSection kicker="04" title="My Contribution">
              <ul className="flex flex-col gap-2">
                {project.contribution.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-400">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-400/80" />
                    {c}
                  </li>
                ))}
              </ul>
            </ModalSection>
          </div>

          {/* Links */}
          {(project.links.github || project.links.demo) && (
            <motion.div variants={modalItem} className="mt-6 flex flex-wrap gap-3">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-zinc-100 transition-all hover:border-white/40 hover:bg-white/5"
                >
                  <FolderGit2 size={15} /> GitHub Repository
                  <ArrowUpRight size={14} className="text-zinc-500" />
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-200"
                >
                  Live Demo
                  <ArrowUpRight size={14} />
                </a>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* ================= FOOTER ================= */}
        <div className="shrink-0 border-t border-white/[0.06] bg-card px-6 py-2.5 [@media(max-height:520px)]:hidden">
          <p className="text-center font-mono text-[10px] tracking-widest text-zinc-600">
            PRESS <span className="text-zinc-400">ESC</span> OR CLICK OUTSIDE TO CLOSE ·{" "}
            <span className="text-zinc-500">v3.0</span>
          </p>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

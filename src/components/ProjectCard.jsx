import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Briefcase, ExternalLink, FolderGit2, GraduationCap } from "lucide-react";
import TechBadge from "./ui/TechBadge";
import ProjectMockup from "./mockups/ProjectMockup";

const CAN_TILT =
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Card project dengan spotlight hover, 3D tilt mengikuti kursor,
 * dan micro-interaction lift saat hover.
 */
export default function ProjectCard({ project, index, onOpen, className = "" }) {
  const cardRef = useRef(null);
  const number = String(index + 1).padStart(2, "0");

  // 3D tilt (hanya pointer presisi)
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20, mass: 0.5 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20, mass: 0.5 });

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();

    // Spotlight position (CSS var)
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);

    // Tilt mengikuti posisi kursor (max ±3deg)
    if (CAN_TILT) {
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(px * 6);
      rotateX.set(-py * 6);
    }
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  const featured = project.featured;

  return (
    <motion.article
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={`View details of ${project.title}`}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1000,
      }}
      className={`card-beam group relative flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-card outline-none transition-[border-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-emerald-400/60 hover:border-emerald-400/25 hover:shadow-glow-sm ${className} ${
        featured ? "lg:grid lg:grid-cols-2" : ""
      }`}
    >
      {/* Spotlight hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(52,211,153,0.06), transparent 65%)",
        }}
      />

      {/* Number watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-4 z-10 font-mono text-5xl font-bold text-white/[0.04] transition-colors duration-500 group-hover:text-emerald-400/10"
      >
        {number}
      </span>

      {/* Mockup */}
      <div
        className={`mockup-shell relative overflow-hidden border-white/[0.06] p-4 sm:p-5 ${
          featured ? "border-b lg:border-b-0 lg:border-r" : "border-b"
        }`}
      >
        <div className="aspect-[16/10] min-h-[150px] transition-transform duration-700 ease-out group-hover:scale-[1.025] sm:min-h-[240px]">
          <ProjectMockup type={project.mockup} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col gap-4 p-6">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 pr-16">
          <span className="rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
            {project.type}
          </span>
          {project.workContext && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-amber-400/[0.07] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-200">
              <Briefcase size={10} />
              Work Experience
            </span>
          )}
          {project.thesisContext && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/25 bg-sky-400/[0.07] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-sky-200">
              <GraduationCap size={11} />
              Thesis · Skripsi
            </span>
          )}
        </div>

        <div>
          <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-emerald-100">
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-xs text-zinc-600">{project.tagline}</p>
        </div>

        <p className={`text-sm leading-relaxed text-zinc-400 ${featured ? "" : "line-clamp-3"}`}>
          {project.description}
        </p>

        {/* Tech */}
        <ul className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li key={t}>
              <TechBadge>{t}</TechBadge>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-3 pt-2">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300 transition-all duration-200 group-hover:gap-2.5">
            View Details
            <ArrowRight size={15} />
          </span>

          <span className="ml-auto flex items-center gap-2">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} repository on GitHub`}
                onClick={(e) => e.stopPropagation()}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-all hover:border-white/40 hover:text-white"
              >
                <FolderGit2 size={15} />
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                onClick={(e) => e.stopPropagation()}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-all hover:border-white/40 hover:text-white"
              >
                <ExternalLink size={15} />
              </a>
            )}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

import { useMemo } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight, ChevronDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "../config/site";
import { useTypewriter } from "../hooks/useTypewriter";
import Button from "./ui/Button";
import Magnetic from "./ui/Magnetic";
import CodeCard from "./CodeCard";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

/**
 * Reveal kata-per-kata dengan mask (slide-up dari dalam "pipa" terpotong).
 * `highlight` = indeks kata yang diberi penekanan (putih bold).
 */
function MaskWords({ words, delay = 0, stagger = 0.08, highlight = [] }) {
  return (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
        >
          <motion.span
            className={`inline-block ${highlight.includes(i) ? "font-semibold text-white" : ""}`}
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.75,
              delay: delay + i * stagger,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </>
  );
}

/** Partikel kecil yang berkedip (deterministik, dekoratif) */
function Particles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        left: (i * 53 + 17) % 100,
        top: (i * 37 + 13) % 100,
        size: 2 + (i % 3),
        delay: (i % 7) * 0.55,
        dur: 3 + (i % 5),
      })),
    []
  );
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
      {dots.map((p, i) => (
        <span
          key={i}
          className="absolute animate-twinkle rounded-full bg-emerald-300/60"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

const socials = [
  { label: "GitHub", href: siteConfig.socials.github, icon: Github },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail },
];

export default function Hero() {
  const typed = useTypewriter(siteConfig.typingRoles);
  const reduced = useReducedMotion();

  // Glow ambient yang mengikuti kursor (desktop, tanpa reduced-motion)
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const smoothGlowX = useSpring(glowX, { stiffness: 55, damping: 20 });
  const smoothGlowY = useSpring(glowY, { stiffness: 55, damping: 20 });

  const handleHeroMouseMove = (e) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  const nameWords = useMemo(() => siteConfig.name.split(" "), []);
  const headlineWords = useMemo(
    () => ["Building", "Digital", "Experiences", "Through", "Code."],
    []
  );

  return (
    <section
      id="home"
      onMouseMove={handleHeroMouseMove}
      className="relative flex min-h-safe-view items-center overflow-hidden pt-16"
    >
      {/* Grid bergerak + glow + partikel */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid-animated mask-radial" />
      <Particles />
      <motion.div
        aria-hidden="true"
        style={{ x: smoothGlowX, y: smoothGlowY }}
        className="pointer-events-none absolute left-0 top-0 hidden lg:block"
      >
        <div className="h-[400px] w-[400px] -translate-x-1/2 -translate-y-[35%] rounded-full bg-emerald-400/[0.055] blur-[100px]" />
      </motion.div>

      {/* Orb floating dekoratif */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 hidden h-64 w-64 animate-float rounded-full bg-sky-500/[0.05] blur-[90px] lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-10 hidden h-80 w-80 animate-[float_9s_ease-in-out_infinite] rounded-full bg-emerald-500/[0.06] blur-[110px] lg:block"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pb-16 pt-10 sm:pb-20 sm:pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:pb-20 lg:pt-14 xl:pb-24 [@media(min-width:1024px)_and_(max-height:780px)]:pb-12 [@media(min-width:1024px)_and_(max-height:780px)]:pt-8">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-5 sm:gap-6">
          {/* Availability badge */}
          {siteConfig.availability.enabled && (
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] px-4 py-1.5 text-xs font-medium text-emerald-200">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {siteConfig.availability.label}
              </span>
            </motion.div>
          )}

          {/* Kicker */}
          <motion.p
            variants={item}
            className="font-mono text-sm tracking-widest text-zinc-500"
          >
            {siteConfig.kicker}
          </motion.p>

          {/* Name — mask reveal kata per kata */}
          <motion.h1
            variants={item}
            className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            <MaskWords words={nameWords} delay={0.35} />
          </motion.h1>

          {/* Typing role */}
          <motion.p
            variants={item}
            className="flex items-center font-mono text-lg text-emerald-400 sm:text-xl"
            aria-label={siteConfig.role}
          >
            <span className="mr-2 text-zinc-600">{">"}</span>
            <span>{typed}</span>
            <span
              aria-hidden="true"
              className="ml-1 inline-block h-5 w-[2px] animate-pulse bg-emerald-400"
            />
          </motion.p>

          {/* Headline — mask reveal */}
          <motion.p
            variants={item}
            className="max-w-xl text-xl font-medium leading-snug text-zinc-400 sm:text-2xl"
          >
            <MaskWords words={headlineWords} delay={0.75} highlight={[1, 2]} />
          </motion.p>

          {/* Description */}
          <motion.p
            variants={item}
            className="max-w-xl text-base leading-relaxed text-zinc-500"
          >
            {siteConfig.heroDescription}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-2 flex flex-wrap items-center gap-3">
            <Magnetic strength={0.25}>
              <Button href="#projects">
                View Projects
                <ArrowRight size={16} />
              </Button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Button variant="outline" href="#contact">
                Contact Me
              </Button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Button
                variant="ghost"
                href={siteConfig.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={16} />
                Download CV
              </Button>
            </Magnetic>
          </motion.div>

          {/* Socials */}
          <motion.div variants={item} className="mt-4 flex items-center gap-3">
            <span className="font-mono text-xs text-zinc-600">find me on</span>
            <span className="h-px w-8 bg-white/10" />
            {socials.map(({ label, href, icon: Icon }) => (
              <Magnetic key={label} strength={0.4}>
                <a
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400/50 hover:text-emerald-300"
                >
                  <Icon size={17} />
                </a>
              </Magnetic>
            ))}
          </motion.div>
        </motion.div>

        {/* Visual — code card */}
        <CodeCard />
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-zinc-600 transition-colors hover:text-zinc-300 [@media(min-width:1024px)_and_(min-height:860px)]:flex"
      >
        <span className="font-mono text-[10px] tracking-widest">SCROLL</span>
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ChevronDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}

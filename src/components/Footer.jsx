import { ArrowUp, Github, Linkedin } from "lucide-react";
import { siteConfig } from "../config/site";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.06] bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between">
        {/* Brand + copyright */}
        <div className="flex flex-col items-center gap-1.5 sm:items-start">
          <a href="#home" className="font-mono text-base font-bold text-white transition-opacity hover:opacity-80">
            {siteConfig.logoText}
            <span className="text-emerald-400">{siteConfig.logoSuffix}</span>
          </a>
          <p className="text-xs text-zinc-600">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>

        {/* Credit */}
        <p className="hidden font-mono text-[11px] text-zinc-700 lg:block">
          designed &amp; built with React · Tailwind CSS · Framer Motion
        </p>

        {/* Socials + back to top */}
        <div className="flex items-center gap-3">
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition-all hover:border-emerald-400/40 hover:text-emerald-300"
          >
            <Github size={15} />
          </a>
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition-all hover:border-emerald-400/40 hover:text-emerald-300"
          >
            <Linkedin size={15} />
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition-all hover:border-emerald-400/40 hover:text-emerald-300"
          >
            <ArrowUp size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

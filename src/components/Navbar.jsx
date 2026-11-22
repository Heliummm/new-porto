import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X, Download } from "lucide-react";
import { navLinks, siteConfig } from "../config/site";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { useTheme } from "../hooks/useTheme";

const SECTION_IDS = navLinks.map((l) => l.href.slice(1));

const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#";

/** Efek scramble teks logo saat hover */
function useScramble(text) {
  const [display, setDisplay] = useState(text);

  const scramble = () => {
    let frame = 0;
    const total = 12;
    const id = setInterval(() => {
      frame += 1;
      const progress = frame / total;
      setDisplay(
        text
          .split("")
          .map((ch, i) => {
            if (i / text.length < progress - 0.25) return ch;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );
      if (frame >= total) {
        clearInterval(id);
        setDisplay(text);
      }
    }, 38);
  };

  return [display, scramble];
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(SECTION_IDS);
  const [logoDisplay, scrambleLogo] = useScramble(siteConfig.logoText);
  const [theme, toggleTheme] = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/[0.06] bg-base/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        {/* Logo */}
        <a
          href="#home"
          onMouseEnter={scrambleLogo}
          className="font-mono text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-80"
          aria-label="Back to home"
        >
          {logoDisplay}
          <span className="text-emerald-400">{siteConfig.logoSuffix}</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-3.5 -bottom-px h-px bg-emerald-400 transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Theme toggle + CTA + CV */}
        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-all duration-300 hover:border-emerald-400/50 hover:text-emerald-300"
          >
            <motion.span
              key={theme}
              initial={{ rotate: -120, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </motion.span>
          </button>
          <a
            href={siteConfig.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-white/10 px-3.5 py-2 text-sm font-medium text-zinc-400 transition-all duration-200 hover:border-emerald-400/50 hover:text-emerald-300"
            title="Download CV"
          >
            <Download size={14} />
            <span className="hidden lg:inline">CV</span>
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-zinc-100 transition-all duration-200 hover:border-emerald-400/50 hover:bg-emerald-400/10 hover:text-emerald-200"
          >
            Let&apos;s Talk
          </a>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:bg-white/5"
          >
            <motion.span
              key={theme}
              initial={{ rotate: -120, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </motion.span>
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-zinc-200 transition-colors hover:bg-white/5 md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/[0.06] bg-base/95 backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-1 px-6 py-4">
              {navLinks.map((link, i) => {
                const isActive = active === link.href.slice(1);
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                        isActive
                          ? "bg-white/[0.06] text-white"
                          : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100"
                      }`}
                    >
                      {link.label}
                      <span
                        className={`font-mono text-xs ${
                          isActive ? "text-emerald-400" : "text-zinc-600"
                        }`}
                      >
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                );
              })}
              
              {/* CV Download Link */}
              <motion.li
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * navLinks.length }}
                className="pt-2 border-t border-white/5"
              >
                <a
                  href={siteConfig.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-emerald-300"
                >
                  <Download size={16} />
                  Download CV
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

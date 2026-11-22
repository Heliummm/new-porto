import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Blog from "./components/Blog";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/ui/Cursor";
import ScrollProgress from "./components/ui/ScrollProgress";
import Marquee from "./components/ui/Marquee";
import DevSetupReminder from "./components/DevSetupReminder";
import { siteConfig } from "./config/site";

export default function App() {
  // Easter egg untuk recruiter/dev yang suka buka console
  useEffect(() => {
    console.log(
      "%c👋 Hi there, fellow inspector!",
      "font-size:14px;font-weight:700;color:#34d399;"
    );
    console.log(
      `%cLooks like you enjoy exploring under the hood — so do I.\nThis portfolio is built with React, Vite, Tailwind CSS & Framer Motion.\n\nInterested in working together? → ${siteConfig.email}`,
      "font-size:12px;color:#a1a1aa;"
    );
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-base font-sans text-zinc-300">
      {/* Subtle film-grain overlay for a premium finish */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] opacity-[0.025] bg-noise" />

      <ScrollProgress />
      <Cursor />
      <DevSetupReminder />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Marquee />
        <Projects />
        <Blog />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

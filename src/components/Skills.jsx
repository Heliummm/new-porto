import { motion } from "framer-motion";
import { Database, MonitorSmartphone, Server, Wrench } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

const chipsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } },
};

const chipItem = {
  hidden: { opacity: 0, y: 10, scale: 0.85 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 20 },
  },
};

const categories = [
  {
    icon: MonitorSmartphone,
    title: "Frontend",
    desc: "Building responsive, interactive user interfaces",
    skills: ["HTML", "CSS", "JavaScript", "React.js"],
  },
  {
    icon: Server,
    title: "Backend",
    desc: "Developing server-side logic and APIs",
    skills: ["PHP", "Laravel", "Python"],
  },
  {
    icon: Database,
    title: "Database",
    desc: "Designing and managing relational data",
    skills: ["MySQL", "SQL"],
  },
  {
    icon: Wrench,
    title: "Tools",
    desc: "Everyday workflow and collaboration",
    skills: ["Git", "GitHub", "VS Code", "Postman"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative border-t border-white/[0.05] bg-surface py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker="tech-stack"
          title="Technologies I Work With"
          description="A practical toolkit for building complete web applications — from interface to database."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ icon: Icon, title, desc, skills }, i) => (
            <Reveal key={title} delay={0.08 * i}>
              <div className="group flex h-full flex-col rounded-xl border border-white/[0.07] bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-400/30 hover:shadow-glow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-emerald-300 transition-colors duration-300 group-hover:border-emerald-400/40">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <span className="font-mono text-xs text-zinc-700">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="mb-5 mt-1 text-[13px] leading-relaxed text-zinc-500">{desc}</p>

                <motion.ul
                  variants={chipsContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="mt-auto flex flex-wrap gap-2"
                >
                  {skills.map((skill) => (
                    <motion.li
                      key={skill}
                      variants={chipItem}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] font-medium text-zinc-300 transition-all duration-200 hover:border-emerald-400/50 hover:text-emerald-200"
                    >
                      {skill}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

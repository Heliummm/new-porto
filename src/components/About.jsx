import { Database, Globe, Layers, Webhook } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

const highlights = [
  {
    icon: Layers,
    title: "Full Stack Development",
    desc: "Working across frontend and backend to ship complete solutions.",
  },
  {
    icon: Globe,
    title: "Web Application Development",
    desc: "Building practical web applications from idea to functionality.",
  },
  {
    icon: Webhook,
    title: "API Integration",
    desc: "Connecting applications with external services and APIs.",
  },
  {
    icon: Database,
    title: "Database Management",
    desc: "Designing and managing structured data with MySQL.",
  },
];

const quickFacts = [
  { label: "Education", value: "Information Systems Graduate" },
  { label: "Focus", value: "Full Stack Development" },
  { label: "Interests", value: "Web Apps · Systems · Software Engineering" },
  { label: "Status", value: "Open to Opportunities", accent: true },
];

export default function About() {
  return (
    <section id="about" className="relative border-t border-white/[0.05] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* Left — narrative */}
          <div className="flex flex-col gap-8">
            <SectionHeading
              kicker="about-me"
              title="Turning Ideas Into Functional Solutions"
            />

            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">
                I am an Information Systems graduate with an interest in full stack
                development, web application development, system integration, and
                software engineering. I enjoy building practical digital solutions,
                working with backend and frontend technologies, and exploring how
                technology can solve real-world problems.
              </p>
            </Reveal>

            {/* Quick facts */}
            <Reveal delay={0.15}>
              <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-card">
                <div className="border-b border-white/[0.06] bg-white/[0.02] px-5 py-3">
                  <span className="font-mono text-xs text-zinc-500">
                    ~/quick-facts <span className="ml-1 inline-block h-3 w-[6px] animate-pulse bg-emerald-400 align-middle" />
                  </span>
                </div>
                <dl className="divide-y divide-white/[0.05]">
                  {quickFacts.map(({ label, value, accent }) => (
                    <div
                      key={label}
                      className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-center sm:gap-4"
                    >
                      <dt className="w-28 shrink-0 font-mono text-xs uppercase tracking-wider text-zinc-600">
                        {label}
                      </dt>
                      <dd
                        className={`text-sm font-medium ${
                          accent ? "text-emerald-300" : "text-zinc-300"
                        }`}
                      >
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>

          {/* Right — highlight cards */}
          <div className="grid content-center gap-4 sm:grid-cols-2">
            {highlights.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={0.08 * i}>
                <div className="group relative h-full overflow-hidden rounded-xl border border-white/[0.07] bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/30">
                  <div
                    aria-hidden="true"
                    className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-emerald-400/0 blur-2xl transition-all duration-500 group-hover:bg-emerald-400/10"
                  />
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-emerald-300 transition-colors duration-300 group-hover:border-emerald-400/40">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <h3 className="mb-1.5 text-sm font-semibold text-white">{title}</h3>
                  <p className="text-[13px] leading-relaxed text-zinc-500">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

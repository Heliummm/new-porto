import { ArrowRight, Briefcase, GraduationCap } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import TechBadge from "./ui/TechBadge";

const experience = {
  role: "Full Stack Developer Intern",
  company: "PT Qwords Company International",
  type: "Internship",
  description:
    "Contributed to web application development using Laravel, including feature development, integration, and implementation of application functionalities.",
  tags: ["Laravel", "PHP", "API Integration", "Payment Gateway"],
};

const education = {
  school: "Institut Teknologi Garut",
  program: "Information Systems",
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative border-t border-white/[0.05] bg-surface py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker="journey"
          title="Experience & Education"
          description="Where I've worked, what I've contributed, and what I've studied."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-5 lg:gap-14">
          {/* Timeline */}
          <div className="lg:col-span-3">
            <Reveal>
              <h3 className="mb-8 flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-zinc-500">
                <Briefcase size={14} className="text-emerald-400" />
                Work Experience
              </h3>
            </Reveal>

            <div className="relative pl-8">
              {/* Timeline line */}
              <span
                aria-hidden="true"
                className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-emerald-400/60 via-white/10 to-transparent"
              />

              <Reveal delay={0.1}>
                <article className="group relative">
                  {/* Timeline dot */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-8 top-1.5 flex h-[15px] w-[15px] items-center justify-center"
                  >
                    <span className="absolute h-full w-full rounded-full bg-emerald-400/20" />
                    <span className="relative h-[7px] w-[7px] rounded-full bg-emerald-400" />
                  </span>

                  <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/25 sm:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                        {experience.type}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-white sm:text-xl">
                        {experience.role}
                      </h4>
                      <p className="mt-1 text-sm font-medium text-zinc-400">
                        {experience.company}
                      </p>
                    </div>

                    <p className="text-sm leading-relaxed text-zinc-500">
                      {experience.description}
                    </p>

                    <ul className="flex flex-wrap gap-2">
                      {experience.tags.map((tag) => (
                        <li key={tag}>
                          <TechBadge>{tag}</TechBadge>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            </div>
          </div>

          {/* Education + status */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <Reveal delay={0.15}>
              <h3 className="mb-8 flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-zinc-500">
                <GraduationCap size={14} className="text-emerald-400" />
                Education
              </h3>

              <div className="flex items-start gap-4 rounded-2xl border border-white/[0.07] bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/25 sm:p-7">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-emerald-300">
                  <GraduationCap size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{education.school}</h4>
                  <p className="mt-1 text-sm font-medium text-zinc-400">
                    {education.program}
                  </p>
                  <p className="mt-2 font-mono text-xs text-zinc-600">
                    Bachelor&apos;s degree program
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.25} className="mt-auto">
              <a
                href="#contact"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-emerald-400/[0.08]"
              >
                <div>
                  <p className="text-sm font-bold text-white">Open to new opportunities</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-zinc-400">
                    Looking for roles where I can contribute and grow as a developer.
                  </p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 text-emerald-300 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-emerald-400/10">
                  <ArrowRight size={17} />
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

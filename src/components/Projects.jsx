import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { projects } from "../data/projects";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import ProjectFilters from "./ProjectFilters";

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  return (
    <section id="projects" className="relative border-t border-white/[0.05] py-24 sm:py-32">
      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-24 h-[300px] w-[300px] rounded-full bg-emerald-500/[0.04] blur-[110px]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker="portfolio"
            title="Featured Projects"
            description="Selected projects covering web applications, analytical tools, computer vision, and platform development."
          />
          <Reveal delay={0.15} className="shrink-0">
            <span className="font-mono text-sm text-zinc-600">
              <span className="text-emerald-400">
                {String(filteredProjects.length).padStart(2, "0")}
              </span>{" "}
              {filteredProjects.length !== projects.length && (
                <span className="text-zinc-700">of {String(projects.length).padStart(2, "0")} </span>
              )}
              projects · click to explore
            </span>
          </Reveal>
        </div>

        {/* Filters */}
        <Reveal delay={0.2} className="mt-10">
          <ProjectFilters projects={projects} onFilterChange={setFilteredProjects} />
        </Reveal>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {filteredProjects.map((project, i) => (
              <Reveal
                key={project.id}
                delay={0.06 * i}
                className={project.featured ? "lg:col-span-2" : ""}
              >
                <ProjectCard
                  project={project}
                  index={i}
                  onOpen={() => setSelected(project)}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-20 text-center"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900/50 ring-1 ring-white/5">
              <Search className="h-7 w-7 text-zinc-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-zinc-400">No projects found</h3>
            <p className="text-sm text-zinc-600">
              Try adjusting your filters or search query
            </p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

import { useState, useMemo } from "react";
import { Search, X, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectFilters({ projects, onFilterChange }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique values
  const allTech = useMemo(() => {
    const techSet = new Set();
    projects.forEach((p) => p.tech.forEach((t) => techSet.add(t)));
    return ["all", ...Array.from(techSet).sort()];
  }, [projects]);

  const allTypes = useMemo(() => {
    const typeSet = new Set(projects.map((p) => p.type));
    return ["all", ...Array.from(typeSet).sort()];
  }, [projects]);

  // Apply filters
  const handleFilterChange = (tech, type, query) => {
    const filtered = projects.filter((project) => {
      const matchesTech = tech === "all" || project.tech.includes(tech);
      const matchesType = type === "all" || project.type === type;
      const matchesSearch =
        query === "" ||
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase()) ||
        project.tagline.toLowerCase().includes(query.toLowerCase()) ||
        project.tech.some((t) => t.toLowerCase().includes(query.toLowerCase()));

      return matchesTech && matchesType && matchesSearch;
    });

    onFilterChange(filtered);
  };

  const handleTechChange = (tech) => {
    setSelectedTech(tech);
    handleFilterChange(tech, selectedType, searchQuery);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    handleFilterChange(selectedTech, type, searchQuery);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    handleFilterChange(selectedTech, selectedType, query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTech("all");
    setSelectedType("all");
    handleFilterChange("all", "all", "");
  };

  const hasActiveFilters =
    selectedTech !== "all" || selectedType !== "all" || searchQuery !== "";

  return (
    <div className="mb-10 space-y-4">
      {/* Search Bar & Toggle */}
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/30 py-3 pl-11 pr-4 text-sm text-zinc-200 placeholder-zinc-600 backdrop-blur-sm transition-colors focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        {/* Filter Toggle (Mobile) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-zinc-300 backdrop-blur-sm transition-colors hover:border-emerald-500/30 hover:bg-white/5 sm:hidden"
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
          )}
        </button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={clearFilters}
            className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-zinc-400 backdrop-blur-sm transition-colors hover:border-red-500/30 hover:bg-white/5 hover:text-red-400"
          >
            <X className="h-4 w-4" />
            Clear
          </motion.button>
        )}
      </div>

      {/* Filter Options - Always visible on desktop (sm+), toggle on mobile */}
      <div className="hidden sm:block">
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Tech Stack Filter */}
          <div className="flex-1">
            <label className="mb-2 block text-xs font-medium text-zinc-500">
              Tech Stack
            </label>
            <select
              value={selectedTech}
              onChange={(e) => handleTechChange(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-zinc-200 backdrop-blur-sm transition-colors focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              {allTech.map((tech) => (
                <option key={tech} value={tech}>
                  {tech === "all" ? "All Technologies" : tech}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex-1">
            <label className="mb-2 block text-xs font-medium text-zinc-500">
              Project Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-zinc-200 backdrop-blur-sm transition-colors focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              {allTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "all" ? "All Types" : type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Filter Options */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-col gap-4 overflow-hidden sm:hidden"
          >
            {/* Tech Stack Filter */}
            <div className="flex-1">
              <label className="mb-2 block text-xs font-medium text-zinc-500">
                Tech Stack
              </label>
              <select
                value={selectedTech}
                onChange={(e) => handleTechChange(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-zinc-200 backdrop-blur-sm transition-colors focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                {allTech.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech === "all" ? "All Technologies" : tech}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex-1">
              <label className="mb-2 block text-xs font-medium text-zinc-500">
                Project Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-zinc-200 backdrop-blur-sm transition-colors focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                {allTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === "all" ? "All Types" : type}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

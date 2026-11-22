import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, BookOpen } from "lucide-react";
import { posts } from "../data/blogPosts";
import { sortPostsByDate, getAllTags, filterPostsByTag, searchPosts } from "../utils/blog";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import BlogCard from "./BlogCard";
import BlogPostModal from "./BlogPostModal";

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  // Sort posts by date
  const sortedPosts = useMemo(() => sortPostsByDate([...posts]), []);

  // Get all unique tags
  const allTags = useMemo(() => getAllTags(sortedPosts), [sortedPosts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    let result = sortedPosts;
    
    // Filter by tag
    result = filterPostsByTag(result, selectedTag);
    
    // Filter by search query
    result = searchPosts(result, searchQuery);
    
    return result;
  }, [sortedPosts, selectedTag, searchQuery]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTag("all");
  };

  const hasActiveFilters = selectedTag !== "all" || searchQuery !== "";

  return (
    <section id="blog" className="relative border-t border-white/[0.05] py-24 sm:py-32">
      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-24 h-[300px] w-[300px] rounded-full bg-sky-500/[0.04] blur-[110px]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker="insights"
            title="Blog & Articles"
            description="Thoughts on web development, best practices, and lessons learned from building real-world applications."
          />
          <Reveal delay={0.15} className="shrink-0">
            <span className="font-mono text-sm text-zinc-600">
              <span className="text-emerald-400">
                {String(filteredPosts.length).padStart(2, "0")}
              </span>{" "}
              {filteredPosts.length !== sortedPosts.length && (
                <span className="text-zinc-700">
                  of {String(sortedPosts.length).padStart(2, "0")}{" "}
                </span>
              )}
              articles
            </span>
          </Reveal>
        </div>

        {/* Filters */}
        <Reveal delay={0.2} className="mt-10">
          <div className="mb-10 space-y-4">
            {/* Search & Clear */}
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-black/30 py-3 pl-11 pr-4 text-sm text-zinc-200 placeholder-zinc-600 backdrop-blur-sm transition-colors focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={clearFilters}
                  className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm font-medium text-zinc-400 backdrop-blur-sm transition-colors hover:border-red-500/30 hover:bg-white/5 hover:text-red-400"
                >
                  <X className="h-4 w-4" />
                  Clear
                </motion.button>
              )}
            </div>

            {/* Tag Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag("all")}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  selectedTag === "all"
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                    : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/10 hover:bg-white/5"
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                      : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/10 hover:bg-white/5"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Blog posts grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredPosts.map((post, i) => (
              <Reveal key={post.slug} delay={0.08 * i}>
                <BlogCard post={post} onClick={() => setSelectedPost(post)} />
              </Reveal>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-20 text-center"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/[0.04] ring-1 ring-white/10">
              <BookOpen className="h-7 w-7 text-zinc-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-zinc-400">No articles found</h3>
            <p className="text-sm text-zinc-600">
              Try adjusting your filters or search query
            </p>
          </motion.div>
        )}
      </div>

      {/* Blog post modal */}
      <AnimatePresence>
        {selectedPost && (
          <BlogPostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

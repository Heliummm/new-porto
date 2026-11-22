import { Calendar, Clock, ArrowRight } from "lucide-react";
import { formatDate } from "../utils/blog";
import TechBadge from "./ui/TechBadge";

export default function BlogCard({ post, onClick }) {
  return (
    <article
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/30 hover:bg-white/[0.05]"
    >
      {/* Hover spotlight effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(52, 211, 153, 0.06), transparent 40%)",
        }}
      />

      <div className="relative">
        {/* Featured badge */}
        {post.featured && (
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Featured
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-emerald-400">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-zinc-400">
          {post.excerpt}
        </p>

        {/* Meta info */}
        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {post.readingTime} min read
          </span>
        </div>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <TechBadge key={tag} className="text-xs">
              {tag}
            </TechBadge>
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs text-zinc-600">+{post.tags.length - 3}</span>
          )}
        </div>

        {/* Read more link */}
        <div className="flex items-center gap-2 text-sm font-medium text-emerald-400 transition-transform group-hover:translate-x-1">
          Read Article
          <ArrowRight size={14} />
        </div>
      </div>
    </article>
  );
}

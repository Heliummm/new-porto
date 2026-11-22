import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, Calendar, Clock, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { formatDate } from "../utils/blog";
import TechBadge from "./ui/TechBadge";
import "highlight.js/styles/github-dark.css";

export default function BlogPostModal({ post, onClose }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:p-6"
    >
      <motion.article
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
        className="relative my-8 w-full max-w-4xl rounded-2xl border border-white/10 bg-surface shadow-2xl sm:my-12"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-card text-zinc-400 backdrop-blur-sm transition-colors hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 sm:right-6 sm:top-6"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="border-b border-white/10 p-6 sm:p-10">
          {/* Featured badge */}
          {post.featured && (
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Featured Article
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="mb-4 pr-12 text-3xl font-bold leading-tight text-white sm:text-4xl">
            {post.title}
          </h1>

          {/* Meta info */}
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-zinc-400">
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} />
              {post.readingTime} min read
            </span>
          </div>

          {/* Tags */}
          <div className="flex items-start gap-2">
            <Tag size={16} className="mt-1 shrink-0 text-zinc-500" />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <TechBadge key={tag} className="text-sm">
                  {tag}
                </TechBadge>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none p-6 prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-3xl prose-h2:mt-10 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-xl prose-p:leading-relaxed prose-p:text-zinc-300 prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline prose-strong:font-semibold prose-strong:text-white prose-code:rounded prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:text-emerald-400 prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:border prose-pre:border-white/10 prose-pre:bg-zinc-950 prose-ul:my-6 prose-li:my-1 prose-li:text-zinc-300 sm:p-10">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            components={{
              // Custom code block styling
              code({ node, inline, className, children, ...props }) {
                return inline ? (
                  <code className={className} {...props}>
                    {children}
                  </code>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              // Custom link styling
              a({ children, href, ...props }) {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  >
                    {children}
                  </a>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 p-6 sm:p-10">
          <p className="text-center text-sm text-zinc-500">
            Thank you for reading! Have questions or feedback?{" "}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                setTimeout(() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="text-emerald-400 transition-colors hover:text-emerald-300"
            >
              Get in touch
            </a>
          </p>
        </div>
      </motion.article>
    </motion.div>
  );
}

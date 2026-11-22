import { parseMarkdown, calculateReadingTime } from "../utils/blog";

// Import all markdown files from content/blog directory
const blogPosts = import.meta.glob("../content/blog/*.md", { 
  eager: true,
  query: "?raw",
  import: "default"
});

/**
 * Load and parse all blog posts
 * @returns {Array} Array of parsed blog posts with metadata
 */
export function loadBlogPosts() {
  const posts = [];

  for (const path in blogPosts) {
    // Skip README.md
    if (path.includes('README')) continue;
    
    const { frontmatter, content } = parseMarkdown(blogPosts[path]);
    
    // Only include if has required frontmatter
    if (frontmatter.title && frontmatter.slug && frontmatter.date) {
      posts.push({
        ...frontmatter,
        content,
        readingTime: calculateReadingTime(content),
      });
    }
  }

  return posts;
}

// Export posts array
export const posts = loadBlogPosts();

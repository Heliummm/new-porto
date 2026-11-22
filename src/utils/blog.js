import matter from "gray-matter";

/**
 * Blog post metadata and content structure
 * @typedef {Object} BlogPost
 * @property {string} slug - URL-friendly identifier
 * @property {string} title - Post title
 * @property {string} date - Publication date (YYYY-MM-DD)
 * @property {string} excerpt - Short description
 * @property {string[]} tags - Array of tags
 * @property {boolean} featured - Whether post is featured
 * @property {string} content - Markdown content
 * @property {number} readingTime - Estimated reading time in minutes
 */

/**
 * Calculate reading time based on word count
 * Average reading speed: 200 words per minute
 * @param {string} text - The text to calculate reading time for
 * @returns {number} Estimated reading time in minutes
 */
export function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

/**
 * Parse markdown content and extract frontmatter
 * @param {string} markdownContent - Raw markdown with frontmatter
 * @returns {Object} Parsed frontmatter and content
 */
export function parseMarkdown(markdownContent) {
  const { data, content } = matter(markdownContent);
  return {
    frontmatter: data,
    content,
  };
}

/**
 * Format date to readable string
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Formatted date (e.g., "March 15, 2024")
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Sort posts by date (newest first)
 * @param {BlogPost[]} posts - Array of blog posts
 * @returns {BlogPost[]} Sorted posts
 */
export function sortPostsByDate(posts) {
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get unique tags from all posts
 * @param {BlogPost[]} posts - Array of blog posts
 * @returns {string[]} Unique tags sorted alphabetically
 */
export function getAllTags(posts) {
  const tagSet = new Set();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

/**
 * Filter posts by tag
 * @param {BlogPost[]} posts - Array of blog posts
 * @param {string} tag - Tag to filter by
 * @returns {BlogPost[]} Filtered posts
 */
export function filterPostsByTag(posts, tag) {
  if (!tag || tag === "all") return posts;
  return posts.filter((post) => post.tags.includes(tag));
}

/**
 * Search posts by query (title, excerpt, tags)
 * @param {BlogPost[]} posts - Array of blog posts
 * @param {string} query - Search query
 * @returns {BlogPost[]} Matching posts
 */
export function searchPosts(posts, query) {
  if (!query) return posts;
  
  const lowerQuery = query.toLowerCase();
  
  return posts.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(lowerQuery);
    const excerptMatch = post.excerpt.toLowerCase().includes(lowerQuery);
    const tagsMatch = post.tags.some((tag) =>
      tag.toLowerCase().includes(lowerQuery)
    );
    
    return titleMatch || excerptMatch || tagsMatch;
  });
}

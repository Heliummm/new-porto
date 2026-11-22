# 📝 Blog Content Guide

This directory contains all blog post markdown files. Each post is automatically loaded and displayed in the Blog section.

## 📄 Adding a New Blog Post

### 1. Create a New Markdown File

Create a new `.md` file in this directory with a descriptive filename (lowercase, hyphens):

```
my-awesome-article.md
react-performance-tips.md
building-rest-api.md
```

### 2. Add Frontmatter

Every blog post **must** start with frontmatter (metadata between `---`):

```markdown
---
title: "Your Article Title Here"
slug: "url-friendly-slug"
date: "2024-03-15"
excerpt: "A short description of your article (1-2 sentences). This appears on the blog card."
tags: ["Tag1", "Tag2", "Tag3"]
featured: true
---

# Your Article Content Starts Here

Write your content in Markdown...
```

### 3. Frontmatter Fields Explained

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ Yes | The article title (shown in card & modal) |
| `slug` | string | ✅ Yes | URL-friendly identifier (must be unique) |
| `date` | string | ✅ Yes | Publication date (YYYY-MM-DD format) |
| `excerpt` | string | ✅ Yes | Short description (displayed on card preview) |
| `tags` | array | ✅ Yes | Array of tags (auto-generates filter buttons) |
| `featured` | boolean | ⚠️ Optional | Set `true` to show "Featured" badge (default: false) |

### 4. Write Your Content

Write your article content in Markdown after the frontmatter.

## 📚 Markdown Features Supported

### Headings
```markdown
# Heading 1
## Heading 2
### Heading 3
```

### Text Formatting
```markdown
**Bold text**
*Italic text*
~~Strikethrough~~
`inline code`
```

### Links
```markdown
[Link text](https://example.com)
```

### Lists
```markdown
- Unordered list item
- Another item
  - Nested item

1. Ordered list item
2. Another item
```

### Code Blocks
````markdown
```javascript
function hello() {
  console.log("Hello, World!");
}
```

```php
<?php
function greet() {
    echo "Hello, World!";
}
```

```python
def hello():
    print("Hello, World!")
```
````

**Supported languages**: JavaScript, TypeScript, PHP, Python, HTML, CSS, Bash, JSON, YAML, SQL, and more!

### Blockquotes
```markdown
> This is a quote or callout
> spanning multiple lines
```

### Images (Optional)
```markdown
![Alt text](https://example.com/image.jpg)
```

### Tables
```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

## 🎨 Writing Tips

### 1. Clear Structure
- Start with an introduction
- Use headings to organize sections
- End with a conclusion or key takeaways

### 2. Code Examples
- Include practical, working code examples
- Add comments to explain complex parts
- Show both "bad" and "good" examples when explaining best practices

### 3. Keep It Readable
- Use short paragraphs (2-4 sentences)
- Include lists for easy scanning
- Highlight important points with **bold** or `code formatting`

### 4. SEO-Friendly
- Use descriptive titles
- Write clear excerpts
- Use relevant tags
- Include keywords naturally

## 📋 Blog Post Template

Copy this template for new posts:

```markdown
---
title: "Your Article Title"
slug: "your-article-slug"
date: "2024-03-15"
excerpt: "A compelling short description of your article that makes people want to read more."
tags: ["Tag1", "Tag2", "Tag3"]
featured: false
---

# Your Article Title

Brief introduction paragraph explaining what this article is about and why it matters.

## Main Topic 1

Content explaining the first main point...

```javascript
// Code example
const example = "code";
```

## Main Topic 2

Content explaining the second main point...

### Subtopic

More detailed information...

## Conclusion

Summary of key points and takeaways:
- Point 1
- Point 2
- Point 3

Final thoughts and call to action.
```

## 🏷️ Tag Guidelines

Use consistent, descriptive tags. Common tags:

**Languages:**
- JavaScript, TypeScript, PHP, Python, Go, Rust

**Frameworks/Libraries:**
- React, Vue, Laravel, Express, Next.js

**Concepts:**
- Backend, Frontend, Full Stack, Database, API

**Topics:**
- Best Practices, Tutorial, Guide, Tips, Tools

**Soft Skills:**
- Development, Productivity, Career

## ✅ Checklist Before Publishing

- [ ] Frontmatter is complete and valid
- [ ] Title is clear and descriptive
- [ ] Excerpt is compelling (1-2 sentences)
- [ ] Date is in YYYY-MM-DD format
- [ ] Tags are relevant and properly formatted
- [ ] Content is well-structured with headings
- [ ] Code examples are tested and work
- [ ] Spelling and grammar are correct
- [ ] Links open in new tabs (automatically handled)

## 🔄 How It Works

1. **You create** a `.md` file in this directory
2. **Vite** automatically detects the new file
3. **gray-matter** parses the frontmatter
4. **Blog data loader** (`src/data/blog.js`) processes all posts
5. **Blog component** displays your post automatically!

No manual registration needed! ✨

## 📖 Examples

Check out the existing blog posts in this directory:
- `laravel-best-practices.md` - Code-heavy, featured post
- `react-custom-hooks.md` - Multiple examples, featured
- `git-workflow-tips.md` - Tips & cheatsheet format

## 🐛 Troubleshooting

**Post not appearing?**
- Check frontmatter syntax (must have opening and closing `---`)
- Verify all required fields are present
- Check for YAML syntax errors (proper quotes, indentation)
- Restart dev server if hot reload fails

**Code highlighting not working?**
- Specify language after opening backticks: ` ```javascript `
- Check if language is supported by highlight.js

**Date not formatting correctly?**
- Use YYYY-MM-DD format: `"2024-03-15"`
- Avoid other formats like DD/MM/YYYY or MM-DD-YYYY

---

Happy writing! 🚀 If you need help, check the existing posts for examples.

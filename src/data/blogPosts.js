/**
 * Temporary simplified blog data without glob imports
 * Manual data structure for testing
 */

export const posts = [
  {
    slug: "laravel-best-practices",
    title: "Laravel Best Practices: Writing Clean and Maintainable Code",
    date: "2024-03-15",
    excerpt: "Essential best practices for building scalable Laravel applications, from routing and controllers to database design and testing.",
    tags: ["Laravel", "PHP", "Best Practices", "Backend"],
    featured: true,
    content: `# Laravel Best Practices: Writing Clean and Maintainable Code

Laravel is a powerful PHP framework that makes web development enjoyable and efficient. However, as your application grows, maintaining clean and scalable code becomes crucial.

## 1. Follow Single Responsibility Principle

Each class should have one, and only one, reason to change. Keep your controllers thin and move business logic to services or actions.

\`\`\`php
// ✅ Good: Thin controller with service
class OrderController extends Controller
{
    public function store(StoreOrderRequest $request, OrderService $orderService)
    {
        $order = $orderService->createOrder($request->validated());
        return response()->json($order);
    }
}
\`\`\`

## 2. Use Form Requests for Validation

Keep your controllers clean by moving validation logic to dedicated Form Request classes.

## Conclusion

These best practices have helped me build maintainable Laravel applications that scale well.`,
    readingTime: 6
  },
  {
    slug: "react-custom-hooks",
    title: "Building Reusable React Custom Hooks",
    date: "2024-02-20",
    excerpt: "Learn how to create powerful custom hooks to share logic across your React components and keep your code DRY.",
    tags: ["React", "JavaScript", "Frontend", "Hooks"],
    featured: true,
    content: `# Building Reusable React Custom Hooks

Custom hooks are one of React's most powerful features, allowing you to extract and reuse stateful logic across components.

## Example: useFetch Hook

\`\`\`javascript
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch logic here
  }, [url]);

  return { data, loading, error };
}
\`\`\`

## Conclusion

Custom hooks are essential for writing clean, reusable React code.`,
    readingTime: 5
  },
  {
    slug: "git-workflow-tips",
    title: "Git Workflow Tips for Solo Developers",
    date: "2024-01-10",
    excerpt: "Practical Git workflows and best practices that make version control easier, even when working alone on projects.",
    tags: ["Git", "Development", "Tools", "Best Practices"],
    featured: false,
    content: `# Git Workflow Tips for Solo Developers

Even when working alone, good Git practices help you track changes, experiment safely, and maintain a clean project history.

## 1. Commit Often, Commit Early

Small, focused commits are easier to understand and revert if needed.

\`\`\`bash
# ✅ Good: Small, focused commits
git add src/auth/
git commit -m "Add user authentication logic"
\`\`\`

## Conclusion

Good Git habits make development smoother, even when working solo.`,
    readingTime: 4
  }
];

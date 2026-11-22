---
title: "Building Reusable React Custom Hooks"
slug: "react-custom-hooks"
date: "2024-02-20"
excerpt: "Learn how to create powerful custom hooks to share logic across your React components and keep your code DRY."
tags: ["React", "JavaScript", "Frontend", "Hooks"]
featured: true
---

# Building Reusable React Custom Hooks

Custom hooks are one of React's most powerful features, allowing you to extract and reuse stateful logic across components. Let's explore how to build effective custom hooks.

## What Are Custom Hooks?

Custom hooks are JavaScript functions that use React hooks and follow the naming convention of starting with "use". They let you extract component logic into reusable functions.

## Example 1: useFetch Hook

A common pattern is fetching data from an API. Let's create a reusable hook for this:

```javascript
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

## Example 2: useLocalStorage Hook

Persist state in localStorage with this hook:

```javascript
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// Usage
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Current theme: {theme}
    </button>
  );
}
```

## Example 3: useDebounce Hook

Debounce values to optimize performance, especially useful for search inputs:

```javascript
import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up the timeout
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if value changes before delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // API call happens only after user stops typing for 500ms
      searchAPI(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

## Example 4: useToggle Hook

A simple but useful hook for boolean state:

```javascript
import { useState, useCallback } from 'react';

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  return [value, toggle];
}

// Usage
function Modal() {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <>
      <button onClick={toggleOpen}>Open Modal</button>
      {isOpen && (
        <div className="modal">
          <h2>Modal Content</h2>
          <button onClick={toggleOpen}>Close</button>
        </div>
      )}
    </>
  );
}
```

## Example 5: useWindowSize Hook

Track window dimensions for responsive behavior:

```javascript
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// Usage
function ResponsiveComponent() {
  const { width } = useWindowSize();

  return (
    <div>
      {width < 768 ? (
        <MobileView />
      ) : (
        <DesktopView />
      )}
    </div>
  );
}
```

## Best Practices for Custom Hooks

### 1. Always Start with "use"
This naming convention allows React to automatically check for rule violations.

### 2. Keep Hooks Focused
Each hook should do one thing well. Don't create monolithic hooks that do everything.

### 3. Return Values Consistently
Return arrays for simple state (like `useState`), objects for multiple related values.

```javascript
// Good for simple state
const [value, setValue] = useToggle();

// Good for multiple related values
const { data, loading, error } = useFetch(url);
```

### 4. Handle Cleanup
Always clean up side effects in `useEffect` to prevent memory leaks.

### 5. Document Your Hooks
Add JSDoc comments to explain what your hook does, its parameters, and return values.

```javascript
/**
 * Custom hook to fetch data from an API
 * @param {string} url - The API endpoint to fetch from
 * @returns {Object} Object containing data, loading state, and error
 */
function useFetch(url) {
  // ... implementation
}
```

## Conclusion

Custom hooks are essential for writing clean, reusable React code. They allow you to:

- Extract and share stateful logic
- Keep components focused on rendering
- Make your code more testable
- Reduce code duplication

Start building your own custom hooks library and watch your React code become more maintainable and elegant!

**Resources:**
- [React Hooks Documentation](https://react.dev/reference/react)
- [usehooks.com](https://usehooks.com) - Collection of useful hooks
- [ahooks](https://ahooks.js.org/) - High-quality hooks library

Happy coding! 🚀

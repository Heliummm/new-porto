import { useCallback, useEffect, useState } from "react";

/**
 * Theme manager — dark (default) & light.
 * - Preferensi tersimpan di localStorage("theme")
 * - Class "light" di <html> memicu palet terang (lihat index.css)
 * - Meta theme-color ikut diperbarui agar UI browser menyatu
 */
export function useTheme() {
  const [theme, setTheme] = useState(() =>
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("light")
      ? "light"
      : "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage tidak tersedia — abaikan */
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#fafafa" : "#0a0a0c");
  }, [theme]);

  const toggle = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    []
  );

  return [theme, toggle];
}

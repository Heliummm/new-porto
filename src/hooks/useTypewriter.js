import { useEffect, useState } from "react";

/**
 * Typewriter effect untuk rotating roles.
 * Menghormati prefers-reduced-motion (langsung menampilkan kata pertama).
 */
export function useTypewriter(
  words,
  { typeSpeed = 75, deleteSpeed = 38, pause = 2000 } = {}
) {
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion || words.length === 0) return;
    const word = words[index % words.length];
    let timeout;

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () =>
          setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? deleteSpeed : typeSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause, reducedMotion]);

  if (reducedMotion) return words[0] ?? "";
  return text;
}

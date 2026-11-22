/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Warna semantik via CSS variables — mendukung dark (default) & light mode.
        // Nilai variabel ada di src/index.css (:root & html.light).
        base: "rgb(var(--c-base-rgb) / <alpha-value>)",
        surface: "rgb(var(--c-surface-rgb) / <alpha-value>)",
        card: "rgb(var(--c-card-rgb) / <alpha-value>)",
        raised: "rgb(var(--c-raised-rgb) / <alpha-value>)",
      },
      fontFamily: {
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      boxShadow: {
        glow: "0 0 120px -30px rgba(52, 211, 153, 0.18)",
        "glow-sm": "0 0 60px -20px rgba(52, 211, 153, 0.14)",
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        scan: "scan 3.4s ease-in-out infinite",
        qr: "qr 5s linear infinite",
        marquee: "marquee 36s linear infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
        draw: "draw 4.5s ease-in-out infinite",
        toast: "toast 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scan: {
          "0%, 100%": { top: "14%" },
          "50%": { top: "78%" },
        },
        qr: {
          "0%": { width: "100%" },
          "90%": { width: "8%" },
          "100%": { width: "100%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.15", transform: "scale(0.8)" },
          "50%": { opacity: "0.9", transform: "scale(1.2)" },
        },
        draw: {
          "0%": { strokeDashoffset: "420" },
          "45%": { strokeDashoffset: "0" },
          "75%": { strokeDashoffset: "0" },
          "100%": { strokeDashoffset: "-420" },
        },
        toast: {
          "0%, 10%": { opacity: "0", transform: "translateX(14px)" },
          "20%, 75%": { opacity: "1", transform: "translateX(0)" },
          "90%, 100%": { opacity: "0", transform: "translateX(14px)" },
        },
      },
    },
  },
  plugins: [],
};

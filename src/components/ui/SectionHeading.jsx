import { motion } from "framer-motion";
import Reveal from "./Reveal";

/**
 * Heading section yang konsisten: kicker mono, judul besar, deskripsi opsional.
 * Garis aksen menggambar dirinya saat masuk viewport.
 */
export default function SectionHeading({ kicker, title, description, align = "left" }) {
  const alignment =
    align === "center" ? "mx-auto text-center items-center" : "text-left items-start";

  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {kicker && (
        <span className="font-mono text-sm tracking-wide text-emerald-400">
          {"// "}
          {kicker}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-zinc-400">{description}</p>
      )}
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mt-1 h-px w-16 origin-left bg-gradient-to-r from-emerald-400/70 to-transparent"
      />
    </Reveal>
  );
}

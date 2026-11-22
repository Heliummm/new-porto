import { useState } from "react";
import { AlertCircle, Check, CheckCircle2, Copy, Github, Linkedin, Mail, Send } from "lucide-react";
import { siteConfig } from "../config/site";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

const inputClasses =
  "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-200 focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20";

function Field({ label, htmlFor, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </label>
      {children}
      {error && (
        <span role="alert" className="flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle size={12} /> {error}
        </span>
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | mailto | activating | success | error
  const [slowHint, setSlowHint] = useState(false);
  const [mailtoHref, setMailtoHref] = useState("");
  const [copied, setCopied] = useState(false);

  // Tampilkan hint "masih mengirim" bila layanan lambat (>6 detik)
  const startSlowWatch = () => {
    setSlowHint(false);
    return setTimeout(() => setSlowHint(true), 6000);
  };

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((err) => ({ ...err, [key]: undefined }));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard tidak tersedia — biarkan tombol diam, bukan error */
    }
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Please enter a valid email address.";
    if (!form.subject.trim()) next.subject = "Please enter a subject.";
    if (!form.message.trim()) next.message = "Please write your message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Pengiriman via FormSubmit (gratis, tanpa login) — dipakai langsung
  // atau sebagai fallback otomatis bila endpoint utama gagal.
  const sendViaFormSubmit = async () => {
    const watch = startSlowWatch();
    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${siteConfig.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          _subject: `[Portfolio] ${form.subject}`,
          _template: "table",
          _captcha: "false",
          _replyto: form.email,
          message: form.message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      const ok = res.ok && String(data.success).toLowerCase() === "true";
      const serviceMessage = typeof data.message === "string" ? data.message : "";

      if (/activat|confirm/i.test(serviceMessage)) {
        setStatus("activating");
        return;
      }
      if (!ok) throw new Error(serviceMessage || "Send failed");

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } finally {
      clearTimeout(watch);
      setSlowHint(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const { endpoint, web3formsKey, useFormSubmit, gasEndpoint } = siteConfig.contactForm;

    // Opsi A — Google Apps Script (paling cepat & gratis, pakai Gmail sendiri).
    // POST text/plain agar tidak memicu CORS preflight (GAS tidak support OPTIONS).
    // Bila gagal (mis. deployment belum public/"Anyone"), otomatis fallback
    // ke FormSubmit supaya pengunjung tetap bisa mengirim.
    if (gasEndpoint) {
      const watch = startSlowWatch();
      setStatus("sending");
      try {
        const res = await fetch(gasEndpoint, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.success !== true) throw new Error("Endpoint rejected");
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } catch {
        try {
          await sendViaFormSubmit();
        } catch {
          setStatus("error");
        }
      } finally {
        clearTimeout(watch);
        setSlowHint(false);
      }
      return;
    }

    // Opsi B — endpoint form custom (Formspree, Getform, Basin, dsb.)
    if (endpoint) {
      const watch = startSlowWatch();
      setStatus("sending");
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Request failed");
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } catch {
        setStatus("error");
      } finally {
        clearTimeout(watch);
        setSlowHint(false);
      }
      return;
    }

    // Opsi C — Web3Forms (butuh access key dari web3forms.com)
    if (web3formsKey) {
      const watch = startSlowWatch();
      setStatus("sending");
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: web3formsKey,
            subject: `[Portfolio] ${form.subject}`,
            from_name: `${form.name} (via portfolio)`,
            name: form.name,
            email: form.email,
            message: form.message,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.success === false) throw new Error("Send failed");
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } catch {
        setStatus("error");
      } finally {
        clearTimeout(watch);
        setSlowHint(false);
      }
      return;
    }

    // Opsi D — FormSubmit: dipakai langsung (atau sebagai fallback otomatis
    // dari opsi A di atas). Server gratisnya lambat, tapi selalu berfungsi.
    if (useFormSubmit) {
      try {
        await sendViaFormSubmit();
      } catch {
        setStatus("error");
      }
      return;
    }

    // Fallback — buka aplikasi email pengunjung dengan pesan terisi.
    const body = encodeURIComponent(
      `Hi Daffa,\n\n${form.message}\n\n— ${form.name} (${form.email})`
    );
    const subject = encodeURIComponent(form.subject);
    const href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setMailtoHref(href);
    window.location.href = href;
    setStatus("mailto");
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      action: "copy",
    },
    {
      icon: Github,
      label: "GitHub",
      value: siteConfig.socials.github.replace("https://", ""),
      href: siteConfig.socials.github,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: siteConfig.socials.linkedin.replace("https://www.", ""),
      href: siteConfig.socials.linkedin,
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/[0.05] py-24 sm:py-32">
      {/* Background */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid mask-radial opacity-60" />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 h-[380px] w-[640px] -translate-x-1/2 rounded-full bg-emerald-500/[0.05] blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left — info */}
          <div className="flex flex-col gap-8">
            <SectionHeading
              kicker="contact"
              title="Let's Build Something Great."
              description="I'm open to opportunities, collaborations, and interesting projects in web development."
            />

            <Reveal delay={0.1} className="flex flex-col gap-3">
              {contactMethods.map(({ icon: Icon, label, value, href, action }) => (
                <div
                  key={label}
                  className="group flex items-center gap-4 rounded-xl border border-white/[0.07] bg-card px-5 py-4 transition-all duration-300 hover:border-emerald-400/25"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-emerald-300">
                    <Icon size={17} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                      {label}
                    </p>
                    <a
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="block truncate text-sm font-medium text-zinc-200 transition-colors hover:text-emerald-300"
                    >
                      {value}
                    </a>
                  </div>
                  {action === "copy" && (
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label="Copy email address"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-zinc-500 transition-all hover:border-emerald-400/40 hover:text-emerald-300"
                    >
                      {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                    </button>
                  )}
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.15}>
              <p className="font-mono text-xs leading-relaxed text-zinc-600">
                {"// Usually replies within 1–2 business days."}
              </p>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal delay={0.15}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5 rounded-2xl border border-white/[0.07] bg-card p-6 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Send a Message</h3>
                <span className="font-mono text-[10px] text-zinc-600">POST /message</span>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" htmlFor="name" error={errors.name}>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={set("name")}
                    className={inputClasses}
                  />
                </Field>
                <Field label="Email" htmlFor="email" error={errors.email}>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={set("email")}
                    className={inputClasses}
                  />
                </Field>
              </div>

              <Field label="Subject" htmlFor="subject" error={errors.subject}>
                <input
                  id="subject"
                  type="text"
                  placeholder="What is this about?"
                  value={form.subject}
                  onChange={set("subject")}
                  className={inputClasses}
                />
              </Field>

              <Field label="Message" htmlFor="message" error={errors.message}>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  onChange={set("message")}
                  className={`${inputClasses} resize-none`}
                />
              </Field>

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:bg-zinc-200 hover:shadow-[0_10px_30px_-12px_rgba(255,255,255,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-400 border-t-zinc-900" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={15} />
                  </>
                )}
              </button>

              {/* Hint jujur saat layanan lambat */}
              {status === "sending" && slowHint && (
                <p className="flex items-center justify-center gap-2 text-center font-mono text-[11px] text-zinc-500">
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-zinc-600 border-t-zinc-300" />
                  still sending… free email services can take up to ±1 minute
                </p>
              )}

              {/* Status messages — jujur, tanpa simulasi pengiriman palsu */}
              {status === "mailto" && (
                <div
                  role="status"
                  className="flex flex-col gap-3 rounded-xl border border-sky-400/20 bg-sky-400/[0.06] px-4 py-3.5 text-xs leading-relaxed text-sky-100/90"
                >
                  <span className="flex items-start gap-2">
                    <Info size={14} className="mt-0.5 shrink-0 text-sky-300" />
                    Aplikasi email kamu seharusnya terbuka dengan pesan yang sudah
                    terisi — tinggal tekan send. Kalau tidak terbuka otomatis, klik
                    tombol di bawah atau kirim langsung ke:
                  </span>
                  <span className="flex flex-wrap items-center gap-2 pl-6">
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1.5 font-semibold text-sky-100 transition-colors hover:bg-sky-400/20"
                    >
                      <Mail size={12} /> Open Email App
                    </a>
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 font-mono text-[11px] text-zinc-300 transition-colors hover:border-emerald-400/40 hover:text-emerald-200"
                    >
                      {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      {copied ? "Copied!" : siteConfig.email}
                    </button>
                  </span>
                </div>
              )}
              {status === "activating" && (
                <div
                  role="status"
                  className="flex items-start gap-2 rounded-xl border border-amber-400/25 bg-amber-400/[0.07] px-4 py-3.5 text-xs leading-relaxed text-amber-100"
                >
                  <Info size={14} className="mt-0.5 shrink-0 text-amber-300" />
                  <span>
                    Pesan kamu sudah masuk antrean. FormSubmit mengirim{" "}
                    <strong>email konfirmasi satu kali</strong> ke{" "}
                    <span className="font-mono">{siteConfig.email}</span> — klik
                    tombol <em>Activate Form</em> di email tersebut sekali saja,
                    setelah itu semua pesan berikutnya langsung masuk inbox.
                  </span>
                </div>
              )}
              {status === "success" && (
                <p role="status" className="flex items-start gap-2 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.07] px-4 py-3 text-xs leading-relaxed text-emerald-100">
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-400" />
                  Message sent successfully. Thank you — I&apos;ll get back to you soon!
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-400/25 bg-red-400/[0.07] px-4 py-3 text-xs leading-relaxed text-red-200">
                  <AlertCircle size={14} className="mt-0.5 shrink-0 text-red-400" />
                  Something went wrong while sending. Please try again, or reach me directly by email.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* Icon yang dipakai di status message */
function Info({ size = 14, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

import { useState, useEffect } from "react";
import { X, FileText, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "../config/site";

/**
 * Development-only reminder for CV setup
 * Shows when CV is still using placeholder (cv.html)
 * Only visible in development mode
 */
export default function DevSetupReminder() {
  const [dismissed, setDismissed] = useState(false);
  const isDev = import.meta.env.DEV;
  const isPlaceholder = siteConfig.cvUrl.includes("cv.html");

  useEffect(() => {
    // Check if user has previously dismissed this session
    const wasDismissed = sessionStorage.getItem("cvReminderDismissed");
    if (wasDismissed) {
      setDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("cvReminderDismissed", "true");
  };

  // Only show in development AND when using placeholder
  if (!isDev || !isPlaceholder || dismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-6 right-6 z-[100] max-w-sm"
      >
        <div className="rounded-xl border border-amber-500/20 bg-amber-950/90 p-4 shadow-xl backdrop-blur-sm">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute right-2 top-2 rounded-lg p-1 text-amber-400/60 transition-colors hover:bg-amber-900/50 hover:text-amber-300"
            aria-label="Dismiss reminder"
          >
            <X size={16} />
          </button>

          {/* Icon */}
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
              <FileText size={18} className="text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-amber-200">
                CV Setup Reminder
              </h3>
              <p className="text-xs text-amber-400/70">Development Mode</p>
            </div>
          </div>

          {/* Message */}
          <p className="mb-3 text-xs leading-relaxed text-amber-200/80">
            You're using the <code className="rounded bg-amber-900/40 px-1 py-0.5">cv.html</code> placeholder.
            Replace it with your real PDF before going live!
          </p>

          {/* Action */}
          <a
            href="/README-CV-SETUP.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/15 px-3 py-1.5 text-xs font-medium text-amber-300 transition-colors hover:bg-amber-500/25"
          >
            Setup Instructions
            <ExternalLink size={12} />
          </a>

          {/* Quick steps */}
          <div className="mt-3 space-y-1 border-t border-amber-500/10 pt-3">
            <p className="text-[10px] font-medium uppercase tracking-wider text-amber-400/50">
              Quick Steps:
            </p>
            <ol className="space-y-0.5 text-[11px] leading-relaxed text-amber-200/70">
              <li>1. Place PDF in <code className="text-amber-300/80">/public</code></li>
              <li>2. Update <code className="text-amber-300/80">cvUrl</code> in <code className="text-amber-300/80">site.js</code></li>
              <li>3. Test download button</li>
            </ol>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

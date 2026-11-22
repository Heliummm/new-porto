import { useId } from "react";
import {
  BarChart3,
  Check,
  Clock,
  CreditCard,
  Home,
  Package,
  QrCode,
  RefreshCw,
  Settings,
  ClipboardList,
  Wallet,
} from "lucide-react";

/**
 * Elegan UI concept mockup — murni dibangun dengan HTML/CSS/SVG.
 * Ini adalah PLACEHOLDER visual, bukan screenshot aplikasi asli
 * (selalu aria-hidden untuk aksesibilitas).
 */

function BrowserFrame({ url, children }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0e]"
    >
      {/* Browser chrome */}
      <div className="flex shrink-0 items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-zinc-700" />
        <span className="h-2 w-2 rounded-full bg-zinc-700" />
        <span className="h-2 w-2 rounded-full bg-zinc-700" />
        <span className="ml-1.5 flex-1 truncate rounded bg-black/40 px-2 py-0.5 font-mono text-[9px] text-zinc-500">
          {url}
        </span>
      </div>
      <div className="min-h-0 flex-1 p-3">{children}</div>
    </div>
  );
}

/* ---------------- Inventory (SPPG) ---------------- */
function InventoryMockup() {
  const rows = [
    { name: "Beras Premium", pct: "78%", color: "bg-emerald-400/80", date: "2026-08-12", dateColor: "text-emerald-300" },
    { name: "Minyak Goreng", pct: "54%", color: "bg-emerald-400/70", date: "2026-06-30", dateColor: "text-emerald-300" },
    { name: "Telur Ayam", pct: "32%", color: "bg-amber-400/80", date: "2026-05-02", dateColor: "text-amber-300" },
    { name: "Tepung Terigu", pct: "14%", color: "bg-red-400/80", date: "2026-04-18", dateColor: "text-red-300" },
  ];
  return (
    <div className="flex h-full gap-2.5">
      {/* Sidebar */}
      <div className="hidden w-11 shrink-0 flex-col gap-1.5 sm:flex">
        {[Home, Package, ClipboardList, BarChart3, Settings].map((Icon, i) => (
          <div
            key={i}
            className={`flex h-7 items-center justify-center rounded-md ${
              i === 1 ? "bg-emerald-400/15 text-emerald-300" : "bg-white/[0.04] text-zinc-600"
            }`}
          >
            <Icon size={11} />
          </div>
        ))}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex shrink-0 items-center justify-between">
          <div className="h-2 w-24 rounded bg-zinc-600/70" />
          <span className="rounded border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 font-mono text-[8px] font-semibold text-emerald-300">
            FEFO
          </span>
        </div>

        {/* Stats */}
        <div className="grid shrink-0 grid-cols-3 gap-1.5">
          {[
            { label: "ITEMS", value: "128", pct: "80%" },
            { label: "EXPIRING", value: "9", pct: "45%" },
            { label: "LOW STOCK", value: "6", pct: "30%" },
          ].map((s, i) => (
            <div key={i} className="rounded-md border border-white/[0.06] bg-black/30 p-1.5">
              <div className="font-mono text-[7px] tracking-wider text-zinc-600">{s.label}</div>
              <div className="mt-0.5 font-mono text-[13px] font-bold text-white">{s.value}</div>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className={`h-full rounded-full ${
                    i === 0 ? "bg-emerald-400/80" : i === 1 ? "bg-amber-400/70" : "bg-red-400/70"
                  }`}
                  style={{ width: s.pct }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden rounded-lg border border-white/[0.06] bg-black/30 p-2">
          {rows.map((r, i) => (
            <div key={i} className="flex min-h-0 flex-1 items-center gap-2 overflow-hidden">
              <div className="w-16 truncate text-[9px] font-medium text-zinc-300 sm:w-20">{r.name}</div>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div className={`h-full rounded-full ${r.color}`} style={{ width: r.pct }} />
              </div>
              <div className={`w-12 shrink-0 text-right font-mono text-[7.5px] ${r.dateColor}`}>
                {r.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Analytics (Gold Monitor Pro) ---------------- */
function AnalyticsMockup() {
  const gradientId = useId();
  return (
    <div className="flex h-full flex-col gap-2">
      {/* Timeframe tabs + price */}
      <div className="flex items-center gap-1">
        {["15m", "1h", "4h", "1D"].map((t, i) => (
          <span
            key={t}
            className={`rounded px-1.5 py-0.5 font-mono text-[8px] font-semibold ${
              i === 2
                ? "bg-emerald-400/15 text-emerald-300"
                : "bg-white/[0.04] text-zinc-600"
            }`}
          >
            {t}
          </span>
        ))}
        <span className="ml-auto font-mono text-[10px] font-semibold text-emerald-300">
          2,985.40
        </span>
        <span className="font-mono text-[8px] text-emerald-400/80">+0.84%</span>
      </div>

      {/* Chart */}
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg border border-white/[0.06] bg-black/30 p-2">
        <svg viewBox="0 0 300 110" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[22, 48, 74, 100].map((y) => (
            <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          ))}
          <path
            d="M0,88 L25,76 L50,82 L75,60 L100,68 L125,48 L150,58 L175,38 L200,50 L225,28 L250,40 L275,18 L300,26 L300,110 L0,110 Z"
            fill={`url(#${gradientId})`}
          />
          <polyline
            points="0,88 25,76 50,82 75,60 100,68 125,48 150,58 175,38 200,50 225,28 250,40 275,18 300,26"
            fill="none"
            stroke="#34d399"
            strokeWidth="1.6"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeDasharray="420"
            className="animate-draw"
          />
          <line x1="0" y1="52" x2="300" y2="52" stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.6" />
          <circle cx="275" cy="18" r="2.5" fill="#34d399" />
        </svg>
        <span className="absolute right-2 top-2 rounded border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 font-mono text-[8px] font-semibold text-emerald-300">
          SIGNAL: LONG
        </span>
      </div>

      {/* Bottom cards */}
      <div className="grid shrink-0 grid-cols-3 gap-1.5">
        <div className="rounded-md border border-white/[0.06] bg-black/30 p-1.5">
          <div className="font-mono text-[7px] tracking-wider text-zinc-600">XAU/USD · 4H</div>
          <div className="mt-0.5 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-[9px] font-bold text-emerald-300">BUY</span>
          </div>
        </div>
        <div className="rounded-md border border-white/[0.06] bg-black/30 p-1.5">
          <div className="font-mono text-[7px] tracking-wider text-zinc-600">RSI · 54.2</div>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
            <div className="h-full w-[54%] rounded-full bg-emerald-400/80" />
          </div>
        </div>
        <div className="rounded-md border border-white/[0.06] bg-black/30 p-1.5">
          <div className="font-mono text-[7px] tracking-wider text-zinc-600">JOURNAL</div>
          <div className="mt-0.5 space-y-0.5">
            <div className="h-1 w-full rounded bg-white/10" />
            <div className="h-1 w-2/3 rounded bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Face Recognition ---------------- */
function FaceMockup() {
  return (
    <div className="grid h-full grid-cols-[1.15fr_1fr] gap-2.5">
      {/* Camera view */}
      <div className="relative flex min-h-0 items-center justify-center overflow-hidden rounded-lg border border-white/[0.06] bg-black/40">
        {/* Corner brackets */}
        <span className="absolute left-2.5 top-2.5 h-4 w-4 rounded-tl-sm border-l-2 border-t-2 border-emerald-400/70" />
        <span className="absolute right-2.5 top-2.5 h-4 w-4 rounded-tr-sm border-r-2 border-t-2 border-emerald-400/70" />
        <span className="absolute bottom-2.5 left-2.5 h-4 w-4 rounded-bl-sm border-b-2 border-l-2 border-emerald-400/70" />
        <span className="absolute bottom-2.5 right-2.5 h-4 w-4 rounded-br-sm border-b-2 border-r-2 border-emerald-400/70" />

        {/* Face silhouette */}
        <div className="flex flex-col items-center gap-1">
          <div className="h-9 w-9 rounded-full border border-emerald-300/40 bg-emerald-400/10" />
          <div className="h-7 w-12 rounded-[45%] border border-emerald-300/30 bg-emerald-400/[0.07]" />
        </div>

        {/* Scan line */}
        <div className="absolute left-8 right-8 h-[2px] animate-scan bg-emerald-300/70 shadow-[0_0_14px_rgba(52,211,153,0.9)]" />

        {/* Recognition chip */}
        <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-emerald-400/30 bg-black/70 px-2 py-0.5 backdrop-blur">
          <Check size={8} className="text-emerald-400" />
          <span className="font-mono text-[8px] font-semibold text-emerald-300">
            Daffa · 09:41
          </span>
        </div>
      </div>

      {/* Attendance list */}
      <div className="flex min-h-0 flex-col gap-1.5">
        <div className="flex shrink-0 items-center justify-between px-0.5">
          <span className="font-mono text-[8px] font-semibold tracking-wider text-zinc-500">
            TODAY&apos;S ATTENDANCE
          </span>
          <span className="rounded bg-emerald-400/10 px-1.5 font-mono text-[7px] text-emerald-300">
            24 PRESENT
          </span>
        </div>
        {[
          { n: "Aisyah", t: "07:58" },
          { n: "Budi", t: "08:02" },
          { n: "Citra", t: "08:15" },
          { n: "Eka", t: "08:31" },
        ].map((r, i) => (
          <div
            key={i}
            className="flex min-h-0 flex-1 items-center gap-2 overflow-hidden rounded-md border border-white/[0.05] bg-black/30 px-2"
          >
            <span className="h-4 w-4 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800" />
            <span className="flex-1 text-[9px] font-medium text-zinc-300">{r.n}</span>
            <span className="font-mono text-[7.5px] text-zinc-500">{r.t}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- E-commerce (OMG.ID) ---------------- */
function EcommerceMockup() {
  return (
    <div className="flex h-full flex-col gap-2">
      {/* Top bar */}
      <div className="flex items-center gap-2">
        <span className="rounded bg-white px-1.5 py-0.5 text-[9px] font-extrabold tracking-tight text-zinc-900">
          OMG<span className="text-emerald-500">.ID</span>
        </span>
        <div className="hidden gap-1 sm:flex">
          {["Products", "Top Up", "Orders"].map((t, i) => (
            <span
              key={t}
              className={`rounded px-1.5 py-0.5 text-[8px] ${
                i === 0 ? "bg-white/[0.07] text-zinc-200" : "text-zinc-600"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
        <span className="ml-auto flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[7.5px] text-zinc-400">
          <span className="relative flex h-1 w-1">
            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative h-1 w-1 rounded-full bg-emerald-400" />
          </span>
          NOTIFICATIONS
        </span>
      </div>

      {/* Product grid */}
      <div className="grid min-h-0 flex-1 grid-cols-3 gap-1.5">
        {["Diamond ML", "Pulsa 25K", "Voucher Game"].map((p, i) => (
          <div key={i} className="flex flex-col gap-1 rounded-md border border-white/[0.06] bg-black/30 p-1.5">
            <div className="flex flex-1 items-center justify-center rounded bg-zinc-800/60">
              <Package size={12} className="text-zinc-600" />
            </div>
            <div className="h-1 w-3/4 rounded bg-zinc-700" />
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] font-bold text-emerald-300">
                {["Rp 19K", "Rp 26K", "Rp 12K"][i]}
              </span>
              <span className="h-3 w-5 rounded-sm bg-white/15" />
            </div>
          </div>
        ))}
      </div>

      {/* Payments */}
      <div className="flex shrink-0 items-center gap-1.5">
        {[
          { icon: CreditCard, label: "Bank Transfer" },
          { icon: Wallet, label: "E-Wallet" },
          { icon: QrCode, label: "QRIS" },
        ].map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="flex items-center gap-1 rounded-md border border-white/[0.07] bg-white/[0.03] px-1.5 py-1 text-[7.5px] font-medium text-zinc-400"
          >
            <Icon size={8} />
            {label}
          </span>
        ))}
        <span className="ml-auto flex animate-toast items-center gap-1 rounded-md border border-emerald-400/25 bg-emerald-400/10 px-1.5 py-1 text-[7.5px] font-semibold text-emerald-300">
          <Check size={8} /> Payment received
        </span>
      </div>
    </div>
  );
}

/* ---------------- Instructor QR Attendance ---------------- */
function InstructorMockup() {
  // Pola QR dekoratif (statis, aria-hidden) — merepresentasikan QR berotasi
  const qrDots = [
    [40, 10], [50, 18], [40, 26], [58, 8], [66, 20], [36, 40], [46, 44],
    [56, 38], [66, 48], [40, 56], [52, 62], [64, 56], [10, 40], [20, 48],
    [12, 56], [82, 40], [90, 52], [80, 62], [36, 80], [48, 86], [60, 82],
    [74, 88], [86, 82], [26, 82],
  ];
  const staff = [
    { name: "Andi · Dosen", time: "07:52", status: "HADIR", ok: true },
    { name: "Rina · Instruktur", time: "08:12", status: "TERLAMBAT", ok: false, late: true },
    { name: "Bagas · Asdos", time: null, status: "BELUM ABSEN", ok: false, late: false },
  ];
  return (
    <div className="flex h-full flex-col gap-2">
      {/* Header: jadwal + status jendela absen */}
      <div className="flex shrink-0 items-center gap-1.5">
        <span className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[8px] font-semibold text-zinc-300">
          TIF201
        </span>
        <span className="truncate font-mono text-[8px] text-zinc-500">Rabu · 08:00–09:30</span>
        <span className="ml-auto flex items-center gap-1 rounded border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 font-mono text-[7.5px] font-semibold text-emerald-300">
          <span className="relative flex h-1 w-1">
            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative h-1 w-1 rounded-full bg-emerald-400" />
          </span>
          ABSEN AKTIF
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[0.85fr_1.15fr] gap-2">
        {/* QR mahasiswa (berotasi) */}
        <div className="flex min-h-0 flex-col items-center justify-center gap-1.5 overflow-hidden rounded-lg border border-white/[0.06] bg-black/30 p-2">
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <svg viewBox="0 0 100 100" className="h-full max-h-[76px] w-auto" aria-hidden="true">
            {[[6, 6], [70, 6], [6, 70]].map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <rect x={x} y={y} width="24" height="24" rx="3" fill="#d4d4d8" />
                <rect x={x + 5} y={y + 5} width="14" height="14" rx="1.5" fill="#0b0b0e" />
                <rect x={x + 9.5} y={y + 9.5} width="5" height="5" fill="#d4d4d8" />
              </g>
            ))}
            {qrDots.map(([x, y], i) => (
              <rect
                key={i}
                x={x}
                y={y}
                width="5"
                height="5"
                rx="0.8"
                fill={i === 6 ? "#34d399" : "#71717a"}
              />
            ))}
          </svg>
          </div>
          <div className="flex w-full items-center justify-center gap-1">
            <RefreshCw size={8} className="animate-[spin_4s_linear_infinite] text-emerald-300" />
            <span className="font-mono text-[7.5px] text-zinc-500">QR PRIBADI · 20s</span>
          </div>
          {/* Countdown rotasi QR */}
          <div className="h-1 w-[78%] overflow-hidden rounded-full bg-white/[0.07]">
            <div className="h-full w-full animate-qr rounded-full bg-emerald-400/80" />
          </div>
        </div>

        {/* Live monitor */}
        <div className="flex min-h-0 flex-col gap-1 overflow-hidden rounded-lg border border-white/[0.06] bg-black/30 p-2">
          <div className="flex shrink-0 items-center justify-between px-0.5">
            <span className="font-mono text-[7px] tracking-wider text-zinc-500">
              LIVE MONITOR · PERTEMUAN 7
            </span>
            <span className="font-mono text-[7px] text-emerald-300">2/3 HADIR</span>
          </div>
          {staff.map((s) => (
            <div
              key={s.name}
              className="flex min-h-0 flex-1 items-center gap-1.5 rounded-md border border-white/[0.05] bg-white/[0.02] px-1.5 py-1"
            >
              <span className="h-4 w-4 shrink-0 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800" />
              <span className="flex-1 truncate text-[8.5px] font-medium text-zinc-300">
                {s.name}
              </span>
              {s.ok && (
                <span className="flex items-center gap-0.5 rounded border border-emerald-400/30 bg-emerald-400/10 px-1 py-0.5 font-mono text-[7px] font-semibold text-emerald-300">
                  <Check size={7} /> {s.time}
                </span>
              )}
              {s.late && (
                <span className="flex items-center gap-0.5 rounded border border-amber-400/30 bg-amber-400/10 px-1 py-0.5 font-mono text-[7px] font-semibold text-amber-300">
                  <Clock size={7} /> {s.time}
                </span>
              )}
              {!s.ok && !s.late && (
                <span className="flex items-center gap-1 rounded border border-white/10 bg-white/[0.04] px-1 py-0.5 font-mono text-[7px] text-zinc-400">
                  <span className="relative flex h-1 w-1">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-zinc-400 opacity-60" />
                    <span className="relative h-1 w-1 rounded-full bg-zinc-400" />
                  </span>
                  {s.status}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Legend status otomatis */}
      <div className="flex shrink-0 items-center gap-1.5">
        <span className="rounded border border-emerald-400/25 bg-emerald-400/[0.08] px-1.5 py-0.5 font-mono text-[7px] font-semibold text-emerald-300">
          TEPAT WAKTU
        </span>
        <span className="rounded border border-amber-400/25 bg-amber-400/[0.08] px-1.5 py-0.5 font-mono text-[7px] font-semibold text-amber-300">
          TERLAMBAT
        </span>
        <span className="rounded border border-white/10 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[7px] text-zinc-500">
          TIDAK ADA ABSENSI
        </span>
        <span className="ml-auto font-mono text-[7px] text-zinc-600">auto dari jadwal</span>
      </div>
    </div>
  );
}

const MOCKUPS = {
  inventory: { url: "sppg-inventory.app/dashboard", Component: InventoryMockup },
  analytics: { url: "gold-monitor-pro.app · XAU/USD", Component: AnalyticsMockup },
  face: { url: "face-attendance.local · live camera", Component: FaceMockup },
  ecommerce: { url: "omg.id — digital product store", Component: EcommerceMockup },
  instructor: { url: "absensi-pengajar.app · TIF201 — monitor", Component: InstructorMockup },
};

export default function ProjectMockup({ type }) {
  const mockup = MOCKUPS[type] ?? MOCKUPS.inventory;
  const { Component } = mockup;
  return (
    <BrowserFrame url={mockup.url}>
      <Component />
    </BrowserFrame>
  );
}

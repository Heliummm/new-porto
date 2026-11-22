/**
 * ============================================================
 *  CENTRAL SITE CONFIGURATION
 * ============================================================
 *  Semua data pribadi, link, dan pengaturan ada di file ini.
 *  Ubah nilai di sini tanpa perlu menyentuh komponen lain.
 *
 *  TODO (ganti sebelum dipakai melamar kerja):
 *  1. email          -> alamat email asli
 *  2. socials        -> URL GitHub & LinkedIn asli
 *  3. cvUrl          -> letakkan CV PDF di folder /public lalu isi nama filenya
 *  4. contactForm    -> isi endpoint (mis. Formspree) agar form kirim langsung
 * ============================================================
 */

export const siteConfig = {
  // Identity
  name: "Muhammad Daffa Aldyananta",
  firstName: "Daffa",
  logoText: "DAFFA",
  logoSuffix: ".DEV",
  role: "Full Stack Developer",

  // Hero
  kicker: "Hello, I am",
  typingRoles: [
    "Full Stack Developer",
    "Laravel Developer",
    "React Developer",
    "Python Developer",
  ],
  headline: "Building Digital Experiences Through Code.",
  heroDescription:
    "Full Stack Developer focused on building web applications, developing efficient systems, integrating APIs, and transforming ideas into functional digital solutions.",

  // Availability badge (set enabled: false untuk menyembunyikan)
  availability: {
    enabled: true,
    label: "Available for new opportunities",
  },

  // Contact
  email: "muahmmaddaffa391@gmail.com",

  socials: {
    github: "https://github.com/Heliummm",
    linkedin: "https://www.linkedin.com/in/muhammad-daffa-aldyananta-2424852b0",
  },

  // CV — file placeholder ada di /public/cv.html.
  // TODO: letakkan PDF asli (mis. /public/cv-daffa.pdf) lalu ubah nilai ini.
  cvUrl: "/cv Daffa Aldyananta.pdf",

  // Contact form — default memakai FormSubmit (formsubmit.co): gratis &
  // TANPA LOGIN, tapi server gratisnya lambat (bisa >20 detik per submit).
  //
  // ── REKOMENDASI: Google Apps Script (cepat ±2 dtk, gratis, pakai Gmailmu) ──
  //   1. Buka https://sheet.new (login Gmail biasa)
  //   2. Menu: Extensions → Apps Script → hapus kode bawaan, tempel script
  //      yang ada di README bagian "Contact form" (file README.md)
  //   3. Deploy → New deployment → tipe "Web app"
  //      - Execute as: Me
  //      - Who has access: Anyone  → Deploy → izinkan akses Gmail
  //   4. Copy Web app URL (diakhiri /exec) → tempel di gasEndpoint di bawah
  //   → Form otomatis pindah ke endpoint ini (lebih cepat & tanpa pihak ketiga).
  contactForm: {
    gasEndpoint:
      "https://script.google.com/macros/s/AKfycbzrSLJnAVHzx-3yPOsXAKQSb26oY0ZocHS85_xjMhJLwC5wl_LILtF45P4t4hJriTOc/exec",
    useFormSubmit: true, // fallback bila gasEndpoint bermasalah (karena sudah terisi, GAS yang dipakai)
    web3formsKey: "", // alternatif: access key web3forms.com (butuh login)
    endpoint: "", // alternatif: endpoint Formspree/Getform/Basin
  },
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/**
 * ============================================================
 *  PROJECT DATA
 * ============================================================
 *  Struktur data project — tambahkan project baru dengan
 *  membuat objek baru di array ini (mengikuti bentuk yang sama),
 *  maka card & halaman detail akan otomatis ter-generate.
 *
 *  - mockup       : tipe visual mockup ("inventory" | "analytics" |
 *                   "face" | "ecommerce") — placeholder elegan,
 *                   BUKAN screenshot aplikasi asli.
 *  - links        : isi github/demo dengan URL jika tersedia.
 *                   Kosongkan ("") untuk menyembunyikan tombolnya.
 *  - note         : catatan penting (mis. disclaimer) — opsional.
 *  - workContext  : penanda proyek dari pengalaman kerja — opsional.
 * ============================================================
 */

export const projects = [
  {
    id: "sppg-food-inventory",
    title: "SPPG Food Inventory Management System",
    tagline: "Stock & expiration control with the FEFO method",
    type: "Web Application",
    featured: true,
    thesisContext:
      "This system was developed as my undergraduate thesis (skripsi) project for the Information Systems program.",
    mockup: "inventory",
    description:
      "A web-based food ingredient inventory management system designed to manage stock, monitor expiration dates, and optimize inventory management using the FEFO (First Expired, First Out) method.",
    tech: ["Laravel", "PHP", "MySQL"],
    features: [
      "Inventory management",
      "FEFO-based stock management",
      "Expiration monitoring",
      "Minimum stock monitoring",
      "Inventory reports",
      "Activity log",
    ],
    overview:
      "A web-based food ingredient inventory management system built as my undergraduate thesis (skripsi) project, designed to bring order to kitchen stock operations. It manages ingredient stock in and out, keeps expiration dates visible at all times, and applies the FEFO (First Expired, First Out) method so items closest to expiry are always used first.",
    problem:
      "Tracking food ingredients manually makes it hard to know what is still available, what is running low, and — most critically — what is approaching its expiration date. Without a clear system, stock decisions become inconsistent and ingredients risk turning into waste.",
    solution:
      "A centralized inventory system developed with Laravel and MySQL. Every ingredient is recorded with its quantity and expiration date, stock movements are logged, and the FEFO method determines which stock should be used first. Minimum stock thresholds and activity logs keep operations transparent and auditable.",
    contribution: [
      "Developed the system end-to-end as my undergraduate thesis (skripsi) project: database design, backend logic with Laravel, and the web interface, including FEFO-based stock management and inventory reporting.",
    ],
    links: {
      github: "",
      demo: "",
    },
  },
  {
    id: "gold-monitor-pro",
    title: "Gold Monitor Pro",
    tagline: "Multi-timeframe market monitoring & paper trading journal",
    type: "Analytical Tool",
    featured: false,
    mockup: "analytics",
    description:
      "A personal gold market monitoring and analytical application designed to monitor market conditions, evaluate multi-timeframe signals, and maintain a paper trading journal.",
    tech: ["Python", "Data Analysis", "API Integration"],
    features: [
      "Multi-timeframe market monitoring",
      "Market signal analysis",
      "Price monitoring",
      "Signal journal",
      "Paper trade monitoring",
    ],
    overview:
      "A personal analytical application for monitoring the gold market. It continuously watches market conditions, evaluates signals across multiple timeframes, and keeps a paper trading journal so every observation and simulated trade can be reviewed in one place.",
    problem:
      "Watching the gold market across several timeframes manually is time-consuming and inconsistent. Without structured records, it is difficult to evaluate signals objectively or learn from past observations over time.",
    solution:
      "A Python-based desktop of tools that fetches price data through API integration, analyzes market conditions on multiple timeframes, and stores signals in a structured journal — including paper trades for monitoring decisions without real money involved.",
    contribution: [
      "Built the tool personally — from price data fetching through API integration, multi-timeframe analysis logic, to the signal and paper trading journal.",
    ],
    note: "Personal analytical monitoring tool — not a financial service and not an automated trading platform.",
    links: {
      github: "",
      demo: "",
    },
  },
  {
    id: "instructor-attendance-system",
    title: "Instructor Attendance System",
    tagline: "Schedule-driven QR attendance for lecturers, instructors & assistants",
    type: "Web Application",
    featured: false,
    mockup: "instructor",
    description:
      "A web-based attendance system for teaching staff — lecturers, instructors, and teaching assistants — where attendance is only validated by scanning a student's rotating personal QR code in class, running fully automatically based on the course schedule.",
    tech: ["Laravel", "PHP", "MySQL", "QR Code"],
    features: [
      "QR-based attendance via students' rotating personal QR",
      "Schedule-driven automation — no manual session open/close",
      "Automatic absence window & on-time/late detection",
      "Rotating QR with HMAC validation (anti screenshot/forward)",
      "Live class monitoring of recorded attendance",
      "Recap per meeting & configurable admin settings",
    ],
    overview:
      "A web-based attendance system for teaching staff built with Laravel and MySQL. Instead of manual roll calls or static codes, a lecturer, instructor, or teaching assistant records attendance by scanning the personal QR code displayed by a student in class — and the whole flow runs automatically following the course schedule, with no sessions to open or close.",
    problem:
      "Teaching staff attendance recorded manually is prone to proxies and inconsistent data, while typical digital systems depend on someone opening and closing a session and rely on static codes that are easy to screenshot or forward — making the resulting attendance data hard to trust.",
    solution:
      "Each student displays a personal QR that rotates automatically (HMAC-signed, ±40-second lifetime), so screenshots and forwarded photos expire almost instantly. Assigned teaching staff scan it during the schedule window — active from 15 minutes before class starts to 30 minutes after it ends (configurable) — with one scan per staff member per meeting, while on-time/late status is derived directly from the schedule.",
    contribution: [
      "Built the system end-to-end as a personal project: database design, role-based access (admin, lecturers, instructors, assistants, students), the rotating QR service with HMAC validation, the attendance recording service, live class monitoring, and per-meeting recap reports.",
      "Security-focused implementation: server-side schedule window validation, a one-scan-per-staff-per-session constraint, role middleware, and a full audit trail of every recorded attendance.",
    ],
    links: {
      github: "",
      demo: "",
    },
  },
  {
    id: "face-recognition-attendance",
    title: "Face Recognition Attendance System",
    tagline: "Contactless digital attendance with computer vision",
    type: "Computer Vision System",
    featured: false,
    mockup: "face",
    description:
      "A facial recognition-based attendance system designed to recognize registered individuals and record attendance digitally.",
    tech: ["Python", "Face Recognition", "Computer Vision"],
    features: [
      "Face recognition",
      "Attendance recording",
      "User data management",
      "Attendance monitoring",
    ],
    overview:
      "An attendance system that uses facial recognition to identify registered individuals and record their attendance digitally. It replaces manual attendance lists with an automated, contactless verification flow backed by manageable user data.",
    problem:
      "Manual attendance recording is slow, requires physical contact or paperwork, and is prone to proxies or human error when attendance data is collected and compiled.",
    solution:
      "A Python application powered by face recognition and computer vision. The system detects and matches faces against registered user data, records attendance automatically with timestamps, and provides a monitoring view of attendance results.",
    contribution: [
      "Developed the recognition pipeline, attendance recording logic, and user data management using Python and computer vision libraries.",
    ],
    links: {
      github: "",
      demo: "",
    },
  },
  {
    id: "omg-id-platform",
    title: "OMG.ID Platform Development",
    tagline: "Digital product platform — payments, APIs & notifications",
    type: "Work Experience Project",
    featured: false,
    workContext:
      "This project was developed professionally during my internship as a Full Stack Developer Intern at PT Qwords Company International — it is not a personal project.",
    mockup: "ecommerce",
    description:
      "Contributed to the development of a web platform supporting digital product selling, application functionality, payment integration, and notification services.",
    tech: ["Laravel", "PHP", "API Integration", "Payment Gateway"],
    features: [
      "Web application development",
      "Payment gateway integration",
      "API integration",
      "Notification integration",
      "Platform functionality development",
    ],
    overview:
      "A web platform for selling digital products, where I contributed as part of the development team. The work covered application functionality development, integrating a payment gateway, connecting external APIs, and implementing notification services.",
    problem:
      "A digital product platform needs to handle product catalogs, transactions, and reliable communication with payment and notification providers — requiring solid, well-integrated application features behind a smooth user experience.",
    solution:
      "Developed and integrated platform functionality using Laravel: implementing features across the application, connecting the payment gateway for transactions, integrating external APIs, and setting up notification services to keep users informed.",
    contribution: [
      "Web application development using Laravel",
      "Payment gateway integration",
      "API integration",
      "Notification integration",
      "Platform functionality development",
    ],
    links: {
      github: "",
      demo: "",
    },
  },
];

// Navbar Fixed
window.onscroll = () => {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;
  const buttonToTop = document.querySelector("#button-to-top");

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
    buttonToTop.classList.remove("hidden");
    buttonToTop.classList.add("flex");
  } else {
    header.classList.remove("navbar-fixed");
    buttonToTop.classList.remove("flex");
    buttonToTop.classList.add("hidden");
  }
};

// Hamburger
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

function closeMenu() {
  hamburger.classList.remove("hamburger-active");
  navMenu.classList.add("hidden");
}

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

// Close when clicking outside the menu and the hamburger.
window.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    closeMenu();
  }
});

// Close after tapping a nav link (but not when using the language toggle).
navMenu.querySelectorAll(".nav-link").forEach((link) =>
  link.addEventListener("click", closeMenu)
);

// Typing animation
const typedEl = document.querySelector("#typed-text");
const phrasesByLang = {
  en: ["Fullstack Developer", "Frontend Developer", "React · Vue · Angular", "UI Enthusiast"],
  id: ["Fullstack Developer", "Frontend Developer", "React · Vue · Angular", "Antusias UI"],
};
let phrases = phrasesByLang.en;
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

setTimeout(type, 800);

// Scroll reveal
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
);

revealElements.forEach((el) => observer.observe(el));

// Fallback: ensure all reveals become visible after 3s
setTimeout(() => {
  revealElements.forEach((el) => el.classList.add("visible"));
}, 3000);

// Portfolio filter
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioGrid = document.querySelector("#portfolio-grid");
const portfolioCards = portfolioGrid
  ? portfolioGrid.querySelectorAll(".portfolio-card")
  : [];
const portfolioEmpty = document.querySelector("#portfolio-empty");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    let visibleCount = 0;

    portfolioCards.forEach((card) => {
      const categories = (card.dataset.category || "").split(" ");
      const show = filter === "all" || categories.includes(filter);
      card.classList.toggle("hidden", !show);
      if (show) visibleCount += 1;
    });

    if (portfolioEmpty) {
      portfolioEmpty.classList.toggle("hidden", visibleCount > 0);
    }
  });
});

// Active section indicator in navbar (scrollspy)
const navLinks = document.querySelectorAll(".nav-link");

function setActiveNav() {
  const scrollPos = window.scrollY + 140;
  let currentHref = "";

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    const section = document.querySelector(href);
    if (section && section.offsetTop <= scrollPos) {
      currentHref = href;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("nav-active", link.getAttribute("href") === currentHref);
  });
}

window.addEventListener("scroll", setActiveNav);
window.addEventListener("load", setActiveNav);
setActiveNav();

// ===== i18n — English (default) / Bahasa Indonesia =====
// English copy is read straight from the DOM; only the Indonesian dictionary
// lives here. Elements opt in with a data-i18n="key" attribute.
const idDict = {
  // Navigation
  "nav.home": "Beranda",
  "nav.experience": "Pengalaman",
  "nav.portfolio": "Portofolio",
  "nav.skills": "Keahlian",
  "nav.contact": "Kontak",

  // Hero
  "hero.eyebrow": "Halo, Dunia! 👋",
  "hero.intro":
    'Fullstack developer yang antusias membangun pengalaman web yang bersih, cepat, dan menarik. 4+ tahun berfokus pada <span class="font-semibold text-white">React, Next.js, Vue, Angular &amp; Remix</span> di sisi frontend, dengan <span class="font-semibold text-white">NestJS</span>, <span class="font-semibold text-white">Laravel</span> dan REST / GraphQL API di sisi backend.',
  "hero.cta.portfolio": "Lihat Portofolio",
  "hero.cta.contact": "Hubungi Saya",
  "hero.cta.cv": "Unduh CV",

  // Experience
  "exp.badge": "Karier",
  "exp.title": "Perjalanan Karier",
  "exp.subtitle":
    '4 tahun berkembang sebagai <span class="font-semibold text-primary">Software Developer</span>',
  "exp.gamemarket.role": "Frontend Developer · Kontrak",
  "exp.gamemarket.desc":
    'Merombak UI yang sepenuhnya responsif (mobile, tablet, desktop) dengan <span class="text-white font-medium">Tailwind CSS</span> untuk marketplace gaming tepercaya ini — dibangun di atas <span class="text-white font-medium">Next.js</span> + <span class="text-white font-medium">Shadcn UI</span> dengan <span class="text-white font-medium">Redux Toolkit</span>. Mengintegrasikan berbagai metode pembayaran termasuk Crypto, QRIS, dan BRIVA (Dana &amp; ShopeePay segera hadir).',
  "exp.freelance.sub": "Wiraswasta · Internasional",
  "exp.freelance.desc":
    'Membangun aplikasi web untuk klien di <span class="text-white font-medium">Spanyol</span>, <span class="text-white font-medium">Amerika Serikat</span>, dan <span class="text-white font-medium">Australia</span> — termasuk <span class="text-white font-medium">Linden</span> (portal manajemen aset &amp; kehidupan pribadi), <span class="text-white font-medium">Quore</span> (platform AI multi-tenant), Estate Buddy, Chrona, dan aplikasi Waste Vision. Dibangun dengan <span class="text-white font-medium">React Router v7</span>, Remix, NestJS, dan Auth0.',
  "exp.keeppack.desc":
    'Bekerja sebagai fullstack developer pada <span class="text-white font-medium">Kelola SaaS V2</span>, termasuk membangun landing page pemasarannya di <a href="https://kelola.id/" target="_blank" rel="noreferrer" class="font-semibold text-primary hover:underline">kelola.id</a>. Kelola adalah platform manajemen bisnis all-in-one dengan fitur <span class="text-white font-medium">omni-channel</span>, integrasi marketplace, dan kolaborasi kurir terbaik.',
  "exp.surge.desc":
    'Mengembangkan berbagai aplikasi web — <span class="text-white font-medium">Lini Store, Lini Mitra &amp; Lini Seller</span> (social commerce), <span class="text-white font-medium">Sobat Tani</span> (monitoring pertanian berbasis AI + IoT), dan <span class="text-white font-medium">Kelola Gudang</span>, sistem manajemen gudang yang terintegrasi dengan Shopee, TikTok Shop &amp; Tokopedia. Juga menyempurnakan platform SaaS untuk klien bisnis.',
  "exp.insan.desc":
    'Mengembangkan aplikasi mobile termasuk <span class="text-white font-medium">Ucommers</span>, <span class="text-white font-medium">NIMO</span>, dan <span class="text-white font-medium">SI-GEPO</span> menggunakan <span class="text-white font-medium">Flutter</span>. Mengintegrasikan payment gateway dan membangun game edukasi interaktif untuk siswa berkebutuhan khusus.',
  "exp.dena.desc":
    'Membangun <span class="text-white font-medium">ONXExpressApp</span> dan <span class="text-white font-medium">Sedulur Tani Staff App</span> untuk pelacakan transportasi dan penjualan, serta CMS untuk yayasan Al-Ghoibi untuk mengelola dan mengunggah konten kegiatan.',
  "exp.edu.badge": "Pendidikan",
  "exp.edu.title": "S1 Teknologi Informasi",
  "exp.edu.desc":
    "Gelar Sarjana Teknologi Informasi — membangun fondasi yang kuat dalam rekayasa perangkat lunak, pengembangan web, dan mobile.",

  // Portfolio
  "pf.badge": "Karya",
  "pf.title": "Proyek Terbaru",
  "pf.subtitle":
    "Framework modern dan teknologi terkini — menampilkan keahlian saya dalam pengembangan web",
  "pf.filter.all": "Semua",
  "pf.filter.personal": "Pribadi",
  "pf.empty": "Belum ada proyek di kategori ini.",
  "pf.gamemarket":
    "Marketplace digital global untuk perdagangan aset gaming peer-to-peer — akun game, item dalam game, layanan boosting, dan top-up untuk 500+ game termasuk Genshin Impact, Valorant, dan Clash Royale.",
  "pf.inlite":
    "Sistem manajemen konten untuk Inlite — melayani komunitas desain arsitektur dan teknik di Australia dengan solusi pencahayaan detail untuk efisiensi, kontrol, dan kepatuhan anggaran.",
  "pf.custos":
    "Layanan otorisasi terpusat untuk platform Linden — sumber kebenaran tunggal untuk seluruh logika dan data kontrol akses di seluruh platform.",
  "pf.quore":
    "Platform AI multi-tenant yang modular, menggerakkan agen cerdas melalui plugin yang dapat diperluas, pencarian vektor, dan tooling LLM modern. Dibangun di atas FastAPI, PGVector, LangChain, dan LlamaIndex.",
  "pf.lini":
    "Platform Social Commerce yang memadukan belanja dengan interaksi sosial — pembelian grup untuk diskon, live sale, dan activity feed.",
  "pf.wmsclient":
    "Aplikasi manajemen gudang dari Kelola yang menawarkan pemenuhan pesanan dan manajemen produk yang terintegrasi dengan marketplace.",
  "pf.staycation":
    "Website penemuan destinasi wisata untuk Indonesia, dibangun secara fullstack dengan MERN stack.",
  "pf.storegg":
    "Proyek pribadi — UI top-up game yang dibangun dengan React.js dan Tailwind CSS.",
  "pf.orcha":
    "Mesin otomasi alur kerja yang menghubungkan API, layanan, dan tools internal menjadi alur visual berbasis event. Node modular, logika kustom, dan integrasi — tanpa scripting yang rumit.",
  "pf.identies":
    "Layanan manajemen identitas dan pengguna yang menangani operasi siklus hidup pengguna, data autentikasi, resolusi identitas, dan metadata platform.",
  "pf.kelolasaas":
    "Platform manajemen bisnis all-in-one dengan fitur omni-channel, integrasi marketplace, dan kolaborasi kurir terbaik untuk toko, produk, pesanan, dan pemenuhan.",
  "pf.wmsstaff":
    "Aplikasi manajemen gudang untuk staf dari Kelola untuk pemenuhan pesanan dan manajemen produk, terintegrasi dengan marketplace besar.",
  "pf.cozy":
    "Aplikasi pencarian kos online yang dibangun dengan Flutter untuk Android.",
  "pf.nimo":
    'Game berbasis Android "NIMO" yang dikembangkan untuk Program Bantuan Inovasi Pembelajaran dan Teknologi Asistif.',

  // Skills
  "sk.badge": "Keahlian",
  "sk.subtitle": "Teknologi yang saya gunakan untuk membangun produk hebat",

  // Footer
  "ft.tagline":
    "Fullstack developer yang membangun pengalaman web yang bersih, cepat, dan menarik untuk klien di seluruh dunia.",
  "ft.available": "Tersedia untuk freelance",
  "ft.contact": "Hubungi Saya",
  "ft.location": "Tulungagung, Jawa Timur",
  "ft.links": "Tautan Cepat",
  "ft.credit":
    'Dibuat dengan <span class="text-pink-500">❤️</span> oleh <a href="https://github.com/yayakyogi" target="_blank" class="text-primary hover:opacity-80">Yayak Yogi</a> menggunakan <a href="https://tailwindcss.com" target="_blank" class="text-sky-500 hover:opacity-80">Tailwind CSS</a>',
};

// Capture the original English copy once.
const enDict = {};
document.querySelectorAll("[data-i18n]").forEach((el) => {
  enDict[el.dataset.i18n] = el.innerHTML;
});

function applyLang(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const value = lang === "id" ? idDict[key] ?? enDict[key] : enDict[key];
    if (value != null) el.innerHTML = value;
  });

  // Portfolio CTA links have no data-i18n — translate by their aria-label.
  document.querySelectorAll(".portfolio-link").forEach((a) => {
    const isSource = /source code/i.test(a.getAttribute("aria-label") || "");
    const label =
      lang === "id"
        ? isSource
          ? "Kode Sumber"
          : "Lihat Demo"
        : isSource
        ? "Source Code"
        : "Live Demo";
    a.innerHTML = label + ' <span aria-hidden="true">↗</span>';
  });

  // Typed phrases — swap language and restart the animation.
  phrases = phrasesByLang[lang] || phrasesByLang.en;
  phraseIndex = 0;
  charIndex = 0;
  isDeleting = false;

  document.documentElement.lang = lang;
  document.querySelectorAll("[data-lang-btn]").forEach((b) =>
    b.classList.toggle("active", b.dataset.langBtn === lang)
  );

  try {
    localStorage.setItem("lang", lang);
  } catch (e) {}
}

document.querySelectorAll("[data-lang-btn]").forEach((b) =>
  b.addEventListener("click", () => applyLang(b.dataset.langBtn))
);

let savedLang = "en";
try {
  savedLang = localStorage.getItem("lang") || "en";
} catch (e) {}
applyLang(savedLang);

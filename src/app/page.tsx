"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Search, Zap, Github, Linkedin, Mail, Sun, Moon,
  ChevronRight, Download, Monitor, ArrowUpRight,
  Code2, Database, Cloud, Shield, Layers, Award,
  Cpu, LayoutGrid, Globe, Server, Network, BrainCircuit,
  Wrench, ExternalLink, CheckCircle2, BadgeCheck, Menu, X
} from "lucide-react";
/* ═══════════════════════════════════════════════════════════════
   DATA — All from chethanalakthilina.vercel.app
═══════════════════════════════════════════════════════════════ */

const PROJECTS = [
  {
    id: "cryptoinsight",
    eyebrow: "Engineering Excellence · Gemini 1.5 Pro",
    title: "Cryptoinsight — AI Trading Ecosystem",
    subtitle: "Real-time Systems · High-Frequency Analysis",
    desc: "An institutional-grade trading bot leveraging Gemini 1.5 Pro Vision to veto retail traps. Built with a high-performance asynchronous FastAPI backend and React frontend, it features real-time WebSocket signals and complex technical analysis using TA-Lib and Pandas.",
    tags: ["FastAPI", "React", "Python", "JavaScript", "Pandas", "NumPy", "TA-Lib", "Docker", "Redis", "Supabase"],
    accent: "green",
    icon: Zap,
    featured: true,
    link: "https://cryptoinsigh.vercel.app/",
  },
  {
    id: "jobnexus",
    eyebrow: "Enterprise Solution · Laravel 2026",
    title: "JobNexus — Job Portal System",
    subtitle: "MVC · DDD Architecture",
    desc: "A senior-level job portal system with Domain-Driven Design (DDD) architecture. Features enterprise verification, role-based access control, and a cinematic UI.",
    tags: ["Laravel", "PHP", "DDD", "MySQL", "TailwindCSS"],
    accent: "blue",
    icon: Zap,
    featured: true,
    link: "https://github.com/CLTWINGZ/New-Job-Portal-System.git",
  },
  {
    id: "hotel-cms",
    eyebrow: "Featured Mission · CAASL 2024",
    title: "Aviation-Themed Hotel Management System",
    subtitle: "AI-Integrated",
    desc: "Full-stack hotel management system with automated room management, secure authentication, AI chatbot support, automated invoicing & email notifications.",
    tags: ["PHP", "JavaScript", "AJAX", "MySQL", "IBM Watson", "AI Chatbot"],
    accent: "blue",
    icon: Monitor,
    featured: true,
    link: "https://drive.google.com/file/d/1KmgMRHmz_VzqAZY7hFW3-pEE7W7cl7v1/view",
  },
  {
    id: "inventory-caasl",
    eyebrow: "Enterprise Infrastructure",
    title: "Inventory Management System",
    subtitle: "CAASL IT Unit",
    desc: "Asset registration, monitoring, and automated reporting dashboards for IT inventory management at the Civil Aviation Authority of Sri Lanka.",
    tags: ["PHP", "JavaScript", "MySQL", "AJAX"],
    accent: "red",
    icon: Database,
    link: "https://www.linkedin.com/posts/chethana-jathunarachchi-2ba45b281_php-javascript-bootstrap-activity-7248674565084590081-yGqS?utm_source=share&utm_medium=member_desktop&rcm=ACoAAESWoO4BLTUAIjH4mZcsoTEXjUn2XvibmZY",
  },
  {
    id: "inventory-biz",
    eyebrow: "Core Engineering",
    title: "Small Business Inventory System",
    subtitle: "Full-Stack Web App",
    desc: "Full-stack inventory web app with JWT auth, CRUD operations, real-time stock updates, responsive UI and analytics dashboards.",
    tags: ["React", "Node.js", "Express", "JWT", "MongoDB"],
    accent: "yellow",
    icon: Layers,
    link: "https://small-bussiness-inventory6.vercel.app/",
  },
  {
    id: "weather",
    eyebrow: "Data Intelligence",
    title: "Weather Analytics Application",
    subtitle: "Real-Time Processing",
    desc: "Real-time weather data processing with Comfort Index scoring, server-side caching, responsive UI, and Auth0 authentication integration.",
    tags: ["React", "Node.js", "Auth0", "REST API"],
    accent: "green",
    icon: Cloud,
    link: "https://github.com/CLTWINGZ/weather_app",
  },
  {
    id: "watson",
    eyebrow: "AI Engineering",
    title: "AI-Based Web Application",
    subtitle: "IBM Watson",
    desc: "AI-driven web application using IBM Watson libraries with Flask REST APIs and server-side processing for intelligent data analysis.",
    tags: ["Python", "Flask", "IBM Watson", "REST API"],
    accent: "blue",
    icon: BrainCircuit,
  },
  {
    id: "prison",
    eyebrow: "Systems Engineering",
    title: "Online Prison Rehabilitation System",
    subtitle: "Backend Management",
    desc: "Backend system to manage rehabilitation activities with monitoring capabilities, reporting dashboards, and activity tracking.",
    tags: ["C#", "ASP.net", "SQL Server", "REST API"],
    accent: "red",
    icon: Shield,
  },
  {
    id: "customer-cms",
    eyebrow: "Enterprise System",
    title: "Customer Management System",
    subtitle: "Full-Stack Web App",
    desc: "A robust customer management system featuring advanced search, numeric pagination, bulk asynchronous file processing, and precise state management.",
    tags: ["React", "Spring Boot", "Java", "REST API"],
    accent: "blue",
    icon: Server,
    link: "https://github.com/CLTWINGZ"
  },
];

const SKILLS_BY_CATEGORY = [
  {
    label: "Programming Languages",
    icon: Code2,
    accent: "blue",
    items: ["PHP", "JavaScript", "TypeScript", "Python", "Java", "C#", "Dart", "C", "SQL", "AJAX", "Bash", "Async Programming"],
  },
  {
    label: "Web & Mobile",
    icon: Globe,
    accent: "red",
    items: ["React", "Next.js", "Blazor", "FastAPI", "Node.js", "Express", "Flutter", "Spring Boot", "Flask", "HTML/CSS"],
  },
  {
    label: "Databases",
    icon: Database,
    accent: "yellow",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Redis", "Supabase"],
  },
  {
    label: "DevOps & Cloud",
    icon: Cloud,
    accent: "green",
    items: ["Docker", "Kubernetes", "Jenkins", "GitHub Actions", "CI/CD", "Linux", "AWS"],
  },
  {
    label: "Networking & Systems",
    icon: Network,
    accent: "blue",
    items: ["LAN/WAN", "VPN", "Firewalls", "Directory Services", "Server Admin", "Cisco Packet Tracer"],
  },
  {
    label: "AI, Data Science & Platforms",
    icon: BrainCircuit,
    accent: "red",
    items: ["Pandas", "NumPy", "TA-Lib", "IBM Watson", "Google Cloud AI", "Auth0", "Docker Hub", "Git"],
  },
  {
    label: "Developer Tools",
    icon: Wrench,
    accent: "yellow",
    items: ["VS Code", "IntelliJ IDEA", "Postman", "GitHub", "Figma", "Overleaf"],
  },
  {
    label: "Backend & APIs",
    icon: Server,
    accent: "green",
    items: ["FastAPI", ".NET", "REST APIs", "API Design", "Security & Authentication", "JWT Auth", "RBAC", "WebSockets", "Microservices", "MVC"],
  },
];

/* Issuer brand config */
const ISSUERS: Record<string, { color: string; bg: string; abbr: string; logoUrl?: string }> = {
  "IBM": {
    color: "#0f62fe",
    bg: "rgba(15,98,254,0.08)",
    abbr: "IBM",
    logoUrl: "https://www.vectorlogo.zone/logos/ibm/ibm-icon.svg"
  },
  "Google Cloud Skills Boost": {
    color: "#1a73e8",
    bg: "rgba(26,115,232,0.08)",
    abbr: "GCP",
    logoUrl: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg"
  },
  "Microsoft": {
    color: "#00a4ef",
    bg: "rgba(0,164,239,0.08)",
    abbr: "MS",
    logoUrl: "https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg"
  },
  "DeepLearning.AI": {
    color: "#c9312a",
    bg: "rgba(201,49,42,0.08)",
    abbr: "DL",
    logoUrl: "/deeplearning-logo.png"
  },
  "KodeKloud": {
    color: "#326ce5",
    bg: "rgba(50,108,229,0.08)",
    abbr: "KK",
    logoUrl: "/kodekloud-logo.png"
  },
  "University of Moratuwa": {
    color: "#8b1a1a",
    bg: "rgba(139,26,26,0.08)",
    abbr: "UOM",
    logoUrl: "/uom-logo.png"
  },
  "Udemy": {
    color: "#a435f0",
    bg: "rgba(164,53,240,0.08)",
    abbr: "U",
    logoUrl: "https://www.vectorlogo.zone/logos/udemy/udemy-icon.svg"
  },
  "Peter the Great St. Petersburg Polytechnic University": {
    color: "#006699",
    bg: "rgba(0,102,153,0.08)",
    abbr: "SPbPU",
    logoUrl: "/spbpu-logo.png"
  },
};

const CERT_GROUPS = [
  {
    issuer: "IBM",
    certs: [
      "Introduction to Software Engineering",
      "Developing Front-End Apps with React",
      "Developing Back-End Apps with Node.js & Express",
      "Developing AI Applications with Python and Flask",
      "Python for Data Science, AI & Development",
      "Introduction to Cloud Computing",
      "Getting Started with Git and GitHub",
      "Hands-On Introduction to Linux Commands & Shell Scripting",
    ],
  },
  {
    issuer: "Google Cloud Skills Boost",
    certs: [
      "Introduction to Generative AI",
      "Data Analytics on Google Cloud",
    ],
  },
  {
    issuer: "Microsoft",
    certs: [
      "Foundations of Coding: Full-Stack",
      "Introduction to Programming With C#",
      "Blazor for Front-End Development",
      "Back-End Development with .NET",
      "Introduction to Web Development",
      "Database Integration and Management",
      "Security and Authentication",
      "Full-Stack Integration"
    ],
  },
  {
    issuer: "DeepLearning.AI",
    certs: ["Supervised Machine Learning: Regression & Classification"],
  },
  {
    issuer: "KodeKloud",
    certs: [
      "DevOps Prerequisite Course",
      "Jenkins for Beginners",
      "Docker Basics for DevOps",
      "Kubernetes Basics for DevOps",
    ],
  },
  {
    issuer: "University of Moratuwa",
    certs: [
      "Web Design for Beginners",
      "Python for Beginners",
      "Front-End Web Development",
    ],
  },
  {
    issuer: "Udemy",
    certs: ["Practical Cisco Networking Labs in Cisco Packet Tracer"],
  },
  {
    issuer: "Peter the Great St. Petersburg Polytechnic University",
    certs: ["Web Development with Java Spring Framework"],
  },
];

const TOTAL_CERTS = CERT_GROUPS.reduce((acc, group) => acc + group.certs.length, 0);
const TOTAL_PROJECTS = PROJECTS.length;

const STATS = [
  { value: `${TOTAL_PROJECTS}+`, label: "Projects Shipped" },
  { value: `${TOTAL_CERTS}+`, label: "Certifications" },
  { value: "6mo", label: "Production Exp." },
  { value: "∞", label: "Drive" },
];

/* ─── Icon accent maps ─────────────────────────────────────────── */
const iconAccentClass: Record<string, string> = {
  blue: "icon-blue", red: "icon-red", yellow: "icon-yellow", green: "icon-green",
};

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollPct, setScrollPct] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [typedText1, setTypedText1] = useState("");
  const [statsVisible, setStatsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // ── Typewriter for hero subtitle ──────────────────────────────
  const TYPING_WORDS = ["Sri Lanka", "Open for roles", "Full-Stack Dev"];
  const TYPING_WORDS1 = ["Hi , I'm Chethana Full-Stack Engineer"];
  useEffect(() => {
    if (!mounted) return;
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const type = () => {
      const currentWord = TYPING_WORDS[wordIdx];
      if (isDeleting) {
        setTypedText(currentWord.substring(0, charIdx - 1));
        charIdx--;
      } else {
        setTypedText(currentWord.substring(0, charIdx + 1));
        charIdx++;
      }

      let typingSpeed = isDeleting ? 40 : 90;

      if (!isDeleting && charIdx === currentWord.length) {
        typingSpeed = 2000; // pause at the end of the word
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % TYPING_WORDS.length;
        typingSpeed = 500; // pause before typing the next word
      }

      timer = setTimeout(type, typingSpeed);
    };

    timer = setTimeout(type, 500);
    return () => clearTimeout(timer);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const type = () => {
      const currentWord = TYPING_WORDS1[wordIdx];
      if (isDeleting) {
        setTypedText1(currentWord.substring(0, charIdx - 1));
        charIdx--;
      } else {
        setTypedText1(currentWord.substring(0, charIdx + 1));
        charIdx++;
      }

      let typingSpeed = isDeleting ? 40 : 90;

      if (!isDeleting && charIdx === currentWord.length) {
        typingSpeed = 2000; // pause at the end of the word
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % TYPING_WORDS1.length;
        typingSpeed = 500; // pause before typing the next word
      }

      timer = setTimeout(type, typingSpeed);
    };

    timer = setTimeout(type, 500);
    return () => clearTimeout(timer);
  }, [mounted]);

  // ── Featured Project Image Carousel ─────────────────────────
  const CAASL_IMAGES = [
    "/caasl-1.png",
    "/caasl-2.png",
    "/caasl-3.png",
    "/caasl-4.png",
    "/caasl-5.png"
  ];
  const JOBNEXUS_IMAGES = [
    "/jobnexus-1.png",
    "/jobnexus-2.png",
    "/jobnexus-3.png",
    "/jobnexus-4.png",
    "/jobnexus-5.png",
    "/jobnexus-6.png",
    "/jobnexus-7.png",
    "/jobnexus-8.png",
    "/jobnexus-9.png",
    "/jobnexus-10.png",
    "/jobnexus-11.png",
    "/jobnexus-12.png"
  ];
  const CRYPTOINSIGHT_IMAGES = [
    "/cryptoinsight-1.png",
    "/cryptoinsight-2.png",
    "/cryptoinsight-3.png",
    "/cryptoinsight-4.png",
    "/cryptoinsight-5.png",
  ];
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [jobnexusImageIdx, setJobnexusImageIdx] = useState(0);
  const [cryptoinsightImageIdx, setCryptoinsightImageIdx] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!mounted || showVideo) return;
    const interval = setInterval(() => {
      setCurrentImageIdx(prev => (prev + 1) % 5);
      setJobnexusImageIdx(prev => (prev + 1) % 12);
      setCryptoinsightImageIdx(prev => (prev + 1) % 5);
    }, 4500);
    return () => clearInterval(interval);
  }, [mounted, showVideo]);

  // ── Card spotlight mouse tracker ──────────────────────────────
  const initSpotlight = useCallback(() => {
    document.querySelectorAll<HTMLElement>(".ag-card").forEach(card => {
      if (card.classList.contains("spotlight")) return;
      card.classList.add("spotlight");
      card.addEventListener("mousemove", (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
      });
    });
  }, []);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("ag-theme") as "dark" | "light" | null;
    const t = saved ?? "light";
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);

    // ── Scroll progress + reveal + active section ────────────────
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docH > 0 ? (window.scrollY / docH) * 100 : 0);
      setScrolled(window.scrollY > 32);

      document.querySelectorAll(".reveal").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.88) {
          el.classList.add("active");
        }
      });

      const ids = ["home", "projects", "experience", "skills", "certifications"];
      for (const id of ids) {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight * 0.45 && rect.bottom > window.innerHeight * 0.45) {
          setActiveSection(id);
          break;
        }
      }
    };

    // ── Stats counter observer ────────────────────────────────────
    const statsObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          // pop animation on each stat value
          document.querySelectorAll(".ag-stat-value").forEach((el, i) => {
            setTimeout(() => {
              el.classList.remove("pop");
              void (el as HTMLElement).offsetWidth; // reflow
              el.classList.add("pop");
            }, i * 120);
          });
          statsObs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) statsObs.observe(statsRef.current);

    // ── Cert cards staggered IntersectionObserver ────────────────
    const certObs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".cert-grid-item").forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${i * 0.04}s`;
      certObs.observe(el);
    });

    // ── Init spotlight + re-run on each scroll (new cards) ───────
    initSpotlight();
    setTimeout(initSpotlight, 1000);

    window.addEventListener("scroll", onScroll, { passive: true });
    setTimeout(onScroll, 100);
    return () => {
      window.removeEventListener("scroll", onScroll);
      statsObs.disconnect();
      certObs.disconnect();
    };
  }, [initSpotlight]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);
  const toggleTheme = () => {
    const t = theme === "dark" ? "light" : "dark";
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("ag-theme", t);
  };

  if (!mounted) return null;

  return (
    <div className={`ag-shell ${theme}`}>

      {/* ── SCROLL PROGRESS ─────────────────────────────────── */}
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

      {/* ── ANIMATED AURORA BACKGROUND ─────────────────────── */}
      <div className="ag-bg">
        <div className="ag-grid-mesh" />
        <div className="ag-orb ag-orb-1" />
        <div className="ag-orb ag-orb-2" />
        <div className="ag-orb ag-orb-3" />
        <div className="ag-orb ag-orb-4" />
      </div>

      {/* ── NAVIGATION ─────────────────────────────────────── */}
      <nav className={`ag-nav ${scrolled ? "scrolled" : ""} ${isMenuOpen ? "menu-open" : ""}`} style={{ height: (scrolled && !isMenuOpen) ? "68px" : "84px" }}>
        <a href="#home" className="ag-nav-brand" onClick={() => setIsMenuOpen(false)}>
          <div className="ag-nav-logo">CL</div>
          <span className="ag-nav-wordmark"></span>
        </a>

        <div className="ag-nav-links">
          {[
            { id: "projects", label: "Projects" },
            { id: "experience", label: "Experience" },
            { id: "skills", label: "Skills" },
            { id: "certifications", label: "Certs" },
          ].map(({ id, label }) => (
            <a key={id} href={`#${id}`} className={`ag-nav-item ${activeSection === id ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>
              {label}
            </a>
          ))}
        </div>

        <div className="ag-nav-actions">
          <button className="ag-icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a href="mailto:chethanalakthilina3@gmail.com" className="btn btn-primary hire-me-btn" style={{ height: "40px", padding: "0 20px", fontSize: "14px" }}>
            Hire Me
          </a>

          <button className="ag-icon-btn mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" style={{ display: "none" }}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div >
      </nav >

      <main>
        {/* ── HERO ───────────────────────────────────────────── */}
        <section id="home" className="ag-hero ag-hero-split">

          {/* ── EYEBROW ── */}
          <div className="ag-hero-eyebrow" style={{ alignSelf: "center", marginBottom: "32px" }}>
            <span className="ag-hero-eyebrow-dot" />
            Open to Opportunities ·{" "}
            <span style={{ color: "var(--accent-blue)" }}>{typedText}</span>
            <span className="typewriter-cursor" />
          </div>

          {/* ── TOP: Titles & Photo ── */}
          <div className="ag-hero-row-top">
            <div className="ag-hero-titles">

              <h1 className="ag-hero-title">
                {" "}
                <span className="gradient-text"><span style={{ color: "var(--accent-blue)" }}>{typedText1}</span>
                  <span className="typewriter-cursor" /></span>
                <br />
              </h1>

              <p className="ag-hero-subtitle" style={{ marginTop: "16px" }}>
                <strong>Chethana Lakthilina Jathunarachchi</strong> — Software Engineering graduate
                specializing in full-stack development, AI integration, DevOps, and
                enterprise infrastructure that defies the ordinary.
              </p>
            </div>

            <div className="ag-hero-photo-wrap">
              {/* Floating availability badge */}
              <div className="profile-badge profile-badge-top">
                <span className="profile-badge-dot" />
                Available for work
              </div>

              {/* Animated gradient ring */}
              <div className="profile-ring-outer">
                <div className="profile-ring-inner">
                  <Image
                    src="/rmvbg.png"
                    alt="Chethana Lakthilina Jathunarachchi"
                    className="profile-img"
                    width={200}
                    height={200}
                    priority
                  />
                </div>
              </div>

              {/* Floating tech badge bottom-left */}
              <div className="profile-badge profile-badge-bottom">
                <Code2 size={13} />
                Full-Stack · AI · DevOps
              </div>
            </div>
          </div>

          {/* ── MIDDLE & BOTTOM: Centered Buttons & Stats ── */}
          <div className="ag-hero-row-middle" style={{ flexDirection: "column", gap: "32px", alignItems: "center" }}>
            <div className="profile-actions">
              <a href="#projects" className="btn btn-primary">
                View My Work <ChevronRight size={16} />
              </a>
              <a href="https://www.overleaf.com/read/svtckzqczvpt#6b8332" target="_blank" rel="noreferrer" className="btn btn-secondary">
                <Download size={15} /> View CV
              </a>
              <a href="https://github.com/CLTWINGZ" target="_blank" rel="noreferrer" className="btn btn-secondary">
                <Github size={15} /> GitHub
              </a>
            </div>

            <div className="ag-hero-stats-wrap" style={{ width: "100%", maxWidth: "600px" }}>
              <div className="profile-stats" ref={statsRef}>
                {STATS.map(s => (
                  <div key={s.label} className="ag-stat">
                    <div className="ag-stat-value">{s.value}</div>
                    <div className="ag-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Scroll cue */}
          <div className="scroll-cue" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
            <span>Scroll</span>
            <div className="scroll-cue-line" />
          </div>
        </section>


        {/* ── PROJECTS ───────────────────────────────────────── */}
        <section id="projects" className="ag-section">
          <div className="ag-section-inner">
            <div className="ag-section-header reveal">
              <p className="ag-section-label">Solutions Portfolio</p>
              <h2 className="ag-section-title">Engineered for impact.</h2>
              <p className="ag-section-desc">
                Real-world systems built for production — from aviation infrastructure to AI-powered applications.
              </p>
            </div>
          </div>

          <div className="bento-grid" style={{ paddingBottom: "80px" }}>

            {/* ── FEATURED PROJECTS ── */}
            {PROJECTS.filter(p => p.featured).map((p, pIdx) => (
              <div key={p.id} className="col-12 reveal" style={{ marginBottom: "40px" }}>
                <div className="ag-card-featured">
                  <div className="featured-project-grid">
                    <div>
                      <span className="card-eyebrow" style={{ color: "var(--accent-blue)" }}>
                        ★ {p.eyebrow}
                      </span>
                      <h3 className="card-title-lg">
                        {p.title}
                      </h3>
                      <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent-blue)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "16px" }}>
                        {p.subtitle}
                      </p>
                      <p className="card-desc" style={{ fontSize: "17px", lineHeight: "1.7" }}>
                        {p.desc}
                      </p>
                      <div className="tag-row">
                        {p.tags.map(t => (
                          <span key={t} className="tech-tag">{t}</span>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: "12px", marginTop: "36px" }}>
                        <a href={p.link || "https://github.com/CLTWINGZ"} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                          <ExternalLink size={13} /> View Project
                        </a>
                      </div>
                    </div>
                    <div className="mockup-box">
                      <div className="browser-chrome">
                        <div className="chrome-dot" style={{ background: "#EA4335" }} />
                        <div className="chrome-dot" style={{ background: "#FBBC04" }} />
                        <div className="chrome-dot" style={{ background: "#34A853" }} />
                      </div>
                      <div className="mockup-box-inner" style={{ position: "absolute", top: "32px", left: 0, right: 0, bottom: 0, overflow: "hidden", borderRadius: "0 0 10px 10px", opacity: 1, margin: 0 }}>
                        {p.id === "hotel-cms" && showVideo ? (
                          <iframe
                            src="https://drive.google.com/file/d/1KmgMRHmz_VzqAZY7hFW3-pEE7W7cl7v1/preview"
                            width="100%"
                            height="100%"
                            allow="autoplay"
                            style={{ border: "none", position: "absolute", inset: 0, zIndex: 10 }}
                          />
                        ) : (
                          <>
                            {(p.id === "hotel-cms" ? CAASL_IMAGES : (p.id === "jobnexus" ? JOBNEXUS_IMAGES : CRYPTOINSIGHT_IMAGES)).map((src, idx) => (
                              <div
                                key={src}
                                style={{
                                  position: "absolute",
                                  inset: 0,
                                  opacity: (p.id === "hotel-cms" ? currentImageIdx : (p.id === "jobnexus" ? jobnexusImageIdx : cryptoinsightImageIdx)) === idx ? 1 : 0,
                                  transition: "opacity 1s ease-in-out",
                                  zIndex: (p.id === "hotel-cms" ? currentImageIdx : (p.id === "jobnexus" ? jobnexusImageIdx : cryptoinsightImageIdx)) === idx ? 1 : 0,
                                  backgroundImage: `url(${src})`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "top center",
                                  backgroundRepeat: "no-repeat"
                                }}
                              />
                            ))}

                            {p.id === "hotel-cms" && (
                              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 5, background: "rgba(0,0,0,0.2)", backdropFilter: "blur(2px)" }}>
                                <button
                                  onClick={() => setShowVideo(true)}
                                  className="btn btn-primary"
                                  style={{ borderRadius: "100px", padding: "12px 24px", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
                                >
                                  ▶ Play Demo
                                </button>
                              </div>
                            )}

                            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: -1, opacity: 0.1 }}>
                              <Monitor size={80} strokeWidth={0.75} color="var(--accent-blue)" />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* ── OTHER PROJECTS ── */}
            {PROJECTS.filter(p => !p.featured).map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={p.id} className={`col-4 ag-card reveal reveal-delay-${(i % 3) + 1}`}>
                  <div className={`card-icon ${iconAccentClass[p.accent]}`}>
                    <Icon size={22} />
                  </div>
                  <span className="card-eyebrow">{p.eyebrow}</span>
                  <h3 className="card-title">{p.title}</h3>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: `var(--accent-${p.accent})`, marginBottom: "10px", letterSpacing: "0.03em" }}>
                    {p.subtitle}
                  </p>
                  <p className="card-desc">{p.desc}</p>
                  <div className="tag-row">
                    {p.tags.slice(0, 3).map(t => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                  <a href={p.link || "https://github.com/CLTWINGZ"} target="_blank" rel="noreferrer" className="card-link">
                    View Project <ArrowUpRight size={14} />
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── EXPERIENCE + EDUCATION ─────────────────────────── */}
        <section
          id="experience"
          className="ag-section"
          style={{ borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
        >
          <div className="ag-section-inner">
            <div className="experience-grid">
              {/* Left */}
              <div className="reveal" style={{ position: "sticky", top: "104px" }}>
                <p className="ag-section-label">Career & Education</p>
                <h2 className="ag-section-title">Chronicle.</h2>
                <p className="ag-section-desc" style={{ fontSize: "16px", marginTop: "16px" }}>
                  Building aviation infrastructure and enterprise software. Currently a fresh graduate
                  seeking high-impact engineering roles.
                </p>
                <div style={{ marginTop: "32px", display: "flex", gap: "12px" }}>
                  <a href="https://www.overleaf.com/read/svtckzqczvpt#6b8332" target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
                    <ExternalLink size={13} /> Full CV
                  </a>
                </div>
              </div>

              {/* Right — Timeline */}
              <div>
                {/* Experience Card */}
                <div className="ag-card reveal reveal-delay-1" style={{ padding: "40px", marginBottom: "20px" }}>
                  <p className="card-eyebrow" style={{ marginBottom: "24px" }}>Work Experience</p>
                  <div className="timeline">
                    <div className="timeline-item">
                      <div className="timeline-dot" />
                      <p className="timeline-meta">April 2024 – October 2024 · Katunayake, Sri Lanka</p>
                      <h3 className="timeline-title">Software Engineer Intern</h3>
                      <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>
                        Air Transport Regulations & IT Unit
                      </p>
                      <p className="timeline-org">Civil Aviation Authority of Sri Lanka (CAASL)</p>
                      <div className="tag-row" style={{ marginBottom: "20px" }}>
                        {["PHP", "JavaScript", "AJAX", "MySQL", "IBM Watson", "VPN", "LAN/WAN"].map(t => (
                          <span key={t} className="tech-tag">{t}</span>
                        ))}
                      </div>
                      <ul className="timeline-list">
                        <li>Developed and maintained internal web apps to streamline IT & regulatory workflows (PHP, JS, AJAX, MySQL)</li>
                        <li>Designed and implemented an Inventory Management System for IT asset tracking, monitoring, and reporting</li>
                        <li>Built an AI-powered aviation-themed hotel & bungalow management system with auth, chatbot, invoices & email notifications</li>
                        <li>Supported network & systems operations: devices, servers, firewalls (LAN/WAN)</li>
                        <li>Performed infrastructure security/maintenance: patching, VPN, directory services, monitoring</li>
                        <li>Troubleshot hardware/software/network issues and optimized system performance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Education Card */}
                <div className="ag-card reveal reveal-delay-2" style={{ marginBottom: "20px" }}>
                  <p className="card-eyebrow" style={{ marginBottom: "24px" }}>Education</p>
                  <div className="timeline">
                    <div className="timeline-item">
                      <div className="timeline-dot" style={{ background: "var(--accent-blue)", boxShadow: "0 0 0 2px var(--accent-blue)" }} />
                      <p className="timeline-meta">2021 – 2025 December</p>
                      <h3 className="timeline-title">BSc (Hons) in Software Engineering</h3>
                      <p className="timeline-org">NSBM Green University, Sri Lanka</p>
                      <p className="timeline-body">
                        In collaboration with Plymouth University, UK. Coursework covers Programming,
                        Web/Mobile Development, Databases, Networks, Cloud Computing, IoT, and AI.
                        Practical experience via real-world projects and CAASL internship.
                      </p>
                      <div className="tag-row">
                        {["Full-Stack Dev", "AI/ML", "Cloud", "Networks", "IoT", "Databases"].map(t => (
                          <span key={t} className="tech-tag">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* A/L Card */}
                <div className="ag-card reveal reveal-delay-3">
                  <div className="timeline">
                    <div className="timeline-item" style={{ paddingBottom: 0 }}>
                      <div className="timeline-dot" style={{ background: "var(--accent-green)", boxShadow: "0 0 0 2px var(--accent-green)" }} />
                      <p className="timeline-meta">G.C.E. Advanced Level</p>
                      <h3 className="timeline-title">Physical Science Stream</h3>
                      <p className="timeline-org" style={{ color: "var(--accent-green)" }}>Ruhunu Vijayaba College, Sri Lanka</p>
                      <p className="timeline-body">Combined Mathematics · Physics · Chemistry</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS ─────────────────────────────────────────── */}
        <section id="skills" className="ag-section">
          <div className="ag-section-inner">
            <div className="ag-section-header reveal">
              <p className="ag-section-label">Technical Arsenal</p>
              <h2 className="ag-section-title">The architecture within.</h2>
              <p className="ag-section-desc">
                Core strengths across frontend, backend, databases, DevOps, networking, and cloud technologies.
              </p>
            </div>

            <div className="bento-grid" style={{ padding: "0" }}>
              {SKILLS_BY_CATEGORY.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <div key={cat.label} className={`col-6 ag-card reveal reveal-delay-${(i % 2) + 1}`}>
                    <div className={`card-icon ${iconAccentClass[cat.accent]}`}>
                      <Icon size={22} />
                    </div>
                    <h3 className="card-title" style={{ marginBottom: "20px" }}>{cat.label}</h3>
                    <div className="skill-grid">
                      {cat.items.map(skill => (
                        <span key={skill} className="skill-pill" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                          <CheckCircle2 size={13} style={{ opacity: 0.6 }} />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CERTIFICATIONS ─────────────────────────────────── */}
        <section
          id="certifications"
          className="ag-section"
          style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}
        >
          <div className="ag-section-inner">
            <div className="ag-section-header reveal">
              <p className="ag-section-label">Licenses & Certifications</p>
              <h2 className="ag-section-title">
                <span className="gradient-text">{TOTAL_CERTS}+</span> credentials earned.
              </h2>
              <p className="ag-section-desc">
                Verified certifications from IBM, Google, Microsoft, DeepLearning.AI, and leading universities.
              </p>
            </div>

            {/* ── Issuer summary badges row ── */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "48px" }}>
              {CERT_GROUPS.map(g => {
                const brand = ISSUERS[g.issuer] ?? { color: "var(--accent-blue)", bg: "rgba(26,115,232,0.08)", abbr: "?" };
                return (
                  <div
                    key={g.issuer}
                    className="cert-grid-item"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "10px",
                      padding: "8px 16px 8px 10px",
                      border: `1px solid ${brand.color}30`,
                      borderRadius: "var(--radius-pill)",
                      background: brand.bg,
                    }}
                  >
                    <div style={{
                      width: "32px", height: "32px", borderRadius: "8px",
                      background: brand.logoUrl ? "var(--bg-surface)" : brand.color,
                      color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "10px", fontWeight: 800, letterSpacing: "-0.02em", flexShrink: 0,
                      padding: brand.logoUrl ? "4px" : "0",
                      overflow: "hidden"
                    }}>
                      {brand.logoUrl ? (
                        <img src={brand.logoUrl} alt={g.issuer} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                      ) : (
                        brand.abbr
                      )}
                    </div>
                    <div>
                      <p style={{ fontSize: "12px", fontWeight: 700, color: brand.color, lineHeight: 1 }}>{g.issuer}</p>
                      <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>{g.certs.length} cert{g.certs.length > 1 ? "s" : ""}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Grouped cert cards ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {CERT_GROUPS.map((g, gi) => {
                const brand = ISSUERS[g.issuer] ?? { color: "var(--accent-blue)", bg: "rgba(26,115,232,0.08)", abbr: "?" };
                return (
                  <div
                    key={g.issuer}
                    className="ag-card cert-grid-item"
                    style={{ padding: "28px 32px" }}
                  >
                    {/* Issuer header */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                      <div style={{
                        width: "44px", height: "44px", borderRadius: "12px",
                        background: brand.logoUrl ? "var(--bg-surface)" : brand.color,
                        color: "#fff", flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "12px", fontWeight: 800, letterSpacing: "-0.02em",
                        boxShadow: `0 4px 12px ${brand.color}40`,
                        padding: brand.logoUrl ? "6px" : "0",
                        overflow: "hidden",
                        border: brand.logoUrl ? "1px solid var(--border-subtle)" : "none",
                      }}>
                        {brand.logoUrl ? (
                          <img src={brand.logoUrl} alt={g.issuer} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                        ) : (
                          brand.abbr
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}>
                          {g.issuer}
                        </p>
                        <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "3px" }}>
                          {g.certs.length} certificate{g.certs.length > 1 ? "s" : ""} earned
                        </p>
                      </div>
                      <div style={{
                        fontSize: "13px", fontWeight: 700, color: brand.color,
                        background: brand.bg, padding: "4px 12px", borderRadius: "var(--radius-pill)",
                        border: `1px solid ${brand.color}30`,
                      }}>
                        Verified
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ height: "1px", background: "var(--border-subtle)", marginBottom: "18px" }} />

                    {/* Cert list */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {g.certs.map((cert, ci) => (
                        <div
                          key={cert}
                          style={{
                            display: "flex", alignItems: "center", gap: "8px",
                            padding: "7px 14px",
                            borderRadius: "var(--radius-sm)",
                            background: "var(--bg-raised)",
                            border: "1px solid var(--border-subtle)",
                            cursor: "default",
                            transition: "all 0.2s var(--ease-smooth)",
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.background = brand.bg;
                            (e.currentTarget as HTMLElement).style.borderColor = `${brand.color}50`;
                            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = "";
                            (e.currentTarget as HTMLElement).style.borderColor = "";
                            (e.currentTarget as HTMLElement).style.transform = "";
                          }}
                        >
                          <BadgeCheck size={14} color={brand.color} style={{ flexShrink: 0 }} />
                          <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-primary)" }}>
                            {cert}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────── */}
        <section
          className="ag-section"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <div className="ag-section-inner" style={{ textAlign: "center" }}>
            <div className="reveal">
              <p className="ag-section-label" style={{ justifyContent: "center" }}>Ready for Liftoff</p>
              <h2 className="ag-section-title" style={{ maxWidth: "640px", margin: "0 auto 24px" }}>
                Let's build something{" "}
                <span className="gradient-text">extraordinary</span>.
              </h2>
              <p className="ag-section-desc" style={{ textAlign: "center", maxWidth: "480px", margin: "0 auto 40px" }}>
                Open to full-time software engineering roles, freelance projects, and high-impact collaborations.
              </p>
              <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                <a href="mailto:chethanalakthilina3@gmail.com" className="btn btn-primary">
                  <Mail size={15} /> chethanalakthilina3@gmail.com
                </a>
                <a href="https://linkedin.com/in/chethana-jathunarachchi-2ba45b281" target="_blank" rel="noreferrer" className="btn btn-secondary">
                  <Linkedin size={15} /> LinkedIn
                </a>
                <a href="https://github.com/CLTWINGZ" target="_blank" rel="noreferrer" className="btn btn-secondary">
                  <Github size={15} /> GitHub
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="ag-footer">
        <div className="ag-footer-inner">
          <div className="ag-footer-top">
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div className="ag-nav-logo">CL</div>
              <div>
                <div className="ag-nav-wordmark">Chethana Lakthilina Jathunarachchi</div>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                  Software Engineering (Fresh Graduate) · Full-Stack Developer · Sri Lanka
                </p>
              </div>
            </div>
            <div className="ag-footer-social">
              <a href="https://github.com/CLTWINGZ" target="_blank" rel="noreferrer" className="ag-social-link" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/chethana-jathunarachchi-2ba45b281" target="_blank" rel="noreferrer" className="ag-social-link" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="mailto:chethanalakthilina3@gmail.com" className="ag-social-link" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>
          <div className="ag-footer-copy">
            <span>© {new Date().getFullYear()} Chethana Lakthilina Jathunarachchi · All rights reserved.</span>
            <span className="footer-badge">
              <Zap size={12} fill="currentColor" />
              ENGINEERED FOR LIFTOFF
            </span>
          </div>
        </div>
      </footer>
    </div >
  );
}

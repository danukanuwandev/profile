import { useState, useEffect, useRef } from "react";
import profileImg from "./assets/profile.png";

const NAV_ITEMS = ["Home", "Services", "About", "Contact"];

const PROJECTS = [
  {
    id: 1,
    title: "",
    desc: "",
    image: "",
    tech: ["", "", ""],
    year: "",
    color: "#fff",
  },
  {
    id: 2,
    title: "",
    desc: "",
    image: "",
    tech: ["", "", ""],
    year: "",
    color: "#aaa",
  },
  {
    id: 3,
    title: "",
    desc: "",
    image: "",
    tech: ["", "", ""],
    year: "",
    color: "#888",
  },
];

const SERVICES = [
  { icon: "⬡", title: "Web Development", desc: "End-to-end web apps built to scale" },
  { icon: "✧", title: "Mobile application Development", desc: "High-performance Android & iOS apps" },
  { icon: "◈", title: "UI/UX Design", desc: "Interfaces users love to use" },
  { icon: "⬢", title: "API Integration", desc: "Seamless third-party connections" },
  { icon: "✦", title: "Software Solutions/ Pos system", desc: "Custom desktop & business software" },
  { icon: "◉", title: "Consulting", desc: "Tech strategy & architecture" },
];

const MiniGraph = () => (
  <div style={{
    width: "160px", height: "80px",
    background: "rgba(255, 77, 77, 0.03)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 77, 77, 0.1)",
    padding: "12px",
    position: "relative",
    overflow: "hidden"
  }}>
    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#555", marginBottom: "8px" }}>GROWTH RATE</div>
    <svg width="100%" height="40" viewBox="0 0 100 40" preserveAspectRatio="none" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="graphGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 77, 77, 0.4)" />
          <stop offset="100%" stopColor="rgba(255, 77, 77, 0)" />
        </linearGradient>
      </defs>
      <path
        d="M 0 35 C 20 35, 30 10, 50 20 C 70 30, 80 5, 100 5 V 40 H 0 Z"
        fill="url(#graphGradient)"
      />
      <path
        d="M 0 35 C 20 35, 30 10, 50 20 C 70 30, 80 5, 100 5"
        fill="none"
        stroke="#ff4d4d"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: "250",
          strokeDashoffset: "250",
          animation: "drawGraph 3s cubic-bezier(0.4, 0, 0.2, 1) forwards"
        }}
      />
    </svg>
    <style>{`
      @keyframes drawGraph {
        to { stroke-dashoffset: 0; }
      }
    `}</style>
  </div>
);

const SKILLS = ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express.js", "Python", "HTML5", "CSS3", "Tailwind CSS", "PostgreSQL", "MongoDB", "Redis", "Prisma", "GraphQL", "REST API", "AWS", "Docker", "Firebase", "Git", "Figma"];

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [contactSent, setContactSent] = useState(false);
  const heroRef = useRef(null);

  const getSubmissions = () => {
    try { return JSON.parse(localStorage.getItem("contact_submissions") || "[]"); }
    catch { return []; }
  };

  const handleContactSubmit = async () => {
    if (!contactForm.name || !contactForm.email || !contactForm.phone || !contactForm.subject || !contactForm.message) {
      alert("Please fill in all fields.");
      return;
    }

    const webhookUrl = "https://discord.com/api/webhooks/1516304316649050192/GN5Zh9CPpJZ1g8vo-LJwC5GRxuYMh5Mm797CWPDtMNyc6v9cAFFHN8dV_jnG4NIm3FHF";

    const embed = {
      title: "New Contact Submission 📬",
      color: 16731469, // #ff0000ff in decimal
      fields: [
        { name: "Name", value: contactForm.name, inline: true },

        { name: "Email", value: contactForm.email },

        { name: "Phone", value: contactForm.phone },

        { name: "Subject", value: contactForm.subject },

        { name: "Message", value: contactForm.message }
      ],
      timestamp: new Date().toISOString()
    };

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: "@Danuka Nuwan", embeds: [embed] })
      });

      setContactForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setContactSent(true);
      setTimeout(() => setContactSent(false), 3000);
    } catch (error) {
      console.error("Failed to send message to Discord:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);

    const handleHoverEnter = () => setIsHovered(true);
    const handleHoverLeave = () => setIsHovered(false);

    document.querySelectorAll("button, a, .project-card").forEach(el => {
      el.addEventListener("mouseenter", handleHoverEnter);
      el.addEventListener("mouseleave", handleHoverLeave);
    });

    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActive(id);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#000000",
      color: "#fff",
      fontFamily: "'Syne', sans-serif",
      position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { display: none; }
        html, body { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }
        @keyframes slideIn {
          from { transform: translateX(-60px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .nav-btn {
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.15);
          color: #aaa;
          padding: 10px 20px;
          border-radius: 100px;
          cursor: pointer;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.02em;
          transition: all 0.25s ease;
        }
        .nav-btn:hover, .nav-btn.active {
          background: #fff;
          color: #080808;
          border-color: #fff;
        }

        .hero-title {
          font-size: clamp(56px, 8vw, 96px);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.03em;
        }

        .cursor-dot {
          pointer-events: none;
          position: fixed;
          top: 0; left: 0;
          width: 6px;
          height: 6px;
          background: #ff4d4d;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          z-index: 10001;
          transition: transform 0.05s linear;
        }

        .cursor-ring {
          pointer-events: none;
          position: fixed;
          top: 0; left: 0;
          width: ${isHovered ? "70px" : "34px"};
          height: ${isHovered ? "70px" : "34px"};
          border: 0.8px solid ${isHovered ? "#ff4d4d" : "rgba(255, 255, 255, 0.4)"};
          border-radius: 50%;
          transform: translate(-50%, -50%);
          z-index: 10000;
          transition: width 0.4s cubic-bezier(0.23, 1, 0.32, 1), 
                      height 0.4s cubic-bezier(0.23, 1, 0.32, 1),
                      border-color 0.4s ease;
          display: flex;
          alignItems: center;
          justifyContent: center;
        }

        .cursor-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: #ff4d4d;
          font-weight: 500;
          letter-spacing: 0.1em;
          opacity: ${isHovered ? 1 : 0};
          transition: opacity 0.3s ease;
          text-transform: uppercase;
        }

        .noise-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          opacity: 0.04;
          background-image: url('https://grainy-gradients.vercel.app/noise.svg');
          filter: contrast(150%) brightness(150%);
        }

        @keyframes drift {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(100px, 100px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }

        .tech-symbol {
          position: fixed;
          font-family: 'DM Mono', monospace;
          color: rgba(255, 255, 255, 0.08);
          user-select: none;
          pointer-events: none;
          z-index: 1;
          animation: drift 40s infinite linear;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        .bg-blob {
          position: fixed;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.15;
          z-index: 1;
          pointer-events: none;
        }

        .project-card {
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 32px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          background: rgba(255,255,255,0.02);
        }
        .project-card:hover {
          border-color: rgba(255,77,77,0.3);
          background: rgba(255,77,77,0.03);
          transform: translateY(-8px) scale(1.02);
        }
        .project-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--accent);
          transform: scaleX(0);
          transition: transform 0.3s ease;
          transform-origin: left;
        }
        .project-card:hover::before {
          transform: scaleX(1);
        }

        .skill-tag {
          display: inline-block;
          padding: 6px 14px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.15);
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          color: #888;
          transition: all 0.2s;
        }
        .skill-tag:hover {
          border-color: #ff4d4d;
          color: #ff4d4d;
        }

        .cta-btn {
          padding: 14px 32px;
          border-radius: 100px;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          letter-spacing: 0.01em;
        }
        .cta-primary {
          background: #fff;
          color: #080808;
          border: none;
        }
        .cta-primary:hover {
          background: #ff4d4d;
          color: #fff;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(255, 77, 77, 0.3);
        }
        .cta-outline {
          background: transparent;
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.3);
        }
        .cta-outline:hover {
          border-color: #fff;
          transform: translateY(-3px);
          background: rgba(255,255,255,0.05);
        }

        .service-card {
          padding: 28px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          transition: all 0.3s;
          background: rgba(255,255,255,0.02);
        }
        .service-card:hover {
          background: rgba(255,77,77,0.05);
          border-color: rgba(255,77,77,0.3);
          transform: translateY(-5px);
        }

        .reveal {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .marquee-wrapper {
          overflow: hidden;
          white-space: nowrap;
        }
        .marquee-track {
          display: inline-block;
          animation: marquee 18s linear infinite;
        }

        .form-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 14px 18px;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-input:focus {
          border-color: rgba(255,77,77,0.6);
        }
        .form-input::placeholder {
          color: #444;
        }
      `}</style>

      {/* Background Tech Symbols */}
      {[
        { s: "{ }", t: "15%", l: "10%", f: "80px" },
        { s: "[ ]", t: "65%", l: "85%", f: "100px" },
        { s: "< />", t: "25%", l: "80%", f: "120px" },
        { s: "=>", t: "75%", l: "15%", f: "90px" },
        { s: "( )", t: "45%", l: "50%", f: "110px" },
        { s: "&&", t: "10%", l: "70%", f: "70px" }
      ].map((item, i) => (
        <div key={i} className="tech-symbol" style={{
          top: item.t,
          left: item.l,
          fontSize: item.f,
          animationDelay: `${i * -5}s`,
          opacity: 0.6
        }}>
          {item.s}
        </div>
      ))}

      {/* Creative Overlays */}
      <div className="noise-overlay" />
      <div className="bg-blob" style={{
        background: "rgba(255, 255, 255, 0.15)",
        top: "-10%", left: "-10%",
        animation: "float 20s infinite alternate ease-in-out"
      }} />
      <div className="bg-blob" style={{
        background: "rgba(150, 150, 150, 0.1)",
        bottom: "-10%", right: "-10%",
        animation: "float 25s infinite alternate-reverse ease-in-out"
      }} />

      {/* Professional Agency Cursor */}
      <div className="cursor-dot" style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }} />
      <div className="cursor-ring" style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)`, transition: "transform 0.2s cubic-bezier(0.23, 1, 0.32, 1), width 0.4s ease, height 0.4s ease, border-color 0.4s ease" }}>
        <span className="cursor-label">View</span>
      </div>

      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        backdropFilter: "blur(20px)",
        background: "rgba(0,0,0,0.95)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#fff", letterSpacing: "0.1em" }}>
          danukanuwan<span style={{ color: "#555" }}>.dev</span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {NAV_ITEMS.map(item => (
            <button key={item} className={`nav-btn ${active === item ? "active" : ""}`} onClick={() => scrollToSection(item)}>
              {item}
            </button>
          ))}
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 14px",
          background: "rgba(77, 255, 180, 0.05)",
          borderRadius: "100px",
          border: "1px solid rgba(77, 255, 180, 0.2)",
          boxShadow: "0 0 15px rgba(77, 255, 180, 0.05)"
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#4dffb4",
            display: "inline-block",
            animation: "pulse 2s infinite",
            boxShadow: "0 0 10px #4dffb4"
          }} />
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "12px",
            color: "#4dffb4",
            fontWeight: 500,
            letterSpacing: "0.02em"
          }}>Available</span>
        </div>
      </nav>

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 10, paddingTop: "80px" }}>

        {/* ── HOME ── */}
        <section id="Home">
          <div style={{
            minHeight: "100vh", display: "flex", alignItems: "center",
            padding: "0 40px", maxWidth: "1200px", margin: "0 auto",
            gap: "80px",
          }}>
            {/* Photo & Creative Element */}
            <div style={{
              flexShrink: 0, position: "relative",
              animation: loaded ? "slideIn 0.9s ease forwards" : "none",
            }}>
              {/* Creative Animated HUD Element */}
              <div style={{
                position: "absolute",
                top: "-100px",
                left: "-60px",
                width: "180px",
                height: "180px",
                zIndex: 5,
                pointerEvents: "none"
              }}>
                <div style={{
                  position: "absolute",
                  inset: 0,
                  border: "1px dashed rgba(255, 77, 77, 0.2)",
                  borderRadius: "50%",
                  animation: "spin 15s linear infinite"
                }} />
                <div style={{
                  position: "absolute",
                  inset: "20px",
                  border: "1.5px solid rgba(255, 77, 77, 0.15)",
                  borderRadius: "50%",
                  animation: "spin 8s linear reverse infinite",
                  borderLeftColor: "#ff4d4d",
                  borderRightColor: "#ff4d4d"
                }} />
                <div style={{
                  position: "absolute",
                  inset: "40px",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "radial-gradient(circle, rgba(255, 77, 77, 0.05) 0%, transparent 70%)"
                }}>
                  <div style={{
                    width: "8px",
                    height: "8px",
                    background: "#ff4d4d",
                    borderRadius: "50%",
                    boxShadow: "0 0 15px #ff4d4d",
                    animation: "pulse 1.5s infinite"
                  }} />
                </div>
                {/* Floating Tech Labels */}
                <div style={{
                  position: "absolute",
                  top: "10%",
                  left: "90%",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "9px",
                  color: "#ff4d4d",
                  letterSpacing: "0.1em",
                  opacity: 0.8
                }}>01.0011</div>
                <div style={{
                  position: "absolute",
                  bottom: "20%",
                  right: "100%",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "9px",
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.1em",
                  transform: "rotate(-90deg)"
                }}>SYSTEM ACTIVE</div>
              </div>

              <div style={{
                width: 360, height: 440,
                borderRadius: "24px",
                background: "linear-gradient(135deg, #000000 0%, #0a0a0a 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden", position: "relative",
              }}>
                <img
                  src={profileImg}
                  alt="Danuka Nuwan"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "grayscale(20%) contrast(110%)",
                  }}
                />
              </div>
              {/* Decorative */}
              <div style={{
                position: "absolute", top: -16, right: -16,
                width: 60, height: 60, borderRadius: "50%",
                border: "1.5px solid rgba(255,77,77,0.4)",
                animation: "spin 12s linear infinite",
              }}>
                <div style={{ position: "absolute", top: -3, left: "50%", transform: "translateX(-50%)", width: 6, height: 6, borderRadius: "50%", background: "#ff4d4d", boxShadow: "0 0 10px rgba(255, 77, 77, 0.5)" }} />
              </div>
              <div style={{
                position: "absolute", bottom: -20, left: -20,
                fontFamily: "'DM Mono', monospace", fontSize: "11px",
                color: "#ff4d4d", letterSpacing: "0.15em",
                writingMode: "vertical-rl", transform: "rotate(180deg)",
              }}>FULL-STACK · SRI LANKA</div>
            </div>

            {/* Text */}
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "'DM Mono', monospace", fontSize: "12px",
                color: "#ff4d4d", letterSpacing: "0.2em", marginBottom: "24px",
                animation: loaded ? "fadeUp 0.7s 0.2s both" : "none",
              }}>
                ● DANUKA NUWAN
              </div>

              <h1 className="hero-title" style={{
                animation: loaded ? "fadeUp 0.8s 0.35s both" : "none",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}>
                <span style={{
                  background: "linear-gradient(180deg, #fff 0%, #bbb 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                  textShadow: "0 10px 30px rgba(255,255,255,0.1)",
                  whiteSpace: "nowrap"
                }}>
                  Full-stack
                </span>
                <span style={{
                  background: "linear-gradient(180deg, #fff 0%, #bbb 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  position: "relative",
                  display: "inline-block",
                  paddingRight: "20px",
                  fontWeight: 800,
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap"
                }}>
                  developer
                  <span style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "10px",
                    height: "10px",
                    background: "#ff4d4d",
                    borderRadius: "50%",
                    boxShadow: "0 0 15px rgba(255, 77, 77, 0.6)",
                    animation: "pulse 2s infinite"
                  }} />
                </span>
              </h1>

              <p style={{
                marginTop: "24px",
                fontSize: "22px",
                color: "#fff",
                lineHeight: "1.6",
                maxWidth: "600px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                animation: loaded ? "fadeUp 0.8s 0.5s both" : "none",
                letterSpacing: "-0.01em",
                paddingBottom: "8px"
              }}>
                Crafting scalable websites, web applications, and<br />
                complete full-stack solutions that users love.
              </p>
              <p style={{
                marginTop: "16px",
                fontSize: "15px",
                color: "#555",
                fontFamily: "'DM Mono', monospace",
                animation: loaded ? "fadeUp 0.8s 0.6s both" : "none",
                lineHeight: "1.6"
              }}>
                Currently leading development at <span style={{ color: "#fff", fontWeight: 500 }}>NetchX™</span> from Sri Lanka.<br />
                & constantly expanding my expertise in modern technologies.
              </p>

              {/* Skills marquee */}
              <div style={{
                margin: "32px 0",
                animation: loaded ? "fadeUp 0.8s 0.6s both" : "none",
                position: "relative"
              }}>
                <div style={{
                  position: "absolute", left: 0, top: 0, bottom: 0, width: "60px",
                  background: "linear-gradient(to right, #000, transparent)", zIndex: 2, pointerEvents: "none"
                }} />
                <div style={{
                  position: "absolute", right: 0, top: 0, bottom: 0, width: "60px",
                  background: "linear-gradient(to left, #000, transparent)", zIndex: 2, pointerEvents: "none"
                }} />

                <div className="marquee-wrapper" style={{ width: "100%", maxWidth: "600px", display: "flex" }}>
                  <div className="marquee-track" style={{ animationDuration: "35s" }}>
                    {[...SKILLS, ...SKILLS].map((s, i) => (
                      <span key={i} style={{
                        display: "inline-block", marginRight: "12px",
                        padding: "8px 18px",
                        borderRadius: "100px",
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        fontFamily: "'DM Mono', monospace", fontSize: "12px",
                        color: "#ddd",
                        letterSpacing: "0.05em",
                        transition: "all 0.3s ease"
                      }}>
                        <span style={{ color: "#ff4d4d", marginRight: "6px" }}>✦</span>{s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{
                display: "flex", gap: "48px", marginTop: "32px",
                paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.06)",
                animation: loaded ? "fadeUp 0.8s 0.85s both" : "none",
              }}>
                {[["2+", "Years"], ["20+", "Projects"], ["100%", "Satisfaction"]].map(([num, label]) => (
                  <div key={label} style={{ textAlign: "left" }}>
                    <div style={{
                      fontSize: "32px",
                      fontWeight: 800,
                      color: "#fff",
                      fontFamily: "'Poppins', sans-serif",
                      background: "linear-gradient(90deg, #fff, #888)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      letterSpacing: "-0.02em"
                    }}>{num}</div>
                    <div style={{
                      fontSize: "13px",
                      color: "#aaa",
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      marginTop: "2px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em"
                    }}>{label}</div>
                  </div>
                ))}
                <div style={{ marginLeft: "auto" }}>
                  <MiniGraph />
                </div>
              </div>

              <div style={{
                display: "flex", gap: "12px", marginTop: "32px",
                animation: loaded ? "fadeUp 0.8s 0.9s both" : "none",
              }}>
                <button className="cta-primary cta-btn" onClick={() => scrollToSection("About")}>About Me →</button>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="Services" className="reveal">
          <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "100px 40px" }}>
            <div style={{ marginBottom: "60px" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#ff4d4d", letterSpacing: "0.2em", marginBottom: "16px" }}>
                02 / SERVICES
              </div>
              <h2 style={{ fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.03em" }}>
                What I<br /><span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.25)" }}>offer</span>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "60px" }}>
              {SERVICES.map((s) => (
                <div key={s.title} className="service-card">
                  <div style={{ fontSize: "28px", marginBottom: "16px" }}>{s.icon}</div>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px" }}>{s.title}</h3>
                  <p style={{ fontSize: "14px", color: "#666" }}>{s.desc}</p>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "48px" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#555", marginBottom: "20px", letterSpacing: "0.1em" }}>
                TECH STACK
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {SKILLS.map(s => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="About" className="reveal">
          <div style={{ maxWidth: "900px", margin: "0 auto", padding: "100px 40px" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#ff4d4d", letterSpacing: "0.2em", marginBottom: "16px" }}>
              03 / ABOUT
            </div>
            <h2 style={{ fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "48px" }}>
              The person<br /><span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.25)" }}>behind the code</span>
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
              <div>
                <p style={{ fontSize: "16px", color: "#aaa", lineHeight: "1.8", marginBottom: "20px" }}>
                  I'm <strong style={{ color: "#fff" }}>Danuka Nuwan</strong>, a full-stack developer from Sri Lanka with a passion for building digital products that are both powerful and beautiful.
                </p>
                <p style={{ fontSize: "16px", color: "#aaa", lineHeight: "1.8", marginBottom: "20px" }}>
                  Currently leading development at <strong style={{ color: "#fff" }}>NetchX™</strong>, I specialize in React ecosystems, Node.js backends, and crafting delightful user experiences.
                </p>
                <p style={{ fontSize: "16px", color: "#aaa", lineHeight: "1.8" }}>
                  When not coding, I'm probably exploring design trends, contributing to open source, or sipping a good cup of tea. ☕
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  ["Location", "🇱🇰 Sri Lanka"],
                  ["Role", "Full-stack Developer"],
                  ["Company", "NetchX™"],
                  ["Focus", "React, Node.js, Cloud"],
                  ["Status", "✅ Open to projects"],
                  ["Experience", "3+ years"],
                ].map(([k, v]) => (
                  <div key={k} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "14px 20px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.02)",
                  }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#555" }}>{k}</span>
                    <span style={{ fontSize: "14px", color: "#ccc" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="Contact" className="reveal">
          <div style={{ maxWidth: "700px", margin: "0 auto", padding: "100px 40px" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#ff4d4d", letterSpacing: "0.2em", marginBottom: "16px" }}>
              05 / CONTACT
            </div>
            <h2 style={{ fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "16px" }}>
              Let's build<br /><span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.25)" }}>something</span>
            </h2>
            <p style={{ fontSize: "16px", color: "#666", marginBottom: "48px" }}>
              Available for freelance projects and collaborations.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", gap: "16px" }}>
                <input className="form-input" style={{ flex: 1 }} placeholder="Your name" value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} />
                <input className="form-input" style={{ flex: 1 }} placeholder="+94 7X XXX XXXX" type="tel" value={contactForm.phone} onChange={e => setContactForm({ ...contactForm, phone: e.target.value })} />
              </div>
              <input className="form-input" placeholder="your@email.com" value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} />
              <input className="form-input" placeholder="Subject" value={contactForm.subject} onChange={e => setContactForm({ ...contactForm, subject: e.target.value })} />
              <textarea className="form-input" rows={5} placeholder="Tell me about your project..." style={{ resize: "vertical" }} value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })} />
              {contactSent ? (
                <div style={{ padding: "14px 32px", borderRadius: "100px", background: "rgba(77,255,180,0.1)", border: "1px solid rgba(77,255,180,0.3)", color: "#4dffb4", fontFamily: "'DM Mono', monospace", fontSize: "14px", fontWeight: 600, textAlign: "center" }}>✓ Message sent successfully!</div>
              ) : (
                <button className="cta-primary cta-btn" style={{ alignSelf: "flex-start" }} onClick={handleContactSubmit}>
                  Send Message →
                </button>
              )}
            </div>

            <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#555", marginBottom: "16px", letterSpacing: "0.1em" }}>
                OR REACH ME AT
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                {["GitHub", "LinkedIn", "Twitter", "Email"].map(l => (
                  <a key={l} href="#" style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "13px",
                    color: "#666", textDecoration: "none",
                    transition: "color 0.2s",
                    padding: "8px 16px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "100px",
                  }}
                    onMouseEnter={e => e.target.style.color = "#ff4d4d"}
                    onMouseLeave={e => e.target.style.color = "#666"}
                  >{l}</a>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Footer bar */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        padding: "14px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "rgba(8,8,8,0.9)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        zIndex: 100,
      }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#333" }}>
          © 2024 Danuka Nuwan
        </span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#333" }}>
          danukanuwan.page.gd
        </span>
      </div>
    </div>
  );
}

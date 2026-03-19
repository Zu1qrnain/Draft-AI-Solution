"use client";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Projects Delivered", value: "50+", delay: 0 },
  { label: "Happy Clients", value: "40+", delay: 100 },
  { label: "Client Satisfaction", value: "98%", delay: 200 },
  { label: "Support Available", value: "24/7", delay: 300 },
];

function useCounter(target, duration = 1800, delay = 0) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay + 800);
    return () => clearTimeout(t);
  }, [delay]);
  useEffect(() => {
    if (!started) return;
    const numeric = parseInt(target);
    if (isNaN(numeric)) return;
    let current = 0;
    const step = numeric / (duration / 16);
    const interval = setInterval(() => {
      current += step;
      if (current >= numeric) { setCount(numeric); clearInterval(interval); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(interval);
  }, [started, target, duration]);
  return count;
}

function StatCard({ stat }) {
  const numeric = parseInt(stat.value);
  const suffix = stat.value.replace(/[0-9]/g, "");
  const count = useCounter(numeric, 1800, stat.delay);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        padding: "1.25rem",
        borderRadius: "1rem",
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(8px)",
        overflow: "hidden",
        transition: "all 0.3s ease",
        cursor: "default",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(16,185,129,0.3)";
        e.currentTarget.style.background = "rgba(16,185,129,0.05)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
      }}
    >
      <span style={{ fontFamily: "monospace", fontSize: "clamp(1.6rem,3.5vw,2.2rem)", fontWeight: 700, color: "#10b981", letterSpacing: "-0.02em" }}>
      {isNaN(numeric) || stat.value.includes("/") ? stat.value : `${count}${suffix}`}
      </span>
      <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>{stat.label}</span>
    </div>
  );
}

const css = `
  @keyframes heroFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes heroPing {
    75%, 100% { transform: scale(2.2); opacity: 0; }
  }
  @keyframes heroPulse {
    0%, 100% { opacity: 0.15; }
    50% { opacity: 0.28; }
  }
  @keyframes heroBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(5px); }
  }
  .hero-anim-1 { animation: heroFadeUp 0.65s ease both; animation-delay: 0.1s; }
  .hero-anim-2 { animation: heroFadeUp 0.65s ease both; animation-delay: 0.25s; }
  .hero-anim-3 { animation: heroFadeUp 0.65s ease both; animation-delay: 0.42s; }
  .hero-anim-4 { animation: heroFadeUp 0.65s ease both; animation-delay: 0.58s; }
  .hero-anim-5 { animation: heroFadeUp 0.65s ease both; animation-delay: 0.72s; }
  .hero-ping { animation: heroPing 1.5s cubic-bezier(0,0,0.2,1) infinite; }
  .hero-orb-1 { animation: heroPulse 8s ease-in-out infinite; }
  .hero-orb-2 { animation: heroPulse 12s ease-in-out infinite 2s; }
  .hero-orb-3 { animation: heroPulse 10s ease-in-out infinite 1s; }
  .hero-bounce { animation: heroBounce 1.2s ease-in-out infinite; }
  .hero-gradient-text {
    background: linear-gradient(to right, #6ee7b7, #10b981, #2dd4bf);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hero-btn-primary {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    height: 48px; padding: 0 28px; border-radius: 9999px;
    background: #10b981; color: #000; font-size: 14px; font-weight: 600;
    text-decoration: none; border: none; cursor: pointer;
    box-shadow: 0 0 30px rgba(16,185,129,0.5);
    transition: background 0.3s, box-shadow 0.3s, transform 0.2s;
  }
  .hero-btn-primary:hover {
    background: #34d399;
    box-shadow: 0 0 50px rgba(16,185,129,0.75);
    transform: scale(1.04);
  }
  .hero-btn-primary:active { transform: scale(0.97); }
  .hero-btn-primary .arrow-icon { transition: transform 0.3s; }
  .hero-btn-primary:hover .arrow-icon { transform: translateX(4px); }
  .hero-btn-secondary {
    display: inline-flex; align-items: center; justify-content: center;
    height: 48px; padding: 0 28px; border-radius: 9999px;
    border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04);
    color: #e2e8f0; font-size: 14px; font-weight: 500;
    text-decoration: none; cursor: pointer;
    backdrop-filter: blur(8px);
    transition: border-color 0.3s, background 0.3s, color 0.3s, transform 0.2s;
  }
  .hero-btn-secondary:hover {
    border-color: rgba(16,185,129,0.4);
    background: rgba(16,185,129,0.08);
    color: #fff;
    transform: scale(1.04);
  }
  .hero-btn-secondary:active { transform: scale(0.97); }
`;

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section
        style={{
          position: "relative",
          width: "100vw",
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: "5rem 1.5rem",
          boxSizing: "border-box",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
        }}
      >
        {/* ── Background ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, background: "#050a0e" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% -5%, rgba(16,185,129,0.22), transparent)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 65% 55% at 88% 88%, rgba(6,78,59,0.3), transparent)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 45% at 8% 55%, rgba(16,185,129,0.1), transparent)" }} />
          {/* Orbs */}
          <div className="hero-orb-1" style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "#10b981", filter: "blur(110px)", opacity: 0.18, top: "-20%", left: "12%" }} />
          <div className="hero-orb-2" style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "#0d9488", filter: "blur(100px)", opacity: 0.2, bottom: "5%", right: "3%" }} />
          <div className="hero-orb-3" style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", background: "#10b981", filter: "blur(90px)", opacity: 0.12, top: "40%", left: "-8%" }} />
          {/* Grid */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "linear-gradient(rgba(148,163,184,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,1) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
          {/* Vignette */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 30%, rgba(5,10,14,0.88) 100%)" }} />
        </div>

        {/* ── Main Content ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: "64rem",
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
            textAlign: "center",
          }}
        >
          {/* Badge */}
          <div
            className="hero-anim-1"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              borderRadius: 9999,
              border: "1px solid rgba(16,185,129,0.3)",
              background: "rgba(16,185,129,0.08)",
              padding: "6px 16px",
              fontSize: "0.8rem",
              fontWeight: 500,
              color: "#6ee7b7",
              backdropFilter: "blur(10px)",
            }}
          >
            <Sparkles style={{ width: 14, height: 14, color: "#10b981", flexShrink: 0 }} />
            <span>AI-Powered Solutions for Modern Businesses</span>
            <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8, marginLeft: 4 }}>
              <span className="hero-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#10b981", opacity: 0.7 }} />
              <span style={{ position: "relative", width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
            </span>
          </div>

          {/* Headline */}
          <div className="hero-anim-2" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(2.4rem, 6.5vw, 4.8rem)",
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                color: "#fff",
              }}
            >
              Build Your{" "}
              <span style={{ position: "relative", display: "inline-block" }}>
                <span className="hero-gradient-text">Future</span>
                <span style={{ position: "absolute", bottom: -2, left: 0, height: 3, width: "100%", borderRadius: 9999, background: "linear-gradient(to right, rgba(16,185,129,0.5), #10b981, transparent)" }} />
              </span>
              <br />
              with{" "}
              <span className="hero-gradient-text">AI-Powered</span>{" "}
              Solutions
            </h1>
            <p style={{ margin: "0 auto", maxWidth: "42rem", fontSize: "clamp(0.875rem, 1.6vw, 1.05rem)", color: "#94a3b8", lineHeight: 1.75 }}>
              We transform businesses through innovative{" "}
              <strong style={{ color: "#cbd5e1", fontWeight: 500 }}>AI Ads</strong>,{" "}
              <strong style={{ color: "#cbd5e1", fontWeight: 500 }}>Automation</strong>, and{" "}
              <strong style={{ color: "#cbd5e1", fontWeight: 500 }}>Web Development</strong>.{" "}
              Your success story starts here.
            </p>
          </div>

          {/* CTAs */}
          <div
            className="hero-anim-3"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <a href="#contact" className="hero-btn-primary">
              Get Started
              <ArrowRight className="arrow-icon" style={{ width: 16, height: 16 }} />
            </a>
            <a href="#portfolio" className="hero-btn-secondary">
              View Our Work
            </a>
          </div>

          {/* Divider */}
          <div className="hero-anim-4" style={{ width: "100%", maxWidth: "28rem", height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)" }} />

          {/* Stats */}
          <div
            className="hero-anim-4"
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0.75rem",
            }}
          >
            <style>{`@media(min-width:768px){ .stats-inner { grid-template-columns: repeat(4, 1fr) !important; gap: 1rem !important; } }`}</style>
            <div
              className="stats-inner"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "0.75rem",
                width: "100%",
                gridColumn: "1 / -1",
              }}
            >
              {stats.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="hero-anim-5" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#475569" }}>Scroll to explore</span>
            <div style={{ display: "flex", width: 20, height: 32, alignItems: "flex-start", justifyContent: "center", borderRadius: 9999, border: "1px solid rgba(255,255,255,0.1)", padding: 4 }}>
              <div className="hero-bounce" style={{ width: 2, height: 6, borderRadius: 9999, background: "#10b981" }} />
            </div>
          </div>
        </div>

        {/* Grain overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none", opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat", backgroundSize: "128px",
        }} />
      </section>
    </>
  );
}
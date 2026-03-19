"use client";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "Draft Solution AI built our LLM support agents in weeks. 80% of tickets now resolve automatically — our team finally focuses on work that actually matters.",
    name: "Sarah Mitchell",
    role: "Head of Customer Success",
    company: "NeuralDesk",
    initials: "SM",
    gradient: "linear-gradient(135deg, #10b981, #06b6d4)",
    accent: "#10b981",
    metric: "80%",
    metricLabel: "Tickets automated",
  },
  {
    quote:
      "Our UGC ad creatives used to take weeks and cost a fortune. Draft's AI ad system produces 50+ variations in hours — and our ROAS went from 1.2× to 3.8×.",
    name: "Omar Farooq",
    role: "Performance Marketing Lead",
    company: "ViralCraft",
    initials: "OF",
    gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
    accent: "#f59e0b",
    metric: "3.8×",
    metricLabel: "Return on ad spend",
  },
  {
    quote:
      "They orchestrated our entire logistics workflow across 12 regions with multi-agent automation. Cycle times dropped 2.3× and downtime is basically zero now.",
    name: "Chen Wei",
    role: "VP of Operations",
    company: "FlowChain",
    initials: "CW",
    gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    accent: "#06b6d4",
    metric: "2.3×",
    metricLabel: "Faster cycle time",
  },
  {
    quote:
      "We needed a full SaaS platform fast. Draft delivered a production-ready product in 6 weeks — beautiful design, sub-1s load times, and zero downtime since launch.",
    name: "Anika Patel",
    role: "Founder & CEO",
    company: "LaunchPad",
    initials: "AP",
    gradient: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    accent: "#8b5cf6",
    metric: "6 weeks",
    metricLabel: "POC to production",
  },
];

const css = `
  .ts-card {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.6s ease, transform 0.6s ease,
                border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .ts-card.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .ts-card:hover {
    transform: translateY(-6px) !important;
  }
  .ts-glow {
    position: absolute; inset: 0; border-radius: inherit;
    opacity: 0; transition: opacity 0.4s ease; pointer-events: none;
  }
  .ts-card:hover .ts-glow { opacity: 1; }
  .ts-quote-icon {
    transition: transform 0.4s ease, opacity 0.4s ease;
    opacity: 0.15;
  }
  .ts-card:hover .ts-quote-icon {
    transform: scale(1.1) rotate(-5deg);
    opacity: 0.25;
  }
  .ts-avatar {
    transition: transform 0.35s ease;
  }
  .ts-card:hover .ts-avatar {
    transform: scale(1.08);
  }
  .ts-metric {
    transition: transform 0.3s ease;
    display: inline-block;
  }
  .ts-card:hover .ts-metric {
    transform: scale(1.06);
  }
  .ts-header-anim {
    opacity: 0; transform: translateY(20px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .ts-header-anim.visible { opacity: 1; transform: translateY(0); }
`;

function QuoteIcon({ color }) {
  return (
    <svg
      className="ts-quote-icon"
      width="52" height="40" viewBox="0 0 52 40"
      fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
    >
      <path
        d="M0 40V24.8C0 18.4 1.6 13.2 4.8 9.2C8 5.2 12.8 2.4 19.2 0.8L21.6 5.6C18.4 6.8 15.8 8.8 13.8 11.6C11.8 14.4 10.8 17.2 10.8 20H20V40H0ZM32 40V24.8C32 18.4 33.6 13.2 36.8 9.2C40 5.2 44.8 2.4 51.2 0.8L53.6 5.6C50.4 6.8 47.8 8.8 45.8 11.6C43.8 14.4 42.8 17.2 42.8 20H52V40H32Z"
        fill={color}
      />
    </svg>
  );
}

function TestimonialCard({ t, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <figure
      ref={ref}
      className={`ts-card${visible ? " visible" : ""}`}
      style={{
        transitionDelay: visible ? `${index * 120}ms` : "0ms",
        margin: 0,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        borderRadius: "1.375rem",
        border: "1px solid rgba(255,255,255,0.07)",
        background: "linear-gradient(160deg, rgba(15,23,42,0.95) 0%, rgba(2,6,23,0.98) 100%)",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = t.accent + "45";
        e.currentTarget.style.boxShadow = `0 0 45px ${t.accent}12, 0 24px 48px rgba(0,0,0,0.5)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top accent stripe */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 2, background: t.gradient, opacity: 0.55,
      }} />

      {/* Glow */}
      <div className="ts-glow"
        style={{ background: `radial-gradient(ellipse at top, ${t.accent}10, transparent 60%)` }}
      />

      {/* Body */}
      <div style={{ padding: "1.875rem", display: "flex", flexDirection: "column", gap: "1.5rem", flex: 1 }}>

        {/* Quote icon + metric */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <QuoteIcon color={t.accent} />
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2,
            padding: "6px 12px", borderRadius: "0.75rem",
            background: t.accent + "10", border: `1px solid ${t.accent}25`,
          }}>
            <span className="ts-metric" style={{
              fontSize: "1rem", fontWeight: 800, color: t.accent,
              letterSpacing: "-0.02em", lineHeight: 1,
            }}>
              {t.metric}
            </span>
            <span style={{
              fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", color: t.accent, opacity: 0.6, whiteSpace: "nowrap",
            }}>
              {t.metricLabel}
            </span>
          </div>
        </div>

        {/* Quote */}
        <blockquote style={{
          margin: 0,
          fontSize: "clamp(0.875rem, 1.3vw, 0.95rem)",
          color: "#cbd5e1", lineHeight: 1.8, flex: 1, fontStyle: "italic",
        }}>
          "{t.quote}"
        </blockquote>

        {/* Author */}
        <figcaption style={{
          display: "flex", alignItems: "center", gap: "0.875rem",
          paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div className="ts-avatar" style={{
            width: 42, height: 42, borderRadius: "0.75rem",
            background: t.gradient,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.8rem", fontWeight: 800, color: "#fff", flexShrink: 0,
            boxShadow: `0 0 18px ${t.accent}30`,
          }}>
            {t.initials}
          </div>

          <div>
            <p style={{ margin: "0 0 2px", fontSize: "0.9rem", fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.01em" }}>
              {t.name}
            </p>
            <p style={{ margin: 0, fontSize: "0.72rem", color: "#475569" }}>
              {t.role},{" "}
              <span style={{ color: t.accent, fontWeight: 600 }}>{t.company}</span>
            </p>
          </div>

          {/* Stars */}
          <div style={{ marginLeft: "auto", display: "flex", gap: 2 }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill={t.accent} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6 0.5L7.545 4.045L11.25 4.545L8.625 7.1L9.295 10.795L6 8.995L2.705 10.795L3.375 7.1L0.75 4.545L4.455 4.045L6 0.5Z" />
              </svg>
            ))}
          </div>
        </figcaption>
      </div>
    </figure>
  );
}

export default function Testimonials() {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section style={{ padding: "6rem 0", position: "relative" }}>
        <div className="section-container">

          {/* Header */}
          <div
            ref={headerRef}
            className={`ts-header-anim${headerVisible ? " visible" : ""}`}
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
              <span style={{ height: 1, width: 28, background: "linear-gradient(to right, transparent, #10b981)" }} />
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#10b981" }}>
                Testimonials
              </span>
              <span style={{ height: 1, width: 28, background: "linear-gradient(to left, transparent, #10b981)" }} />
            </div>

            <h2 style={{
              margin: "0 auto 1.25rem",
              fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
              fontWeight: 800, lineHeight: 1.1,
              letterSpacing: "-0.03em", color: "#f8fafc", maxWidth: "36rem",
            }}>
              Clients who{" "}
              <span style={{
                background: "linear-gradient(to right, #10b981, #06b6d4)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                scaled with us
              </span>
            </h2>

            <p style={{
              margin: "0 auto", maxWidth: "38rem",
              fontSize: "clamp(0.875rem, 1.4vw, 1rem)",
              color: "#475569", lineHeight: 1.8,
            }}>
              From AI agents to UGC ads to full web platforms — here's what our
              clients say about working with Draft Solution AI.
            </p>
          </div>

          {/* Cards — 2x2 grid on desktop */}
          <div
            className="ts-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "1.25rem" }}
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} t={t} index={i} />
            ))}
          </div>

        </div>

        <style>{`
          @media (min-width: 768px) { .ts-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        `}</style>
      </section>
    </>
  );
}
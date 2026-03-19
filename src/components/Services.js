"use client";
import React, { useEffect, useRef, useState } from "react";
import { Cpu, Shield, Zap, Globe, BarChart2, Users, ArrowRight, Video, Code2 } from "lucide-react";

const services = [
  {
    title: "AI Strategy & Roadmapping",
    description:
      "Define where agents fit in your stack, from quick wins to long-term automation that compounds over time.",
    icon: Cpu,
    badge: "Advisory",
    accent: "#10b981",
    number: "01",
  },
  {
    title: "Custom Agent Development",
    description:
      "Design, build, and iterate on LLM agents tuned precisely to your data, voice, and workflows.",
    icon: Zap,
    badge: "Build",
    accent: "#06b6d4",
    number: "02",
  },
  {
    title: "AI UGC Ads",
    description:
      "Generate high-converting user-generated content style ads powered by AI — authentic, scalable, and personalized for your target audience.",
    icon: Video,
    badge: "Creative",
    accent: "#f59e0b",
    number: "03",
  },
  {
    title: "Web Development",
    description:
      "Build fast, beautiful, and conversion-optimized websites and web apps — from landing pages to full-scale SaaS products.",
    icon: Code2,
    badge: "Development",
    accent: "#8b5cf6",
    number: "04",
  },
];

const css = `
  @keyframes svcFadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .svc-card {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.55s ease, transform 0.55s ease,
                border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .svc-card.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .svc-card:hover {
    transform: translateY(-5px) !important;
  }
  .svc-arrow {
    transition: transform 0.3s ease, opacity 0.3s ease;
    opacity: 0;
    transform: translateX(-6px);
  }
  .svc-card:hover .svc-arrow {
    opacity: 1;
    transform: translateX(0);
  }
  .svc-number {
    transition: opacity 0.3s ease;
  }
  .svc-card:hover .svc-number {
    opacity: 0.06;
  }
  .svc-icon-wrap {
    transition: transform 0.3s ease, background 0.3s ease;
  }
  .svc-card:hover .svc-icon-wrap {
    transform: scale(1.12) rotate(-4deg);
  }
  .svc-shine {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }
  .svc-card:hover .svc-shine {
    opacity: 1;
  }
  .svc-header-anim {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .svc-header-anim.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Icon = service.icon;
  const delay = `${index * 80}ms`;

  return (
    <article
      ref={ref}
      className={`svc-card${visible ? " visible" : ""}`}
      style={{
        transitionDelay: visible ? delay : "0ms",
        position: "relative",
        borderRadius: "1.25rem",
        border: "1px solid rgba(255,255,255,0.07)",
        background: "linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(2,6,23,0.95) 100%)",
        padding: "1.75rem",
        cursor: "default",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = service.accent + "55";
        e.currentTarget.style.boxShadow = `0 0 40px ${service.accent}18, 0 20px 40px rgba(0,0,0,0.4)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Shine overlay on hover */}
      <div
        className="svc-shine"
        style={{ background: `radial-gradient(ellipse at top left, ${service.accent}0d, transparent 65%)` }}
      />

      {/* Big background number */}
      <span
        className="svc-number"
        style={{
          position: "absolute",
          top: "0.75rem",
          right: "1.25rem",
          fontSize: "5rem",
          fontWeight: 900,
          color: "#fff",
          opacity: 0.03,
          lineHeight: 1,
          userSelect: "none",
          fontVariantNumeric: "tabular-nums",
          transition: "opacity 0.3s ease",
        }}
      >
        {service.number}
      </span>

      {/* Top row: icon + badge */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem", gap: "0.75rem" }}>
        <div
          className="svc-icon-wrap"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            borderRadius: "0.875rem",
            background: service.accent + "18",
            border: `1px solid ${service.accent}30`,
            flexShrink: 0,
          }}
        >
          <Icon style={{ width: 20, height: 20, color: service.accent }} />
        </div>

        <span style={{
          borderRadius: 9999,
          background: service.accent + "14",
          border: `1px solid ${service.accent}30`,
          padding: "3px 10px",
          fontSize: "0.65rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: service.accent,
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}>
          {service.badge}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        margin: "0 0 0.625rem",
        fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
        fontWeight: 700,
        color: "#f1f5f9",
        lineHeight: 1.3,
        letterSpacing: "-0.01em",
      }}>
        {service.title}
      </h3>

      {/* Description */}
      <p style={{
        margin: 0,
        fontSize: "0.875rem",
        color: "#64748b",
        lineHeight: 1.75,
      }}>
        {service.description}
      </p>

      {/* Bottom CTA row */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginTop: "1.5rem",
        paddingTop: "1.25rem",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 500, color: service.accent }}>
          Learn more
        </span>
        <ArrowRight className="svc-arrow" style={{ width: 13, height: 13, color: service.accent }} />
      </div>
    </article>
  );
}

export default function Services() {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section style={{ padding: "6rem 0", position: "relative" }}>
        <div className="section-container">

          {/* ── Header ── */}
          <div
            ref={headerRef}
            className={`svc-header-anim${headerVisible ? " visible" : ""}`}
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: "1rem",
            }}>
              <span style={{ height: 1, width: 32, background: "linear-gradient(to right, transparent, #10b981)" }} />
              <span style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#10b981",
              }}>
                What We Do
              </span>
              <span style={{ height: 1, width: 32, background: "linear-gradient(to left, transparent, #10b981)" }} />
            </div>

            <h2 style={{
              margin: "0 auto 1rem",
              fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#f8fafc",
              maxWidth: "36rem",
            }}>
              Services built for{" "}
              <span style={{
                background: "linear-gradient(to right, #10b981, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                serious AI
              </span>
            </h2>

            <p style={{
              margin: "0 auto",
              maxWidth: "40rem",
              fontSize: "clamp(0.875rem, 1.4vw, 1rem)",
              color: "#475569",
              lineHeight: 1.8,
            }}>
              From first experiment to scaled rollout — we help you design, build, and
              operate AI systems that feel native to your product.
            </p>
          </div>

          {/* ── Grid ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "1.25rem",
          }}
            className="services-grid"
          >
            {services.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>

          {/* ── Bottom CTA ── */}
          <div
            className={`svc-header-anim${headerVisible ? " visible" : ""}`}
            style={{ textAlign: "center", marginTop: "3.5rem", transitionDelay: "0.5s" }}
          >
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "0.75rem 2rem",
                borderRadius: 9999,
                border: "1px solid rgba(16,185,129,0.3)",
                background: "rgba(16,185,129,0.07)",
                color: "#10b981",
                fontSize: "0.875rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.3s ease",
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(16,185,129,0.15)";
                e.currentTarget.style.borderColor = "rgba(16,185,129,0.6)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(16,185,129,0.2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(16,185,129,0.07)";
                e.currentTarget.style.borderColor = "rgba(16,185,129,0.3)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Explore all services
              <ArrowRight style={{ width: 15, height: 15 }} />
            </a>
          </div>

        </div>

        {/* Responsive grid styles */}
        <style>{`
          @media (min-width: 640px) {
            .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (min-width: 1024px) {
            .services-grid { grid-template-columns: repeat(4, 1fr) !important; }
          }
        `}</style>
      </section>
    </>
  );
}
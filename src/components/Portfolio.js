"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, TrendingUp, Zap, Video, Code2 } from "lucide-react";

const projects = [
  {
    name: "NeuralDesk",
    category: "AI Strategy & Agent Development",
    summary:
      "Built and deployed LLM agents triaging 80% of inbound support tickets for a global SaaS — cutting response time from hours to seconds.",
    statLabel: "Tickets automated",
    statValue: "80%",
    icon: Zap,
    accent: "#10b981",
    tag: "Agent AI",
    index: "01",
  },
  {
    name: "ViralCraft",
    category: "AI UGC Ads",
    summary:
      "Generated 200+ AI-powered UGC-style video ads for a DTC brand — achieving 3.8× ROAS with personalized creatives at scale.",
    statLabel: "Return on ad spend",
    statValue: "3.8×",
    icon: Video,
    accent: "#f59e0b",
    tag: "AI Ads",
    index: "02",
  },
  {
    name: "FlowChain",
    category: "Workflow Orchestration",
    summary:
      "Multi-agent workflow orchestrating logistics operations across 12 regions with smart routing and zero downtime handoffs.",
    statLabel: "Faster cycle time",
    statValue: "2.3×",
    icon: TrendingUp,
    accent: "#06b6d4",
    tag: "Automation",
    index: "03",
  },
  {
    name: "LaunchPad",
    category: "Web Development",
    summary:
      "Designed and built a full-stack SaaS web platform from scratch — launched in 6 weeks with 99.9% uptime and sub-1s load times.",
    statLabel: "Load time",
    statValue: "<1s",
    icon: Code2,
    accent: "#8b5cf6",
    tag: "Web Dev",
    index: "04",
  },
];

const css = `
  @keyframes pfFadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .pf-card {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease,
                border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .pf-card.visible { opacity: 1; transform: translateY(0); }
  .pf-card:hover   { transform: translateY(-6px) !important; }

  .pf-header-anim {
    opacity: 0; transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .pf-header-anim.visible { opacity: 1; transform: translateY(0); }

  .pf-arrow {
    transition: transform 0.3s ease;
  }
  .pf-card:hover .pf-arrow { transform: translate(3px, -3px); }

  .pf-stat-val {
    transition: transform 0.3s ease;
    display: inline-block;
  }
  .pf-card:hover .pf-stat-val { transform: scale(1.08); }

  .pf-glow {
    position: absolute; inset: 0; border-radius: inherit;
    opacity: 0; transition: opacity 0.4s ease; pointer-events: none;
  }
  .pf-card:hover .pf-glow { opacity: 1; }

  .pf-icon-wrap {
    transition: transform 0.35s ease, background 0.3s ease;
  }
  .pf-card:hover .pf-icon-wrap {
    transform: scale(1.15) rotate(-6deg);
  }

  .pf-tag-line {
    transition: width 0.5s ease;
    width: 0;
  }
  .pf-card.visible .pf-tag-line { width: 24px; }
`;

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const Icon = project.icon;

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
    <article
      ref={ref}
      className={`pf-card${visible ? " visible" : ""}`}
      style={{
        transitionDelay: visible ? `${index * 120}ms` : "0ms",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        borderRadius: "1.375rem",
        border: "1px solid rgba(255,255,255,0.07)",
        background: "linear-gradient(160deg, rgba(15,23,42,0.95) 0%, rgba(2,6,23,0.98) 100%)",
        overflow: "hidden",
        cursor: "pointer",
        boxSizing: "border-box",
        minHeight: 320,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = project.accent + "50";
        e.currentTarget.style.boxShadow = `0 0 50px ${project.accent}15, 0 24px 48px rgba(0,0,0,0.5)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Glow */}
      <div
        className="pf-glow"
        style={{ background: `radial-gradient(ellipse at top left, ${project.accent}12, transparent 65%)` }}
      />

      {/* Top stripe */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 2,
        background: `linear-gradient(to right, ${project.accent}, transparent)`,
        opacity: 0.6,
      }} />

      {/* Main body */}
      <div style={{ padding: "1.75rem 1.75rem 1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Top row: icon + tag */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              className="pf-icon-wrap"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 40, height: 40, borderRadius: "0.75rem",
                background: project.accent + "18",
                border: `1px solid ${project.accent}30`,
              }}
            >
              <Icon style={{ width: 18, height: 18, color: project.accent }} />
            </div>
            <span style={{
              fontFamily: "monospace", fontSize: "0.7rem",
              color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em",
            }}>
              {project.index}
            </span>
          </div>

          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            borderRadius: 9999,
            background: project.accent + "12",
            border: `1px solid ${project.accent}28`,
            padding: "3px 10px",
            fontSize: "0.65rem", fontWeight: 600,
            letterSpacing: "0.08em", textTransform: "uppercase",
            color: project.accent,
          }}>
            <span
              className="pf-tag-line"
              style={{
                display: "inline-block", height: 1,
                background: project.accent, borderRadius: 9999, flexShrink: 0,
              }}
            />
            {project.tag}
          </span>
        </div>

        {/* Category */}
        <p style={{
          margin: "0 0 0.4rem", fontSize: "0.7rem", fontWeight: 600,
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: project.accent, opacity: 0.75,
        }}>
          {project.category}
        </p>

        {/* Name */}
        <h3 style={{
          margin: "0 0 0.75rem",
          fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
          fontWeight: 800, color: "#f8fafc",
          letterSpacing: "-0.025em", lineHeight: 1.2,
        }}>
          {project.name}
        </h3>

        {/* Summary */}
        <p style={{
          margin: 0, fontSize: "0.875rem",
          color: "#475569", lineHeight: 1.78, flex: 1,
        }}>
          {project.summary}
        </p>
      </div>

      {/* Bottom bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.1rem 1.75rem",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.015)",
      }}>
        <div>
          <p style={{ margin: "0 0 2px", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#334155" }}>
            {project.statLabel}
          </p>
          <p className="pf-stat-val" style={{
            margin: 0, fontSize: "1.35rem", fontWeight: 800,
            color: project.accent, letterSpacing: "-0.02em",
            fontVariantNumeric: "tabular-nums",
          }}>
            {project.statValue}
          </p>
        </div>

        <div
          style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: "0.75rem", fontWeight: 600, color: "#334155",
            transition: "color 0.3s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = project.accent}
          onMouseLeave={e => e.currentTarget.style.color = "#334155"}
        >
          <span>View case study</span>
          <ArrowUpRight className="pf-arrow" style={{ width: 14, height: 14 }} />
        </div>
      </div>
    </article>
  );
}

export default function Portfolio() {
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
            className={`pf-header-anim${headerVisible ? " visible" : ""}`}
            style={{ marginBottom: "4rem" }}
          >
            <div className="pf-header-inner" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "flex-start" }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: "0.875rem" }}>
                  <span style={{ height: 1, width: 28, background: "linear-gradient(to right, transparent, #10b981)" }} />
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#10b981" }}>
                    Case Studies
                  </span>
                </div>
                <h2 style={{
                  margin: 0,
                  fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                  fontWeight: 800, lineHeight: 1.1,
                  letterSpacing: "-0.03em", color: "#f8fafc",
                }}>
                  Real teams,{" "}
                  <span style={{
                    background: "linear-gradient(to right, #10b981, #06b6d4)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>
                    real impact
                  </span>
                </h2>
              </div>

              <p style={{
                margin: 0, maxWidth: "28rem",
                fontSize: "clamp(0.875rem, 1.3vw, 1rem)",
                color: "#475569", lineHeight: 1.8,
              }}>
                A sample of work we've shipped across AI agents, UGC ads,
                automation, and web development.
              </p>
            </div>
          </div>

          {/* Grid — 2 cols on tablet, 2 cols on desktop (2×2 for 4 cards) */}
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "1.5rem" }}
            className="pf-grid"
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.name} project={project} index={i} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            className={`pf-header-anim${headerVisible ? " visible" : ""}`}
            style={{ marginTop: "3.5rem", display: "flex", justifyContent: "center", transitionDelay: "0.5s" }}
          >
            <a
              href="#contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "0.75rem 2rem", borderRadius: 9999,
                border: "1px solid rgba(16,185,129,0.3)",
                background: "rgba(16,185,129,0.07)",
                color: "#10b981", fontSize: "0.875rem", fontWeight: 600,
                textDecoration: "none", transition: "all 0.3s ease",
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
              See all case studies
              <ArrowUpRight style={{ width: 15, height: 15 }} />
            </a>
          </div>

        </div>

        <style>{`
          @media (min-width: 768px) {
            .pf-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .pf-header-inner { flex-direction: row !important; justify-content: space-between; align-items: flex-end !important; }
          }
        `}</style>
      </section>
    </>
  );
}
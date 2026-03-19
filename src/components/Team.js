"use client";
import { useEffect, useRef, useState } from "react";
import { Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import Image from "next/image";

// ─────────────────────────────────────────────
//  👇 REPLACE these image paths with your actual
//  photos placed in the /public/team/ folder.
//  e.g. put "founder1.jpg" in public/team/
//  and set src: "/team/founder1.jpg"
// ─────────────────────────────────────────────
const team = [
  {
    name: "Ali Ahmed Khan",
    role: "Co-founder & CEO",
    bio: "Former head of ML at a Fortune 500, focused on safe autonomous systems that scale without sacrificing reliability.",
    image: "/team/Founder1.jpeg",   // ← replace with your photo
    fallbackInitials: "YN",
    gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
    accentColor: "#10b981",
    tag: "Leadership",
    linkedin: "#",
    
  },
  {
    name: "Muhammad Zulqrnain",
    role: "Co-founder & CTO",
    bio: "Built large-scale agent orchestration at top cloud providers. Expert in distributed systems and LLM infrastructure.",
    image: "/team/Founder.jpeg",   // ← replace with your photo
    fallbackInitials: "CN",
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    accentColor: "#6366f1",
    tag: "Engineering",
    linkedin: "https://www.linkedin.com/in/muhammad-zulqrnain-44372b27a",
    
  },
];

const css = `
  .tm-card {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease,
                border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .tm-card.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .tm-card:hover {
    transform: translateY(-7px) !important;
  }
  .tm-photo-wrap {
    transition: transform 0.45s ease;
    overflow: hidden;
  }
  .tm-card:hover .tm-photo-wrap {
    transform: scale(1.04);
  }
  .tm-social {
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .tm-card:hover .tm-social {
    opacity: 1;
    transform: translateY(0);
  }
  .tm-glow {
    position: absolute; inset: 0; border-radius: inherit;
    opacity: 0; transition: opacity 0.4s ease; pointer-events: none;
  }
  .tm-card:hover .tm-glow { opacity: 1; }
  .tm-header-anim {
    opacity: 0; transform: translateY(20px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .tm-header-anim.visible { opacity: 1; transform: translateY(0); }
  .tm-photo-wrap img {
    transition: filter 0.5s ease !important;
  }
  .tm-card:hover .tm-photo-wrap img {
    filter: grayscale(0%) contrast(1.05) brightness(0.95) !important;
  }
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, transparent 40%, rgba(2,6,23,0.95) 100%);
    pointer-events: none;
  }
`;

function TeamCard({ member, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [imgError, setImgError] = useState(false);

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
      className={`tm-card${visible ? " visible" : ""}`}
      style={{
        transitionDelay: visible ? `${index * 150}ms` : "0ms",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        borderRadius: "1.5rem",
        border: `1px solid rgba(255,255,255,0.08)`,
        background: "linear-gradient(160deg, rgba(15,23,42,0.97) 0%, rgba(2,6,23,1) 100%)",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = member.accentColor + "55";
        e.currentTarget.style.boxShadow = `0 0 55px ${member.accentColor}20, 0 24px 48px rgba(0,0,0,0.6)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top accent stripe */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2, zIndex: 10,
        background: member.gradient, opacity: 0.7,
      }} />

      {/* Glow overlay */}
      <div className="tm-glow"
        style={{ background: `radial-gradient(ellipse at top, ${member.accentColor}14, transparent 65%)` }}
      />

      {/* ── Photo area ── */}
      <div
        className="tm-photo-wrap"
        style={{
          position: "relative",
          width: "100%",
          height: "380px",
          background: member.gradient,
          flexShrink: 0,
        }}
      >
        {!imgError ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            style={{ objectFit: "cover", objectPosition: "center 15%", filter: "grayscale(100%) contrast(1.1) brightness(0.9)" }}
            onError={() => setImgError(true)}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          /* Fallback if image not found */
          <div style={{
            width: "100%", height: "100%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: member.gradient,
            fontSize: "3.5rem", fontWeight: 900, color: "rgba(255,255,255,0.9)",
            letterSpacing: "-0.04em",
          }}>
            {member.fallbackInitials}
          </div>
        )}

        {/* Gradient fade at bottom of photo into card */}
        <div className="tm-img-overlay" />

        {/* Tag badge over photo */}
        <span style={{
          position: "absolute", top: 14, right: 14, zIndex: 5,
          borderRadius: 9999,
          background: "rgba(2,6,23,0.75)",
          border: `1px solid ${member.accentColor}40`,
          backdropFilter: "blur(8px)",
          padding: "4px 12px",
          fontSize: "0.62rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: member.accentColor,
        }}>
          {member.tag}
        </span>
      </div>

      {/* ── Card body ── */}
      <div style={{ padding: "1.625rem", display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>

        {/* Name + role */}
        <div>
          <h3 style={{
            margin: "0 0 0.3rem",
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "#f1f5f9",
            letterSpacing: "-0.025em",
            lineHeight: 1.2,
          }}>
            {member.name}
          </h3>
          <p style={{
            margin: 0,
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: member.accentColor,
          }}>
            {member.role}
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />

        {/* Bio */}
        <p style={{
          margin: 0,
          fontSize: "0.875rem",
          color: "#475569",
          lineHeight: 1.78,
          flex: 1,
        }}>
          {member.bio}
        </p>

        {/* Social row — slides up on hover */}
        <div
          className="tm-social"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            paddingTop: "0.875rem",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {[
            { icon: Linkedin, label: "LinkedIn", href: member.linkedin },
            { icon: Twitter,  label: "Twitter",  href: member.twitter  },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 32, height: 32, borderRadius: "0.5rem",
                background: member.accentColor + "15",
                border: `1px solid ${member.accentColor}28`,
                color: member.accentColor,
                textDecoration: "none",
                transition: "background 0.25s, transform 0.25s, box-shadow 0.25s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = member.accentColor + "30";
                e.currentTarget.style.transform = "scale(1.12)";
                e.currentTarget.style.boxShadow = `0 0 14px ${member.accentColor}30`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = member.accentColor + "15";
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Icon style={{ width: 14, height: 14 }} />
            </a>
          ))}

          <span
            style={{
              marginLeft: "auto",
              display: "flex", alignItems: "center", gap: 4,
              fontSize: "0.75rem", fontWeight: 600,
              color: "#334155", cursor: "pointer",
              transition: "color 0.25s",
              textDecoration: "none",
            }}
            onMouseEnter={e => e.currentTarget.style.color = member.accentColor}
            onMouseLeave={e => e.currentTarget.style.color = "#334155"}
          >
            Full profile
            <ArrowUpRight style={{ width: 13, height: 13 }} />
          </span>
        </div>
      </div>
    </article>
  );
}

export default function Team() {
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

          {/* ── Header ── */}
          <div
            ref={headerRef}
            className={`tm-header-anim${headerVisible ? " visible" : ""}`}
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
              <span style={{ height: 1, width: 28, background: "linear-gradient(to right, transparent, #10b981)" }} />
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#10b981" }}>
                Our Team
              </span>
              <span style={{ height: 1, width: 28, background: "linear-gradient(to left, transparent, #10b981)" }} />
            </div>

            <h2 style={{
              margin: "0 auto 1.25rem",
              fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#f8fafc",
              maxWidth: "34rem",
            }}>
              The team behind{" "}
              <span style={{
                background: "linear-gradient(to right, #10b981, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                the agents
              </span>
            </h2>

            <p style={{
              margin: "0 auto",
              maxWidth: "38rem",
              fontSize: "clamp(0.875rem, 1.4vw, 1rem)",
              color: "#475569",
              lineHeight: 1.8,
            }}>
              We've shipped mission-critical AI systems across finance, healthcare,
              and SaaS. Draft Solution AI is how we bring that experience to you.
            </p>
          </div>

          {/* ── 2-card grid — centered, max width so cards aren't too wide ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "1.5rem",
            maxWidth: "52rem",
            marginLeft: "auto",
            marginRight: "auto",
            alignItems: "stretch",
          }}
            className="tm-grid"
          >
            {team.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>

        </div>

        <style>{`
          @media (min-width: 640px) {
            .tm-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
      </section>
    </>
  );
}
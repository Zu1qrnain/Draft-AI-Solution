"use client";
import Link from "next/link";
import { ArrowUpRight, Mail, Linkedin, Twitter, Github } from "lucide-react";

const navLinks = [
  { label: "Services",     href: "#services" },
  { label: "Portfolio",    href: "#portfolio" },
  { label: "Team",         href: "#team" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact",      href: "#contact" },
];

const services = [
  { label: "AI Strategy & Roadmapping", href: "#services" },
  { label: "Custom Agent Development",  href: "#services" },
  { label: "AI UGC Ads",               href: "#services" },
  { label: "Web Development",           href: "#services" },
];

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter,  label: "Twitter",  href: "#" },
  { icon: Github,   label: "GitHub",   href: "#" },
  { icon: Mail,     label: "Email",    href: "mailto:hello@draftsolution.ai" },
];

export default function Footer() {
  return (
    <>
      <style>{`
        .ft-wrap {
          border-top: 1px solid rgba(255,255,255,0.06);
          background: #020617;
          position: relative;
          overflow: hidden;
        }
        .ft-inner {
          width: 100%;
          max-width: 80rem;
          margin: 0 auto;
          padding: 4rem 1rem 2.5rem;
          box-sizing: border-box;
        }
        @media (min-width: 640px)  { .ft-inner { padding-left: 1.5rem; padding-right: 1.5rem; } }
        @media (min-width: 1024px) { .ft-inner { padding-left: 2rem; padding-right: 2rem; } }

        .ft-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        @media (min-width: 640px) {
          .ft-grid { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
        }
        @media (min-width: 1024px) {
          .ft-grid { grid-template-columns: 1.6fr 0.8fr 1fr 1.2fr; gap: 3rem; }
        }

        .ft-bottom {
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          align-items: center;
          text-align: center;
        }
        @media (min-width: 768px) {
          .ft-bottom {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
        }

        .ft-social-btn {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 0.625rem;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: #475569; text-decoration: none;
          transition: all 0.25s ease; flex-shrink: 0;
        }
        .ft-social-btn:hover {
          border-color: rgba(16,185,129,0.4);
          background: rgba(16,185,129,0.08);
          color: #10b981;
          transform: translateY(-2px);
          box-shadow: 0 0 16px rgba(16,185,129,0.2);
        }

        .ft-link {
          color: #475569; text-decoration: none;
          font-size: 0.85rem; transition: color 0.2s ease;
          display: inline-flex; align-items: center; gap: 4px;
          line-height: 1.5;
        }
        .ft-link:hover { color: #10b981; }

        .ft-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 0.7rem 1.5rem; border-radius: 9999px;
          background: linear-gradient(to right, #10b981, #06b6d4);
          color: #000; font-size: 0.85rem; font-weight: 700;
          text-decoration: none; transition: all 0.3s ease;
          box-shadow: 0 0 24px rgba(16,185,129,0.35);
          white-space: nowrap;
        }
        .ft-cta-btn:hover {
          box-shadow: 0 0 40px rgba(16,185,129,0.6);
          transform: scale(1.03);
        }

        .ft-col-title {
          margin: 0 0 0.25rem;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #10b981;
        }
      `}</style>

      <footer className="ft-wrap">
        {/* Background glow */}
        <div style={{
          position: "absolute", bottom: 0, left: "50%",
          transform: "translateX(-50%)",
          width: 600, height: 300,
          background: "radial-gradient(ellipse, rgba(16,185,129,0.06), transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="ft-inner">
          <div className="ft-grid">

            {/* ── Col 1: Brand ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "0.625rem",
                  background: "linear-gradient(135deg, #10b981, #06b6d4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: "0.9rem", color: "#000",
                  boxShadow: "0 0 20px rgba(16,185,129,0.4)", flexShrink: 0,
                }}>
                  D
                </div>
                <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
                  Draft <span style={{ color: "#10b981" }}>AI</span> Solution
                </span>
              </Link>

              <p style={{ margin: 0, fontSize: "0.85rem", color: "#475569", lineHeight: 1.75, maxWidth: "22rem" }}>
                We build AI agents, high-converting UGC ads, and fast web products
                for modern teams ready to scale.
              </p>

              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {socials.map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} aria-label={label} className="ft-social-btn"
                    target="_blank" rel="noopener noreferrer">
                    <Icon style={{ width: 15, height: 15 }} />
                  </a>
                ))}
              </div>
            </div>

            {/* ── Col 2: Navigation ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              <p className="ft-col-title">Navigation</p>
              {navLinks.map(({ label, href }) => (
                <Link key={label} href={href} className="ft-link">{label}</Link>
              ))}
            </div>

            {/* ── Col 3: Services ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              <p className="ft-col-title">Services</p>
              {services.map(({ label, href }) => (
                <a key={label} href={href} className="ft-link">
                  {label}
                  <ArrowUpRight style={{ width: 11, height: 11, opacity: 0.5, flexShrink: 0 }} />
                </a>
              ))}
            </div>

            {/* ── Col 4: CTA ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <p className="ft-col-title">Get in touch</p>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#475569", lineHeight: 1.7 }}>
                Ready to launch your first agent or scale your ad creatives? Let's talk.
              </p>
              <a href="#contact" className="ft-cta-btn" style={{ alignSelf: "flex-start" }}>
                Start a project
                <ArrowUpRight style={{ width: 14, height: 14 }} />
              </a>
              <a href="mailto:hello@draftsolution.ai" className="ft-link" style={{ marginTop: "0.25rem" }}>
                <Mail style={{ width: 13, height: 13, flexShrink: 0 }} />
                hello@draftsolution.ai
              </a>
            </div>

          </div>

          {/* ── Bottom bar ── */}
          <div className="ft-bottom">
            <p style={{ margin: 0, fontSize: "0.75rem", color: "#334155" }}>
              © {new Date().getFullYear()} Draft AI Solution. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
              {[
                { label: "Privacy Policy",   href: "/privacy" },
                { label: "Terms of Service", href: "/terms"   },
              ].map(({ label, href }) => (
                <Link key={label} href={href} className="ft-link" style={{ fontSize: "0.75rem" }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
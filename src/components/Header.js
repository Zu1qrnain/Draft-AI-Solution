"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Home",         href: "#home" },
    { name: "Services",     href: "#services" },
    { name: "Portfolio",    href: "#portfolio" },
    { name: "Team",         href: "#team" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact",      href: "#contact" },
  ];

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header style={{
        position: "sticky", top: 0, zIndex: 50, width: "100%",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: scrolled ? "rgba(2,6,23,0.92)" : "rgba(2,6,23,0.70)",
        backdropFilter: "blur(20px)",
        transition: "background 0.3s ease, box-shadow 0.3s ease",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
      }}>
        <div className="section-container" style={{ display: "flex", height: 64, alignItems: "center", justifyContent: "space-between" }}>

          {/* ── Logo ── */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
            <Image
              src="/team/Asset1.png"
              alt="Draft AI Solution"
              width={38}
              height={38}
              style={{ mixBlendMode: "screen", transition: "transform 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            />
            <span style={{
              fontSize: "1.05rem", fontWeight: 800,
              letterSpacing: "-0.02em", color: "#f1f5f9",
            }}>
              Draft <span style={{ color: "#10b981" }}>AI</span> Solution
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav style={{ display: "none", alignItems: "center", gap: 28 }} className="hdr-desktop-nav">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} style={{
                fontSize: "0.875rem", fontWeight: 500, color: "#94a3b8",
                textDecoration: "none", position: "relative", transition: "color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* ── Desktop Actions ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <a href="#contact"
              className="hdr-login-btn"
              style={{
                fontSize: "0.875rem", fontWeight: 500, color: "#94a3b8",
                textDecoration: "none", transition: "color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#fff"}
              onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}
            >
              Log in
            </a>
            <a href="#contact" style={{
              display: "inline-flex", alignItems: "center",
              height: 36, padding: "0 20px", borderRadius: 9999,
              background: "#10b981", color: "#000",
              fontSize: "0.875rem", fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 0 20px rgba(16,185,129,0.4)",
              transition: "background 0.2s, box-shadow 0.2s, transform 0.2s",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#34d399";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(16,185,129,0.6)";
                e.currentTarget.style.transform = "scale(1.04)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#10b981";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(16,185,129,0.4)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Get Started
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="hdr-hamburger"
              aria-label="Toggle menu"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 38, height: 38, borderRadius: "0.5rem",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                color: "#e2e8f0", cursor: "pointer",
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(16,185,129,0.1)";
                e.currentTarget.style.borderColor = "rgba(16,185,129,0.3)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              {mobileOpen
                ? <X style={{ width: 18, height: 18 }} />
                : <Menu style={{ width: 18, height: 18 }} />
              }
            </button>
          </div>

        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      {/* Backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        style={{
          position: "fixed", inset: 0, zIndex: 48,
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Drawer panel */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 49,
        width: 280, maxWidth: "85vw",
        background: "#020617",
        borderLeft: "1px solid rgba(255,255,255,0.08)",
        display: "flex", flexDirection: "column",
        transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
      }}>
        {/* Drawer header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1rem 1.5rem",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#10b981" }}>
            Navigation
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 30, height: 30, borderRadius: "0.5rem",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "transparent", color: "#94a3b8", cursor: "pointer",
            }}
          >
            <X style={{ width: 15, height: 15 }} />
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "flex", alignItems: "center",
                padding: "0.75rem 1rem", borderRadius: "0.75rem",
                fontSize: "1rem", fontWeight: 500, color: "#94a3b8",
                textDecoration: "none",
                transition: "all 0.2s ease",
                animationDelay: `${i * 40}ms`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(16,185,129,0.08)";
                e.currentTarget.style.color = "#10b981";
                e.currentTarget.style.paddingLeft = "1.25rem";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#94a3b8";
                e.currentTarget.style.paddingLeft = "1rem";
              }}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Bottom CTAs */}
        <div style={{
          padding: "1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          display: "flex", flexDirection: "column", gap: "0.75rem",
        }}>
          <a href="#contact" onClick={() => setMobileOpen(false)} style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            height: 44, borderRadius: 9999,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "transparent", color: "#e2e8f0",
            fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(16,185,129,0.4)"; e.currentTarget.style.color = "#10b981"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#e2e8f0"; }}
          >
            Log in
          </a>
          <a href="#contact" onClick={() => setMobileOpen(false)} style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            height: 44, borderRadius: 9999,
            background: "linear-gradient(to right, #10b981, #06b6d4)",
            color: "#000", fontSize: "0.875rem", fontWeight: 700,
            textDecoration: "none",
            boxShadow: "0 0 24px rgba(16,185,129,0.4)",
          }}>
            Get Started
          </a>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        .hdr-desktop-nav { display: none !important; }
        .hdr-login-btn { display: none !important; }
        .hdr-hamburger { display: flex !important; }
        @media (min-width: 1024px) {
          .hdr-desktop-nav { display: flex !important; }
          .hdr-login-btn { display: inline !important; }
          .hdr-hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}
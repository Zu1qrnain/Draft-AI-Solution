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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <style>{`
        .hdr-inner {
          width: 100%;
          max-width: 80rem;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          height: 64px;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
        }
        @media (min-width: 640px)  { .hdr-inner { padding: 0 1.5rem; } }
        @media (min-width: 1024px) { .hdr-inner { padding: 0 2rem; } }

        .hdr-desktop-nav { display: none !important; }
        .hdr-login-btn   { display: none !important; }
        .hdr-hamburger   { display: flex !important; }

        @media (min-width: 1024px) {
          .hdr-desktop-nav { display: flex !important; }
          .hdr-login-btn   { display: inline-flex !important; }
          .hdr-hamburger   { display: none !important; }
        }

        .hdr-nav-link {
          font-size: 0.875rem; font-weight: 500; color: #94a3b8;
          text-decoration: none; transition: color 0.2s ease;
          white-space: nowrap;
        }
        .hdr-nav-link:hover { color: #fff; }

        .hdr-get-started {
          display: inline-flex; align-items: center;
          height: 36px; padding: 0 18px; border-radius: 9999px;
          background: #10b981; color: #000;
          font-size: 0.85rem; font-weight: 700;
          text-decoration: none; white-space: nowrap;
          box-shadow: 0 0 20px rgba(16,185,129,0.4);
          transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .hdr-get-started:hover {
          background: #34d399;
          box-shadow: 0 0 30px rgba(16,185,129,0.6);
          transform: scale(1.04);
        }

        .hdr-hamburger-btn {
          display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 0.5rem;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          color: #e2e8f0; cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          flex-shrink: 0;
        }
        .hdr-hamburger-btn:hover {
          background: rgba(16,185,129,0.1);
          border-color: rgba(16,185,129,0.3);
        }

        .hdr-drawer-link {
          display: flex; align-items: center;
          padding: 0.75rem 1rem; border-radius: 0.75rem;
          font-size: 1rem; font-weight: 500; color: #94a3b8;
          text-decoration: none;
          transition: background 0.2s, color 0.2s, padding-left 0.2s;
        }
        .hdr-drawer-link:hover {
          background: rgba(16,185,129,0.08);
          color: #10b981;
          padding-left: 1.25rem;
        }
      `}</style>

      {/* ── Header bar ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50, width: "100%",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: scrolled ? "rgba(2,6,23,0.95)" : "rgba(2,6,23,0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        transition: "background 0.3s ease, box-shadow 0.3s ease",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
      }}>
        <div className="hdr-inner">

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
            <Image
              src="/team/Asset1.png"
              alt="Draft AI Solution"
              width={36}
              height={36}
              style={{ mixBlendMode: "screen", transition: "transform 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            />
            <span style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#f1f5f9", whiteSpace: "nowrap" }}>
              Draft <span style={{ color: "#10b981" }}>AI</span> Solution
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hdr-desktop-nav" style={{ alignItems: "center", gap: 24 }}>
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="hdr-nav-link">
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <a href="#contact" className="hdr-login-btn hdr-nav-link">
              Log in
            </a>
            <a href="#contact" className="hdr-get-started">
              Get Started
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="hdr-hamburger hdr-hamburger-btn"
              aria-label="Toggle menu"
            >
              {mobileOpen
                ? <X style={{ width: 18, height: 18 }} />
                : <Menu style={{ width: 18, height: 18 }} />
              }
            </button>
          </div>

        </div>
      </header>

      {/* ── Backdrop ── */}
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

      {/* ── Mobile Drawer ── */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 49,
        width: 280, maxWidth: "85vw",
        background: "#020617",
        borderLeft: "1px solid rgba(255,255,255,0.08)",
        display: "flex", flexDirection: "column",
        transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
        overflowY: "auto",
      }}>

        {/* Drawer header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1rem 1.25rem",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          flexShrink: 0,
        }}>
          {/* Logo in drawer */}
          <Link href="/" onClick={() => setMobileOpen(false)}
            style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <Image
              src="/team/Asset1.png"
              alt="Draft AI Solution"
              width={28} height={28}
              style={{ mixBlendMode: "screen" }}
            />
            <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#f1f5f9" }}>
              Draft <span style={{ color: "#10b981" }}>AI</span>
            </span>
          </Link>
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
        <nav style={{ flex: 1, padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="hdr-drawer-link"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Bottom CTAs */}
        <div style={{
          padding: "1.25rem",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          display: "flex", flexDirection: "column", gap: "0.75rem",
          flexShrink: 0,
        }}>
          <a href="#contact" onClick={() => setMobileOpen(false)} style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            height: 44, borderRadius: 9999,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "transparent", color: "#e2e8f0",
            fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
            transition: "all 0.2s",
          }}>
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
    </>
  );
}
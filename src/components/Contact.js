"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, CheckCircle, Mail, Building2,
  Users, MessageSquare, User, Zap, Video, Code2, Cpu,
  Phone, MapPin
} from "lucide-react";

// ─────────────────────────────────────────────────────────
//  👇 STEP 1: Replace this with your SheetDB API URL
//  Get it free at sheetdb.io — connect your Google Sheet
//  Sheet columns should be: Name, Email, Company, Service, Budget, Message, Date
// ─────────────────────────────────────────────────────────
const SHEETDB_API_URL = process.env.NEXT_PUBLIC_SHEETDB_API_URL;

const services = [
  { label: "AI Strategy & Roadmapping", icon: Cpu,    accent: "#10b981" },
  { label: "Custom Agent Development",  icon: Zap,    accent: "#06b6d4" },
  { label: "AI UGC Ads",               icon: Video,   accent: "#f59e0b" },
  { label: "Web Development",           icon: Code2,   accent: "#8b5cf6" },
  { label: "All Services / Not Sure",   icon: Users,   accent: "#64748b" },
];

const budgets = ["< $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000+", "Let's discuss"];

const css = `
  .ct-section { padding: 6rem 0; position: relative; }

  .ct-header-anim {
    opacity: 0; transform: translateY(24px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .ct-header-anim.visible { opacity: 1; transform: translateY(0); }

  /* ── Inputs ── */
  .ct-input, .ct-select, .ct-textarea {
    width: 100%; box-sizing: border-box;
    border-radius: 0.75rem;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03);
    padding: 0.7rem 0.9rem 0.7rem 2.6rem;
    font-size: 0.875rem; color: #f1f5f9;
    outline: none; font-family: inherit;
    transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
    -webkit-appearance: none;
  }
  .ct-textarea { padding: 0.75rem 0.9rem 0.75rem 2.6rem; resize: none; }
  .ct-input::placeholder, .ct-textarea::placeholder { color: #1e293b; }
  .ct-select option { background: #0f172a; color: #f1f5f9; }
  .ct-input:focus, .ct-select:focus, .ct-textarea:focus {
    border-color: rgba(16,185,129,0.6);
    box-shadow: 0 0 0 3px rgba(16,185,129,0.1);
    background: rgba(16,185,129,0.04);
  }
  .ct-input:hover:not(:focus),
  .ct-select:hover:not(:focus),
  .ct-textarea:hover:not(:focus) {
    border-color: rgba(255,255,255,0.14);
    background: rgba(255,255,255,0.04);
  }

  .ct-label {
    display: block; margin-bottom: 0.4rem;
    font-size: 0.68rem; font-weight: 700;
    color: #64748b; letter-spacing: 0.08em; text-transform: uppercase;
  }
  .ct-field-wrap { position: relative; }
  .ct-field-icon {
    position: absolute; left: 0.8rem; top: 50%;
    transform: translateY(-50%); pointer-events: none;
    color: #1e293b; transition: color 0.25s;
  }
  .ct-textarea-icon {
    position: absolute; left: 0.8rem; top: 0.82rem;
    pointer-events: none; color: #1e293b; transition: color 0.25s;
  }
  .ct-field-wrap:focus-within .ct-field-icon,
  .ct-field-wrap:focus-within .ct-textarea-icon { color: #10b981; }

  /* ── Service chips ── */
  .ct-chip {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 14px; border-radius: 9999px; cursor: pointer;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03);
    font-size: 0.78rem; font-weight: 500; color: #475569;
    transition: all 0.22s ease; user-select: none;
  }
  .ct-chip:hover { border-color: rgba(255,255,255,0.2); color: #94a3b8; }
  .ct-chip.selected {
    background: rgba(16,185,129,0.12);
    border-color: rgba(16,185,129,0.4);
    color: #10b981; font-weight: 600;
  }

  /* ── Submit button ── */
  .ct-submit-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; height: 50px; border-radius: 9999px; border: none; cursor: pointer;
    background: linear-gradient(to right, #10b981, #06b6d4);
    color: #000; font-size: 0.9rem; font-weight: 800;
    box-shadow: 0 0 32px rgba(16,185,129,0.4);
    transition: all 0.3s ease; letter-spacing: -0.01em;
  }
  .ct-submit-btn:hover {
    box-shadow: 0 0 55px rgba(16,185,129,0.65);
    transform: scale(1.02);
  }
  .ct-submit-btn:active { transform: scale(0.98); }
  .ct-submit-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

  /* ── Info card ── */
  .ct-info-card {
    border-radius: 1rem;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.02);
    padding: 1.1rem 1.25rem;
    display: flex; align-items: center; gap: 12px;
    transition: border-color 0.3s, background 0.3s;
  }
  .ct-info-card:hover {
    border-color: rgba(16,185,129,0.2);
    background: rgba(16,185,129,0.03);
  }

  /* ── Success ── */
  .ct-success-enter {
    animation: ctSuccessIn 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards;
  }
  @keyframes ctSuccessIn {
    from { opacity: 0; transform: scale(0.88) translateY(20px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  @keyframes spin { to { transform: rotate(360deg); } }
  .ct-spinner {
    width: 16px; height: 16px; border-radius: 50%;
    border: 2px solid rgba(0,0,0,0.25);
    border-top-color: #000;
    animation: spin 0.7s linear infinite;
    display: inline-block; flex-shrink: 0;
  }

  /* ── Decorative number ── */
  .ct-big-num {
    position: absolute; right: -1rem; top: -2rem;
    font-size: 10rem; font-weight: 900; line-height: 1;
    color: #fff; opacity: 0.015; pointer-events: none;
    user-select: none; letter-spacing: -0.05em;
  }
`;

function SuccessState({ data }) {
  return (
    <div className="ct-success-enter" style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", textAlign: "center",
      gap: "1.5rem", padding: "3rem 2rem", minHeight: 420,
    }}>
      <div style={{
        width: 76, height: 76, borderRadius: "50%",
        background: "linear-gradient(135deg, rgba(16,185,129,0.18), rgba(6,182,212,0.18))",
        border: "1px solid rgba(16,185,129,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 0 50px rgba(16,185,129,0.25)",
      }}>
        <CheckCircle style={{ width: 38, height: 38, color: "#10b981" }} />
      </div>

      <div>
        <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.4rem", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.025em" }}>
          Message received! 🎉
        </h3>
        <p style={{ margin: 0, fontSize: "0.9rem", color: "#475569", lineHeight: 1.75 }}>
          Hey <span style={{ color: "#10b981", fontWeight: 700 }}>{data.name}</span> — we've saved your details and will reach out to{" "}
          <span style={{ color: "#10b981", fontWeight: 700 }}>{data.email}</span> within 24 hours.
        </p>
      </div>

      {/* Summary */}
      <div style={{
        width: "100%", borderRadius: "1rem",
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)", overflow: "hidden",
      }}>
        {[
          { label: "Service", value: data.service || "—" },
          { label: "Budget",  value: data.budget  || "—" },
          { label: "Company", value: data.company  || "—" },
        ].map((item, i, arr) => (
          <div key={item.label} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            gap: 12, padding: "0.75rem 1.1rem",
            borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
          }}>
            <span style={{ fontSize: "0.68rem", color: "#334155", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {item.label}
            </span>
            <span style={{ fontSize: "0.82rem", color: "#94a3b8", fontWeight: 600, textAlign: "right" }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <p style={{ margin: 0, fontSize: "0.78rem", color: "#1e293b" }}>
        Your data has been saved securely. ✓
      </p>
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setLoading(true);
    setError("");

    const payload = {
      data: {
        Name:    form.name,
        Email:   form.email,
        Company: form.company || "—",
        Service: selectedService || "—",
        Budget:  selectedBudget  || "—",
        Message: form.message    || "—",
        Date:    new Date().toLocaleString(),
      }
    };

    try {
      // ── Save to Google Sheet via SheetDB ──
      const res = await fetch(SHEETDB_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("SheetDB error");
      setSubmitted(true);
    } catch (err) {
      // Fallback: if SheetDB not configured yet, still show success in dev
      if (SHEETDB_API_URL === "YOUR_SHEETDB_API_URL") {
        console.log("⚠️ SheetDB not configured. Form data:", payload.data);
        setSubmitted(true); // show success in dev mode
      } else {
        setError("Something went wrong. Please try again or email us directly.");
      }
    } finally {
      setLoading(false);
    }
  };

  const formData = { ...form, service: selectedService, budget: selectedBudget };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section ref={sectionRef} className="ct-section" id="contact">
        <div className="section-container">

          {/* ── Section header ── */}
          <div
            className={`ct-header-anim${visible ? " visible" : ""}`}
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
              <span style={{ height: 1, width: 28, background: "linear-gradient(to right, transparent, #10b981)" }} />
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#10b981" }}>
                Contact Us
              </span>
              <span style={{ height: 1, width: 28, background: "linear-gradient(to left, transparent, #10b981)" }} />
            </div>
            <h2 style={{
              margin: "0 auto 1rem",
              fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
              fontWeight: 800, lineHeight: 1.1,
              letterSpacing: "-0.03em", color: "#f8fafc", maxWidth: "38rem",
            }}>
              Let's build something{" "}
              <span style={{
                background: "linear-gradient(to right, #10b981, #06b6d4)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                remarkable
              </span>
            </h2>
            <p style={{ margin: "0 auto", maxWidth: "36rem", fontSize: "clamp(0.875rem, 1.4vw, 1rem)", color: "#475569", lineHeight: 1.8 }}>
              Tell us what you need and we'll get back to you within 24 hours with a tailored plan.
            </p>
          </div>

          {/* ── Main layout ── */}
          <div className={`ct-header-anim${visible ? " visible" : ""} ct-layout`} style={{ transitionDelay: "0.1s" }}>

            {/* ── LEFT: Contact info ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

              {/* Big decorative label */}
              <div style={{ position: "relative", paddingBottom: "0.5rem" }}>
                <span className="ct-big-num">01</span>
                <p style={{ margin: "0 0 0.5rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#10b981" }}>
                  Get in touch
                </p>
                <h3 style={{ margin: 0, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.025em", lineHeight: 1.15 }}>
                  Ready to launch<br />
                  <span style={{ color: "#10b981" }}>your project?</span>
                </h3>
              </div>

              <p style={{ margin: 0, fontSize: "0.9rem", color: "#475569", lineHeight: 1.8, maxWidth: "24rem" }}>
                Whether it's AI agents, creative ads, or a new web product — fill out the form and we'll follow up with a concrete plan and timeline.
              </p>

              {/* Info cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { icon: Mail,    label: "Email us",       value: "hello@draftsolution.ai", accent: "#10b981" },
                  { icon: Phone,   label: "Response time",  value: "Within 24 hours",         accent: "#06b6d4" },
                  { icon: MapPin,  label: "Based in",       value: "Multan, Pakistan 🇵🇰",   accent: "#8b5cf6" },
                ].map(({ icon: Icon, label, value, accent }) => (
                  <div key={label} className="ct-info-card">
                    <div style={{
                      width: 38, height: 38, borderRadius: "0.625rem", flexShrink: 0,
                      background: accent + "18", border: `1px solid ${accent}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon style={{ width: 16, height: 16, color: accent }} />
                    </div>
                    <div>
                      <p style={{ margin: "0 0 1px", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#334155", fontWeight: 600 }}>
                        {label}
                      </p>
                      <p style={{ margin: 0, fontSize: "0.875rem", color: "#94a3b8", fontWeight: 500 }}>
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* What happens next */}
              <div style={{
                borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)", padding: "1.25rem",
              }}>
                <p style={{ margin: "0 0 1rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#10b981" }}>
                  What happens next?
                </p>
                {[
                  "We review your submission",
                  "Schedule a free strategy call",
                  "Deliver a custom proposal",
                ].map((step, i) => (
                  <div key={step} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < 2 ? "0.75rem" : 0 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                      background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.65rem", fontWeight: 800, color: "#10b981",
                    }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: "0.83rem", color: "#64748b" }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Form ── */}
            <div style={{
              borderRadius: "1.5rem",
              border: "1px solid rgba(255,255,255,0.09)",
              background: "linear-gradient(160deg, rgba(15,23,42,0.97) 0%, rgba(2,6,23,1) 100%)",
              overflow: "hidden",
              boxShadow: "0 0 60px rgba(16,185,129,0.06), 0 32px 64px rgba(0,0,0,0.5)",
            }}>
              {/* Top stripe */}
              <div style={{ height: 3, background: "linear-gradient(to right, #10b981, #06b6d4, #8b5cf6)" }} />

              {submitted ? (
                <SuccessState data={formData} />
              ) : (
                <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
                  <p style={{ margin: "0 0 1.5rem", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#334155" }}>
                    Fill in your details
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1.15rem" }}>

                    {/* Name + Email */}
                    <div style={{ display: "grid", gap: "1rem" }} className="ct-form-row">
                      <div>
                        <label className="ct-label">Your name *</label>
                        <div className="ct-field-wrap">
                          <User className="ct-field-icon" style={{ width: 13, height: 13 }} />
                          <input className="ct-input" type="text" name="name"
                            placeholder="Ali Ahmed" value={form.name} onChange={handleChange} required />
                        </div>
                      </div>
                      <div>
                        <label className="ct-label">Work email *</label>
                        <div className="ct-field-wrap">
                          <Mail className="ct-field-icon" style={{ width: 13, height: 13 }} />
                          <input className="ct-input" type="email" name="email"
                            placeholder="you@company.com" value={form.email} onChange={handleChange} required />
                        </div>
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="ct-label">Company (optional)</label>
                      <div className="ct-field-wrap">
                        <Building2 className="ct-field-icon" style={{ width: 13, height: 13 }} />
                        <input className="ct-input" type="text" name="company"
                          placeholder="Your company name" value={form.company} onChange={handleChange} />
                      </div>
                    </div>

                    {/* Service chips */}
                    <div>
                      <label className="ct-label" style={{ marginBottom: "0.6rem" }}>What do you need?</label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {services.map(({ label, icon: Icon, accent }) => (
                          <button
                            key={label}
                            type="button"
                            className={`ct-chip${selectedService === label ? " selected" : ""}`}
                            onClick={() => setSelectedService(selectedService === label ? "" : label)}
                            style={selectedService === label ? { borderColor: accent + "60", background: accent + "14", color: accent } : {}}
                          >
                            <Icon style={{ width: 12, height: 12, flexShrink: 0 }} />
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Budget chips */}
                    <div>
                      <label className="ct-label" style={{ marginBottom: "0.6rem" }}>Estimated budget</label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {budgets.map((b) => (
                          <button
                            key={b}
                            type="button"
                            className={`ct-chip${selectedBudget === b ? " selected" : ""}`}
                            onClick={() => setSelectedBudget(selectedBudget === b ? "" : b)}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="ct-label">Tell us more</label>
                      <div className="ct-field-wrap">
                        <MessageSquare className="ct-textarea-icon" style={{ width: 13, height: 13 }} />
                        <textarea className="ct-textarea" name="message" rows={3}
                          placeholder="Describe your project, goals, or any questions..."
                          value={form.message} onChange={handleChange} />
                      </div>
                    </div>

                    {/* Error */}
                    {error && (
                      <p style={{ margin: 0, fontSize: "0.8rem", color: "#ef4444", textAlign: "center" }}>
                        {error}
                      </p>
                    )}

                    {/* Submit */}
                    <div style={{ paddingTop: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                      <button type="submit" className="ct-submit-btn"
                        disabled={loading || !form.name || !form.email}>
                        {loading ? (
                          <><span className="ct-spinner" /> Saving your details…</>
                        ) : (
                          <>Send message <ArrowRight style={{ width: 16, height: 16 }} /></>
                        )}
                      </button>
                      <p style={{ margin: "0.75rem 0 0", fontSize: "0.68rem", color: "#1e293b", textAlign: "center", lineHeight: 1.6 }}>
                        Your info is saved securely to our team's dashboard. No spam, ever.
                      </p>
                    </div>

                  </div>
                </form>
              )}
            </div>

          </div>
        </div>

        <style>{`
          .ct-layout {
            display: grid; grid-template-columns: 1fr; gap: 3rem; align-items: start;
          }
          @media (min-width: 1024px) {
            .ct-layout { grid-template-columns: 1fr 1.1fr !important; }
          }
          .ct-form-row { grid-template-columns: 1fr; }
          @media (min-width: 500px) {
            .ct-form-row { grid-template-columns: 1fr 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
}
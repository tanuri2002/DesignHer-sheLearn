import React from "react";
import { Link } from "react-router-dom";

const palette = {
  plum:    "#3B1F5E",
  violet:  "#6C3FC5",
  lavender:"#B39DDB",
  blush:   "#F3EEF9",
  rose:    "#FCE4EC",
  mint:    "#D6F5EC",
  teal:    "#1B9E78",
  ink:     "#1A1A2E",
  muted:   "#6B6B8A",
  border:  "#E4DCF0",
};

const font = {
  display: "'Georgia', 'Times New Roman', serif",
  body:    "'Inter', 'Segoe UI', system-ui, sans-serif",
};

const values = [
  {
    icon: "🌱",
    bg: "#E8F5E9",
    title: "Grow at your own pace",
    desc: "No pressure, no competition. SheLearn meets you where you are and guides you forward, one milestone at a time.",
  },
  {
    icon: "🤝",
    bg: "#FCE4EC",
    title: "Community first",
    desc: "We believe the best learning happens between peers. SheLearn is built on the idea that women lift each other up.",
  },
  {
    icon: "🔓",
    bg: "#EAF6FF",
    title: "Free and accessible",
    desc: "Every resource we recommend is free. Great education shouldn't depend on how much money you have.",
  },
  {
    icon: "🤖",
    bg: "#FFF8E1",
    title: "AI that actually helps",
    desc: "We use AI not to replace guidance - but to personalise it. Your roadmap is built around your goals, not a generic template.",
  },
];

const team = [
  {
    initials: "TN", bg: "#EEEDFE", col: "#534AB7",
    name: "Tanuri Bawanya",
    role: "Creator & Developer",
    dept: "Computer Engineering · University of Ruhuna",
    note: "Built SheLearn for DesignHer 2.0 with the belief that every woman in engineering deserves a clear path forward.",
  },
];

const milestones = [
  { year: "2024", label: "The idea", detail: "Noticed that female engineering students struggled to find structured guidance for their career paths." },
  { year: "2025", label: "Research", detail: "Talked to students across departments to understand the real gaps - resources, community, and direction." },
  { year: "2026", label: "SheLearn is born", detail: "Built and launched for DesignHer 2.0 - an AI-powered platform combining roadmaps, resources, and peer connection." },
];

export default function About() {
  return (
    <div style={{ fontFamily: font.body, minHeight: "100vh", background: "#fff" }}>

      {/* Hero */}
      <section style={{
        background: `linear-gradient(145deg, ${palette.plum} 0%, #5B2FA0 50%, #7B52C8 100%)`,
        padding: "5rem 2rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -80, right: -80,
          width: 360, height: 360, borderRadius: "50%",
          background: "rgba(179,157,219,0.12)", pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 680, margin: "0 auto", position: "relative" }}>
          <span style={{
            fontFamily: font.body, fontSize: 11, fontWeight: 600,
            letterSpacing: 2, textTransform: "uppercase",
            color: palette.lavender,
            background: "rgba(179,157,219,0.15)",
            padding: "5px 14px", borderRadius: 20,
            border: "1px solid rgba(179,157,219,0.3)",
            display: "inline-block", marginBottom: "1.5rem",
          }}>
            Our story
          </span>
          <h1 style={{
            fontFamily: font.display,
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 400, color: "#fff",
            lineHeight: 1.25, marginBottom: "1.25rem",
          }}>
            Built by a woman in engineering,<br />
            <span style={{ color: palette.lavender, fontStyle: "italic" }}>for women in engineering.</span>
          </h1>
          <p style={{
            fontFamily: font.body, fontSize: 16,
            color: "rgba(255,255,255,0.70)",
            lineHeight: 1.75, maxWidth: 540, margin: "0 auto",
          }}>
            SheLearn started with a simple frustration - too many talented women not knowing where to begin. We built the platform we wished we had.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: "5rem 2rem", background: "#fff" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: font.body, fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: palette.violet, marginBottom: 10 }}>
              Our mission
            </p>
            <h2 style={{ fontFamily: font.display, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: palette.ink, fontWeight: 400, lineHeight: 1.3, marginBottom: "1.25rem" }}>
              Give every woman in engineering a{" "}
              <span style={{ color: palette.violet, fontStyle: "italic" }}>clear path forward.</span>
            </h2>
            <p style={{ fontFamily: font.body, fontSize: 14, color: palette.muted, lineHeight: 1.8, marginBottom: "1rem" }}>
              The gender gap in engineering isn't just about admissions — it's about what happens after. Women enter universities with passion and potential, but often hit a wall when they try to figure out what to learn next, who to learn from, and where they're headed.
            </p>
            <p style={{ fontFamily: font.body, fontSize: 14, color: palette.muted, lineHeight: 1.8 }}>
              SheLearn exists to tear down that wall. With AI-generated learning roadmaps, curated free resources, and a peer community that genuinely supports each other, we give women in engineering the clarity and confidence to own their career paths.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { num: "142", label: "Women on the platform", color: palette.violet },
              { num: "380+", label: "Skills being shared", color: palette.teal },
              { num: "910", label: "Peer sessions completed", color: "#E65100" },
              { num: "12+", label: "Career fields with roadmaps", color: "#AD1457" },
            ].map(s => (
              <div key={s.label} style={{
                background: palette.blush,
                border: `1px solid ${palette.border}`,
                borderRadius: 14, padding: "1rem 1.5rem",
                display: "flex", alignItems: "center", gap: 16,
              }}>
                <span style={{ fontFamily: font.display, fontSize: 32, color: s.color, minWidth: 80 }}>{s.num}</span>
                <span style={{ fontFamily: font.body, fontSize: 13, color: palette.muted }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "5rem 2rem", background: palette.blush }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontFamily: font.body, fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: palette.violet, marginBottom: 10 }}>
              What we believe
            </p>
            <h2 style={{ fontFamily: font.display, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: palette.ink, fontWeight: 400 }}>
              Our values
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {values.map(v => (
              <div key={v.title} style={{
                background: v.bg,
                border: `1px solid ${palette.border}`,
                borderRadius: 16, padding: "1.75rem",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(107,63,197,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontSize: 30, marginBottom: 12 }}>{v.icon}</div>
                <h3 style={{ fontFamily: font.body, fontSize: 15, fontWeight: 600, color: palette.ink, marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontFamily: font.body, fontSize: 13, color: palette.muted, lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: "5rem 2rem", background: "#fff" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontFamily: font.body, fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: palette.violet, marginBottom: 10 }}>
              How we got here
            </p>
            <h2 style={{ fontFamily: font.display, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: palette.ink, fontWeight: 400 }}>
              Our journey
            </h2>
          </div>
          <div style={{ position: "relative", paddingLeft: 40 }}>
            <div style={{
              position: "absolute", left: 14, top: 8, bottom: 8,
              width: 2, background: palette.border,
            }} />
            {milestones.map((m, i) => (
              <div key={m.year} style={{ position: "relative", marginBottom: i < milestones.length - 1 ? "2.5rem" : 0 }}>
                <div style={{
                  position: "absolute", left: -33, top: 4,
                  width: 18, height: 18, borderRadius: "50%",
                  background: palette.violet, border: "3px solid #fff",
                  boxShadow: `0 0 0 2px ${palette.violet}`,
                }} />
                <span style={{
                  fontFamily: font.body, fontSize: 11, fontWeight: 700,
                  color: palette.violet, textTransform: "uppercase",
                  letterSpacing: 1, display: "block", marginBottom: 4,
                }}>{m.year}</span>
                <h4 style={{ fontFamily: font.body, fontSize: 15, fontWeight: 600, color: palette.ink, marginBottom: 6 }}>{m.label}</h4>
                <p style={{ fontFamily: font.body, fontSize: 13, color: palette.muted, lineHeight: 1.65 }}>{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
    { /* <section style={{ padding: "5rem 2rem", background: palette.blush }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: font.body, fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: palette.violet, marginBottom: 10 }}>
            Behind SheLearn
          </p>
          <h2 style={{ fontFamily: font.display, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: palette.ink, fontWeight: 400, marginBottom: "2.5rem" }}>
            The creator
          </h2>
          {team.map(t => (
            <div key={t.name} style={{
              background: "#fff",
              border: `1px solid ${palette.border}`,
              borderRadius: 20, padding: "2.5rem",
              maxWidth: 480, margin: "0 auto",
            }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: t.bg, color: t.col,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, fontWeight: 600, fontFamily: font.body,
                margin: "0 auto 1rem",
              }}>{t.initials}</div>
              <h3 style={{ fontFamily: font.display, fontSize: 20, color: palette.ink, fontWeight: 400, marginBottom: 4 }}>{t.name}</h3>
              <p style={{ fontFamily: font.body, fontSize: 13, color: palette.violet, fontWeight: 600, marginBottom: 4 }}>{t.role}</p>
              <p style={{ fontFamily: font.body, fontSize: 12, color: palette.muted, marginBottom: "1.25rem" }}>{t.dept}</p>
              <p style={{ fontFamily: font.body, fontSize: 13, color: palette.muted, lineHeight: 1.7, fontStyle: "italic" }}>"{t.note}"</p>
            </div>
          ))}
        </div>
      </section>*/}

      {/* CTA */}
      <section style={{
        padding: "5rem 2rem",
        background: `linear-gradient(135deg, ${palette.plum} 0%, #5B2FA0 100%)`,
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: font.display,
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            color: "#fff", fontWeight: 400,
            lineHeight: 1.25, marginBottom: "1rem",
          }}>
            Ready to find your path?
          </h2>
          <p style={{ fontFamily: font.body, fontSize: 15, color: "rgba(255,255,255,0.65)", marginBottom: "2rem", lineHeight: 1.7 }}>
            Join SheLearn today and get your personalised career roadmap in minutes.
          </p>
          <Link to="/signup" style={{
            fontFamily: font.body, fontSize: 15, fontWeight: 600,
            background: "#fff", color: palette.plum,
            padding: "13px 36px", borderRadius: 30,
            textDecoration: "none", display: "inline-block",
          }}>
            Get started - it's free !
          </Link>
        </div>
      </section>

    </div>
  );
}
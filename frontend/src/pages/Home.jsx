import React from "react";

const palette = {
  plum:    "#3B1F5E",
  violet:  "#6C3FC5",
  lavender:"#B39DDB",
  blush:   "#F3EEF9",
  mint:    "#D6F5EC",
  teal:    "#1B9E78",
  white:   "#FFFFFF",
  ink:     "#1A1A2E",
  muted:   "#6B6B8A",
  border:  "#E4DCF0",
};

const font = {
  display: "'Georgia', 'Times New Roman', serif",
  body:    "'Poppins', sans-serif",
};

const features = [
  {
    icon: "🗺️",
    color: palette.blush,
    accent: palette.violet,
    title: "Career Path Guidance",
    desc: "Tell us the field you love - cybersecurity, AI, web dev, anything. We build you a step-by-step roadmap so you always know what to learn next.",
  },
  {
    icon: "📚",
    color: "#EAF6FF",
    accent: "#1565C0",
    title: "Curated Resource Library",
    desc: "Every milestone in your path comes with hand-picked free YouTube videos, courses, and articles - no more searching, just learning.",
  },
  {
    icon: "👩‍💻",
    color: palette.mint,
    accent: palette.teal,
    title: "Peer Session Booking",
    desc: "Find a peer who already knows what you're learning. Book a 1-on-1 session, ask questions freely, and grow together.",
  },
  {
    icon: "🏅",
    color: "#FFF8E1",
    accent: "#E65100",
    title: "Badges & Recognition",
    desc: "Earn badges every time you teach, learn, or hit a streak. Your contributions are visible on the community leaderboard.",
  },
  {
    icon: "🤝",
    color: "#FDE8F0",
    accent: "#AD1457",
    title: "Skill Exchange",
    desc: "Post what you can teach and what you want to learn. Our AI matches you with the best peer - a real two-way community.",
  },
  {
    icon: "📈",
    color: "#E8F5E9",
    accent: "#2E7D32",
    title: "Progress Tracking",
    desc: "Track every milestone you complete, session you attend, and badge you earn - all in one personal dashboard.",
  },
];

const steps = [
  { label: "Pick your field", detail: "Cybersecurity, AI, Web Dev — any direction you dream of." },
  { label: "Get your roadmap", detail: "AI builds a personalised, milestone-by-milestone learning plan." },
  { label: "Learn with peers", detail: "Book sessions with peers who can guide you through each stage." },
  { label: "Grow & get recognised", detail: "Earn badges, climb the leaderboard, and own your journey." },
];

const testimonials = [
  {
    name: "Kavya P.", year: "2nd year · EE",
    text: "I had no idea where to start with machine learning. SheLearn gave me a clear roadmap and matched me with a senior who walked me through everything.",
    initials: "KP", bg: "#EEEDFE", col: "#534AB7",
  },
  {
    name: "Dinali M.", year: "4th year · CE",
    text: "Teaching through SheLearn made me realise how much I actually know. The badge system keeps me motivated to keep contributing.",
    initials: "DM", bg: "#E1F5EE", col: "#0F6E56",
  },
  {
    name: "Asel R.", year: "3rd year · CE",
    text: "As someone who was completely lost about cybersecurity, having a step-by-step path with real resources and a peer to ask questions — it changed everything.",
    initials: "AR", bg: "#FBEAF0", col: "#993556",
  },
];

function Hero() {
  return (
    <section style={{
      minHeight: "88vh",
      background: `linear-gradient(145deg, ${palette.plum} 0%, #5B2FA0 50%, #7B52C8 100%)`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "5rem 2rem 4rem",
      position: "relative", overflow: "hidden",
      textAlign: "center",
    }}>
      <div style={{
        position: "absolute", top: -80, right: -80,
        width: 400, height: 400, borderRadius: "50%",
        background: "rgba(179,157,219,0.15)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -60, left: -60,
        width: 320, height: 320, borderRadius: "50%",
        background: "rgba(214,245,236,0.1)", pointerEvents: "none",
      }} />

      <span style={{
        fontFamily: font.body, fontSize: 12, fontWeight: 600,
        letterSpacing: 2, textTransform: "uppercase",
        color: palette.lavender, marginBottom: "1.25rem",
        background: "rgba(179,157,219,0.15)",
        padding: "5px 14px", borderRadius: 20,
        border: "1px solid rgba(179,157,219,0.3)",
      }}>
        Built for women in engineering
      </span>

      <h1 style={{
        fontFamily: font.display,
        fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
        fontWeight: 400, color: "#fff",
        lineHeight: 1.2, maxWidth: 760,
        marginBottom: "1.5rem",
        letterSpacing: "-0.5px",
      }}>
        Struggling to find the path to{" "}
        <span style={{ color: palette.lavender, fontStyle: "italic" }}>your favourite career?</span>
        <br />We'll guide you — every step.
      </h1>

      <p style={{
        fontFamily: font.body, fontSize: 17,
        color: "rgba(255,255,255,0.72)",
        maxWidth: 520, lineHeight: 1.7,
        marginBottom: "2.5rem",
      }}>
        SheLearn gives you a personalised learning roadmap, curated free resources, and a community of peers who've been exactly where you are.
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <a href="/signup" style={{
          fontFamily: font.body, fontSize: 15, fontWeight: 600,
          background: "#fff", color: palette.plum,
          padding: "13px 32px", borderRadius: 30,
          textDecoration: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}>
          Start my journey →
        </a>
        <a href="/about" style={{
          fontFamily: font.body, fontSize: 15, fontWeight: 500,
          background: "rgba(255,255,255,0.12)", color: "#fff",
          padding: "13px 32px", borderRadius: 30,
          textDecoration: "none", border: "1px solid rgba(255,255,255,0.25)",
        }}>
          See how it works
        </a>
      </div>

      <div style={{
        marginTop: "3.5rem",
        display: "flex", gap: "2.5rem", flexWrap: "wrap", justifyContent: "center",
      }}>
        {[["142", "Active members"], ["380+", "Skills shared"], ["910", "Sessions completed"]].map(([n, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: font.display, fontSize: 28, color: "#fff", fontWeight: 400 }}>{n}</div>
            <div style={{ fontFamily: font.body, fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  return (
    <section style={{ padding: "5rem 2rem", background: "#fff" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontFamily: font.body, fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: palette.violet, marginBottom: 10 }}>
            Everything you need
          </p>
          <h2 style={{ fontFamily: font.display, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: palette.ink, fontWeight: 400, lineHeight: 1.2 }}>
            One platform. Your complete<br />
            <span style={{ color: palette.violet, fontStyle: "italic" }}>learning companion.</span>
          </h2>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}>
          {features.map((f) => (
            <div key={f.title} style={{
              background: f.color,
              border: `1px solid ${palette.border}`,
              borderRadius: 16, padding: "1.75rem",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "default",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(107,63,197,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontFamily: font.body, fontSize: 15, fontWeight: 600, color: palette.ink, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontFamily: font.body, fontSize: 13, color: palette.muted, lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section style={{ padding: "5rem 2rem", background: palette.blush }}>
      <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: font.body, fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: palette.violet, marginBottom: 10 }}>
          How it works
        </p>
        <h2 style={{ fontFamily: font.display, fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: palette.ink, fontWeight: 400, marginBottom: "3rem" }}>
          From lost to confident - in four steps.
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {steps.map((s, i) => (
            <div key={s.label} style={{
              display: "flex", alignItems: "flex-start", gap: 20,
              textAlign: "left", padding: "1.5rem 0",
              borderBottom: i < steps.length - 1 ? `1px solid ${palette.border}` : "none",
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: palette.violet, color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: font.body, fontSize: 15, fontWeight: 600,
                flexShrink: 0, marginTop: 2,
              }}>{i + 1}</div>
              <div>
                <div style={{ fontFamily: font.body, fontSize: 15, fontWeight: 600, color: palette.ink, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontFamily: font.body, fontSize: 13, color: palette.muted, lineHeight: 1.6 }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>
        <a href="/signup" style={{
          display: "inline-block", marginTop: "2.5rem",
          fontFamily: font.body, fontSize: 14, fontWeight: 600,
          background: palette.violet, color: "#fff",
          padding: "12px 32px", borderRadius: 30, textDecoration: "none",
        }}>
          Build my roadmap →
        </a>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section style={{ padding: "5rem 2rem", background: "#fff" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontFamily: font.body, fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: palette.violet, marginBottom: 10 }}>
            From the community
          </p>
          <h2 style={{ fontFamily: font.display, fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: palette.ink, fontWeight: 400 }}>
            She started where you are now.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 20 }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{
              border: `1px solid ${palette.border}`,
              borderRadius: 16, padding: "1.75rem",
              background: "#FDFCFF",
            }}>
              <p style={{ fontFamily: font.body, fontSize: 14, color: palette.ink, lineHeight: 1.7, marginBottom: "1.25rem", fontStyle: "italic" }}>
                "{t.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: t.bg, color: t.col,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 600, fontFamily: font.body,
                }}>{t.initials}</div>
                <div>
                  <div style={{ fontFamily: font.body, fontSize: 13, fontWeight: 600, color: palette.ink }}>{t.name}</div>
                  <div style={{ fontFamily: font.body, fontSize: 11, color: palette.muted }}>{t.year}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{
      padding: "5rem 2rem",
      background: `linear-gradient(135deg, ${palette.plum} 0%, #5B2FA0 100%)`,
      textAlign: "center",
    }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h2 style={{
          fontFamily: font.display,
          fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
          color: "#fff", fontWeight: 400,
          lineHeight: 1.2, marginBottom: "1rem",
        }}>
          Your career path starts<br />
          <span style={{ color: palette.lavender, fontStyle: "italic" }}>with a single step.</span>
        </h2>
        <p style={{ fontFamily: font.body, fontSize: 15, color: "rgba(255,255,255,0.65)", marginBottom: "2rem", lineHeight: 1.7 }}>
          Join 142 women who are already learning, teaching, and growing together.
        </p>
        <a href="/signup" style={{
          fontFamily: font.body, fontSize: 15, fontWeight: 600,
          background: "#fff", color: palette.plum,
          padding: "13px 36px", borderRadius: 30,
          textDecoration: "none", display: "inline-block",
        }}>
          Join SheLearn — it's free
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      background: palette.ink,
      padding: "3rem 2rem 2rem",
      color: "rgba(255,255,255,0.5)",
    }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem", marginBottom: "2.5rem" }}>
          <div style={{ maxWidth: 240 }}>
            <div style={{ fontFamily: font.display, fontSize: 20, color: "#fff", marginBottom: 10 }}>
              She<span style={{ color: palette.lavender }}>Learn</span>
            </div>
            <p style={{ fontFamily: font.body, fontSize: 13, lineHeight: 1.7 }}>
              An AI-powered career guidance platform for women in engineering. Learn from her. Grow together.
            </p>
          </div>
          {[
            { heading: "Platform", links: ["Learning tracks", "Find peers", "Book a session", "Leaderboard"] },
            { heading: "Community", links: ["How it works", "Badges", "Dashboard", "Profile"] },
            { heading: "About", links: ["DesignHer 2.0", "University of Ruhuna", "Contact", "GitHub"] },
          ].map(col => (
            <div key={col.heading}>
              <div style={{ fontFamily: font.body, fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>{col.heading}</div>
              {col.links.map(l => (
                <a key={l} href="#" style={{
                  display: "block", fontFamily: font.body, fontSize: 13,
                  color: "rgba(255,255,255,0.55)", textDecoration: "none",
                  marginBottom: 8, transition: "color 0.15s",
                }}
                  onMouseEnter={e => e.target.style.color = "#fff"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}
                >{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontFamily: font.body, fontSize: 12 }}>© 2026 SheLearn · Built for DesignHer 2.0 · University of Ruhuna</span>
          <span style={{ fontFamily: font.body, fontSize: 12 }}>Empowering women through technology-driven innovation ✨</span>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div style={{ fontFamily: font.body, minHeight: "100vh" }}>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
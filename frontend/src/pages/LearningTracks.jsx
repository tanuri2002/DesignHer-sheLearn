import React, { useState } from "react";
import { Link } from "react-router-dom";

const palette = {
  plum:    "#3B1F5E",
  violet:  "#6C3FC5",
  lavender:"#B39DDB",
  blush:   "#F3EEF9",
  mint:    "#D6F5EC",
  teal:    "#1B9E78",
  ink:     "#1A1A2E",
  muted:   "#6B6B8A",
  border:  "#E4DCF0",
  amber:   "#854F0B",
  amberBg: "#FAEEDA",
};

const font = {
  display: "'Georgia', 'Times New Roman', serif",
  body:    "'Inter', 'Segoe UI', system-ui, sans-serif",
};

const POPULAR_FIELDS = [
  { label: "Cybersecurity", icon: "🛡️" },
  { label: "AI / Machine Learning", icon: "🤖" },
  { label: "Web Development", icon: "🌐" },
  { label: "Mobile App Development", icon: "📱" },
  { label: "Data Science", icon: "📊" },
  { label: "UI/UX Design", icon: "🎨" },
  { label: "Cloud Computing", icon: "☁️" },
  { label: "Embedded Systems", icon: "🔧" },
];

const LEVELS = ["Complete beginner", "Some basics", "Intermediate"];

// Mocked certificate list — structured the same way the real Claude API response will be shaped.
// In production this comes back as part of the same /api/ai/generate-roadmap response.
function buildMockCertificates(field) {
  return [
    {
      title: `${field} Professional Certificate`,
      provider: "Coursera",
      org: "Offered by Google / IBM / industry partners",
      cost: "Free to audit · Paid certificate (~$49/month)",
      level: "Beginner to Intermediate",
      duration: "3-6 months",
      link: "coursera.org",
    },
    {
      title: `Introduction to ${field}`,
      provider: "edX",
      org: "Offered by Harvard / MIT partner universities",
      cost: "Free to audit · Paid certificate (~$99-199)",
      level: "Beginner",
      duration: "8-10 weeks",
      link: "edx.org",
    },
    {
      title: `${field} Certification`,
      provider: "freeCodeCamp",
      org: "Community-built curriculum",
      cost: "Completely free",
      level: "Beginner to Advanced",
      duration: "Self-paced",
      link: "freecodecamp.org",
    },
    {
      title: `${field} Specialist Certificate`,
      provider: "LinkedIn Learning",
      org: "Industry expert-led courses",
      cost: "Free with 1-month trial",
      level: "Intermediate",
      duration: "4-8 weeks",
      link: "linkedin.com/learning",
    },
  ];
}

// Mocked roadmap — structured the same way the real Claude API response will be shaped.
// In production this object comes back from POST /api/ai/generate-roadmap
function buildMockRoadmap(field, level) {
  return {
    field,
    level,
    totalWeeks: 10,
    milestones: [
      {
        week: "Week 1-2",
        title: `${field} Fundamentals`,
        description: `Understand the core concepts, terminology, and mindset needed before diving deeper into ${field}.`,
        resources: [
          { type: "video", label: "Intro to " + field + " — full course for beginners", source: "YouTube · freeCodeCamp", duration: "3h 20m" },
          { type: "course", label: field + " Fundamentals", source: "Coursera · Free audit", duration: "2 weeks" },
          { type: "article", label: "A beginner's roadmap to " + field, source: "freeCodeCamp.org", duration: "12 min read" },
        ],
      },
      {
        week: "Week 3-4",
        title: "Core Tools & Environment Setup",
        description: "Get hands-on with the essential tools, software, and environments professionals actually use day to day.",
        resources: [
          { type: "video", label: "Setting up your " + field + " toolkit", source: "YouTube · Traversy Media", duration: "45m" },
          { type: "course", label: "Hands-on Lab: Tools of the Trade", source: "edX · Free", duration: "1 week" },
        ],
      },
      {
        week: "Week 5-6",
        title: "Practical Project #1",
        description: "Apply what you've learned in a small, guided project. This is where concepts actually click.",
        resources: [
          { type: "video", label: "Build your first " + field + " project — full walkthrough", source: "YouTube · CS50", duration: "2h 10m" },
          { type: "article", label: "Common beginner mistakes (and how to avoid them)", source: "Medium", duration: "8 min read" },
        ],
        peerSuggestion: true,
      },
      {
        week: "Week 7-8",
        title: "Intermediate Concepts",
        description: "Build on your foundation with more advanced topics that bridge the gap between beginner and job-ready.",
        resources: [
          { type: "course", label: "Intermediate " + field + " Specialization", source: "Coursera · Free audit", duration: "2 weeks" },
          { type: "video", label: "Deep dive: advanced " + field + " techniques", source: "YouTube · Fireship", duration: "55m" },
        ],
      },
      {
        week: "Week 9-10",
        title: "Capstone Project & Portfolio",
        description: "Bring everything together into one strong project you can showcase in interviews and on your resume.",
        resources: [
          { type: "video", label: "Building a portfolio project that gets you hired", source: "YouTube · Web Dev Simplified", duration: "1h 30m" },
          { type: "article", label: field + " portfolio examples that stand out", source: "dev.to", duration: "10 min read" },
        ],
        peerSuggestion: true,
      },
    ],
  };
}

function ResourceIcon({ type }) {
  const icons = { video: "📺", course: "🎓", article: "📄" };
  return <span style={{ fontSize: 15 }}>{icons[type] || "🔗"}</span>;
}

function MilestoneCard({ milestone, index, completed, onToggle }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div style={{
      border: `1px solid ${palette.border}`,
      borderRadius: 16,
      background: "#fff",
      overflow: "hidden",
      marginBottom: 14,
    }}>
      {/* Header row */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", gap: 14,
          padding: "1rem 1.25rem", cursor: "pointer",
        }}
      >
        <button
          onClick={(e) => { e.stopPropagation(); onToggle(index); }}
          style={{
            width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
            border: completed ? "none" : `1px solid ${palette.border}`,
            background: completed ? palette.teal : "#fff",
            color: "#fff", fontSize: 13, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.15s",
          }}
        >
          {completed ? "✓" : ""}
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: font.body, fontSize: 11, color: palette.violet, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
            {milestone.week}
          </div>
          <div style={{ fontFamily: font.body, fontSize: 15, fontWeight: 600, color: palette.ink, marginTop: 2 }}>
            {milestone.title}
          </div>
        </div>
        <span style={{ fontSize: 14, color: palette.muted, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
      </div>

      {/* Body */}
      {open && (
        <div style={{ padding: "0 1.25rem 1.25rem 1.25rem" }}>
          <p style={{ fontFamily: font.body, fontSize: 13, color: palette.muted, lineHeight: 1.65, marginBottom: "1rem" }}>
            {milestone.description}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {milestone.resources.map((r, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                background: palette.blush, borderRadius: 10, padding: "9px 12px",
              }}>
                <ResourceIcon type={r.type} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: font.body, fontSize: 13, color: palette.ink, fontWeight: 500 }}>{r.label}</div>
                  <div style={{ fontFamily: font.body, fontSize: 11, color: palette.muted }}>{r.source} · {r.duration}</div>
                </div>
              </div>
            ))}
          </div>
          {milestone.peerSuggestion && (
            <div style={{
              display: "flex", alignItems: "center", gap: 10, marginTop: 12,
              background: palette.mint, borderRadius: 10, padding: "10px 12px",
            }}>
              <span style={{ fontSize: 16 }}>👩‍💻</span>
              <span style={{ fontFamily: font.body, fontSize: 12, color: "#0F6E56", flex: 1 }}>
                Ready to practice this? Find a peer who's already done this milestone.
              </span>
              <Link to="/peers" style={{
                fontFamily: font.body, fontSize: 12, fontWeight: 600,
                color: "#fff", background: palette.teal,
                padding: "5px 12px", borderRadius: 20, textDecoration: "none", whiteSpace: "nowrap",
              }}>
                Find peer →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CertificateCard({ cert }) {
  return (
    <div style={{
      border: `1px solid ${palette.border}`,
      borderRadius: 14, background: "#fff",
      padding: "1.1rem 1.25rem",
      display: "flex", flexDirection: "column", gap: 6,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div style={{ fontFamily: font.body, fontSize: 14, fontWeight: 600, color: palette.ink, lineHeight: 1.35 }}>
          {cert.title}
        </div>
        <span style={{
          fontFamily: font.body, fontSize: 10, fontWeight: 600,
          color: palette.amber, background: palette.amberBg,
          padding: "3px 8px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0,
        }}>
          {cert.provider}
        </span>
      </div>
      <div style={{ fontFamily: font.body, fontSize: 12, color: palette.muted }}>{cert.org}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
        <span style={{ fontFamily: font.body, fontSize: 11, color: palette.violet, background: palette.blush, padding: "2px 8px", borderRadius: 20 }}>
          {cert.level}
        </span>
        <span style={{ fontFamily: font.body, fontSize: 11, color: palette.teal, background: palette.mint, padding: "2px 8px", borderRadius: 20 }}>
          {cert.duration}
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
        <span style={{ fontFamily: font.body, fontSize: 12, color: palette.muted }}>{cert.cost}</span>
        <a href={`https://${cert.link}`} target="_blank" rel="noreferrer" style={{
          fontFamily: font.body, fontSize: 12, fontWeight: 600,
          color: palette.violet, textDecoration: "none",
        }}>
          Visit {cert.link} →
        </a>
      </div>
    </div>
  );
}

function LearningTracks() {
  const [stage, setStage] = useState("select"); // select | generating | result
  const [field, setField] = useState("");
  const [level, setLevel] = useState(LEVELS[0]);
  const [roadmap, setRoadmap] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [completedSteps, setCompletedSteps] = useState([]);

  const generate = (chosenField) => {
    const f = chosenField || field;
    if (!f.trim()) return;
    setField(f);
    setStage("generating");

    // Placeholder for the real call:
    // const res = await fetch('/api/ai/generate-roadmap', { method: 'POST', body: JSON.stringify({ field: f, level }) });
    // const data = await res.json();
    setTimeout(() => {
      setRoadmap(buildMockRoadmap(f, level));
      setCertificates(buildMockCertificates(f));
      setCompletedSteps([]);
      setStage("result");
    }, 1800);
  };

  const toggleStep = (i) => {
    setCompletedSteps(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  const progress = roadmap ? Math.round((completedSteps.length / roadmap.milestones.length) * 100) : 0;

  return (
    <div style={{ fontFamily: font.body, minHeight: "100vh", background: "#FAFAFA" }}>

      {/* Hero */}
      <section style={{
        background: `linear-gradient(145deg, ${palette.plum} 0%, #5B2FA0 50%, #7B52C8 100%)`,
        padding: "3.5rem 2rem 3rem",
        textAlign: "center",
      }}>
        <span style={{
          fontFamily: font.body, fontSize: 11, fontWeight: 600,
          letterSpacing: 2, textTransform: "uppercase",
          color: palette.lavender,
          background: "rgba(179,157,219,0.15)",
          padding: "5px 14px", borderRadius: 20,
          border: "1px solid rgba(179,157,219,0.3)",
          display: "inline-block", marginBottom: "1rem",
        }}>
          ✨ AI-generated, just for you
        </span>
        <h1 style={{
          fontFamily: font.display,
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 400, color: "#fff",
          lineHeight: 1.2, marginBottom: "0.75rem",
        }}>
          Don't know where to start?<br />We'll map it out for you.
        </h1>
        <p style={{
          fontFamily: font.body, fontSize: 15,
          color: "rgba(255,255,255,0.68)",
          maxWidth: 480, margin: "0 auto",
          lineHeight: 1.7,
        }}>
          Type any career field and get a step-by-step roadmap with free videos, courses, and articles.
        </p>
      </section>

      <div style={{ maxWidth: 740, margin: "0 auto", padding: "2.5rem 2rem" }}>

        {/* STAGE 1 — Select field */}
        {stage === "select" && (
          <div>
            <div style={{
              background: "#fff", border: `1px solid ${palette.border}`,
              borderRadius: 20, padding: "2rem", marginBottom: "1.5rem",
            }}>
              <label style={{ fontFamily: font.body, fontSize: 13, fontWeight: 500, color: palette.ink, display: "block", marginBottom: 8 }}>
                What do you want to learn?
              </label>
              <div style={{ display: "flex", gap: 10, marginBottom: "1.5rem" }}>
                <input
                  value={field} onChange={e => setField(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && generate()}
                  placeholder="e.g. Cybersecurity, Game Development, Quantum Computing..."
                  style={{
                    flex: 1, padding: "11px 16px",
                    fontFamily: font.body, fontSize: 14, color: palette.ink,
                    border: `1px solid ${palette.border}`, borderRadius: 30,
                    outline: "none", boxSizing: "border-box",
                  }}
                  onFocus={e => e.target.style.borderColor = palette.violet}
                  onBlur={e => e.target.style.borderColor = palette.border}
                />
              </div>

              <label style={{ fontFamily: font.body, fontSize: 13, fontWeight: 500, color: palette.ink, display: "block", marginBottom: 8 }}>
                Your current level
              </label>
              <div style={{ display: "flex", gap: 8, marginBottom: "1.75rem", flexWrap: "wrap" }}>
                {LEVELS.map(l => (
                  <button key={l} onClick={() => setLevel(l)} style={{
                    padding: "7px 16px",
                    fontFamily: font.body, fontSize: 12, fontWeight: level === l ? 600 : 400,
                    background: level === l ? "#EEEDFE" : "#fff",
                    color: level === l ? palette.violet : palette.muted,
                    border: `1px solid ${level === l ? "#AFA9EC" : palette.border}`,
                    borderRadius: 20, cursor: "pointer", transition: "all 0.15s",
                  }}>
                    {l}
                  </button>
                ))}
              </div>

              <button
                disabled={!field.trim()}
                onClick={() => generate()}
                style={{
                  width: "100%", padding: "13px",
                  fontFamily: font.body, fontSize: 15, fontWeight: 600,
                  background: field.trim() ? palette.violet : "#E0D9F0",
                  color: field.trim() ? "#fff" : palette.muted,
                  border: "none", borderRadius: 30,
                  cursor: field.trim() ? "pointer" : "not-allowed",
                  transition: "background 0.15s",
                }}
              >
                ✨ Generate my roadmap
              </button>
            </div>

            {/* Popular fields */}
            <div>
              <div style={{ fontFamily: font.body, fontSize: 12, color: palette.muted, marginBottom: 10, fontWeight: 500 }}>
                Or pick a popular field
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
                {POPULAR_FIELDS.map(f => (
                  <button key={f.label} onClick={() => generate(f.label)} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "12px 14px",
                    fontFamily: font.body, fontSize: 13, color: palette.ink,
                    background: "#fff", border: `1px solid ${palette.border}`,
                    borderRadius: 12, cursor: "pointer", textAlign: "left",
                    transition: "all 0.15s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = palette.violet; e.currentTarget.style.background = palette.blush; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = palette.border; e.currentTarget.style.background = "#fff"; }}
                  >
                    <span style={{ fontSize: 18 }}>{f.icon}</span>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STAGE 2 — Generating */}
        {stage === "generating" && (
          <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
            <div style={{
              width: 56, height: 56, margin: "0 auto 1.5rem",
              border: `4px solid ${palette.border}`, borderTopColor: palette.violet,
              borderRadius: "50%", animation: "spin 0.9s linear infinite",
            }} />
            <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
            <h3 style={{ fontFamily: font.display, fontSize: 20, color: palette.ink, fontWeight: 400, marginBottom: 8 }}>
              Building your {field} roadmap...
            </h3>
            <p style={{ fontFamily: font.body, fontSize: 13, color: palette.muted }}>
              Our AI is curating the best free resources for your level
            </p>
          </div>
        )}

        {/* STAGE 3 — Result */}
        {stage === "result" && roadmap && (
          <div>
            {/* Summary card */}
            <div style={{
              background: "#fff", border: `1px solid ${palette.border}`,
              borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div>
                  <span style={{
                    fontFamily: font.body, fontSize: 10, fontWeight: 600,
                    color: palette.violet, background: "#EEEDFE",
                    padding: "3px 9px", borderRadius: 20, textTransform: "uppercase", letterSpacing: 0.5,
                  }}>
                    ✨ AI-generated
                  </span>
                  <h2 style={{ fontFamily: font.display, fontSize: 22, color: palette.ink, fontWeight: 400, marginTop: 8 }}>
                    {roadmap.field}
                  </h2>
                  <p style={{ fontFamily: font.body, fontSize: 12, color: palette.muted, marginTop: 2 }}>
                    {roadmap.level} · {roadmap.totalWeeks} weeks · {roadmap.milestones.length} milestones
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: font.display, fontSize: 26, color: palette.violet }}>{progress}%</div>
                  <div style={{ fontFamily: font.body, fontSize: 11, color: palette.muted }}>complete</div>
                </div>
              </div>
              <div style={{ height: 8, background: palette.blush, borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${progress}%`, background: palette.violet, borderRadius: 4, transition: "width 0.4s" }} />
              </div>
            </div>

            {/* Milestones */}
            {roadmap.milestones.map((m, i) => (
              <MilestoneCard
                key={i} milestone={m} index={i}
                completed={completedSteps.includes(i)}
                onToggle={toggleStep}
              />
            ))}

            {/* Certificate courses */}
            {certificates.length > 0 && (
              <div style={{ marginTop: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
                  <span style={{ fontSize: 18 }}>🎓</span>
                  <h3 style={{ fontFamily: font.display, fontSize: 18, color: palette.ink, fontWeight: 400 }}>
                    Popular certificate courses in {roadmap.field}
                  </h3>
                </div>
                <p style={{ fontFamily: font.body, fontSize: 12, color: palette.muted, marginBottom: "1rem", marginTop: -6 }}>
                  Want something to show on your resume or LinkedIn? These are well-recognised certificate options for this field.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
                  {certificates.map((c, i) => <CertificateCard key={i} cert={c} />)}
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", gap: 10, marginTop: "1.5rem" }}>
              <button onClick={() => setStage("select")} style={{
                flex: 1, padding: "11px",
                fontFamily: font.body, fontSize: 13, fontWeight: 500,
                background: "#fff", color: palette.violet,
                border: `1px solid ${palette.violet}`, borderRadius: 30, cursor: "pointer",
              }}>
                ← Generate a different roadmap
              </button>
              <Link to="/peers" style={{
                flex: 1, padding: "11px", textAlign: "center",
                fontFamily: font.body, fontSize: 13, fontWeight: 600,
                background: palette.violet, color: "#fff",
                borderRadius: 30, textDecoration: "none",
              }}>
                Browse peers →
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default LearningTracks;
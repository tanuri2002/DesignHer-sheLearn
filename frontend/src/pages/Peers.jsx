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
};

const font = {
  display: "'Georgia', 'Times New Roman', serif",
  body:    "'Poppins',sans-serif",
};

const ALL_PEERS = [
  {
    id: 1, initials: "KP", bg: "#EEEDFE", col: "#534AB7",
    name: "Kavya Perera", year: "2nd year", dept: "EE",
    rating: 5.0, reviews: 12, available: true,
    teaches: ["React", "TypeScript", "Tailwind CSS"],
    learning: ["Node.js", "Docker"],
    category: ["Frontend"],
    bio: "Frontend enthusiast who loves building beautiful UIs. Happy to help with anything React or TypeScript!",
  },
  {
    id: 2, initials: "AM", bg: "#FBEAF0", col: "#993556",
    name: "Asel Mendis", year: "3rd year", dept: "CE",
    rating: 4.7, reviews: 9, available: true,
    teaches: ["Python", "Data analysis", "Pandas"],
    learning: ["React", "REST APIs"],
    category: ["AI/ML", "Backend"],
    bio: "Data science lover who enjoys turning raw numbers into meaningful insights.",
  },
  {
    id: 3, initials: "DP", bg: "#E1F5EE", col: "#0F6E56",
    name: "Dinali Pathirana", year: "4th year", dept: "CE",
    rating: 4.9, reviews: 18, available: false, busyUntil: "5 PM",
    teaches: ["Node.js", "MongoDB", "Express"],
    learning: ["Flutter"],
    category: ["Backend"],
    bio: "Backend developer passionate about building scalable APIs and clean architecture.",
  },
  {
    id: 4, initials: "SN", bg: "#E6F1FB", col: "#185FA5",
    name: "Sachini Navaratne", year: "2nd year", dept: "EE",
    rating: 4.6, reviews: 7, available: true,
    teaches: ["Figma", "UI/UX", "Prototyping"],
    learning: ["Python", "ML basics"],
    category: ["Design"],
    bio: "UX designer who believes great products start with great design. Figma is my superpower.",
  },
  {
    id: 5, initials: "RL", bg: "#FFF3E0", col: "#E65100",
    name: "Raya Liyanage", year: "3rd year", dept: "CE",
    rating: 5.0, reviews: 14, available: true,
    teaches: ["Public speaking", "LaTeX", "Research writing"],
    learning: ["React", "TypeScript"],
    category: ["Other"],
    bio: "Loves helping peers communicate their ideas clearly — in presentations, papers, and beyond.",
  },
  {
    id: 6, initials: "MK", bg: "#EAF3DE", col: "#3B6D11",
    name: "Malsha Kumari", year: "4th year", dept: "CE",
    rating: 4.8, reviews: 11, available: false,
    teaches: ["ML basics", "Scikit-learn", "TensorFlow"],
    learning: ["Flutter", "Firebase"],
    category: ["AI/ML"],
    bio: "AI/ML enthusiast helping beginners take their first steps into machine learning.",
  },
  {
    id: 7, initials: "NF", bg: "#FDE8F0", col: "#AD1457",
    name: "Nethmi Fernando", year: "3rd year", dept: "EE",
    rating: 4.5, reviews: 6, available: true,
    teaches: ["Cybersecurity basics", "Networking", "Linux"],
    learning: ["Python", "Ethical hacking"],
    category: ["Networking", "Other"],
    bio: "Cybersecurity enthusiast passionate about helping others understand how to stay safe online.",
  },
  {
    id: 8, initials: "IS", bg: "#E8F5E9", col: "#2E7D32",
    name: "Imasha Silva", year: "2nd year", dept: "CE",
    rating: 4.9, reviews: 8, available: true,
    teaches: ["Java", "OOP concepts", "Data structures"],
    learning: ["Spring Boot", "System design"],
    category: ["Backend"],
    bio: "Strong Java developer who loves explaining OOP concepts in a simple, relatable way.",
  },
];

const CATEGORIES = ["All", "Frontend", "Backend", "AI/ML", "Design", "Networking", "Other"];

function StarRating({ rating }) {
  return (
    <span style={{ color: "#EF9F27", fontSize: 13 }}>
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
      <span style={{ color: palette.muted, fontSize: 12, marginLeft: 4 }}>{rating.toFixed(1)}</span>
    </span>
  );
}

function SkillTag({ label, variant }) {
  const styles = {
    teach: { background: "#EEEDFE", color: "#534AB7" },
    learn: { background: "#E1F5EE", color: "#0F6E56" },
  };
  const s = styles[variant];
  return (
    <span style={{
      ...s, fontSize: 11, padding: "3px 9px",
      borderRadius: 20, fontWeight: 500,
      fontFamily: font.body, display: "inline-block",
    }}>
      {label}
    </span>
  );
}

function PeerCard({ peer, onBook }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      background: "#fff",
      border: `1px solid ${palette.border}`,
      borderRadius: 16, padding: "1.5rem",
      transition: "box-shadow 0.2s, transform 0.2s",
      display: "flex", flexDirection: "column", gap: 10,
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 28px rgba(107,63,197,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{
          width: 46, height: 46, borderRadius: "50%",
          background: peer.bg, color: peer.col,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 600, fontFamily: font.body, flexShrink: 0,
        }}>{peer.initials}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: font.body, fontSize: 14, fontWeight: 600, color: palette.ink }}>{peer.name}</div>
          <div style={{ fontFamily: font.body, fontSize: 12, color: palette.muted }}>{peer.year} · {peer.dept}</div>
          <StarRating rating={peer.rating} />
          <span style={{ fontFamily: font.body, fontSize: 11, color: palette.muted, marginLeft: 4 }}>({peer.reviews} reviews)</span>
        </div>
        <div>
          {peer.available ? (
            <span style={{ fontFamily: font.body, fontSize: 11, color: palette.teal, fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: palette.teal, display: "inline-block" }} />
              Available
            </span>
          ) : (
            <span style={{ fontFamily: font.body, fontSize: 11, color: "#E65100", fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#E65100", display: "inline-block" }} />
              Busy{peer.busyUntil ? ` until ${peer.busyUntil}` : ""}
            </span>
          )}
        </div>
      </div>

      {/* Bio */}
      {expanded && (
        <p style={{ fontFamily: font.body, fontSize: 13, color: palette.muted, lineHeight: 1.6, margin: 0 }}>
          {peer.bio}
        </p>
      )}

      {/* Skills */}
      <div>
        <div style={{ fontFamily: font.body, fontSize: 11, color: palette.muted, marginBottom: 5 }}>Teaches</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {peer.teaches.map(s => <SkillTag key={s} label={s} variant="teach" />)}
        </div>
      </div>
      <div>
        <div style={{ fontFamily: font.body, fontSize: 11, color: palette.muted, marginBottom: 5 }}>Learning</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {peer.learning.map(s => <SkillTag key={s} label={s} variant="learn" />)}
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        <button onClick={() => setExpanded(e => !e)} style={{
          flex: 1, padding: "7px 0",
          fontFamily: font.body, fontSize: 12, color: palette.violet,
          background: palette.blush, border: "none",
          borderRadius: 20, cursor: "pointer", transition: "background 0.15s",
        }}
          onMouseEnter={e => e.target.style.background = "#E4D9F9"}
          onMouseLeave={e => e.target.style.background = palette.blush}
        >
          {expanded ? "Show less" : "View profile"}
        </button>
        <button onClick={() => onBook(peer)} style={{
          flex: 1, padding: "7px 0",
          fontFamily: font.body, fontSize: 12, fontWeight: 600,
          color: "#fff", background: palette.violet,
          border: "none", borderRadius: 20, cursor: "pointer", transition: "background 0.15s",
        }}
          onMouseEnter={e => e.target.style.background = palette.plum}
          onMouseLeave={e => e.target.style.background = palette.violet}
        >
          Book session
        </button>
      </div>
    </div>
  );
}

function BookingModal({ peer, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [topic, setTopic] = useState("");
  const [slot, setSlot] = useState("");

  const slots = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"];
  const taken = ["10:30 AM", "2:30 PM"];

  if (submitted) {
    return (
      <div style={{
        position: "fixed", inset: 0, background: "rgba(27,15,60,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200,
      }} onClick={onClose}>
        <div style={{
          background: "#fff", borderRadius: 20, padding: "2.5rem",
          maxWidth: 400, width: "90%", textAlign: "center",
        }} onClick={e => e.stopPropagation()}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
          <h3 style={{ fontFamily: font.display, fontSize: 20, color: palette.plum, marginBottom: 8 }}>Session booked!</h3>
          <p style={{ fontFamily: font.body, fontSize: 13, color: palette.muted, lineHeight: 1.7, marginBottom: "1.5rem" }}>
            Your session with <b>{peer.name}</b> has been confirmed. Check your dashboard for details.
          </p>
          <button onClick={onClose} style={{
            fontFamily: font.body, fontSize: 14, fontWeight: 600,
            background: palette.violet, color: "#fff",
            border: "none", borderRadius: 30, padding: "10px 28px", cursor: "pointer",
          }}>Done</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(27,15,60,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200,
      padding: "1rem",
    }} onClick={onClose}>
      <div style={{
        background: "#fff", borderRadius: 20, padding: "2rem",
        maxWidth: 460, width: "100%",
        boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h3 style={{ fontFamily: font.display, fontSize: 18, color: palette.ink, fontWeight: 400 }}>Book a session</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: palette.muted }}>×</button>
        </div>

        {/* Peer info */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, background: palette.blush, borderRadius: 12, padding: "12px 14px", marginBottom: "1.25rem" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: peer.bg, color: peer.col, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, fontFamily: font.body }}>
            {peer.initials}
          </div>
          <div>
            <div style={{ fontFamily: font.body, fontSize: 13, fontWeight: 600, color: palette.ink }}>{peer.name}</div>
            <div style={{ fontFamily: font.body, fontSize: 12, color: palette.muted }}>{peer.teaches.join(" · ")}</div>
          </div>
        </div>

        {/* Topic */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontFamily: font.body, fontSize: 13, fontWeight: 500, color: palette.ink, display: "block", marginBottom: 5 }}>What do you want to learn?</label>
          <input
            value={topic} onChange={e => setTopic(e.target.value)}
            placeholder="e.g. React Hooks, MongoDB basics..."
            style={{
              width: "100%", padding: "9px 13px",
              fontFamily: font.body, fontSize: 13, color: palette.ink,
              border: `1px solid ${palette.border}`, borderRadius: 10,
              outline: "none", boxSizing: "border-box",
            }}
            onFocus={e => e.target.style.borderColor = palette.violet}
            onBlur={e => e.target.style.borderColor = palette.border}
          />
        </div>

        {/* Time slots */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ fontFamily: font.body, fontSize: 13, fontWeight: 500, color: palette.ink, display: "block", marginBottom: 8 }}>Pick a time slot</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {slots.map(s => {
              const isTaken = taken.includes(s);
              const isPicked = slot === s;
              return (
                <button key={s} disabled={isTaken} onClick={() => setSlot(s)} style={{
                  padding: "8px 0",
                  fontFamily: font.body, fontSize: 12,
                  borderRadius: 10, cursor: isTaken ? "not-allowed" : "pointer",
                  border: isPicked ? `2px solid ${palette.violet}` : `1px solid ${palette.border}`,
                  background: isTaken ? "#F5F5F5" : isPicked ? "#EEEDFE" : "#fff",
                  color: isTaken ? "#BDBDBD" : isPicked ? palette.violet : palette.ink,
                  fontWeight: isPicked ? 600 : 400,
                  transition: "all 0.15s",
                }}>
                  {isTaken ? `${s} ✕` : s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Confirm */}
        <button
          disabled={!topic || !slot}
          onClick={() => setSubmitted(true)}
          style={{
            width: "100%", padding: "12px",
            fontFamily: font.body, fontSize: 14, fontWeight: 600,
            background: topic && slot ? palette.violet : "#E0D9F0",
            color: topic && slot ? "#fff" : palette.muted,
            border: "none", borderRadius: 30,
            cursor: topic && slot ? "pointer" : "not-allowed",
            transition: "background 0.15s",
          }}
        >
          Confirm booking →
        </button>
      </div>
    </div>
  );
}

export default function Peers() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [bookingPeer, setBookingPeer] = useState(null);

  const filtered = ALL_PEERS.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.teaches.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
      p.learning.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchCat = category === "All" || p.category.includes(category);
    const matchAvail = !availableOnly || p.available;
    return matchSearch && matchCat && matchAvail;
  });

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
          Peer community
        </span>
        <h1 style={{
          fontFamily: font.display,
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 400, color: "#fff",
          lineHeight: 1.2, marginBottom: "0.75rem",
        }}>
          Find your perfect learning partner.
        </h1>
        <p style={{
          fontFamily: font.body, fontSize: 15,
          color: "rgba(255,255,255,0.68)",
          maxWidth:600, margin: "0 auto",
          lineHeight: 1.7,
        }}>
          Browse peers who can teach you what you need - and learn from you in return.
        </p>
      </section>

      {/* Search + filters */}
      <section style={{ padding: "1.5rem 2rem", background: "#fff", borderBottom: `1px solid ${palette.border}`, position: "sticky", top: 60, zIndex: 50 }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          {/* Search bar */}
          <div style={{ display: "flex", gap: 10, marginBottom: "0.9rem" }}>
            <div style={{ position: "relative", flex: 1 }}>
              <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or skill (e.g. React, Python, Figma...)"
                style={{
                  width: "100%", padding: "9px 14px 9px 38px",
                  fontFamily: font.body, fontSize: 13, color: palette.ink,
                  border: `1px solid ${palette.border}`, borderRadius: 30,
                  outline: "none", boxSizing: "border-box", background: "#FAFAFA",
                }}
                onFocus={e => e.target.style.borderColor = palette.violet}
                onBlur={e => e.target.style.borderColor = palette.border}
              />
            </div>
            <button
              onClick={() => setAvailableOnly(v => !v)}
              style={{
                padding: "9px 18px",
                fontFamily: font.body, fontSize: 13, fontWeight: 500,
                background: availableOnly ? palette.mint : "#fff",
                color: availableOnly ? palette.teal : palette.muted,
                border: `1px solid ${availableOnly ? palette.teal : palette.border}`,
                borderRadius: 30, cursor: "pointer", transition: "all 0.15s",
                whiteSpace: "nowrap",
              }}
            >
              {availableOnly ? "✓ Available now" : "Available now"}
            </button>
          </div>

          {/* Category chips */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)} style={{
                padding: "5px 14px",
                fontFamily: font.body, fontSize: 12, fontWeight: category === c ? 600 : 400,
                background: category === c ? "#EEEDFE" : "#fff",
                color: category === c ? palette.violet : palette.muted,
                border: `1px solid ${category === c ? "#AFA9EC" : palette.border}`,
                borderRadius: 20, cursor: "pointer", transition: "all 0.15s",
              }}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Peer grid */}
      <section style={{ padding: "2rem", maxWidth: 980, margin: "0 auto" }}>
        <div style={{ fontFamily: font.body, fontSize: 13, color: palette.muted, marginBottom: "1rem" }}>
          Showing <b style={{ color: palette.ink }}>{filtered.length}</b> peers
          {category !== "All" && <span> in <b style={{ color: palette.violet }}>{category}</b></span>}
          {availableOnly && <span> · <b style={{ color: palette.teal }}>available now</b></span>}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 2rem", color: palette.muted }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p style={{ fontFamily: font.body, fontSize: 15 }}>No peers found. Try a different search or filter.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {filtered.map(peer => (
              <PeerCard key={peer.id} peer={peer} onBook={setBookingPeer} />
            ))}
          </div>
        )}
      </section>

      {/* Booking modal */}
      {bookingPeer && (
        <BookingModal peer={bookingPeer} onClose={() => setBookingPeer(null)} />
      )}

    </div>
  );
}
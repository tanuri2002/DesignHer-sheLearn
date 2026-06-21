import React, { useState, useEffect } from "react";

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
  body:    "'Inter', 'Segoe UI', system-ui, sans-serif",
};

const CATEGORIES = ["All", "Frontend", "Backend", "AI/ML", "Design", "Networking", "Other"];

// Deterministic avatar color from a name — same person always gets the
// same color without us having to store it anywhere.
const AVATAR_PALETTES = [
  { bg: "#EEEDFE", col: "#534AB7" },
  { bg: "#FBEAF0", col: "#993556" },
  { bg: "#E1F5EE", col: "#0F6E56" },
  { bg: "#E6F1FB", col: "#185FA5" },
  { bg: "#FFF3E0", col: "#E65100" },
  { bg: "#EAF3DE", col: "#3B6D11" },
  { bg: "#FDE8F0", col: "#AD1457" },
  { bg: "#E8F5E9", col: "#2E7D32" },
];

function avatarFor(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_PALETTES[Math.abs(hash) % AVATAR_PALETTES.length];
}

function initialsFor(name = "") {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase();
}

function StarRating({ rating, reviews }) {
  const r = rating || 0;
  return (
    <span>
      <span style={{ color: "#EF9F27", fontSize: 13 }}>
        {"★".repeat(Math.floor(r))}{"☆".repeat(5 - Math.floor(r))}
      </span>
      <span style={{ color: palette.muted, fontSize: 12, marginLeft: 4 }}>
        {r > 0 ? r.toFixed(1) : "New"}{reviews ? ` (${reviews})` : ""}
      </span>
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
  const avatar = avatarFor(peer.fullName);
  const initials = initialsFor(peer.fullName);
  const teaches = peer.teaches || [];
  const learning = peer.learning || [];

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
          background: avatar.bg, color: avatar.col,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 600, fontFamily: font.body, flexShrink: 0,
        }}>{initials}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: font.body, fontSize: 14, fontWeight: 600, color: palette.ink }}>{peer.fullName}</div>
          <div style={{ fontFamily: font.body, fontSize: 12, color: palette.muted }}>{peer.year} · {peer.department}</div>
          <StarRating rating={peer.rating} reviews={peer.reviewCount} />
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
              Busy
            </span>
          )}
        </div>
      </div>

      {/* Bio */}
      {expanded && peer.bio && (
        <p style={{ fontFamily: font.body, fontSize: 13, color: palette.muted, lineHeight: 1.6, margin: 0 }}>
          {peer.bio}
        </p>
      )}

      {/* Skills */}
      {teaches.length > 0 && (
        <div>
          <div style={{ fontFamily: font.body, fontSize: 11, color: palette.muted, marginBottom: 5 }}>Teaches</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {teaches.map(s => <SkillTag key={s} label={s} variant="teach" />)}
          </div>
        </div>
      )}
      {learning.length > 0 && (
        <div>
          <div style={{ fontFamily: font.body, fontSize: 11, color: palette.muted, marginBottom: 5 }}>Learning</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {learning.map(s => <SkillTag key={s} label={s} variant="learn" />)}
          </div>
        </div>
      )}
      {teaches.length === 0 && learning.length === 0 && (
        <p style={{ fontFamily: font.body, fontSize: 12, color: palette.muted, fontStyle: "italic" }}>
          Hasn't added any skills yet.
        </p>
      )}

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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const slots = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"];

  const confirmBooking = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ peerId: peer._id, topic, slot }),
      });
      if (!res.ok) throw new Error("Could not book this session. Please try a different slot.");
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

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
            Your session with <b>{peer.fullName}</b> has been confirmed. Check your dashboard for details.
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

  const avatar = avatarFor(peer.fullName);
  const initials = initialsFor(peer.fullName);

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
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: avatar.bg, color: avatar.col, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, fontFamily: font.body }}>
            {initials}
          </div>
          <div>
            <div style={{ fontFamily: font.body, fontSize: 13, fontWeight: 600, color: palette.ink }}>{peer.fullName}</div>
            <div style={{ fontFamily: font.body, fontSize: 12, color: palette.muted }}>{(peer.teaches || []).join(" · ") || "No skills listed yet"}</div>
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
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontFamily: font.body, fontSize: 13, fontWeight: 500, color: palette.ink, display: "block", marginBottom: 8 }}>Pick a time slot</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {slots.map(s => {
              const isPicked = slot === s;
              return (
                <button key={s} onClick={() => setSlot(s)} style={{
                  padding: "8px 0",
                  fontFamily: font.body, fontSize: 12,
                  borderRadius: 10, cursor: "pointer",
                  border: isPicked ? `2px solid ${palette.violet}` : `1px solid ${palette.border}`,
                  background: isPicked ? "#EEEDFE" : "#fff",
                  color: isPicked ? palette.violet : palette.ink,
                  fontWeight: isPicked ? 600 : 400,
                  transition: "all 0.15s",
                }}>
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {error && (
          <div style={{ fontFamily: font.body, fontSize: 12, color: "#D32F2F", marginBottom: "0.75rem" }}>{error}</div>
        )}

        {/* Confirm */}
        <button
          disabled={!topic || !slot || submitting}
          onClick={confirmBooking}
          style={{
            width: "100%", padding: "12px",
            fontFamily: font.body, fontSize: 14, fontWeight: 600,
            background: topic && slot && !submitting ? palette.violet : "#E0D9F0",
            color: topic && slot && !submitting ? "#fff" : palette.muted,
            border: "none", borderRadius: 30,
            cursor: topic && slot && !submitting ? "pointer" : "not-allowed",
            transition: "background 0.15s",
          }}
        >
          {submitting ? "Booking..." : "Confirm booking →"}
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

  const [peers, setPeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch real peers from the backend — the backend only ever returns
  // users who have showOnPeerPage: true. No hardcoded data here at all.
  useEffect(() => {
    const fetchPeers = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/peers");
        if (!res.ok) throw new Error("Could not load peers right now.");
        const data = await res.json();
        setPeers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPeers();
  }, []);

  const filtered = peers.filter(p => {
    const teaches = p.teaches || [];
    const learning = p.learning || [];
    const matchSearch =
      (p.fullName || "").toLowerCase().includes(search.toLowerCase()) ||
      teaches.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
      learning.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchCat = category === "All" || (p.category || []).includes(category);
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
          maxWidth: 480, margin: "0 auto",
          lineHeight: 1.7,
        }}>
          Browse peers who can teach you what you need — and learn from you in return.
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

        {loading && (
          <div style={{ textAlign: "center", padding: "4rem 2rem", color: palette.muted }}>
            <div style={{
              width: 40, height: 40, margin: "0 auto 1rem",
              border: `4px solid ${palette.border}`, borderTopColor: palette.violet,
              borderRadius: "50%", animation: "spin 0.9s linear infinite",
            }} />
            <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
            <p style={{ fontFamily: font.body, fontSize: 14 }}>Loading peers...</p>
          </div>
        )}

        {!loading && error && (
          <div style={{ textAlign: "center", padding: "4rem 2rem", color: "#D32F2F" }}>
            <p style={{ fontFamily: font.body, fontSize: 14 }}>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div style={{ fontFamily: font.body, fontSize: 13, color: palette.muted, marginBottom: "1rem" }}>
              Showing <b style={{ color: palette.ink }}>{filtered.length}</b> peers
              {category !== "All" && <span> in <b style={{ color: palette.violet }}>{category}</b></span>}
              {availableOnly && <span> · <b style={{ color: palette.teal }}>available now</b></span>}
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem 2rem", color: palette.muted }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                <p style={{ fontFamily: font.body, fontSize: 15 }}>
                  {peers.length === 0
                    ? "No peers have joined the community yet. Be the first!"
                    : "No peers found. Try a different search or filter."}
                </p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                {filtered.map(peer => (
                  <PeerCard key={peer._id} peer={peer} onBook={setBookingPeer} />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* Booking modal */}
      {bookingPeer && (
        <BookingModal peer={bookingPeer} onClose={() => setBookingPeer(null)} />
      )}

    </div>
  );
}
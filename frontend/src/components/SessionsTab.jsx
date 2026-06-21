import React, { useState, useEffect } from "react";
import { apiFetch } from "../api";

const palette = {
  plum:    "#3B1F5E",
  violet:  "#6C3FC5",
  blush:   "#F3EEF9",
  mint:    "#D6F5EC",
  teal:    "#1B9E78",
  ink:     "#1A1A2E",
  muted:   "#6B6B8A",
  border:  "#E4DCF0",
  error:   "#D32F2F",
};

const font = {
  display: "'Georgia', 'Times New Roman', serif",
  body:    "'Poppins', sans-serif",
};

const STATUS_STYLE = {
  pending:  { bg: "#FFF3E0", col: "#E65100", label: "Pending" },
  accepted: { bg: palette.mint, col: palette.teal, label: "Accepted" },
  declined: { bg: "#FDECEC", col: palette.error, label: "Declined" },
  completed:{ bg: palette.blush, col: palette.violet, label: "Completed" },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE.pending;
  return (
    <span style={{
      fontFamily: font.body, fontSize: 11, fontWeight: 600,
      color: s.col, background: s.bg,
      padding: "3px 10px", borderRadius: 20,
    }}>
      {s.label}
    </span>
  );
}

function SessionCard({ session, isRequest, onRespond }) {
  const otherPerson = isRequest ? session.learner : session.teacher;
  const [responding, setResponding] = useState(false);

  const handleRespond = async (status) => {
    setResponding(true);
    await onRespond(session._id, status);
    setResponding(false);
  };

  return (
    <div style={{
      border: `1px solid ${palette.border}`, borderRadius: 14,
      padding: "1rem 1.25rem", display: "flex",
      alignItems: "center", justifyContent: "space-between", gap: 12,
      marginBottom: 10, flexWrap: "wrap",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          background: palette.blush, color: palette.violet,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 600, fontFamily: font.body, overflow: "hidden",
        }}>
          {otherPerson?.profilePicture
            ? <img src={otherPerson.profilePicture} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : (otherPerson?.fullName?.[0] || "?")}
        </div>
        <div>
          <div style={{ fontFamily: font.body, fontSize: 13.5, fontWeight: 600, color: palette.ink }}>
            {otherPerson?.fullName || "Unknown user"}
          </div>
          <div style={{ fontFamily: font.body, fontSize: 12, color: palette.muted }}>
            {session.topic} · {session.requestedTime}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <StatusBadge status={session.status} />
        {isRequest && session.status === "pending" && (
          <>
            <button
              disabled={responding}
              onClick={() => handleRespond("accepted")}
              style={{
                fontFamily: font.body, fontSize: 12, fontWeight: 600,
                color: "#fff", background: palette.teal,
                border: "none", borderRadius: 20, padding: "6px 14px", cursor: "pointer",
              }}
            >
              Accept
            </button>
            <button
              disabled={responding}
              onClick={() => handleRespond("declined")}
              style={{
                fontFamily: font.body, fontSize: 12, fontWeight: 600,
                color: palette.error, background: "#fff",
                border: `1px solid ${palette.error}`, borderRadius: 20, padding: "6px 14px", cursor: "pointer",
              }}
            >
              Decline
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function SessionsTab() {
  const [activeView, setActiveView] = useState("upcoming"); // "upcoming" | "requests"
  const [mySessions, setMySessions] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchAll = async () => {
    setLoading(true);
    setError("");
    try {
      const [mineRes, reqRes] = await Promise.all([
        apiFetch("/api/sessions/mine", { headers: { Authorization: `Bearer ${token}` } }),
        apiFetch("/api/sessions/requests", { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      if (!mineRes.ok || !reqRes.ok) throw new Error("Could not load sessions.");
      setMySessions(await mineRes.json());
      setRequests(await reqRes.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleRespond = async (sessionId, status) => {
    try {
      const res = await apiFetch(`/api/sessions/${sessionId}/respond`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      fetchAll(); // refresh both lists
    } catch {
      setError("Could not update the session. Please try again.");
    }
  };

  const pendingRequestCount = requests.filter(r => r.status === "pending").length;

  return (
    <div>
      <h2 style={{ fontFamily: font.display, fontSize: 20, color: palette.ink, fontWeight: 400, marginBottom: "1.25rem" }}>
        Sessions
      </h2>

      {/* Sub-tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: "1.25rem", borderBottom: `1px solid ${palette.border}` }}>
        <button
          onClick={() => setActiveView("upcoming")}
          style={{
            fontFamily: font.body, fontSize: 13, fontWeight: 600,
            color: activeView === "upcoming" ? palette.violet : palette.muted,
            background: "none", border: "none", cursor: "pointer",
            padding: "8px 4px", marginRight: 20,
            borderBottom: activeView === "upcoming" ? `2px solid ${palette.violet}` : "2px solid transparent",
          }}
        >
          My upcoming sessions
        </button>
        <button
          onClick={() => setActiveView("requests")}
          style={{
            fontFamily: font.body, fontSize: 13, fontWeight: 600,
            color: activeView === "requests" ? palette.violet : palette.muted,
            background: "none", border: "none", cursor: "pointer",
            padding: "8px 4px", display: "flex", alignItems: "center", gap: 6,
            borderBottom: activeView === "requests" ? `2px solid ${palette.violet}` : "2px solid transparent",
          }}
        >
          Requests
          {pendingRequestCount > 0 && (
            <span style={{
              background: palette.error, color: "#fff", fontSize: 10, fontWeight: 700,
              borderRadius: "50%", width: 17, height: 17,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}>
              {pendingRequestCount}
            </span>
          )}
        </button>
      </div>

      {loading && <p style={{ fontFamily: font.body, fontSize: 13, color: palette.muted }}>Loading sessions...</p>}
      {error && <p style={{ fontFamily: font.body, fontSize: 13, color: palette.error }}>{error}</p>}

      {!loading && !error && activeView === "upcoming" && (
        mySessions.length === 0
          ? <p style={{ fontFamily: font.body, fontSize: 13, color: palette.muted }}>You haven't booked any sessions yet.</p>
          : mySessions.map(s => <SessionCard key={s._id} session={s} isRequest={false} onRespond={handleRespond} />)
      )}

      {!loading && !error && activeView === "requests" && (
        requests.length === 0
          ? <p style={{ fontFamily: font.body, fontSize: 13, color: palette.muted }}>No one has requested a session with you yet.</p>
          : requests.map(s => <SessionCard key={s._id} session={s} isRequest={true} onRespond={handleRespond} />)
      )}
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const logo_new = "/logo_new.png";

const palette = {
  plum:    "#3B1F5E",
  violet:  "#6C3FC5",
  lavender:"#B39DDB",
  blush:   "#F3EEF9",
  white:   "#FFFFFF",
  muted:   "#6B6B8A",
  border:  "#E4DCF0",
};

const font = {
  display: "'Playfair Display', serif",
  body: "'Poppins', sans-serif",
};

const navLinks = [
  { label: "Home",            path: "/" },
  { label: "About",           path: "/about" },
  { label: "Learning Tracks", path: "/tracks" },
  { label: "Find Peers",      path: "/peers" },
];

function NotificationBell() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("/api/notifications", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setCount(data.filter(n => !n.read).length))
      .catch(() => {});
  }, []);

  return (
    <Link to="/profile" style={{
      position: "relative", marginLeft: 8,
      textDecoration: "none", fontSize: 18,
      display: "inline-flex", alignItems: "center",
    }}>
      🔔
      {count > 0 && (
        <span style={{
          position: "absolute", top: -4, right: -6,
          background: "#D32F2F", color: "#fff",
          fontSize: 10, fontWeight: 700,
          width: 16, height: 16, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {count}
        </span>
      )}
    </Link>
  );
}

export default function NavigationBar() {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(255,255,255,0.93)",
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${palette.border}`,
      padding: "0 2rem",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 60,
      fontFamily: font.body,
    }}>

      {/* Logo */}
      <Link to="/" style={{
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}>
        <img
          src={logo_new}
          alt="SheLearn Logo"
          style={{ width: "36px", height: "36px", objectFit: "contain" }}
        />
        <span style={{
          fontFamily: font.display,
          fontSize: 22,
          color: palette.plum,
          letterSpacing: "-0.5px",
        }}>
          She<span style={{ color: palette.violet }}>Learn</span>
        </span>
      </Link>

      {/* Desktop links */}
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {navLinks.map((link) => (
          <Link key={link.path} to={link.path} style={{
            fontSize: 13,
            color: isActive(link.path) ? palette.violet : palette.muted,
            textDecoration: "none",
            padding: "6px 12px",
            borderRadius: 8,
            background: isActive(link.path) ? palette.blush : "transparent",
            fontWeight: isActive(link.path) ? 600 : 400,
            transition: "all 0.15s",
          }}
            onMouseEnter={e => {
              if (!isActive(link.path)) {
                e.target.style.background = palette.blush;
                e.target.style.color = palette.violet;
              }
            }}
            onMouseLeave={e => {
              if (!isActive(link.path)) {
                e.target.style.background = "transparent";
                e.target.style.color = palette.muted;
              }
            }}
          >
            {link.label}
          </Link>
        ))}

        {/* Auth area — swaps based on login state */}
        {user ? (
          <>
            <NotificationBell />
            <Link
              to="/profile"
              className="ml-3 relative inline-flex items-center gap-2 rounded-full px-4 py-1.5
                         bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600
                         bg-[length:200%_100%] animate-shimmer
                         text-white text-sm font-semibold shadow-lg shadow-violet-300/50
                         hover:scale-105 transition-transform duration-200"
            >
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-6 h-6 rounded-full object-cover border-2 border-white"
                />
              ) : (
                <span className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center text-xs">
                  {user.fullName?.charAt(0).toUpperCase()}
                </span>
              )}
              <span>Profile</span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              fontSize: 13, color: palette.violet,
              textDecoration: "none", padding: "6px 16px",
              borderRadius: 20, border: `1px solid ${palette.violet}`,
              marginLeft: 8, transition: "all 0.15s",
            }}
              onMouseEnter={e => { e.target.style.background = palette.blush; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; }}
            >
              Log in
            </Link>

            <Link to="/signup" style={{
              fontSize: 13, fontWeight: 600,
              background: palette.violet, color: "#fff",
              textDecoration: "none", padding: "7px 18px",
              borderRadius: 20, marginLeft: 4,
              transition: "all 0.15s",
            }}
              onMouseEnter={e => { e.target.style.background = palette.plum; }}
              onMouseLeave={e => { e.target.style.background = palette.violet; }}
            >
              Get started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
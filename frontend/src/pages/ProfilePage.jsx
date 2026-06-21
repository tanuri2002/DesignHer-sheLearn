import React, { useState, useEffect } from "react";
import ProfileSettingsTab from "../components/ProfileSettingsTab";
import SessionsTab from "../components/SessionsTab";
import { useAuth } from "../context/AuthContext";

const palette = {
  plum:    "#3B1F5E",
  violet:  "#6C3FC5",
  blush:   "#F3EEF9",
  ink:     "#1A1A2E",
  muted:   "#6B6B8A",
  border:  "#E4DCF0",
};

const font = {
  display: "'Georgia', 'Times New Roman', serif",
  body:    "'Poppins', sans-serif",
};

const TABS = [
  { key: "settings",      label: "Profile Settings", icon: "👤" },
  { key: "sessions",      label: "Sessions",          icon: "📅" },
  { key: "notifications", label: "Notifications",     icon: "🔔" },
];

function NotificationsTab() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("/api/notifications", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setNotifications(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 style={{ fontFamily: font.display, fontSize: 20, color: palette.ink, fontWeight: 400, marginBottom: "1.25rem" }}>
        Notifications
      </h2>
      {loading && <p style={{ fontSize: 13, color: palette.muted }}>Loading...</p>}
      {!loading && notifications.length === 0 && (
        <p style={{ fontSize: 13, color: palette.muted }}>You're all caught up.</p>
      )}
      {notifications.map(n => (
        <div key={n._id} style={{
          padding: "10px 14px", borderRadius: 10,
          background: n.read ? "#fff" : palette.blush,
          border: `1px solid ${palette.border}`, marginBottom: 8,
        }}>
          <div style={{ fontSize: 13, color: palette.ink }}>{n.message}</div>
          <div style={{ fontSize: 11, color: palette.muted, marginTop: 2 }}>
            {new Date(n.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("settings");

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", padding: "2rem", fontFamily: font.body }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ fontFamily: font.display, fontSize: 22, color: palette.ink, fontWeight: 400, marginBottom: "1.5rem" }}>
          Account settings
        </h1>

        <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
          {/* Sidebar */}
          <div style={{
            width: 220, flexShrink: 0,
            background: "#fff", borderRadius: 16,
            border: `1px solid ${palette.border}`,
            padding: "1rem 0",
          }}>
            <div style={{ textAlign: "center", padding: "0 1rem 1rem", borderBottom: `1px solid ${palette.border}`, marginBottom: 8 }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%", margin: "0 auto 8px",
                background: user?.profilePicture ? `url(${user.profilePicture}) center/cover` : palette.blush,
                border: `2px solid ${palette.violet}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, color: palette.violet, fontWeight: 600,
              }}>
                {!user?.profilePicture && (user?.fullName?.[0] || "?")}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: palette.ink }}>{user?.fullName}</div>
              <div style={{ fontSize: 11, color: palette.muted }}>{user?.email}</div>
            </div>

            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 1rem",
                  fontFamily: font.body, fontSize: 13,
                  fontWeight: activeTab === tab.key ? 600 : 400,
                  color: activeTab === tab.key ? palette.violet : palette.muted,
                  background: activeTab === tab.key ? palette.blush : "transparent",
                  border: "none",
                  borderLeft: activeTab === tab.key ? `3px solid ${palette.violet}` : "3px solid transparent",
                  cursor: "pointer", textAlign: "left",
                  transition: "all 0.15s",
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content area */}
          <div style={{
            flex: 1, background: "#fff", borderRadius: 16,
            border: `1px solid ${palette.border}`,
            padding: "2rem",
            minHeight: 480,
          }}>
            {activeTab === "settings" && <ProfileSettingsTab />}
            {activeTab === "sessions" && <SessionsTab />}
            {activeTab === "notifications" && <NotificationsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../api";

const palette = {
  plum:    "#3B1F5E",
  violet:  "#6C3FC5",
  lavender:"#B39DDB",
  blush:   "#F3EEF9",
  ink:     "#1A1A2E",
  muted:   "#6B6B8A",
  border:  "#E4DCF0",
  error:   "#D32F2F",
  success: "#1B9E78",
};

const font = {
  display: "'Georgia', 'Times New Roman', serif",
  body:    "'Poppins', sans-serif",
};

const STATUS_OPTIONS = [
  { value: "available",        label: "Available now",       emoji: "🟢" },
  { value: "busy",              label: "Busy",                 emoji: "🔴" },
  { value: "available_after_4", label: "Available after 4pm",  emoji: "🕓" },
  { value: "available_weekends",label: "Available on weekends",emoji: "📅" },
];

export default function ProfileSettingsTab() {
  const { user, login } = useAuth();
  const fileInputRef = useRef(null);

  const [preview, setPreview] = useState(user?.profilePicture || null);
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState(user?.status || "available");
  const [bio, setBio] = useState(user?.bio || "");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    setError("");
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    setSaved(false);

    try {
      const formData = new FormData();
      formData.append("status", status);
      formData.append("bio", bio);
      if (imageFile) formData.append("profilePicture", imageFile);

      const res = await apiFetch("/api/users/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Couldn't save your profile. Please try again.");
      }

      // Refresh context + localStorage with the updated user
      login(data.user, localStorage.getItem("token"));
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{
          fontFamily: font.display, fontSize: 20,
          color: palette.ink, fontWeight: 400, marginBottom: 4,
        }}>
          Profile Settings
        </h2>
        <p style={{ fontFamily: font.body, fontSize: 13, color: palette.muted }}>
          Help peers recognise you and know when you're free to connect
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Profile picture */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "2rem" }}>
          <div
            onClick={() => fileInputRef.current.click()}
            style={{
              width: 110, height: 110, borderRadius: "50%",
              background: preview ? `url(${preview}) center/cover` : palette.blush,
              border: `3px solid ${palette.violet}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", position: "relative", overflow: "hidden",
              marginBottom: 10,
            }}
          >
            {!preview && (
              <span style={{ fontSize: 32, color: palette.violet }}>📷</span>
            )}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "rgba(0,0,0,0.55)", color: "#fff",
              fontFamily: font.body, fontSize: 10, textAlign: "center",
              padding: "4px 0",
            }}>
              {preview ? "Change" : "Upload"}
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
          <span style={{ fontFamily: font.body, fontSize: 12, color: palette.muted }}>
            JPG or PNG, up to 5MB
          </span>
        </div>

        {/* Status selector */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{
            fontFamily: font.body, fontSize: 13, fontWeight: 500,
            color: palette.ink, display: "block", marginBottom: 8,
          }}>
            Your availability status
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setStatus(opt.value)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "10px 12px",
                  fontFamily: font.body, fontSize: 12.5, fontWeight: 500,
                  color: status === opt.value ? palette.violet : palette.muted,
                  background: status === opt.value ? palette.blush : "#fff",
                  border: `1.5px solid ${status === opt.value ? palette.violet : palette.border}`,
                  borderRadius: 10, cursor: "pointer", textAlign: "left",
                  transition: "all 0.15s",
                }}
              >
                <span>{opt.emoji}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Optional bio */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{
            fontFamily: font.body, fontSize: 13, fontWeight: 500,
            color: palette.ink, display: "block", marginBottom: 5,
          }}>
            Short bio <span style={{ fontWeight: 400, color: palette.muted }}>(optional)</span>
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={160}
            rows={3}
            placeholder="A sentence about what you're working on or interested in..."
            style={{
              width: "100%", padding: "10px 14px",
              fontFamily: font.body, fontSize: 13, color: palette.ink,
              border: `1px solid ${palette.border}`, borderRadius: 10,
              outline: "none", resize: "none", boxSizing: "border-box",
            }}
            onFocus={(e) => e.target.style.borderColor = palette.violet}
            onBlur={(e) => e.target.style.borderColor = palette.border}
          />
          <span style={{ fontFamily: font.body, fontSize: 11, color: palette.muted, float: "right", marginTop: 4 }}>
            {bio.length}/160
          </span>
        </div>

        {error && (
          <div style={{
            background: "#FDECEC", border: `1px solid ${palette.error}`,
            borderRadius: 10, padding: "10px 14px", marginBottom: "1rem",
          }}>
            <span style={{ fontFamily: font.body, fontSize: 13, color: palette.error }}>{error}</span>
          </div>
        )}

        {saved && !error && (
          <div style={{
            background: "#E1F5EE", border: `1px solid ${palette.success}`,
            borderRadius: 10, padding: "10px 14px", marginBottom: "1rem",
          }}>
            <span style={{ fontFamily: font.body, fontSize: 13, color: palette.success, fontWeight: 600 }}>
              ✅ Profile saved successfully.
            </span>
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          style={{
            padding: "11px 32px",
            fontFamily: font.body, fontSize: 14, fontWeight: 600,
            background: saving ? "#B7AEDD" : palette.violet, color: "#fff",
            border: "none", borderRadius: 30,
            cursor: saving ? "not-allowed" : "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => { if (!saving) e.target.style.background = palette.plum; }}
          onMouseLeave={(e) => { if (!saving) e.target.style.background = palette.violet; }}
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}
import React, { useState } from "react";
import { apiFetch } from "../api";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const palette = {
  plum:    "#3B1F5E",
  violet:  "#6C3FC5",
  lavender:"#B39DDB",
  blush:   "#F3EEF9",
  white:   "#FFFFFF",
  ink:     "#1A1A2E",
  muted:   "#6B6B8A",
  border:  "#E4DCF0",
  error:   "#D32F2F",
};

const font = {
  display: "'Georgia', 'Times New Roman', serif",
  body:    "'Poppins', sans-serif",
};

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  
  const handle = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(err => ({ ...err, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email address.";
    if (!form.password) e.password = "Password is required.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setServerError("");
    setSubmitting(true);

    try {
      const res = await apiFetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // Backend should return a generic message for both
        // "user not found" and "wrong password" — don't leak which one.
        throw new Error(data.message || "Invalid email or password.");
      }

      // Store auth token so the rest of the app knows the user is logged in
      login(data.user, data.token);

      setSubmitted(true);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "10px 14px",
    fontFamily: font.body,
    fontSize: 14,
    color: palette.ink,
    background: "#fff",
    border: `1px solid ${errors[field] ? palette.error : palette.border}`,
    borderRadius: 10,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  });

  const labelStyle = {
    fontFamily: font.body,
    fontSize: 13,
    fontWeight: 500,
    color: palette.ink,
    display: "block",
    marginBottom: 5,
  };

  const errorMsg = (field) =>
    errors[field] ? (
      <span style={{ fontFamily: font.body, fontSize: 12, color: palette.error, marginTop: 4, display: "block" }}>
        {errors[field]}
      </span>
    ) : null;

  if (submitted) {
    return (
      <div style={{
        minHeight: "100vh",
        background: `linear-gradient(145deg, ${palette.plum} 0%, #5B2FA0 50%, #7B52C8 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "2rem",
      }}>
        <div style={{
          background: "#fff", borderRadius: 20, padding: "3rem 2.5rem",
          maxWidth: 440, width: "100%", textAlign: "center",
        }}>
          <div style={{ fontSize: 56, marginBottom: "1rem" }}>👋</div>
          <h2 style={{ fontFamily: font.display, fontSize: 26, color: palette.plum, marginBottom: 10 }}>
            Welcome back!
          </h2>
          <p style={{ fontFamily: font.body, fontSize: 14, color: palette.muted, lineHeight: 1.7, marginBottom: "2rem" }}>
            You're logged in successfully. Let's continue your journey.
          </p>
          <Link to="/" style={{
            display: "inline-block",
            fontFamily: font.body, fontSize: 14, fontWeight: 600,
            background: palette.violet, color: "#fff",
            padding: "12px 32px", borderRadius: 30, textDecoration: "none",
          }}>
            Go to dashboard →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(145deg, ${palette.plum} 0%, #5B2FA0 50%, #7B52C8 100%)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
    }}>
      {/* Left panel — hidden on small screens via minWidth trick */}
      <div style={{
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 20,
        padding: "3rem 2.5rem",
        maxWidth: 340,
        width: "100%",
        marginRight: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: 480,
      }}
        className="login-left-panel"
      >
        <span style={{
          fontFamily: font.body, fontSize: 11, fontWeight: 600,
          letterSpacing: 2, textTransform: "uppercase",
          color: palette.lavender, marginBottom: "1.5rem", display: "block",
        }}>
          Why SheLearn?
        </span>
        <h2 style={{
          fontFamily: font.display, fontSize: 26,
          color: "#fff", fontWeight: 400,
          lineHeight: 1.3, marginBottom: "2rem",
        }}>
          Your career path,<br />
          <span style={{ color: palette.lavender, fontStyle: "italic" }}>finally clear.</span>
        </h2>
        {[
          { icon: "🗺️", text: "AI-generated roadmaps for any career field" },
          { icon: "📚", text: "Free curated resources at every milestone" },
          { icon: "👩‍💻", text: "Peer sessions with women who've been there" },
          { icon: "🏅", text: "Badges and recognition for your growth" },
        ].map(item => (
          <div key={item.text} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: "1rem" }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
            <span style={{ fontFamily: font.body, fontSize: 13, color: "rgba(255,255,255,0.72)", lineHeight: 1.5 }}>
              {item.text}
            </span>
          </div>
        ))}

        <div style={{
          marginTop: "2rem",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          paddingTop: "1.5rem",
        }}>
          <p style={{ fontFamily: font.body, fontSize: 13, color: "rgba(255,255,255,0.55)", fontStyle: "italic", lineHeight: 1.6 }}>
            "SheLearn gave me a clear roadmap and matched me with a senior who walked me through everything."
          </p>
          <p style={{ fontFamily: font.body, fontSize: 12, color: palette.lavender, marginTop: 8 }}>
            — Kavya P., 2nd year EE
          </p>
        </div>
      </div>

      {/* Right panel — login form */}
      <div style={{
        background: "#fff",
        borderRadius: 20,
        padding: "2.5rem",
        maxWidth: 420,
        width: "100%",
        boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: font.display, fontSize: 24, color: palette.plum }}>
              She<span style={{ color: palette.violet }}>Learn</span>
            </span>
          </Link>
          <h1 style={{
            fontFamily: font.display, fontSize: 22,
            color: palette.ink, fontWeight: 400,
            marginTop: 12, marginBottom: 4,
          }}>
            Welcome back
          </h1>
          <p style={{ fontFamily: font.body, fontSize: 13, color: palette.muted }}>
            Log in to continue your journey
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Email address</label>
            <input
              name="email" type="email" placeholder="you@eng.ruh.ac.lk"
              value={form.email} onChange={handle}
              style={inputStyle("email")}
              onFocus={e => e.target.style.borderColor = palette.violet}
              onBlur={e => e.target.style.borderColor = errors.email ? palette.error : palette.border}
            />
            {errorMsg("email")}
          </div>

          {/* Password */}
          <div style={{ marginBottom: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
              <label style={{ ...labelStyle, margin: 0 }}>Password</label>
              <a href="#" style={{ fontFamily: font.body, fontSize: 12, color: palette.violet, textDecoration: "none" }}>
                Forgot password?
              </a>
            </div>
            <div style={{ position: "relative" }}>
              <input
                name="password" type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password} onChange={handle}
                style={{ ...inputStyle("password"), paddingRight: 44 }}
                onFocus={e => e.target.style.borderColor = palette.violet}
                onBlur={e => e.target.style.borderColor = errors.password ? palette.error : palette.border}
              />
              <button type="button" onClick={() => setShowPass(p => !p)} style={{
                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer",
                fontSize: 16, color: palette.muted,
              }}>
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
            {errorMsg("password")}
          </div>

          {/* Remember me */}
          <div style={{ marginBottom: "1.5rem", marginTop: "0.75rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input
                type="checkbox"
                style={{ accentColor: palette.violet, width: 15, height: 15 }}
              />
              <span style={{ fontFamily: font.body, fontSize: 13, color: palette.muted }}>
                Remember me
              </span>
            </label>
          </div>

          {serverError && (
            <div style={{
              background: "#FDECEC", border: `1px solid ${palette.error}`,
              borderRadius: 10, padding: "10px 14px", marginBottom: "1rem",
            }}>
              <span style={{ fontFamily: font.body, fontSize: 13, color: palette.error }}>{serverError}</span>
            </div>
          )}

          <button type="submit" disabled={submitting} style={{
            width: "100%", padding: "12px",
            fontFamily: font.body, fontSize: 15, fontWeight: 600,
            background: submitting ? "#B7AEDD" : palette.violet, color: "#fff",
            border: "none", borderRadius: 30, cursor: submitting ? "not-allowed" : "pointer",
            transition: "background 0.15s",
          }}
            onMouseEnter={e => { if (!submitting) e.target.style.background = palette.plum; }}
            onMouseLeave={e => { if (!submitting) e.target.style.background = palette.violet; }}
          >
            {submitting ? "Logging in..." : "Log in →"}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "1.25rem 0" }}>
          <div style={{ flex: 1, height: 1, background: palette.border }} />
          <span style={{ fontFamily: font.body, fontSize: 12, color: palette.muted }}>or</span>
          <div style={{ flex: 1, height: 1, background: palette.border }} />
        </div>

        {/* Sign up link */}
        <p style={{ textAlign: "center", fontFamily: font.body, fontSize: 13, color: palette.muted, margin: 0 }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: palette.violet, fontWeight: 600, textDecoration: "none" }}>
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { apiFetch } from "../api";
import { Link, useNavigate } from "react-router-dom";

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
  error:   "#D32F2F",
  success: "#1B9E78",
};

const font = {
  display: "'Georgia', 'Times New Roman', serif",
  body:    "'Poppins',sans-serif",
};

const departments = [
  "Computer Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Mechanical Engineering",
  "Electronic & Telecommunication Engineering",
  "Other",
];

const years = ["1st year", "2nd year", "3rd year", "4th year"];

// Small reusable tag-input — used for both "teach" and "learn" skill lists.
function SkillTagInput({ label, placeholder, values, onChange, variant }) {
  const [draft, setDraft] = useState("");

  const colors = {
    teach: { bg: "#EEEDFE", col: "#534AB7" },
    learn: { bg: "#E1F5EE", col: "#0F6E56" },
  }[variant];

  const addSkill = () => {
    const v = draft.trim();
    if (!v) return;
    if (values.some(s => s.toLowerCase() === v.toLowerCase())) { setDraft(""); return; }
    onChange([...values, v]);
    setDraft("");
  };

  const removeSkill = (skill) => onChange(values.filter(s => s !== skill));

  return (
    <div>
      <label style={{ fontFamily: font.body, fontSize: 13, fontWeight: 500, color: palette.ink, display: "block", marginBottom: 5 }}>
        {label} <span style={{ fontWeight: 400, color: palette.muted }}>(optional)</span>
      </label>
      <div style={{ display: "flex", gap: 6 }}>
        <input
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
          placeholder={placeholder}
          style={{
            flex: 1, padding: "9px 13px",
            fontFamily: font.body, fontSize: 13, color: palette.ink,
            border: `1px solid ${palette.border}`, borderRadius: 10,
            outline: "none", boxSizing: "border-box",
          }}
          onFocus={e => e.target.style.borderColor = palette.violet}
          onBlur={e => e.target.style.borderColor = palette.border}
        />
        <button
          type="button"
          onClick={addSkill}
          style={{
            padding: "0 16px",
            fontFamily: font.body, fontSize: 13, fontWeight: 600,
            background: colors.bg, color: colors.col,
            border: "none", borderRadius: 10, cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>
      {values.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
          {values.map(skill => (
            <span key={skill} style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              background: colors.bg, color: colors.col,
              fontFamily: font.body, fontSize: 12, fontWeight: 500,
              padding: "4px 6px 4px 10px", borderRadius: 20,
            }}>
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: colors.col, fontSize: 14, lineHeight: 1, padding: 0,
                }}
                aria-label={`Remove ${skill}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    department: "",
    year: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [teaches, setTeaches] = useState([]);
  const [learning, setLearning] = useState([]);
  const [showOnPeerPage, setShowOnPeerPage] = useState(true);

  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    setErrors((err) => ({ ...err, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email address.";
    if (!form.department) e.department = "Please select your department.";
    if (!form.year) e.year = "Please select your year.";
    if (form.password.length < 8) e.password = "Password must be at least 8 characters.";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match.";
    if (!form.agree) e.agree = "You must agree to the terms.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setServerError("");
    setSubmitting(true);

    // Payload sent to the backend. teaches/learning are optional arrays —
    // they can be empty if the student doesn't want to fill them in yet.
    const payload = {
      fullName: form.fullName,
      email: form.email,
      department: form.department,
      year: form.year,
      password: form.password,
      teaches,                 // e.g. ["React", "Figma"]
      learning,                // e.g. ["Node.js"]
      showOnPeerPage,          // boolean — controls whether this user appears on /peers
    };

    try {
      const res = await apiFetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

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
          <div style={{ fontSize: 56, marginBottom: "1rem" }}>🎉</div>
          <h2 style={{ fontFamily: font.display, fontSize: 26, color: palette.plum, marginBottom: 10 }}>
            Welcome to SheLearn!
          </h2>
          <p style={{ fontFamily: font.body, fontSize: 14, color: palette.muted, lineHeight: 1.7, marginBottom: "2rem" }}>
            Your account has been created. Let's build your personalised career roadmap!
          </p>
          <button onClick={() => navigate("/login")} style={{
              display: "inline-block",
              fontFamily: font.body, fontSize: 14, fontWeight: 600,
              background: palette.violet, color: "#fff", border: "none",
              padding: "12px 32px", borderRadius: 30, cursor: "pointer",
            }}>
              Go to login →
        </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(145deg, ${palette.plum} 0%, #5B2FA0 50%, #7B52C8 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "2rem",
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 20,
        padding: "2.5rem",
        maxWidth: 800,
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
            Create your account
          </h1>
          <p style={{ fontFamily: font.body, fontSize: 13, color: palette.muted }}>
            Join the community of women growing in engineering
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Basic info */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 12,
            marginBottom: "1.5rem",
          }}>
            <div>
              <label style={labelStyle}>Full name</label>
              <input
                name="fullName" type="text" placeholder="e.g. Amali Perera"
                value={form.fullName} onChange={handle}
                style={inputStyle("fullName")}
                onFocus={e => e.target.style.borderColor = palette.violet}
                onBlur={e => e.target.style.borderColor = errors.fullName ? palette.error : palette.border}
              />
              {errorMsg("fullName")}
            </div>

            <div>
              <label style={labelStyle}>Email</label>
              <input
                name="email" type="email" placeholder="you@eng.ruh.ac.lk"
                value={form.email} onChange={handle}
                style={inputStyle("email")}
                onFocus={e => e.target.style.borderColor = palette.violet}
                onBlur={e => e.target.style.borderColor = errors.email ? palette.error : palette.border}
              />
              {errorMsg("email")}
            </div>

            <div>
              <label style={labelStyle}>Department</label>
              <select
                name="department" value={form.department} onChange={handle}
                style={{ ...inputStyle("department"), appearance: "none", cursor: "pointer" }}
                onFocus={e => e.target.style.borderColor = palette.violet}
                onBlur={e => e.target.style.borderColor = errors.department ? palette.error : palette.border}
              >
                <option value="">Select...</option>
                {departments.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              {errorMsg("department")}
            </div>

            <div>
              <label style={labelStyle}>Year of study</label>
              <select
                name="year" value={form.year} onChange={handle}
                style={{ ...inputStyle("year"), appearance: "none", cursor: "pointer" }}
                onFocus={e => e.target.style.borderColor = palette.violet}
                onBlur={e => e.target.style.borderColor = errors.year ? palette.error : palette.border}
              >
                <option value="">Select...</option>
                {years.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
              {errorMsg("year")}
            </div>

            <div>
              <label style={labelStyle}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  name="password" type={showPass ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={form.password} onChange={handle}
                  style={{ ...inputStyle("password"), paddingRight: 40 }}
                  onFocus={e => e.target.style.borderColor = palette.violet}
                  onBlur={e => e.target.style.borderColor = errors.password ? palette.error : palette.border}
                />
                <button type="button" onClick={() => setShowPass(p => !p)} style={{
                  position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", fontSize: 15, color: palette.muted,
                }}>{showPass ? "🙈" : "👁️"}</button>
              </div>
              {errorMsg("password")}
            </div>

            <div>
              <label style={labelStyle}>Confirm password</label>
              <div style={{ position: "relative" }}>
                <input
                  name="confirmPassword" type={showConfirm ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={form.confirmPassword} onChange={handle}
                  style={{ ...inputStyle("confirmPassword"), paddingRight: 40 }}
                  onFocus={e => e.target.style.borderColor = palette.violet}
                  onBlur={e => e.target.style.borderColor = errors.confirmPassword ? palette.error : palette.border}
                />
                <button type="button" onClick={() => setShowConfirm(p => !p)} style={{
                  position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", fontSize: 15, color: palette.muted,
                }}>{showConfirm ? "🙈" : "👁️"}</button>
              </div>
              {errorMsg("confirmPassword")}
            </div>
          </div>

          {/* Skills section */}
          <div style={{
            background: palette.blush,
            border: `1px solid ${palette.border}`,
            borderRadius: 14,
            padding: "1.25rem",
            marginBottom: "1.5rem",
          }}>
            <div style={{ marginBottom: 4 }}>
              <span style={{ fontFamily: font.body, fontSize: 14, fontWeight: 600, color: palette.ink }}>
                👩‍💻 Join the peer community
              </span>
            </div>
            <p style={{ fontFamily: font.body, fontSize: 12, color: palette.muted, marginBottom: "1rem", lineHeight: 1.5 }}>
              Tell us what you can teach and what you'd like to learn — this is completely optional and helps other students find and connect with you. You can always add this later from your profile.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: "1rem" }}>
              <SkillTagInput
                label="Skills I can teach"
                placeholder="e.g. React, Figma..."
                values={teaches}
                onChange={setTeaches}
                variant="teach"
              />
              <SkillTagInput
                label="Skills I want to learn"
                placeholder="e.g. Node.js, ML..."
                values={learning}
                onChange={setLearning}
                variant="learn"
              />
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={showOnPeerPage}
                onChange={e => setShowOnPeerPage(e.target.checked)}
                style={{ accentColor: palette.violet, width: 15, height: 15 }}
              />
              <span style={{ fontFamily: font.body, fontSize: 12, color: palette.muted }}>
                Show my profile card on the Find Peers page
              </span>
            </label>
          </div>

          {/* Terms */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
              <input
                type="checkbox" name="agree"
                checked={form.agree} onChange={handle}
                style={{ marginTop: 2, accentColor: palette.violet, width: 16, height: 16, flexShrink: 0 }}
              />
              <span style={{ fontFamily: font.body, fontSize: 13, color: palette.muted, lineHeight: 1.5 }}>
                I agree to the{" "}
                <a href="#" style={{ color: palette.violet, textDecoration: "none" }}>Terms of Service</a>
                {" "}and{" "}
                <a href="#" style={{ color: palette.violet, textDecoration: "none" }}>Privacy Policy</a>
              </span>
            </label>
            {errorMsg("agree")}
          </div>

          {serverError && (
            <div style={{
              background: "#FDECEC", border: `1px solid ${palette.error}`,
              borderRadius: 10, padding: "10px 14px", marginBottom: "1rem",
            }}>
              <span style={{ fontFamily: font.body, fontSize: 13, color: palette.error }}>{serverError}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            style={{
              width: "100%", padding: "12px",
              fontFamily: font.body, fontSize: 15, fontWeight: 600,
              background: submitting ? "#B7AEDD" : palette.violet, color: "#fff",
              border: "none", borderRadius: 30, cursor: submitting ? "not-allowed" : "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => { if (!submitting) e.target.style.background = palette.plum; }}
            onMouseLeave={(e) => { if (!submitting) e.target.style.background = palette.violet; }}
          >
            {submitting ? "Creating your account..." : "Create my account →"}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "1.25rem 0" }}>
          <div style={{ flex: 1, height: 1, background: palette.border }} />
          <span style={{ fontFamily: font.body, fontSize: 12, color: palette.muted }}>or</span>
          <div style={{ flex: 1, height: 1, background: palette.border }} />
        </div>

        {/* Login link */}
        <p style={{ textAlign: "center", fontFamily: font.body, fontSize: 13, color: palette.muted, margin: 0 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: palette.violet, fontWeight: 600, textDecoration: "none" }}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
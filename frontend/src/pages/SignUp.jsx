import React, { useState } from "react";
import { Link } from "react-router-dom";

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

export default function SignUp() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    department: "",
    year: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
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
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "2rem",
    }}>
      <div
  style={{
    background: "#fff",
    borderRadius: 20,
    padding: "2.5rem",
    maxWidth: 800,
    width: "100%",
    boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
  }}
>
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
  <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 12,
    marginBottom: "1rem",
  }}
>
    {/* Full Name */}
    <div>
      <label style={labelStyle}>Full name</label>
      <input
        name="fullName"
        type="text"
        placeholder="e.g. Amali Perera"
        value={form.fullName}
        onChange={handle}
        style={inputStyle("fullName")}
      />
      {errorMsg("fullName")}
    </div>

    {/* Email */}
    <div>
      <label style={labelStyle}>Email</label>
      <input
        name="email"
        type="email"
        placeholder="you@eng.ruh.ac.lk"
        value={form.email}
        onChange={handle}
        style={inputStyle("email")}
      />
      {errorMsg("email")}
    </div>

    {/* Department */}
    <div>
      <label style={labelStyle}>Department</label>
      <select
        name="department"
        value={form.department}
        onChange={handle}
        style={{ ...inputStyle("department"), appearance: "none" }}
      >
        <option value="">Select...</option>
        {departments.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
      {errorMsg("department")}
    </div>

    {/* Year */}
    <div>
      <label style={labelStyle}>Year of study</label>
      <select
        name="year"
        value={form.year}
        onChange={handle}
        style={{ ...inputStyle("year"), appearance: "none" }}
      >
        <option value="">Select...</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
      {errorMsg("year")}
    </div>

    {/* Password */}
    <div>
      <label style={labelStyle}>Password</label>
      <input
        name="password"
        type={showPass ? "text" : "password"}
        value={form.password}
        onChange={handle}
        style={inputStyle("password")}
      />
      {errorMsg("password")}
    </div>

    {/* Confirm Password */}
    <div>
      <label style={labelStyle}>Confirm password</label>
      <input
        name="confirmPassword"
        type={showConfirm ? "text" : "password"}
        value={form.confirmPassword}
        onChange={handle}
        style={inputStyle("confirmPassword")}
      />
      {errorMsg("confirmPassword")}
    </div>
  </div>

  {/* Terms - full width */}
  <div style={{ marginBottom: "1.5rem" }}>
   
  </div>

  {/* Submit button - full width */}
  <button
  type="submit"
  style={{
    width: "100%",
    padding: "12px",
    fontFamily: font.body,
    fontSize: 15,
    fontWeight: 600,
    background: palette.violet,
    color: "#fff",
    border: "none",
    borderRadius: 30,
    cursor: "pointer",
    transition: "background 0.15s",
  }}
  onMouseEnter={(e) => (e.target.style.background = palette.plum)}
  onMouseLeave={(e) => (e.target.style.background = palette.violet)}
>
  Create account 
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
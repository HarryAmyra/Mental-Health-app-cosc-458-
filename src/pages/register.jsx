import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainNav from "../components/MainNav.jsx";
import ChatFab from "../components/ChatFab.jsx";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebaseClient.js";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    sport: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      if (form.name) {
        await updateProfile(userCred.user, { displayName: form.name });
      }
      alert("Account created! You can now log in.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Signup failed: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div style={styles.wrapper}>
      <div
        style={{
          ...styles.backdrop,
          backgroundImage: "url(/bg/bg.png)",
        }}
      />
      <div style={styles.overlay} />

      <MainNav />

      <main style={styles.shell}>
        <section style={styles.panel}>
          <h1 style={styles.title}>Create your account</h1>
          <p style={styles.subtitle}>
            Join Healing Minds and get access to wellness tools and life-after-sport support.
          </p>

          <form style={styles.form} onSubmit={handleSubmit}>
            <label style={styles.label}>
              Name
              <input
                name="name"
                type="text"
                style={styles.input}
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>
            <label style={styles.label}>
              Email
              <input
                name="email"
                type="email"
                style={styles.input}
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
            <label style={styles.label}>
              Sport
              <input
                name="sport"
                type="text"
                style={styles.input}
                value={form.sport}
                onChange={handleChange}
              />
            </label>
            <label style={styles.label}>
              Password
              <input
                name="password"
                type="password"
                style={styles.input}
                value={form.password}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit" style={styles.submit} disabled={loading}>
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </section>
      </main>

      <ChatFab />
    </div>
  );
}

const styles = {
  wrapper: {
    position: "relative",
    minHeight: "100vh",
    fontFamily: "Inter, system-ui, Arial, sans-serif",
  },
  backdrop: {
    position: "fixed",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 0,
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(11,18,32,.12)",
    zIndex: 0,
  },
  shell: {
    position: "relative",
    zIndex: 1,
    padding: "12px 24px 40px",
    display: "grid",
    placeItems: "center",
  },
  panel: {
    background: "#FFFFFF",
    borderRadius: 24,
    padding: 32,
    width: "100%",
    maxWidth: 460,
    boxShadow: "0 0 0 1px rgba(15,23,42,0.06)",
  },
  title: { fontSize: 28, fontWeight: 800, marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#4B5563", marginBottom: 20 },
  form: { display: "flex", flexDirection: "column", gap: 14 },
  label: {
    fontSize: 14,
    fontWeight: 600,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  input: {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #D1D5DB",
    fontSize: 14,
  },
  submit: {
    marginTop: 6,
    background: "#0F172A",
    color: "#fff",
    borderRadius: 999,
    border: "none",
    padding: "10px 18px",
    fontWeight: 700,
    cursor: "pointer",
  },
};

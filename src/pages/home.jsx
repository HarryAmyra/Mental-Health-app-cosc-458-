import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainNav from "../components/MainNav.jsx";
import ChatFab from "../components/ChatFab.jsx";

const slides = [
  {
    id: 1,
    headline: "WELCOME TO HEALING MINDS",
    text: "Where Mental Strength Meets Athletic Greatness.",
  },
  {
    id: 2,
    headline: "SUPPORT ON AND OFF THE FIELD",
    text: "Tools to manage stress, burnout, and life transitions.",
  },
  {
    id: 3,
    headline: "YOU'RE MORE THAN YOUR STATS",
    text: "Connect with mentors, community, and mental wellness tools.",
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const activeSlide = slides[activeIndex];

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
          <div style={styles.heroContent}>
            <div style={styles.heroTextCol}>
              <h1 style={styles.heroHeading}>{activeSlide.headline}</h1>
              <p style={styles.heroSub}>{activeSlide.text}</p>

              <div style={styles.heroButtons}>
                <button
                  style={styles.primaryBtn}
                  onClick={() => navigate("/login")}
                >
                  Log in
                </button>
                <button
                  style={styles.secondaryBtn}
                  onClick={() => navigate("/register")}
                >
                  Create account
                </button>
              </div>
            </div>

            <div style={styles.heroImageCol}>
              <div style={styles.heroImageFrame}>
                <span style={styles.heroImagePlaceholder}>Hero image</span>
              </div>
              <div style={styles.dotsRow}>
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveIndex(idx)}
                    style={{
                      ...styles.dot,
                      ...(idx === activeIndex ? styles.dotActive : {}),
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
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
    maxWidth: 1150,
    boxShadow: "0 0 0 1px rgba(15,23,42,0.06)",
  },
  heroContent: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
    gap: 32,
    alignItems: "center",
  },
  heroTextCol: {},
  heroHeading: {
    fontSize: 40,
    fontWeight: 800,
    marginBottom: 16,
  },
  heroSub: {
    fontSize: 22,
    fontWeight: 700,
    color: "#111827",
    marginBottom: 20,
  },
  heroButtons: {
    display: "flex",
    gap: 12,
  },
  primaryBtn: {
    background: "#0F172A",
    color: "#fff",
    borderRadius: 999,
    border: "none",
    padding: "10px 20px",
    fontWeight: 700,
    cursor: "pointer",
  },
  secondaryBtn: {
    background: "#FFFFFF",
    color: "#0F172A",
    borderRadius: 999,
    border: "1px solid #0F172A",
    padding: "10px 20px",
    fontWeight: 700,
    cursor: "pointer",
  },
  heroImageCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
  heroImageFrame: {
    width: "100%",
    borderRadius: 20,
    background: "#E5E7EB",
    aspectRatio: "16 / 9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heroImagePlaceholder: { color: "#6B7280", fontWeight: 600 },
  dotsRow: { display: "flex", gap: 8, justifyContent: "center" },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    border: "none",
    background: "#E5E7EB",
    cursor: "pointer",
  },
  dotActive: { background: "#111827" },
};

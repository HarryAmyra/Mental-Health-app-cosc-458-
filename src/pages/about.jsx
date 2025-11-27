import React from "react";
import MainNav from "../components/MainNav.jsx";
import ChatFab from "../components/ChatFab.jsx";

export default function About() {
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
          <h1 style={styles.title}>About Healing Minds</h1>
          <p style={styles.text}>
            Healing Minds is built for student-athletes navigating stress, performance
            pressure, and life after sports. Our goal is to provide tools, community,
            and AI-powered support so you never have to go through it alone.
          </p>
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
    maxWidth: 800,
    boxShadow: "0 0 0 1px rgba(15,23,42,0.06)",
  },
  title: { fontSize: 32, fontWeight: 800, marginBottom: 12 },
  text: { fontSize: 16, color: "#374151", lineHeight: 1.6 },
};

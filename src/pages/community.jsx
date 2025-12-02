// src/pages/community.jsx
import React from "react";
import ChatFab from "../components/ChatFab.jsx";

const tiles = ["Blog", "Groups", "Events", "Updates", "News", "Stories"];

export default function Community() {
  return (
    <div style={styles.wrapper}>
      <main style={styles.shell}>
        <section style={styles.panel}>
          <header style={styles.hero}>
            <h1 style={styles.heroTitle}>WELCOME TO OUR COMMUNITY</h1>
          </header>

          <section style={styles.grid}>
            {tiles.map((t) => (
              <article key={t} style={styles.card}>
                <h2 style={styles.cardTitle}>{t}</h2>
                <p style={styles.cardText}>Read and share stories with others.</p>
              </article>
            ))}
          </section>
        </section>
      </main>

      <ChatFab />
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    fontFamily: "Inter, system-ui, Arial, sans-serif",
  },
  shell: {
    padding: "12px 24px 40px",
    display: "grid",
    placeItems: "center",
  },
  panel: {
    background: "#FFFFFF",
    borderRadius: 24,
    padding: 0,
    width: "100%",
    maxWidth: 1150,
    overflow: "hidden",
    boxShadow: "0 0 0 1px rgba(15,23,42,0.06)",
  },
  hero: {
    background: "#FFD400",
    padding: "32px 40px",
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 900,
  },
  grid: {
    padding: 32,
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 20,
  },
  card: {
    background: "#F3F4F6",
    borderRadius: 16,
    padding: 24,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 800,
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: "#4B5563",
    fontWeight: 500,
  },
};

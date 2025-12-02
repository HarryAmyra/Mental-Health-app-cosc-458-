import React from "react";
import MainNav from "../components/MainNav.jsx";
import ChatFab from "../components/ChatFab.jsx";

const tiles = ["Blog", "Groups", "Events", "Updates", "News", "Stories"];

export default function Community() {
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
import { Link } from "react-router-dom";
import Balatro from "../pages/Balatro"; 
import "../styles/community.css";

const navItems = ["Home", "About us", "Wellness tools", "Life After Sports", "Community"];

const getNavPath = (label) => {
  const map = {
    Home: "/",
    "About us": "/about",
    "Wellness tools": "/wellnessTools",
    "Life After Sports": "/life-after-sports",
    Community: "/community",
  };
  return map[label] || "/";
};

export default function Community() {
  return (
    <div className="community-wrapper">

      {/* 🔵 Balatro animated background */}
      <div className="community-bg-layer">
        <Balatro isRotate={false} mouseInteraction={true} pixelFilter={700} />
      </div>

      {/* 🔵 Soft background overlay tint */}
      <div className="community-background-overlay"></div>

      {/* 🔵 Navbar */}
      <div className="wellness-nav-wrap">
        <div className="wellness-nav-bar">
          {navItems.map((label) => (
            <Link
              key={label}
              to={getNavPath(label)}
              className={
                label === "Community"
                  ? "wellness-nav-item wellness-nav-item-active"
                  : "wellness-nav-item"
              }
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* 🔵 Main centered card */}
      <div className="community-card">

        {/* Banner */}
        <div className="community-banner">
          <h1 className="community-title">WELCOME TO OUR COMMUNITY</h1>

          {/* Decorative dots */}
          <div className="dot dot-lg" style={{ background: "#2D9CFF", top: 25, left: 40 }}></div>
          <div className="dot dot-md" style={{ background: "#A3A3A3", top: 40, left: 180 }}></div>
          <div className="dot dot-lg" style={{ background: "#2D9CFF", top: 25, right: 40 }}></div>
          <div className="dot dot-sm" style={{ background: "#E0E0E0", top: 50, right: 120 }}></div>
          <div className="dot dot-md" style={{ background: "white", bottom: -15, left: "50%" }}></div>
        </div>

        {/* Content grid */}
        <div className="community-content">
          <div className="community-grid">

            <div className="community-item">
              <h2 className="community-item-title">BLOG</h2>
              <p className="community-item-desc">read and share stories with others</p>
            </div>

            <div className="community-item">
              <h2 className="community-item-title">GROUPS</h2>
              <p className="community-item-desc">read and share stories with others</p>
            </div>

            <div className="community-item">
              <h2 className="community-item-title">EVENTS</h2>
              <p className="community-item-desc">read and share stories with others</p>
            </div>

            <div className="community-item">
              <h2 className="community-item-title">UPDATES</h2>
              <p className="community-item-desc">read and share stories with others</p>
            </div>

            <div className="community-item">
              <h2 className="community-item-title">NEWS</h2>
              <p className="community-item-desc">read and share stories with others</p>
            </div>

            <div className="community-item">
              <h2 className="community-item-title">NEWS</h2>
              <p className="community-item-desc">read and share stories with others</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

import React from "react";
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

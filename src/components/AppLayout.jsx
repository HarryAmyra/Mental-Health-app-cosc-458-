// src/components/AppLayout.jsx
import React from "react";
import MainNav from "./MainNav.jsx";
import Balatro from "../pages/Balatro"; // 👈 uses the Balatro you showed

export default function AppLayout({ children }) {
  return (
    <div style={styles.wrapper}>
      {/* 🔵 Balatro animated background */}
      <div style={styles.bgLayer}>
        <Balatro
          isRotate={false}
          mouseInteraction={true}
          pixelFilter={700}
        />
      </div>

      {/* Optional soft overlay tint */}
      <div style={styles.overlay} />

      {/* Global navigation on top of background */}
      <MainNav />

      {/* Everything else (page content) */}
      <div style={styles.content}>{children}</div>
    </div>
  );
}

const styles = {
  wrapper: {
    position: "relative",
    minHeight: "100vh",
    fontFamily: "Inter, system-ui, Arial, sans-serif",
    overflowX: "hidden",
  },
  bgLayer: {
    position: "fixed",
    inset: 0,
    zIndex: 0,
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(11,18,32,0.12)", // you can tweak or remove this
    zIndex: 0,
    pointerEvents: "none",
  },
  content: {
    position: "relative",
    zIndex: 1, // content sits on top of Balatro + overlay
  },
};

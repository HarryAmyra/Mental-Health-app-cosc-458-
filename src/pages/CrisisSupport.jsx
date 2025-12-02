// src/pages/CrisisSupport.jsx
import React from "react";
import ChatFab from "../components/ChatFab.jsx";

export default function CrisisSupport() {
  return (
    <div style={styles.wrapper}>
      <main style={styles.shell}>
        <section style={styles.panel}>
          <h1 style={styles.title}>Crisis Support</h1>
          <p style={styles.intro}>
            Healing Minds is not an emergency service and cannot respond to urgent safety issues.
            If you are in immediate danger or thinking about harming yourself, please contact
            emergency services or a crisis line right away.
          </p>

          <div style={styles.section}>
            <h2 style={styles.heading}>United States</h2>
            <ul style={styles.list}>
              <li>
                <strong>Emergency:</strong> Call <strong>911</strong>
              </li>
              <li>
                <strong>988 Suicide &amp; Crisis Lifeline:</strong> Call or text{" "}
                <strong>988</strong>, or chat via{" "}
                <a href="https://988lifeline.org" target="_blank" rel="noreferrer">
                  988lifeline.org
                </a>
              </li>
            </ul>
          </div>

          <div style={styles.section}>
            <h2 style={styles.heading}>Other Support Options</h2>
            <ul style={styles.list}>
              <li>Talk to a trusted friend, family member, or coach.</li>
              <li>Reach out to your school’s counseling or wellness center.</li>
              <li>Contact your primary care provider or a licensed therapist.</li>
            </ul>
          </div>

          <p style={styles.footerNote}>
            If something feels “off” or too heavy to carry alone, you deserve support. Reaching out
            is a sign of strength, not weakness.
          </p>
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
    padding: 32,
    width: "100%",
    maxWidth: 800,
    boxShadow: "0 0 0 1px rgba(15,23,42,0.06)",
  },
  title: { fontSize: 32, fontWeight: 800, marginBottom: 12 },
  intro: { fontSize: 15, color: "#374151", marginBottom: 24 },
  section: { marginBottom: 20 },
  heading: { fontSize: 20, fontWeight: 700, marginBottom: 8 },
  list: { paddingLeft: 20, fontSize: 14, color: "#374151" },
  footerNote: {
    marginTop: 10,
    fontSize: 14,
    color: "#4B5563",
    fontWeight: 500,
  },
};

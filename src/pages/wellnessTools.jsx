import React, { useEffect, useState } from "react";
import MainNav from "../components/MainNav.jsx";
import ChatFab from "../components/ChatFab.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { db } from "../config/firebaseClient.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const meditationItems = [
  "Breathing reset",
  "Pre-game calm",
  "Post-loss reset",
  "Sleep wind-down",
];
const stretchItems = ["Lower body", "Upper body", "Full body", "Recovery day"];

export default function WellnessTools() {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [entryText, setEntryText] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;

    const loadEntries = async () => {
      try {
        const q = query(
          collection(db, "users", user.uid, "journalEntries"),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        const docs = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setEntries(docs);
      } catch (err) {
        console.error("Error loading journal entries", err);
      }
    };

    loadEntries();
  }, [user]);

  async function handleSave(e) {
    e.preventDefault();
    const text = entryText.trim();
    if (!text || !user || saving) return;

    setSaving(true);
    try {
      const colRef = collection(db, "users", user.uid, "journalEntries");
      const docRef = await addDoc(colRef, {
        text,
        createdAt: serverTimestamp(),
      });

      setEntries((prev) => [
        { id: docRef.id, text, createdAt: new Date() },
        ...prev,
      ]);
      setEntryText("");
    } catch (err) {
      console.error("Error saving entry", err);
      alert("Could not save entry. Please try again.");
    } finally {
      setSaving(false);
    }
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
          <h2 style={styles.pageTitle}>Start your healing journey here</h2>

          <section style={styles.journalHeader}>
            <div>
              <h3 style={styles.journalGreeting}>
                {user?.displayName ? `Hello, ${user.displayName}` : "Hello"}
              </h3>
              <p style={styles.journalSub}>Begin journaling</p>
            </div>
          </section>

          <section style={{ marginTop: 20 }}>
            <form onSubmit={handleSave}>
              <textarea
                style={styles.textarea}
                placeholder="How are you really feeling today?"
                value={entryText}
                onChange={(e) => setEntryText(e.target.value)}
                rows={4}
              />
              <button type="submit" style={styles.saveBtn} disabled={saving || !user}>
                {saving ? "Saving..." : "Save entry"}
              </button>
            </form>
          </section>

          <section style={{ marginTop: 24 }}>
            <h4 style={styles.sectionHeading}>Previous entries</h4>
            {entries.length === 0 ? (
              <p style={styles.noEntries}>Your past entries will show up here.</p>
            ) : (
              <ul style={styles.entryList}>
                {entries.map((e) => (
                  <li key={e.id} style={styles.entryItem}>
                    <p style={styles.entryText}>{e.text}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section style={{ marginTop: 32 }}>
            <h4 style={styles.sectionHeading}>Meditation</h4>
            <div style={styles.scrollRow}>
              {meditationItems.map((label) => (
                <button key={label} style={styles.tile}>
                  <span style={styles.tileLabel}>{label}</span>
                </button>
              ))}
              <button style={styles.scrollArrow} aria-label="More meditations">
                ❯
              </button>
            </div>
          </section>

          <section style={{ marginTop: 32 }}>
            <h4 style={styles.sectionHeading}>Guided Stretches</h4>
            <div style={styles.scrollRow}>
              {stretchItems.map((label) => (
                <button key={label} style={styles.tile}>
                  <span style={styles.tileLabel}>{label}</span>
                </button>
              ))}
              <button style={styles.scrollArrow} aria-label="More stretches">
                ❯
              </button>
            </div>
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
    padding: 28,
    width: "100%",
    maxWidth: 1150,
    boxShadow: "0 0 0 1px rgba(15,23,42,0.06)",
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 20,
  },
  journalHeader: {
    background: "#FFFFFF",
    borderRadius: 20,
    padding: "16px 20px",
    boxShadow: "0 6px 0 rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  journalGreeting: { fontSize: 24, fontWeight: 700, marginBottom: 4 },
  journalSub: { fontSize: 15, color: "#4B5563" },
  textarea: {
    marginTop: 12,
    width: "100%",
    borderRadius: 12,
    border: "1px solid #D1D5DB",
    padding: 12,
    fontSize: 14,
    resize: "vertical",
  },
  saveBtn: {
    marginTop: 8,
    background: "#0F172A",
    color: "#fff",
    borderRadius: 999,
    border: "none",
    padding: "8px 18px",
    fontWeight: 700,
    cursor: "pointer",
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 12,
  },
  noEntries: {
    fontSize: 14,
    color: "#6B7280",
  },
  entryList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  entryItem: {
    background: "#F3F4F6",
    borderRadius: 10,
    padding: 10,
  },
  entryText: { fontSize: 14, color: "#374151" },

  scrollRow: {
    display: "flex",
    gap: 18,
    alignItems: "center",
  },
  tile: {
    width: 140,
    height: 110,
    background: "#111827",
    borderRadius: 4,
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: 10,
  },
  tileLabel: {
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: 14,
  },
  scrollArrow: {
    marginLeft: "auto",
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "2px solid #111827",
    background: "#FFFFFF",
    cursor: "pointer",
    fontSize: 20,
    lineHeight: "36px",
  },
};

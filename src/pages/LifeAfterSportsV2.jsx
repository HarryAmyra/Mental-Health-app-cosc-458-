import React, { useMemo, useState, useEffect } from "react";

export default function LifeAfterSportsV2({ bgUrl = "/bg/life-after-sports-bg.png" }) {
  const [activePath, setActivePath] = useState("Career switch");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const background = useMemo(() => bgUrl, [bgUrl]);

  useEffect(() => {
    const id = setInterval(() => setCarouselIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={{ ...styles.backdrop, backgroundImage: `url(${background})` }} />
      <div style={styles.overlay} />

      <header style={styles.navWrap}>
        <nav style={styles.navBar}>
          {NAV.map((label) => (
            <a
              key={label}
              href="#"
              style={{
                ...styles.navItem,
                ...(label === "Life After Sports" ? styles.navItemActive : {}),
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main style={styles.shell}>
        <section style={styles.panel}>
          <h1 style={styles.h1}>Life After Sports</h1>
          <p style={styles.subhead}>Build your next chapter with confidence.</p>

          <div style={styles.pillsRow}>
            {PILLS.slice(0, 2).map((p) => (
              <button
                key={p}
                onClick={() => setActivePath(p)}
                aria-pressed={activePath === p}
                style={{ ...styles.pill, ...(activePath === p ? styles.pillActive : {}) }}
              >
                {p}
              </button>
            ))}
          </div>
          <div style={{ ...styles.pillsRow, marginTop: 12 }}>
            {PILLS.slice(2).map((p) => (
              <button
                key={p}
                onClick={() => setActivePath(p)}
                aria-pressed={activePath === p}
                style={{ ...styles.pill, ...(activePath === p ? styles.pillActive : {}) }}
              >
                {p}
              </button>
            ))}
          </div>

          <section style={styles.cardGrid} className="cardGrid">
            {CARDS.map((c) => (
              <article key={c.title} style={styles.card}>
                <div style={styles.cardIcon} />
                <div>
                  <h3 style={styles.cardTitle}>{c.title}</h3>
                  <p style={styles.cardBody}>{c.body}</p>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <button style={styles.cardBtn} onClick={() => alert(`${c.title} (stub)`)}>Open</button>
                </div>
              </article>
            ))}
          </section>

          <section style={styles.testimonialSection}>
            <h4 style={styles.testimonialHeading}>What athletes say</h4>
            <div style={styles.testimonialBox}>
              <p style={styles.testimonialText}>
                <em>{testimonials[carouselIndex].quote}</em>
                <br />
                <span style={{ fontWeight: 700 }}> {testimonials[carouselIndex].by}</span>
              </p>
              <div style={styles.dotBar}>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    style={{ ...styles.dot, ...(i === carouselIndex ? styles.dotActive : {}) }}
                    aria-label={`Show testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>

          <footer style={styles.quickLinks}>Quick links: Resume Builder  Mock Interview  Scholarships  Alumni Groups</footer>
        </section>
      </main>

      <style>{globalCSS}</style>
    </div>
  );
}

const NAV = ["Home", "About us", "Wellness tools", "Life After Sports", "Community"];
const PILLS = ["Career switch", "Start a business", "Finish degree", "Find purpose"];
const CARDS = [
  { title: "Job Board", body: "Curated roles from athlete‑friendly employers." },
  { title: "Mentorship", body: "Chat with alumni who’ve made the leap." },
  { title: "Courses", body: "Short upskilling tracks & certifications." },
  { title: "Money & Health", body: "Budgeting, benefits, and wellbeing care." },
];
const testimonials = [
  { quote: "In 90 days I went from team captain to operations analyst. The mentor chats were clutch.", by: "— Jordan, Track & Field" },
  { quote: "The resume builder translated my stats into skills recruiters understood.", by: "— Maya, Basketball" },
  { quote: "Having a path after my last season reduced so much stress.", by: "— Chris, Soccer" },
];

const styles = {
  wrapper: { position: "relative", minHeight: "100vh", fontFamily: "Inter, system-ui, Arial, sans-serif" },
  backdrop: { position: "fixed", inset: 0, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 },
  overlay: { position: "fixed", inset: 0, background: "rgba(11,18,32,.12)", zIndex: 0 },
  navWrap: { position: "relative", zIndex: 1, padding: "18px 28px" },
  navBar: {
    background: "#FFFFFF",
    borderRadius: 999,
    padding: "12px 24px",
    display: "flex",
    gap: 36,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 1px 0 rgba(15,23,42,0.06) inset",
  },
  navItem: { color: "#0F172A", fontWeight: 800, textDecoration: "none", padding: "8px 14px", borderRadius: 999 },
  navItemActive: { background: "#FFD400" },
  shell: { position: "relative", zIndex: 1, padding: "12px 24px 40px", display: "grid", placeItems: "center" },
  panel: {
    background: "#FFFFFF",
    borderRadius: 24,
    padding: 28,
    width: "100%",
    maxWidth: 1150,
    boxShadow: "0 0 0 1px rgba(15,23,42,0.06)",
  },
  h1: { fontSize: 48, fontWeight: 800, margin: "6px 0 12px" },
  subhead: { fontSize: 20, fontWeight: 700, color: "#1F2937", opacity: 0.9, marginBottom: 18 },
  pillsRow: { display: "flex", gap: 22, flexWrap: "wrap" },
  pill: {
    background: "#0F172A",
    color: "#fff",
    border: 0,
    padding: "14px 24px",
    borderRadius: 999,
    fontWeight: 800,
    lineHeight: 1,
    boxShadow: "inset 0 -2px 0 rgba(255,255,255,0.12)",
    opacity: 0.92,
    cursor: "pointer",
  },
  pillActive: { opacity: 1 },
  cardGrid: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 24, marginTop: 22 },
  card: {
    background: "#F4F6F9",
    border: "1px solid #E6E9EE",
    borderRadius: 16,
    padding: 18,
    display: "grid",
    gridTemplateColumns: "56px 1fr",
    gridTemplateRows: "auto 1fr auto",
    gap: 12,
    minHeight: 160,
  },
  cardIcon: { width: 56, height: 56, borderRadius: 12, background: "#FFD400" },
  cardTitle: { fontSize: 20, fontWeight: 800, margin: 0 },
  cardBody: { color: "#4B5563", fontWeight: 600, margin: "6px 0 8px" },
  cardBtn: {
    background: "#0F172A",
    color: "#fff",
    border: 0,
    borderRadius: 12,
    padding: "10px 18px",
    fontWeight: 800,
    cursor: "pointer",
  },
  testimonialSection: { marginTop: 24 },
  testimonialHeading: { fontSize: 20, fontWeight: 800, margin: "0 0 10px" },
  testimonialBox: {
    background: "#FFFFFF",
    border: "1px solid #E6E9EE",
    borderRadius: 16,
    padding: 18,
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "end",
    gap: 8,
  },
  testimonialText: { color: "#374151", fontWeight: 600, margin: 0 },
  dotBar: { display: "flex", gap: 8, alignItems: "center", justifyContent: "flex-end" },
  dot: { width: 8, height: 8, borderRadius: 999, background: "#CBD5E1", border: 0, cursor: "pointer" },
  dotActive: { background: "#0F172A" },
  quickLinks: { marginTop: 18, color: "#374151", fontWeight: 700 },
};

const globalCSS = `
  :focus-visible { outline: 3px solid #FFD400; outline-offset: 2px; }
  button:hover { filter: brightness(0.98); }
  a:hover { opacity: .9; }
  @media (max-width: 1200px) {
    .cardGrid { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
  }
  @media (max-width: 680px) {
    .cardGrid { grid-template-columns: 1fr !important; }
  }
`;

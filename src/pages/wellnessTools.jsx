import { useState } from "react";
import { Link } from "react-router-dom";
import Balatro from "./Balatro";
import "../styles/wellnessTools.css";

export default function WellnessTools() {
  const [journalOpen, setJournalOpen] = useState(false);

  const meditationVideos = [
    { id: 1, title: "5-Min Breathing", duration: "5:00", thumbnail: "🧘‍♀️" },
    { id: 2, title: "Body Scan", duration: "10:00", thumbnail: "🧘" },
    { id: 3, title: "Visualization", duration: "8:00", thumbnail: "🌅" },
    { id: 4, title: "Sleep Meditation", duration: "15:00", thumbnail: "😴" },
  ];

  const stretchVideos = [
    { id: 1, title: "Morning Stretch", duration: "7:00", thumbnail: "🤸‍♀️" },
    { id: 2, title: "Post-Workout", duration: "10:00", thumbnail: "💪" },
    { id: 3, title: "Flexibility", duration: "12:00", thumbnail: "🧘‍♂️" },
    { id: 4, title: "Lower Back", duration: "6:00", thumbnail: "🦵" },
  ];

  const NAV = [
    "Home",
    "About us",
    "Wellness tools",
    "Life After Sports",
    "Community",
  ];

  const getNavPath = (label) => {
    const pathMap = {
      Home: "/",
      "About us": "/about",
      "Wellness tools": "/wellnessTools",
      "Life After Sports": "/life-after-sports",
      Community: "/community",
    };
    return pathMap[label] || "/";
  };

  return (
    <div className="wellness-wrapper">
      {/* Animated swirl background */}
      <div className="wellness-bg-layer">
        <Balatro isRotate={false} mouseInteraction={true} pixelFilter={700} />
      </div>
      <div className="wellness-background-overlay" />

      {/* Navbar (matches home style) */}
      <header className="wellness-nav-wrap">
        <nav className="wellness-nav-bar">
          {NAV.map((label) => (
            <Link
              key={label}
              to={getNavPath(label)}
              className={`wellness-nav-item ${
                label === "Wellness tools" ? "wellness-nav-item-active" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Main content – centered card like home-card */}
      <main className="wellness-main">
        <div className="wellness-content-card">
          {/* Header text */}
          <div className="wellness-header-section">
            <h1 className="wellness-main-title">Start your healing journey here</h1>
          </div>

          {/* Journaling section */}
          <section className="wellness-section">
            <div className="wellness-section-header">
              <h2 className="wellness-section-title">
                Hello, Jake Begin Journaling
              </h2>
              <button
                className="wellness-journal-btn"
                onClick={() => setJournalOpen(!journalOpen)}
              >
                Journal
              </button>
            </div>

            {journalOpen && (
              <div
                className="wellness-journal-modal"
                onClick={() => setJournalOpen(false)}
              >
                <div
                  className="wellness-journal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="wellness-journal-header">
                    <h3 className="wellness-journal-title">
                      Today&apos;s Journal Entry
                    </h3>
                    <button
                      className="wellness-close-btn"
                      onClick={() => setJournalOpen(false)}
                    >
                      ×
                    </button>
                  </div>
                  <textarea
                    className="wellness-journal-textarea"
                    placeholder="How are you feeling today? Write about your thoughts, challenges, or victories..."
                  />
                  <button className="wellness-save-btn">Save Entry</button>
                </div>
              </div>
            )}
          </section>

          {/* Meditation section */}
          <section className="wellness-section">
            <div className="wellness-section-header-with-arrow">
              <h2 className="wellness-section-title">Meditation</h2>
              <button className="wellness-arrow-btn">→</button>
            </div>

            <div className="wellness-video-grid">
              {meditationVideos.map((video) => (
                <div key={video.id} className="wellness-video-card">
                  <div className="wellness-video-thumbnail">
                    <span className="wellness-thumbnail-emoji">
                      {video.thumbnail}
                    </span>
                    <div className="wellness-play-overlay">▶</div>
                  </div>
                  <div className="wellness-video-info">
                    <h3 className="wellness-video-title">{video.title}</h3>
                    <p className="wellness-video-duration">{video.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Guided stretches section */}
          <section className="wellness-section">
            <div className="wellness-section-header-with-arrow">
              <h2 className="wellness-section-title">Guided Stretches</h2>
              <button className="wellness-arrow-btn">→</button>
            </div>

            <div className="wellness-video-grid">
              {stretchVideos.map((video) => (
                <div key={video.id} className="wellness-video-card">
                  <div className="wellness-video-thumbnail">
                    <span className="wellness-thumbnail-emoji">
                      {video.thumbnail}
                    </span>
                    <div className="wellness-play-overlay">▶</div>
                  </div>
                  <div className="wellness-video-info">
                    <h3 className="wellness-video-title">{video.title}</h3>
                    <p className="wellness-video-duration">{video.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

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
import React, { useState, useEffect, useRef } from 'react';
import '../styles/home.css';
import Balatro from './Balatro';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'Hi! I\'m Anna, your mental wellness companion. How are you feeling today?' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const heroImages = [
    '/images/blueshirtmeditating.jpg',
    '/images/morgancomm.jpg',
    '/images/sportscounselor.jpeg'
  ];

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { type: 'user', text: userInput };
    const updatedMessages = [...chatMessages, userMessage];
    
    setChatMessages(updatedMessages);
    setUserInput('');
    setIsTyping(true);

    try {
      // Call your backend API
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      setChatMessages(prev => [...prev, {
        type: 'bot',
        text: data.message
      }]);
    } catch (error) {
      console.error('Error:', error);
      setChatMessages(prev => [...prev, {
        type: 'bot',
        text: 'I apologize, I\'m having trouble connecting right now. Please try again in a moment.'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="home-page">
      {/* Animated Background */}
      <Balatro isRotate={false} mouseInteraction={true} pixelFilter={700} />

      {/* Decorative Top Section */}
      <div className="top-banner"></div>

      {/* Navbar */}
      <header className="navbar-wrapper">
        <nav className="navbar-container">
          <ul>
            <li><a href="/" className="active">Home</a></li>
            <li><a href="/about">About us</a></li>
            <li><a href="/wellnessTools">Wellness tools</a></li>
            <li><a href="/LifeAfterSportsV2">Life After Sports</a></li>
            <li><a href="/community">Community</a></li>
          </ul>
        </nav>
      </header>

      {/* Main content card */}
      <div className="home-card">
        <h1 className="title">WELCOME TO HEALING MINDS</h1>

        <div className="hero-section">
          <div className="hero-text">
            <h2>Where Mental Strength<br />Meets Athletic<br />Greatness.</h2>
          </div>

          <div className="hero-image">
            <img 
              src={heroImages[currentSlide]} 
              alt="Athlete wellness" 
              className="carousel-image"
            />
            <div className="pagination-dots">
              {heroImages.map((_, index) => (
                <span 
                  key={index}
                  className={`dot ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Go to slide ${index + 1}`}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative circles */}
      <div className="circle-left"></div>
      <div className="circle-right"></div>

      {/* Chat Button */}
      {!isChatOpen && (
        <button className="chat-button" onClick={toggleChat} aria-label="Open chat">
          Chat with Anna
        </button>
      )}

      {/* Chat Modal */}
      {isChatOpen && (
        <div className="chat-modal">
          <div className="chat-header">
            <h5>Chat with Anna - Your Mental Wellness Companion</h5>
            <button className="chat-close" onClick={toggleChat} aria-label="Close chat">
              ×
            </button>
          </div>

          <div className="chat-messages-container">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.type}`}>
                <div className={`message-bubble ${msg.type}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="chat-message bot">
                <div className="message-bubble bot">
                  Anna is typing<span className="typing-dots">...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input"
              placeholder="Share what's on your mind..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isTyping}
            />
            <button 
              className="chat-send-btn" 
              onClick={handleSendMessage} 
              aria-label="Send message"
              disabled={isTyping || !userInput.trim()}
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

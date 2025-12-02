// src/pages/home.jsx
import React, { useState, useEffect, useRef } from "react";
import ChatFab from "../components/ChatFab.jsx";
import "../styles/home.css";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      text: "Hi! I'm Anna, your mental wellness companion. How are you feeling today?",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const heroImages = [
    "/images/blueshirtmeditating.jpg",
    "/images/morgancomm.jpg",
    "/images/sportscounselor.jpeg",
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
    const timer = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % heroImages.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { type: "user", text: userInput };
    const updatedMessages = [...chatMessages, userMessage];

    setChatMessages(updatedMessages);
    setUserInput("");
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      setChatMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: data.message,
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setChatMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text:
            "I apologize, I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="home-page">
      {/* Decorative Top Section */}
      <div className="top-banner"></div>

      {/* Main content card */}
      <div className="home-card">
        <h1 className="title">WELCOME TO HEALING MINDS</h1>

        <div className="hero-section">
          <div className="hero-text">
            <h2>
              Where Mental Strength
              <br />
              Meets Athletic
              <br />
              Greatness.
            </h2>
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
                  className={`dot ${currentSlide === index ? "active" : ""}`}
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

      {/* Optional global chat FAB from AppLayout, plus this home-page chat */}
      {!isChatOpen && (
        <button
          className="chat-button"
          onClick={toggleChat}
          aria-label="Open chat"
        >
          Chat with Anna
        </button>
      )}

      {isChatOpen && (
        <div className="chat-modal">
          <div className="chat-header">
            <h5>Chat with Anna - Your Mental Wellness Companion</h5>
            <button
              className="chat-close"
              onClick={toggleChat}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="chat-messages-container">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.type}`}>
                <div className={`message-bubble ${msg.type}`}>{msg.text}</div>
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

      {/* If you want the global floating ChatFab instead of this custom chat: */}
      {/* <ChatFab /> */}
    </div>
  );
}

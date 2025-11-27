import React, { useEffect, useState } from "react";
import MainNav from "../components/MainNav.jsx";
import ChatFab from "../components/ChatFab.jsx";
import { askAthleteAssistant } from "../api/chatClient.js";
import { useAuth } from "../context/AuthContext.jsx";
import { db } from "../config/firebaseClient.js";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const greetingTemplates = [
  (name) => `Hey ${name}, what’s on your mind today?`,
  (name) => `Hi ${name}, how are you feeling right now?`,
  (name) => `Welcome back ${name}, what can I help you with today?`,
  (name) => `Good to see you, ${name}. What’s been weighing on you lately?`,
  (name) => `Hi ${name}, what would you like to talk about?`,
];

function makeGreeting(name) {
  const safeName = name || "there";
  const idx = Math.floor(Math.random() * greetingTemplates.length);
  return greetingTemplates[idx](safeName);
}


export default function ChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [greeting, setGreeting] = useState("");

  const userProfile = {
    name: user?.displayName || "the athlete",
    sport: "Their sport",
    role: "student-athlete",
  };

  useEffect(() => {
    if (!user) return;
    //setGreeting(makeGreeting(user.displayName));
    

    const loadChat = async () => {
      try {
        const ref = doc(db, "users", user.uid, "chat", "latest");
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          if (Array.isArray(data.messages) && data.messages.length > 0) {
            setMessages(data.messages);
            return;
          }
        }
        const greeting = {
          role: "assistant",
          text: makeGreeting(user?.displayName),
        };
        setMessages([greeting]);
      } catch (err) {
        console.error("Error loading chat", err);
      }
    };

    loadChat();
  }, [user]);

  async function saveChat(nextMessages) {
    if (!user) return;
    try {
      const ref = doc(db, "users", user.uid, "chat", "latest");
      await setDoc(ref, {
        messages: nextMessages,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error saving chat", err);
    }
  }

  async function handleSend(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    setError("");
    setIsSending(true);
    const userMessage = { role: "user", text: trimmed };
    const current = [...messages, userMessage];
    setMessages(current);
    setInput("");

    try {
      const replyText = await askAthleteAssistant({
        messages: current.map((m) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.text,
        })),
        userProfile,
      });

      const assistantMessage = { role: "assistant", text: replyText };
      const next = [...current, assistantMessage];
      setMessages(next);
      await saveChat(next);
    } catch (err) {
      console.error(err);
      setError(
        "Something went wrong talking to the chat server. " +
          "Make sure `npm run dev:server` is running and (optionally) your OPENAI_API_KEY is set."
      );
    } finally {
      setIsSending(false);
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
        <section style={styles.chatPanel}>
          <div style={styles.leftBubble}>
            <h1 style={styles.chatHeading}>WELCOME TO HEALING MINDS</h1>
            <div style={styles.leftTextInner}>
              <h2 style={styles.leftTitle}>
                Where Mental Strength
                <br />
                Meets Athletic Greatness.
              </h2>
              <p style={styles.leftBody}>
                Chat with an AI assistant trained to support student-athletes
                through stress, transitions, and life after sports.
              </p>

              <p style={styles.crisisNote}>
                If you feel unsafe or in crisis,{" "}
                <a href="/crisis-support">click here for crisis resources.</a>
              </p>
            </div>
          </div>

          <div style={styles.chatBox}>
            <div style={styles.chatMessages}>
              {greeting && (
                <div style={{ ...styles.bubble, ...styles.bubbleLeft }}>
                  {greeting}
                </div>
              )}

              {messages.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    ...styles.bubble,
                    ...(m.role === "user"
                      ? styles.bubbleRight
                      : styles.bubbleLeft),
                  }}
                >
                  {m.text}
                </div>
              ))}

              {isSending && (
                <div style={{ ...styles.bubble, ...styles.bubbleLeft }}>
                  The assistant is typing • • •
                </div>
              )}
            </div>

            {error && <p style={styles.errorText}>{error}</p>}

            <form style={styles.inputRow} onSubmit={handleSend}>
              <input
                style={styles.input}
                placeholder="Type here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isSending}
              />
              <button
                type="submit"
                style={{
                  ...styles.sendBtn,
                  ...(isSending ? styles.sendBtnDisabled : {}),
                }}
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Send"}
              </button>
            </form>
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
    padding: "40px 24px 40px",
    display: "grid",
    placeItems: "center",
  },
  chatPanel: {
    background: "transparent",
    width: "100%",
    maxWidth: 1180,
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)",
    gap: 16,
    alignItems: "stretch",
  },
  leftBubble: {
    background: "#FFFFFF",
    borderRadius: 32,
    padding: 24,
    boxShadow: "0 10px 30px rgba(15,23,42,0.25)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  chatHeading: {
    fontSize: 24,
    fontWeight: 800,
    color: "#000",
    marginBottom: 12,
  },
  leftTextInner: {
    borderRadius: 24,
  },
  leftTitle: {
    fontSize: 26,
    fontWeight: 800,
    marginBottom: 12,
  },
  leftBody: {
    fontSize: 16,
    fontWeight: 500,
    color: "#4B5563",
    maxWidth: 320,
    marginBottom: 12,
  },
  crisisNote: {
    fontSize: 13,
    color: "#B91C1C",
    maxWidth: 340,
  },
  chatBox: {
    background: "#FFFFFF",
    borderRadius: 32,
    padding: 20,
    boxShadow: "0 10px 40px rgba(15,23,42,0.25)",
    display: "flex",
    flexDirection: "column",
    minHeight: 420,
    maxHeight: "50vh",
  },
  chatMessages: {
    flex: 1,
    overflowY: "auto",
    padding: "4px 4px 12px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  bubble: {
    maxWidth: "80%",
    borderRadius: 20,
    padding: "10px 14px",
    fontSize: 14,
  },
  bubbleLeft: {
    alignSelf: "flex-start",
    background: "#E5E7EB",
  },
  bubbleRight: {
    alignSelf: "flex-end",
    background: "#D1FAE5",
  },
  inputRow: {
    marginTop: 8,
    display: "flex",
    gap: 8,
  },
  input: {
    flex: 1,
    borderRadius: 999,
    border: "1px solid #D1D5DB",
    padding: "10px 16px",
    fontSize: 14,
  },
  sendBtn: {
    borderRadius: 999,
    border: "none",
    padding: "10px 18px",
    fontWeight: 700,
    background: "#0F172A",
    color: "#FFFFFF",
    cursor: "pointer",
    minWidth: 90,
  },
  sendBtnDisabled: {
    opacity: 0.7,
    cursor: "default",
  },
  errorText: {
    marginTop: 6,
    fontSize: 13,
    color: "#B91C1C",
  },
};

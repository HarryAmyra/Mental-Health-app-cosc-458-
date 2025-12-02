import React from "react";
import { useNavigate } from "react-router-dom";

export default function ChatFab() {
  const navigate = useNavigate();
  return (
    <button style={styles.chatButton} onClick={() => navigate("/chat")}>
      Chat
    </button>
  );
}

const styles = {
  chatButton: {
    position: "fixed",
    right: 24,
    bottom: 24,
    background: "#FFD400",
    border: "none",
    borderRadius: 999,
    padding: "10px 20px",
    fontWeight: 800,
    cursor: "pointer",
    zIndex: 3,
  },
};

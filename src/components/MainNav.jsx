import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { db } from "../config/firebaseClient.js";
import { doc, deleteDoc } from "firebase/firestore";


const navItems = [
  { label: "Home", to: "/" },
  { label: "About us", to: "/about" },
  { label: "Wellness tools", to: "/wellness-tools" },
  { label: "Life After Sports", to: "/life-after-sports" },
  { label: "Community", to: "/community" },
  { label: "Crisis support", to: "/crisis-support" },
];

export default function MainNav() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const uid = user?.uid;
      if (uid) {
        const chatRef = doc(db, "users", uid, "chat", "latest");
        await deleteDoc(chatRef);
      }


      await signOut();
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Could not log out. Please try again.");
    }
  }

  return (
    <header style={styles.navWrap}>
      <nav style={styles.navBar}>
        <div style={styles.navLinks}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              style={({ isActive }) => ({
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {}),
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {user && (
          <button type="button" style={styles.logoutBtn} onClick={handleLogout}>
            Log out
          </button>
        )}
      </nav>
    </header>
  );
}

const styles = {
  navWrap: {
    padding: "18px 28px",
    display: "flex",
    justifyContent: "center",
    position: "relative",
    zIndex: 2,
  },
  navBar: {
    background: "#FFFFFF",
    borderRadius: 999,
    padding: "10px 20px",
    display: "flex",
    gap: 24,
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: 600,
    maxWidth: 1100,
    boxShadow: "0 1px 0 rgba(15,23,42,0.06) inset",
  },
  navLinks: {
    display: "flex",
    gap: 24,
    alignItems: "center",
  },
  navItem: {
    color: "#0F172A",
    fontWeight: 800,
    textDecoration: "none",
    padding: "8px 14px",
    borderRadius: 999,
  },
  navItemActive: {
    background: "#FFD400",
  },
  logoutBtn: {
    borderRadius: 999,
    border: "1px solid #0F172A",
    padding: "8px 14px",
    fontWeight: 700,
    background: "#FFFFFF",
    cursor: "pointer",
  },
};

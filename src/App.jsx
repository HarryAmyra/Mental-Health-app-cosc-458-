// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import AppLayout from "./components/AppLayout.jsx";

import Home from "./pages/home.jsx";
import WellnessTools from "./pages/wellnessTools.jsx";
import Community from "./pages/community.jsx";
import LifeAfterSportsV2 from "./pages/LifeAfterSportsV2.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import About from "./pages/about.jsx";
import CrisisSupport from "./pages/CrisisSupport.jsx";

import "./App.css";

export default function App() {
  return (
    <AppLayout>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/crisis-support" element={<CrisisSupport />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* App feature pages */}
        <Route path="/wellness-tools" element={<WellnessTools />} />
        <Route path="/community" element={<Community />} />
        <Route path="/life-after-sports" element={<LifeAfterSportsV2 />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </AppLayout>
  );
}

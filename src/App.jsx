import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import WellnessTools from "./pages/wellnessTools.jsx";
import Community from "./pages/community.jsx";
import LifeAfterSportsV2 from "./pages/LifeAfterSportsV2.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import About from "./pages/about.jsx";
import CrisisSupport from "./pages/CrisisSupport.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />

      <Route
        path="/wellness-tools"
        element={
          <ProtectedRoute>
            <WellnessTools />
          </ProtectedRoute>
        }
      />
      <Route
        path="/community"
        element={
          <ProtectedRoute>
            <Community />
          </ProtectedRoute>
        }
      />
      <Route
        path="/life-after-sports"
        element={
          <ProtectedRoute>
            <LifeAfterSportsV2 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />

      <Route path="/crisis-support" element={<CrisisSupport />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
import './App.css'
import Home from './pages/home'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LifeAfterSportsV2 from './pages/LifeAfterSportsV2.jsx';
import WellnessTools from './pages/wellnessTools.jsx';
import Community from './pages/community';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/life-after-sports" element={<LifeAfterSportsV2 />} />
        <Route path="/wellnessTools" element={<WellnessTools />} />
        <Route path="/community" element={<Community />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

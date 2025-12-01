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
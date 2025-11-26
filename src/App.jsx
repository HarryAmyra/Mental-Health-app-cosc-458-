import { useState } from 'react'
<<<<<<< HEAD
import './App.css'
import Home from './pages/home'
=======
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LifeAfterSportsV2 from './pages/LifeAfterSportsV2.jsx';

>>>>>>> 4d44fa73a9039ff3002cc5e1ed66974a899f60fd
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      < Home />
    </div>
  )
}

export default App

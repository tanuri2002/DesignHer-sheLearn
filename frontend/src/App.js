import { AuthProvider } from "./context/AuthContext";
import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Peers from './pages/Peers';
import LearningTracks from './pages/LearningTracks';
import NavigationBar from './components/NavigationBar';
import ProfileSetup from './pages/ProfileSetup';

const App = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/peers" element={<Peers />} />
          <Route path="/tracks" element={<LearningTracks />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />setup page
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
  );
}

export default App;





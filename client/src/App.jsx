// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import AboutUs from './pages/AboutUs';
import Tokenomics from './pages/Tokenomics';
import Roadmap from './pages/Roadmap';
import { metaMask, hooks } from './connectors';

const connectors = [[metaMask, hooks]];

const App = () => {
  return (
    <Web3ReactProvider connectors={connectors}>
      <div className="flex flex-col h-screen bg-gray-100">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/tokenomics" element={<Tokenomics />} />
            <Route path="/roadmap" element={<Roadmap />} />
          </Routes>
        </main>
      </div>
    </Web3ReactProvider>
  );
};

export default App;
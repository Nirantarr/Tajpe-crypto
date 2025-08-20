// src/components/Navbar.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TajpeLogo from '../assets/images/TajpeLogo.webp';
import { metaMask, hooks } from '../connectors';

const { useAccount, useIsActive } = hooks;

const Navbar = () => {
  const account = useAccount();
  const isActive = useIsActive();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // --- Wallet & Admin Logic ---
  const ADMIN_PUBLIC_KEY = "0xf97032d8620f62Cf82520768dA01E775b0317412";
  const isAdmin = isActive && account && account.toLowerCase() === ADMIN_PUBLIC_KEY.toLowerCase();

  const connectWallet = async () => {
    try {
      await metaMask.activate();
      setIsDropdownOpen(false); // Close dropdown after action
    } catch (error) {
      console.error("Failed to connect wallet", error);
    }
  };

  const disconnectWallet = () => {
    if (metaMask?.deactivate) {
      metaMask.deactivate();
    } else {
      metaMask.resetState();
    }
    setIsDropdownOpen(false); // Close dropdown after action
  };

  const changeWallet = () => {
    // Disconnecting and immediately trying to connect can sometimes be too fast for providers.
    // The `activate` function itself is designed to handle this, so we can just call it.
    connectWallet();
  };

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      // You might want to add a "Copied!" feedback state here
    }
    setIsDropdownOpen(false); // Close dropdown after action
  };


  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* --- Logo and Brand Name --- */}
          <div className="flex-shrink-0 flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <img src={TajpeLogo} alt="Tajpe Logo" className="w-10 h-10" />
            <h1
              className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              Tajpe
            </h1>
          </div>

          {/* --- Desktop Navigation --- */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/aboutus" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">About</Link>
            <Link to="/tokenomics" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Tokenomics</Link>
            <Link to="/roadmap" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Roadmap</Link>
            <button className="bg-white text-indigo-600 px-5 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors shadow-md border">
              Whitepaper
            </button>
          </nav>

          {/* --- Right Side Actions (Wallet & Mobile Menu) --- */}
          <div className="flex items-center gap-4">
            {/* Admin Button (Desktop) */}
            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="hidden sm:block bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Admin
              </button>
            )}

            {/* Wallet Connect Button & Dropdown */}
            <div className="hidden md:flex">
              {!isActive ? (
                <button
                  onClick={connectWallet}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Select Wallet
                </button>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="bg-indigo-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    {`${account.substring(0, 4)}...${account.substring(account.length - 4)}`}
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <button onClick={copyAddress} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Copy address</button>
                      <button onClick={changeWallet} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Change wallet</button>
                      <button onClick={disconnectWallet} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Disconnect</button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* --- Mobile Menu Button --- */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg className="h-6 w-6" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            <Link to="/aboutus" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50">About</Link>
            <Link to="/tokenomics" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50">Tokenomics</Link>
            <Link to="/roadmap" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50">Roadmap</Link>
            <button className="w-full text-left bg-gray-100 text-indigo-600 px-3 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors">
              Whitepaper
            </button>

            {/* Wallet and Admin buttons for mobile */}
            <div className="mt-4 pt-4 border-t border-gray-200">
               {!isActive ? (
                <button
                  onClick={() => { connectWallet(); setIsMenuOpen(false); }}
                  className="w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Select Wallet
                </button>
              ) : (
                 <div className="px-3 py-2 text-center">
                    <p className="text-sm font-medium text-gray-800">Connected Wallet:</p>
                    <p className="text-sm text-gray-600 truncate">{account}</p>
                    <button onClick={() => { disconnectWallet(); setIsMenuOpen(false); }} className="mt-2 w-full text-center text-sm text-red-600 hover:underline">
                        Disconnect
                    </button>
                 </div>
              )}

              {isAdmin && (
                <button
                  onClick={() => { navigate('/admin'); setIsMenuOpen(false); }}
                  className="w-full text-center mt-2 bg-green-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Admin Page
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// UPDATED: Darker theme colors for better contrast
const themeColors = {
  primaryLight: '#008ECF', // Darker Cyan/Blue
  primaryDark: '#005A8D',  // Darker Navy Blue
  accent: '#FFFFFF',
};

// --- Data for Tokenomics (updated with new colors) ---
const tokenData = {
  name: "Tajpe",
  ticker: "TJE",
  totalSupply: 1_000_000_000, // 1 Billion
  network: "Binance Smart Chain (BSC)",
  distribution: [
    { category: "Ecosystem & Community Growth", percentage: 35, color: themeColors.primaryLight, details: "Funding for grants, partnerships, and community incentives to grow the Tajpe ecosystem." },
    { category: "Staking & Validator Rewards", percentage: 25, color: themeColors.primaryDark, details: "Rewards for users who stake TJE and validators who secure the network." },
    { category: "Core Team & Advisors", percentage: 15, color: '#c026d3', details: "Allocated to the founding team and key advisors, subject to a 3-year vesting schedule." },
    { category: "Treasury & Operations", percentage: 10, color: '#d97706', details: "Reserve funds for operational costs, future development, and strategic initiatives." },
    { category: "Public & Private Sale", percentage: 10, color: '#059669', details: "Funds raised from strategic partners and the public to bootstrap development." },
    { category: "Liquidity Provision", percentage: 5, color: '#2563eb', details: "Initial liquidity for decentralized exchanges (DEXs)." },
  ]
};

// --- Helper component for allocation details ---
const AllocationRow = ({ item, index }) => (
  <div 
    className="flex items-start sm:items-center space-x-4 p-4 rounded-lg transition-transform duration-300 hover:bg-gray-200/50 allocation-row"
    onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.02, duration: 0.3 })}
    onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })}
  >
    <div className="w-4 h-4 rounded-full mt-1 sm:mt-0 flex-shrink-0" style={{ backgroundColor: item.color }}></div>
    <div className="flex-1">
      <p className="font-semibold text-gray-900">{item.category}</p>
      <p className="text-sm text-gray-600">{item.details}</p>
    </div>
    <div className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Orbitron, sans-serif' }}>{item.percentage}%</div>
  </div>
);

const Tokenomics = () => {
  const pageRef = useRef(null);
  const chartRef = useRef(null);

  // --- Helper function for number formatting ---
  const formatLargeNumber = (num) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(0) + 'B';
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(0) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(0) + 'K';
    return num.toLocaleString();
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.page-title', { duration: 0.6, y: 50, opacity: 0, ease: 'power3.out' });
      gsap.from('.stat-card', {
        duration: 0.5, y: 40, opacity: 0, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.stats-container', start: 'top 85%' }
      });
      gsap.from(chartRef.current, {
        '--p1': 0, '--p2': 0, '--p3': 0, '--p4': 0, '--p5': 0, '--p6': 0,
        duration: 1.5, ease: 'power2.inOut',
        scrollTrigger: { trigger: chartRef.current, start: 'top 75%', toggleActions: 'play none none none' }
      });
      gsap.from('.allocation-row', {
        duration: 0.4, x: -50, opacity: 0, stagger: 0.05, ease: 'power3.out',
        scrollTrigger: { trigger: '.allocation-container', start: 'top 70%' }
      });
      gsap.from('.utility-card', {
        duration: 0.5, y: 50, opacity: 0, stagger: 0.08, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.utility-grid', start: 'top 80%' }
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const conicGradient = `conic-gradient(${
    tokenData.distribution.map((item, index) => {
      const start = index === 0 ? 0 : tokenData.distribution.slice(0, index).reduce((acc, i) => acc + i.percentage, 0);
      const end = start + item.percentage;
      return `${item.color} ${start}% ${end}%`;
    }).join(', ')
  })`;

  return (
    <div ref={pageRef} className="bg-gray-50" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 
            className="text-5xl md:text-7xl font-black uppercase text-gray-900 page-title" 
            style={{ fontFamily: "'Ubuntu', sans-serif", color: themeColors.primaryDark }}
          >
            {/* UPDATED: Gradient color */}
            $TJE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Tokenomics</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            A robust economic model designed for sustainable growth and long-term value.
          </p>
        </div>

        {/* UPDATED: Changed grid to flex for better centering */}
        <div className="flex flex-wrap justify-center items-stretch gap-8 text-center stats-container mb-24">
          <div className="bg-white p-8 rounded-2xl shadow-lg stat-card w-full sm:w-auto lg:flex-1" style={{ border: `2px solid ${themeColors.primaryLight}` }}>
            <p className="text-sm font-semibold text-gray-500 uppercase">Total Supply</p>
            <p className="text-4xl md:text-5xl font-bold" style={{ color: themeColors.primaryDark, fontFamily: 'Ubuntu, sans-serif' }}>
              {formatLargeNumber(tokenData.totalSupply)}
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg stat-card w-full sm:w-auto lg:flex-1" style={{ border: `2px solid ${themeColors.primaryLight}` }}>
            <p className="text-sm font-semibold text-gray-500 uppercase">Token Ticker</p>
            <p className="text-4xl md:text-5xl font-bold" style={{ color: themeColors.primaryDark, fontFamily: 'Ubuntu, sans-serif' }}>${tokenData.ticker}</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg stat-card w-full sm:w-auto lg:flex-1" style={{ border: `2px solid ${themeColors.primaryLight}` }}>
            <p className="text-sm font-semibold text-gray-500 uppercase">Network</p>
            <p className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: themeColors.primaryDark, fontFamily: 'Ubuntu, sans-serif' }}>{tokenData.network}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-12 lg:p-16 shadow-xl border border-gray-100">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="flex justify-center items-center">
              <div
                ref={chartRef}
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full"
                style={{ background: conicGradient, transition: 'all 1s ease', border: `4px solid ${themeColors.primaryDark}` }}
              >
                <div className="absolute inset-5 rounded-full bg-white flex flex-col items-center justify-center text-center">
                  <p className="text-5xl font-bold" style={{ color: themeColors.primaryDark, fontFamily: 'Orbitron, sans-serif' }}>1B</p>
                  <p className="text-gray-600 text-sm uppercase">Total Tokens</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 allocation-container">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Ubuntu', sans-serif" }}>Distribution</h2>
              {tokenData.distribution.map((item, index) => (
                <AllocationRow key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="py-24">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold text-gray-900" 
              style={{ fontFamily: "'Ubuntu', sans-serif", color: themeColors.primaryDark }}
            >
              {/* UPDATED: Gradient color */}
              Token <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Utility</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              $TJE is more than an asset; it's the key to unlocking the full potential of the Tajpe ecosystem.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 utility-grid">
            {/* UPDATED: Icon colors */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center utility-card border-t-4" style={{ borderColor: tokenData.distribution[5].color, background: 'linear-gradient(135deg, #ffffff, #f0f8ff)' }}>
              <i className="fas fa-vote-yea text-4xl mb-4" style={{ color: tokenData.distribution[5].color }}></i>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Ubuntu', sans-serif", color: themeColors.primaryDark }}>Governance</h3>
              <p className="text-gray-600">Shape the future by voting on proposals.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center utility-card border-t-4" style={{ borderColor: themeColors.primaryDark, background: 'linear-gradient(135deg, #ffffff, #f0f8ff)' }}>
              <i className="fas fa-hand-holding-usd text-4xl mb-4" style={{ color: themeColors.primaryDark }}></i>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Ubuntu', sans-serif", color: themeColors.primaryDark }}>Staking</h3>
              <p className="text-gray-600">Earn passive rewards by securing the network.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center utility-card border-t-4" style={{ borderColor: tokenData.distribution[2].color, background: 'linear-gradient(135deg, #ffffff, #f0f8ff)' }}>
              <i className="fas fa-exchange-alt text-4xl mb-4" style={{ color: tokenData.distribution[2].color }}></i>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Ubuntu', sans-serif", color: themeColors.primaryDark }}>Fee Payments</h3>
              <p className="text-gray-600">Get discounts on trading fees on our platform.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center utility-card border-t-4" style={{ borderColor: tokenData.distribution[3].color, background: 'linear-gradient(135deg, #ffffff, #f0f8ff)' }}>
              <i className="fas fa-lock text-4xl mb-4" style={{ color: tokenData.distribution[3].color }}></i>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Ubuntu', sans-serif", color: themeColors.primaryDark }}>Exclusive Access</h3>
              <p className="text-gray-600">Unlock premium features, airdrops, and more.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;
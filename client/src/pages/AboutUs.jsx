import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- Import Assets ---
import profile1 from '../assets/images/profile-img.png';
import partnerLogo1 from '../assets/images/bnb.png';
import partnerLogo2 from '../assets/images/ethereum-eth-icon.svg';
import partnerLogo3 from '../assets/images/walletconnect.png';
import partnerLogo4 from '../assets/images/sui-sui-logo.svg';

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// UPDATED: Darker theme colors for better contrast and a more professional feel
const themeColors = {
  primaryLight: '#008ECF', // Darker Cyan/Blue
  primaryDark: '#005A8D',  // Darker Navy Blue
  accent: '#FFFFFF',
};

// --- Reusable Icon Component for Features ---
const FeatureCard = ({ icon, title, children }) => (
  <div
    className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-100 shadow-lg text-center feature-card transform hover:-translate-y-2 transition-transform duration-300"
    style={{ borderColor: themeColors.primaryLight }}
    onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.02, duration: 0.3 })}
    onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })}
  >
    <div className="text-5xl mb-4" style={{ color: themeColors.primaryLight }}>{icon}</div>
    <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: '"Ubuntu", serif', color: themeColors.primaryDark }}>{title}</h3>
    <p className="text-gray-600">{children}</p>
  </div>
);

// --- Additional Component: Team Section ---
const TeamSection = () => (
  <section className="py-12 md:py-20 px-4 md:px-8 bg-gray-50 section">
    <div className="text-center max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: '"Ubuntu", serif', color: themeColors.primaryDark }}>
        Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Team</span>
      </h2>
      <p className="text-lg text-gray-600 mb-12">
        A group of passionate innovators driving the Tajpe ecosystem forward.
      </p>
    </div>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="text-center p-6 bg-white rounded-xl shadow-lg" style={{ background: 'linear-gradient(135deg, #f0f8ff, #e6f3ff)' }}>
        <img src={profile1} alt="Jane Doe, CEO" className="w-24 h-24 mx-auto rounded-full mb-4 object-cover border-2 border-blue-100" />
        <h4 className="text-xl font-semibold text-gray-900" style={{ fontFamily: '"Ubuntu", serif', color: themeColors.primaryDark }}>Jane Doe</h4>
        <p className="text-gray-600">CEO & Founder</p>
      </div>
      <div className="text-center p-6 bg-white rounded-xl shadow-lg" style={{ background: 'linear-gradient(135deg, #f0f8ff, #e6f3ff)' }}>
        <img src={profile1} alt="John Smith, CTO" className="w-24 h-24 mx-auto rounded-full mb-4 object-cover border-2 border-blue-100" />
        <h4 className="text-xl font-semibold text-gray-900" style={{ fontFamily: '"Ubuntu", serif', color: themeColors.primaryDark }}>John Smith</h4>
        <p className="text-gray-600">CTO</p>
      </div>
      <div className="text-center p-6 bg-white rounded-xl shadow-lg" style={{ background: 'linear-gradient(135deg, #f0f8ff, #e6f3ff)' }}>
        <img src={profile1} alt="Alice Brown, Lead Developer" className="w-24 h-24 mx-auto rounded-full mb-4 object-cover border-2 border-blue-100" />
        <h4 className="text-xl font-semibold text-gray-900" style={{ fontFamily: '"Ubuntu", serif', color: themeColors.primaryDark }}>Alice Brown</h4>
        <p className="text-gray-600">Lead Developer</p>
      </div>
    </div>
  </section>
);

// --- Additional Component: Partners Section ---
const PartnersSection = () => (
  <section className="py-12 md:py-20 px-4 md:px-8 bg-white section">
    <div className="text-center max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: '"Ubuntu", serif', color: themeColors.primaryDark }}>
        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Partners</span>
      </h2>
      <p className="text-lg text-gray-600 mb-12">
        Collaborating with industry leaders to enhance the Tajpe ecosystem.
      </p>
    </div>
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
      <div className="text-center p-6 bg-gray-50 rounded-xl shadow-md">
        <img src={partnerLogo1} alt="BNB Foundation logo" className="h-16 mx-auto object-contain mb-4" />
        <p className="text-gray-900 font-semibold">BNB Foundation</p>
      </div>
      <div className="text-center p-6 bg-gray-50 rounded-xl shadow-md">
        <img src={partnerLogo2} alt="ETH Foundation logo" className="h-16 mx-auto object-contain mb-4" />
        <p className="text-gray-900 font-semibold">ETH Foundation</p>
      </div>
      <div className="text-center p-6 bg-gray-50 rounded-xl shadow-md">
        <img src={partnerLogo3} alt="Wallet Connect logo" className="h-16 mx-auto object-contain mb-4" />
        <p className="text-gray-900 font-semibold">Wallet Connect</p>
      </div>
      <div className="text-center p-6 bg-gray-50 rounded-xl shadow-md">
        <img src={partnerLogo4} alt="Sui Foundation logo" className="h-16 mx-auto object-contain mb-4" />
        <p className="text-gray-900 font-semibold">Sui Foundation</p>
      </div>
    </div>
  </section>
);

const AboutUs = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', { duration: 0.8, y: 50, opacity: 0, ease: 'power3.out', delay: 0.2 });
      gsap.from('.hero-subtitle', { duration: 0.8, y: 40, opacity: 0, ease: 'power3.out', delay: 0.4 });

      gsap.utils.toArray('.section').forEach(section => {
        gsap.from(section, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      });

      gsap.utils.toArray('.feature-card').forEach((card, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          delay: i * 0.1
        });
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  // UPDATED: Removed the 'overflow-x-hidden' class to fix the double scrollbar issue
  return (
    <div ref={pageRef} className="bg-gray-50 text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <section className="bg-white min-h-[50vh] md:min-h-[60vh] lg:min-h-[80vh] flex items-center justify-center text-center px-4 py-8 md:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-3xl md:text-5xl lg:text-7xl font-black uppercase hero-title text-gray-900"
            style={{ fontFamily: '"Ubuntu", serif', color: themeColors.primaryDark }}
          >
            Forging the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">New Digital</span> Frontier
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 mt-4 md:mt-6 max-w-2xl mx-auto hero-subtitle">
            Tajpe isn't just a project; it's an ecosystem. We are architects of the decentralized future, building the tools for a new generation of finance and technology.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 md:px-8 section">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="text-center md:text-left">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
              style={{ fontFamily: '"Ubuntu", serif', color: themeColors.primaryDark }}
            >
              Our Vision: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Your Gateway</span>
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              The future of digital assets should be secure, accessible, and empowering. Our primary goal is to build a comprehensive ecosystem starting with two core products:
            </p>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md" style={{ background: 'linear-gradient(135deg, #f0f8ff, #e6f3ff)' }}>
                <h4 className="text-xl font-bold text-blue-500 flex items-center gap-3" style={{ fontFamily: '"Ubuntu", serif', color: themeColors.primaryLight }}><i className="fas fa-wallet"></i> The Tajpe Wallet</h4>
                <p className="text-gray-500 mt-2">A non-custodial, multi-chain wallet that puts security and user experience first. Manage your TJE tokens, NFTs, and thousands of other assets with unparalleled ease.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md" style={{ background: 'linear-gradient(135deg, #f0f8ff, #e6f3ff)' }}>
                <h4 className="text-xl font-bold text-blue-700 flex items-center gap-3" style={{ fontFamily: '"Ubuntu", serif', color: themeColors.primaryDark }}><i className="fas fa-chart-line"></i> The Tajpe Trading Platform</h4>
                <p className="text-gray-500 mt-2">A high-performance, low-fee trading site designed for both novice and professional traders. Experience deep liquidity, advanced tools, and seamless asset swapping.</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-blue-50 via-cyan-50 to-gray-50 rounded-full flex items-center justify-center shadow-2xl" style={{ border: `2px solid ${themeColors.primaryDark}` }}>
              <i className="fas fa-space-shuttle text-9xl text-blue-400 transform -rotate-45"></i>            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 md:px-8 bg-white section border-t border-b border-gray-100">
        <div className="text-center max-w-4xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
            style={{ fontFamily: '"Ubuntu", serif', color: themeColors.primaryDark }}
          >
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">$TJE</span> Token
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            $TJE is the lifeblood of the Tajpe ecosystem. It is a utility token designed to power our platforms, reward our community, and facilitate governance.
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard icon={<i className="fas fa-gas-pump"></i>} title="Ecosystem Fuel">
            $TJE will be used for transaction fees, feature access, and as the primary pair on our future trading platform.
          </FeatureCard>
          <FeatureCard icon={<i className="fas fa-users"></i>} title="Governance">
            Holders of $TJE will have the power to vote on key proposals, shaping the future direction of the Tajpe project.
          </FeatureCard>
          <FeatureCard icon={<i className="fas fa-coins"></i>} title="Staking Rewards">
            Stake your $TJE tokens to help secure the network and earn passive rewards from a dedicated portion of platform revenue.
          </FeatureCard>
          <FeatureCard icon={<i className="fas fa-gift"></i>} title="Exclusive Access">
            Token holders will gain exclusive access to beta tests, airdrops from partner projects, and premium features.
          </FeatureCard>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 md:px-8 section">
        <div className="text-center max-w-4xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
            style={{ fontFamily: '"Ubuntu", serif', color: themeColors.primaryDark }}
          >
            More Than A <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Crypto</span> Project
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Our strength lies in our diverse foundation. Tajpe is the culmination of years of experience across multiple cutting-edge industries. This cross-pollination of ideas is our unique advantage.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 bg-white rounded-xl shadow-md" style={{ background: 'linear-gradient(135deg, #f0f8ff, #e6f3ff)' }}>
            <i className="fas fa-brain text-5xl mb-4" style={{ color: themeColors.primaryLight }}></i>
            <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: '"Ubuntu", serif', color: themeColors.primaryDark }}>Artificial Intelligence</h3>
            <p className="text-gray-500">Leveraging AI for intelligent analytics, on-chain security monitoring, and personalized user experiences within our trading platform.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md" style={{ background: 'linear-gradient(135deg, #f0f8ff, #e6f3ff)' }}>
            <i className="fas fa-cubes text-5xl mb-4" style={{ color: themeColors.primaryDark }}></i>
            <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: '"Ubuntu", serif', color: themeColors.primaryDark }}>Blockchain Core</h3>
            <p className="text-gray-500">Our deep expertise in DLT ensures that our products are built on a foundation of security, decentralization, and scalability.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md" style={{ background: 'linear-gradient(135deg, #f0f8ff, #e6f3ff)' }}>
            <i className="fas fa-graduation-cap text-5xl mb-4" style={{ color: themeColors.primaryLight }}></i>
            <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: '"Ubuntu", serif', color: themeColors.primaryDark }}>Education & Onboarding</h3>
            <p className="text-gray-500">We are committed to demystifying crypto. Our educational initiatives will empower users to navigate the Web3 world safely and confidently.</p>
          </div>
        </div>
      </section>

      <TeamSection />
      <PartnersSection />
    </div>
  );
};

export default AboutUs;
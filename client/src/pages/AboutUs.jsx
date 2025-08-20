import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// --- Reusable Icon Component for Features (Light Theme) ---
const FeatureCard = ({ icon, title, children }) => (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg text-center feature-card transform hover:-translate-y-2 transition-transform duration-300">
        <div className="text-5xl text-indigo-600 mb-4">{icon}</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: '"Libertinus Serif", serif' }}>{title}</h3>
        <p className="text-gray-600">{children}</p>
    </div>
);


const AboutUs = () => {
    const pageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Hero Section
            gsap.from('.hero-title', { duration: 0.8, y: 50, opacity: 0, ease: 'power3.out', delay: 0.2 });
            gsap.from('.hero-subtitle', { duration: 0.8, y: 40, opacity: 0, ease: 'power3.out', delay: 0.4 });
            gsap.from('.hero-button', { duration: 0.8, y: 30, opacity: 0, ease: 'power3.out', delay: 0.6 });

            // Animate Sections on Scroll (with reduced duration)
            gsap.utils.toArray('.section').forEach(section => {
                gsap.from(section, {
                    y: 80,
                    opacity: 0,
                    duration: 0.8, // Reduced duration for a faster animation
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                });
            });

            // Animate Feature Cards on Scroll
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


    return (
        <div ref={pageRef} className="bg-gray-50 text-gray-800 overflow-x-hidden" style={{ fontFamily: 'Poppins, sans-serif' }}>

            {/* --- Hero Section --- */}
            <section className="bg-white min-h-screen flex items-center justify-center text-center p-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase hero-title text-gray-900" style={{ fontFamily: '"Libertinus Serif", serif' }}>
                        Forging the <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">New Digital</span> Frontier
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mt-6 max-w-2xl mx-auto hero-subtitle">
                        Tajpe isn't just a project; it's an ecosystem. We are architects of the decentralized future, building the tools for a new generation of finance and technology.
                    </p>
                    <button className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-10 rounded-full text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl hero-button">
                        Explore Our Vision
                    </button>
                </div>
            </section>

            {/* --- Our Vision Section --- */}
            <section className="py-20 px-4 md:px-8 section">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: '"Libertinus Serif", serif' }}>Our Vision: <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">Your Gateway</span></h2>
                        <p className="text-gray-600 mb-6 text-lg">
                            The future of digital assets should be secure, accessible, and empowering. Our primary goal is to build a comprehensive ecosystem starting with two core products:
                        </p>
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md">
                                <h4 className="text-xl font-bold text-indigo-600 flex items-center gap-3" style={{ fontFamily: '"Libertinus Serif", serif' }}><i className="fas fa-wallet"></i> The Tajpe Wallet</h4>
                                <p className="text-gray-500 mt-2">A non-custodial, multi-chain wallet that puts security and user experience first. Manage your TJE tokens, NFTs, and thousands of other assets with unparalleled ease.</p>
                            </div>
                             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md">
                                <h4 className="text-xl font-bold text-purple-600 flex items-center gap-3" style={{ fontFamily: '"Libertinus Serif", serif' }}><i className="fas fa-chart-line"></i> The Tajpe Trading Platform</h4>
                                <p className="text-gray-500 mt-2">A high-performance, low-fee trading site designed for both novice and professional traders. Experience deep liquidity, advanced tools, and seamless asset swapping.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-indigo-100 via-purple-100 to-gray-50 rounded-full flex items-center justify-center shadow-2xl">
                             <i className="fas fa-space-shuttle text-9xl text-indigo-300 opacity-80 transform -rotate-45"></i>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- The TJE Token Section --- */}
             <section className="py-20 px-4 md:px-8 bg-white section border-t border-b border-gray-200">
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: '"Libertinus Serif", serif' }}>The <span className="text-purple-600">$TJE</span> Token</h2>
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


            {/* --- Beyond Crypto Section --- */}
            <section className="py-20 px-4 md:px-8 section">
                 <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: '"Libertinus Serif", serif' }}>More Than A <span className="text-indigo-600">Crypto</span> Project</h2>
                    <p className="text-lg text-gray-600 mb-12">
                        Our strength lies in our diverse foundation. Tajpe is the culmination of years of experience across multiple cutting-edge industries. This cross-pollination of ideas is our unique advantage.
                    </p>
                </div>
                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center">
                    <div className="p-6">
                        <i className="fas fa-brain text-5xl text-purple-500 mb-4"></i>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: '"Libertinus Serif", serif' }}>Artificial Intelligence</h3>
                        <p className="text-gray-500">Leveraging AI for intelligent analytics, on-chain security monitoring, and personalized user experiences within our trading platform.</p>
                    </div>
                     <div className="p-6">
                        <i className="fas fa-cubes text-5xl text-indigo-500 mb-4"></i>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: '"Libertinus Serif", serif' }}>Blockchain Core</h3>
                        <p className="text-gray-500">Our deep expertise in DLT ensures that our products are built on a foundation of security, decentralization, and scalability.</p>
                    </div>
                     <div className="p-6">
                        <i className="fas fa-graduation-cap text-5xl text-purple-500 mb-4"></i>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: '"Libertinus Serif", serif' }}>Education & Onboarding</h3>
                        <p className="text-gray-500">We are committed to demystifying crypto. Our educational initiatives will empower users to navigate the Web3 world safely and confidently.</p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutUs;
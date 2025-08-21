import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Roadmap Data ---
const roadmapData = [
    {
        quarter: "Q3 2025",
        date: "July - Sept",
        title: "Foundation & Inception",
        icon: "fas fa-flag-checkered",
        color: "text-indigo-500",
        points: [
            "Finalize the TJE Token smart contract on Solana.",
            "Launch the official Tajpe website and whitepaper.",
            "Initiate community building efforts on social platforms.",
            "Conduct initial security audits of the core contract.",
        ]
    },
    {
        quarter: "Q4 2025",
        date: "Oct - Dec",
        title: "Wallet & Education Launch",
        icon: "fas fa-wallet",
        color: "text-purple-500",
        points: [
            "Release the Beta version of the Tajpe non-custodial wallet for mobile.",
            "Launch the 'Tajpe Academy,' our educational platform for Web3 onboarding.",
            "Integrate first-party staking for TJE tokens within the wallet.",
            "Establish key partnerships with other crypto projects.",
        ]
    },
    {
        quarter: "Q1 2026",
        date: "Jan - Mar",
        title: "AI & Exchange Development",
        icon: "fas fa-brain",
        color: "text-pink-500",
        points: [
            "Begin development of the Tajpe decentralized trading exchange.",
            "Integrate AI-powered analytics for portfolio management in the wallet.",
            "Public launch of the Tajpe Wallet v1.0 on iOS & Android.",
            "Expand blockchain support in the wallet to include Ethereum and Polygon.",
        ]
    },
    {
        quarter: "Looking Forward",
        date: "Q2 2026 & Beyond",
        title: "Ecosystem Expansion",
        icon: "fas fa-space-shuttle",
        color: "text-amber-500",
        points: [
            "Launch the Tajpe decentralized trading exchange.",
            "Introduce advanced AI-driven trading tools and signals.",
            "Roll out the first phase of community governance via the TJE token.",
            "Explore Layer 2 solutions for enhanced scalability.",
        ]
    }
];

// --- Reusable component for each roadmap item ---
const RoadmapItem = ({ data, isOdd }) => {
    const sideClass = isOdd ? 'md:flex-row-reverse' : 'md:flex-row';
    // Add mb-8 for mobile spacing, md:mb-0 to remove it on larger screens where layout changes
    return (
        <div className={`flex justify-between items-center w-full roadmap-item ${sideClass} mb-8 md:mb-0`}>
            {/* Hidden on mobile, spacer for desktop */}
            <div className="hidden md:flex w-5/12"></div>

            {/* Icon in the middle */}
            <div className="z-10 flex items-center bg-gray-200 shadow-md w-16 h-16 rounded-full">
                <i className={`${data.icon} ${data.color} mx-auto text-3xl`}></i>
            </div>
            
            {/* Content Card */}
            <div className="bg-white rounded-xl shadow-lg w-full md:w-5/12 p-6 md:p-8">
                <p className={`font-semibold ${data.color}`}>{data.quarter} <span className="text-gray-500 font-normal">({data.date})</span></p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1 mb-4" style={{ fontFamily: 'Ubuntu, sans-serif' }}>{data.title}</h3>
                <ul className="space-y-3 text-gray-600">
                    {data.points.map((point, index) => (
                        <li key={index} className="flex items-start">
                            <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                            <span>{point}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};


const Roadmap = () => {
    const pageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.page-title', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' });

            const items = gsap.utils.toArray('.roadmap-item');
            
            // Animate the timeline bar drawing itself
            gsap.from('.timeline-bar', {
                scaleY: 0,
                transformOrigin: 'top center',
                duration: items.length * 0.5,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.timeline-container',
                    start: 'top 30%',
                    end: 'bottom 80%',
                    scrub: true
                }
            });

            // Animate each roadmap item
            items.forEach((item, index) => {
                // For desktop view, animate from the sides
                if (window.innerWidth >= 768) { // 768px is the default 'md' breakpoint
                    gsap.from(item, {
                        x: (index % 2 === 0) ? -100 : 100,
                        opacity: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    });
                } else {
                    // For mobile view, animate from bottom
                     gsap.from(item.querySelector('.bg-white'), { // Target the card specifically
                        y: 50,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 90%', 
                            toggleActions: 'play none none none'
                        }
                    });
                }
            });

        }, pageRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="bg-gray-100 py-20 md:py-28" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* --- Header --- */}
                <div className="text-center mb-12 md:mb-20">
                    <h1 className="text-5xl md:text-7xl font-black uppercase text-gray-900 page-title" style={{ fontFamily: '"Ubuntu", sans-serif' }}>
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">Roadmap</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Charting the course for the future of decentralized technology, one milestone at a time.
                    </p>
                </div>
                
                {/* --- Timeline Container --- */}
                <div className="relative wrap overflow-hidden p-4 md:p-10 h-full timeline-container">
                    {/* The vertical timeline bar for desktop */}
                    <div className="hidden md:block absolute h-full border-2 border-gray-300 border-dashed timeline-bar" style={{ left: '50%', transform: 'translateX(-1px)' }}></div>
                    
                    {/* The mobile vertical timeline bar */}
                    <div className="absolute h-full border-2 border-gray-300 border-dashed md:hidden" style={{ left: '32px' }}></div>

                    {/* We add flex-col and space-y-8 to the container for mobile layout */}
                    <div className="md:relative flex flex-col md:block space-y-8 md:space-y-0">
                         {roadmapData.map((item, index) => (
                            <RoadmapItem key={index} data={item} isOdd={index % 2 !== 0} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Roadmap;
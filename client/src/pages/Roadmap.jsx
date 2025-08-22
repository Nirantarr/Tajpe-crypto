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

// --- Roadmap Data ---
const roadmapData = [
  {
    quarter: "Q3 2025",
    date: "July - Sept",
    title: "Foundation & Inception",
    icon: "fas fa-flag-checkered",
    colorKey: "light",
    points: [
      "Finalize the TJE Token smart contract.",
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
    colorKey: "dark",
    points: [
      "Release the Beta version of the Tajpe non-custodial wallet.",
      "Launch the 'Tajpe Academy' educational platform.",
      "Integrate first-party staking for TJE tokens within the wallet.",
      "Establish key partnerships with other crypto projects.",
    ]
  },
  {
    quarter: "Q1 2026",
    date: "Jan - Mar",
    title: "AI & Exchange Development",
    icon: "fas fa-brain",
    colorKey: "light",
    points: [
      "Begin development of the Tajpe decentralized trading exchange.",
      "Integrate AI-powered analytics for portfolio management.",
      "Public launch of the Tajpe Wallet v1.0 on iOS & Android.",
      "Expand blockchain support to include Ethereum and Polygon.",
    ]
  },
  {
    quarter: "Looking Forward",
    date: "Q2 2026 & Beyond",
    title: "Ecosystem Expansion",
    icon: "fas fa-space-shuttle",
    colorKey: "dark",
    points: [
      "Launch the Tajpe decentralized trading exchange.",
      "Introduce advanced AI-driven trading tools and signals.",
      "Roll out the first phase of community governance.",
      "Explore Layer 2 solutions for enhanced scalability.",
    ]
  }
];

// --- Reusable component for each roadmap item ---
const RoadmapItem = ({ data, isOdd }) => {
  const sideClass = isOdd ? 'md:flex-row-reverse' : 'md:flex-row';
  const itemColor = data.colorKey === 'light' ? themeColors.primaryLight : themeColors.primaryDark;

  return (
    <div className={`flex justify-between items-center w-full roadmap-item ${sideClass} mb-8 md:mb-0`}>
      <div className="hidden md:flex w-5/12"></div>
      <div 
        className="z-10 flex items-center bg-gradient-to-br from-white to-gray-100 shadow-md w-16 h-16 rounded-full"
        style={{ border: `2px solid ${themeColors.primaryDark}` }}
      >
        <i className={`${data.icon} mx-auto text-3xl`} style={{ color: itemColor }}></i>
      </div>
      <div 
        className="bg-white rounded-xl shadow-lg w-full md:w-5/12 p-6 md:p-8"
        style={{ background: 'linear-gradient(135deg, #f0f8ff, #e6f3ff)' }}
        onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.02, duration: 0.3 })}
        onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })}
      >
        <p className="font-semibold" style={{ color: itemColor }}>{data.quarter} <span className="text-gray-600 font-normal">({data.date})</span></p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1 mb-4" style={{ fontFamily: 'Ubuntu, sans-serif', color: themeColors.primaryDark }}>{data.title}</h3>
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

// --- Additional Component: Milestones Progress (Redesigned) ---
const MilestonesProgress = ({ className }) => {
  const milestones = [
    { title: "Website Launch", status: "completed" },
    { title: "Wallet Beta", status: "in-progress" },
    { title: "Exchange Launch", status: "pending" },
  ];

  const getStatusIndicator = (status) => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
            <i className="fas fa-check"></i>
          </div>
        );
      case 'in-progress':
        return (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
        );
      case 'pending':
      default:
        return (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
            <i className="far fa-circle"></i>
          </div>
        );
    }
  };

  return (
    <div className={`mt-24 max-w-2xl mx-auto ${className || ''}`}>
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8" style={{ fontFamily: 'Ubuntu, sans-serif', color: themeColors.primaryDark }}>
          Milestones Progress
        </h2>
       <div className="space-y-6 flex flex-col items-center">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex items-center">
              {getStatusIndicator(milestone.status)}
              <span className={`ml-4 text-lg font-medium ${milestone.status === 'completed' ? 'text-gray-800 ' : 'text-gray-600'}`}>
                {milestone.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const Roadmap = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.page-title', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' });
      gsap.from('.milestones-progress', { y: 50, opacity: 0, duration: 0.8, scrollTrigger: { trigger: '.milestones-progress', start: 'top 85%' }});

      const items = gsap.utils.toArray('.roadmap-item');
      
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

      items.forEach((item, index) => {
        const itemContent = item.querySelector('.bg-white');
        const triggerPoint = window.innerWidth >= 768 ? 'top 85%' : 'top 95%';
        let animationProps = { opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: item, start: triggerPoint, toggleActions: 'play none none none' }};

        if (window.innerWidth >= 768) {
          animationProps.x = (index % 2 === 0) ? -100 : 100;
          gsap.from(item, animationProps);
        } else {
          animationProps.y = 50;
          gsap.from(itemContent, animationProps);
        }
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-gray-50 py-20 md:py-28" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <h1 
            className="text-5xl md:text-7xl font-black uppercase text-gray-900 page-title" 
            style={{ fontFamily: '"Ubuntu", sans-serif', color: themeColors.primaryDark }}
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Roadmap</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Charting the course for the future of decentralized technology, one milestone at a time.
          </p>
        </div>
        
        <div className="relative wrap overflow-hidden p-4 md:p-10 h-full timeline-container">
          <div className="hidden md:block absolute h-full border-2 border-dashed timeline-bar" style={{ left: '50%', transform: 'translateX(-1px)', borderColor: themeColors.primaryLight }}></div>
          <div className="absolute h-full border-2 border-dashed md:hidden" style={{ left: '32px', borderColor: themeColors.primaryLight }}></div>
          <div className="md:relative flex flex-col md:block space-y-8 md:space-y-0">
            {roadmapData.map((item, index) => (
              <RoadmapItem key={index} data={item} isOdd={index % 2 !== 0} />
            ))}
          </div>
        </div>

        <MilestonesProgress className="milestones-progress" />
      </div>
    </div>
  );
};

export default Roadmap;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import all the images needed for this section
import lockIllustration from '../assets/images/privacy-lock.png';
import cloudIllustration from '../assets/images/privacy-cloud.png';
import shieldIllustration from '../assets/images/privacy-shield.png';
import alertIllustration from '../assets/images/privacy-alert.png';

// Data for the three feature cards at the bottom
const featureCards = [
  {
    icon: cloudIllustration,
    title: 'Added security with encryption',
    description: 'Use our Encrypted Cloud Backup for increased wallet security.',
  },
  {
    icon: shieldIllustration,
    title: 'Zero personal tracking',
    description: "We don't track any personal information, including your IP address or balances.",
  },
  {
    icon: alertIllustration,
    title: 'Proactive alerts for risky transactions',
    description: 'Stay safe with alerts for risky address and dApp connections.',
  },
];

const ZeroTracking = () => {
  // Animation variant for single elements
  const cardVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  // Animation variants for the grid of cards (staggered effect)
  const gridContainerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // This will make each child animate 0.2s after the previous one
      },
    },
  };

  return (
    <section className="bg-gradient-to-b from-lime-300 via-green-400 to-emerald-400 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Headlines */}
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            Zero personal tracking
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-700">
            We secure your wallet, but don’t control or have access to your private keys or secret phrase - only you do.
          </p>
        </div>

        {/* Top Feature Card */}
        <motion.div
          className="mt-16 max-w-7xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-lg"
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
                True ownership of your crypto assets
              </h3>
              <p className="mt-4 text-gray-600">
                We secure your wallet, but don’t control or have access to your private keys or secret phrase - only you do.
              </p>
              <div className="mt-8">
                <Link to="/get-started" className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-full text-base hover:bg-blue-700 transition-colors duration-300">
                  Get Started
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img src={lockIllustration} alt="Crypto asset security" className="w-full max-w-xs sm:max-w-sm" />
            </div>
          </div>
        </motion.div>

        {/* Three Feature Cards Grid */}
        <motion.div 
          className="mt-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={gridContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {featureCards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-3xl p-8 text-center shadow-lg flex flex-col items-center"
              variants={cardVariant} // Reuse the same variant for each item
            >
              
              <h4 className="mt-1 text-xl font-bold text-gray-900">{card.title}</h4>
              <img src={card.icon} alt={card.title} className="h-50 w-50 my-4 object-contain" />
              <p className="mt-2 text-gray-600 flex-grow">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Final CTA Button */}
        <div className="mt-16 text-center">
            <Link 
                to="/privacy"
                className="inline-block border-2 border-white   font-bold px-8 py-3 rounded-full  hover:bg-green-50   transition-colors duration-300"
            >
                Learn more about privacy & security
            </Link>
        </div>

      </div>
    </section>
  );
};

export default ZeroTracking;
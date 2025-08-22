// src/components/Dapps.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import the image directly into the component.
// Make sure this path is correct for your project structure!
import dappsIllustration from '../assets/images/dapps-illustration.png';

const Dapps = () => {
  // Animation variants for a smooth fade-in effect on scroll
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    // Section with the custom soft gradient background
    <section className="bg-gradient-to-br from-tajpe-50 to-tajpe-100 py-20 sm:py-28">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Headlines */}
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            Browse a world of dApps
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Access Web3 and DeFi opportunities via our dApp browser.
          </p>
        </div>

        {/* Feature Card */}
        <motion.div
          className="mt-16 max-w-6xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-lg"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Text Content */}
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                Deposit crypto easily from exchanges
              </h3>
              <p className="mt-4 text-gray-600">
                Take control of your crypto. Avoid complicated steps and deposit directly to your wallet from exchanges like Binance and Coinbase.
              </p>
              <div className="mt-8">
                <Link
                  to="/" // Update this path as needed
                  className="inline-block border-2 border-tajpe-500 text-tajpe-500 font-semibold px-6 py-2.5 rounded-full text-base hover:bg-tajpe-50 hover:text-tajpe-600 transition-colors duration-300"
                >
                  Get started with deposits
                </Link>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="flex justify-center">
              <img
                src={dappsIllustration}
                alt="Phone showing QR code for deposits"
                className="w-full max-w-xs sm:max-w-sm"
              />
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Dapps;
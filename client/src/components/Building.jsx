import React from 'react';
import { Link, } from 'react-router-dom';
import { motion } from 'framer-motion';

// --- KEY CHANGE ---
// Import the image directly into the component.
// Make sure this path is correct for your project structure!
import buildingIllustration from '../assets/images/building-illustration.png';

const Building = () => {
  // Animation variants for a smooth fade-in effect on scroll
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-tajpe-500 rounded-3xl p-10 sm:p-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side: Text Content */}
            <div className="text-white">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Building on Trust
              </h2>
              <p className="mt-4 text-lg text-tajpe-100 max-w-lg">
                We know that working together as a community is better for everyone. Our platform enables blockchain developers to build their dApps and wallets natively and connect with millions of users, without having to worry about the low-level implementation details.
              </p>
              <div className="mt-8">
                <Link
                  to="/" // This path should point to your developer docs page
                  className="inline-block bg-white text-tajpe-500 font-semibold px-8 py-3 rounded-full text-base hover:bg-tajpe-100 transition-colors duration-300"
                >
                  Check out our Developer Docs
                </Link>
              </div>
            </div>

            {/* Right Side: Image */}
            <div className="flex justify-center lg:justify-end">
              <img
                // --- KEY CHANGE ---
                // Use the imported image variable directly in the src attribute
                src={buildingIllustration}
                alt="Building on Trust Illustration"
                className="w-full max-w-xs sm:max-w-sm"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Building;
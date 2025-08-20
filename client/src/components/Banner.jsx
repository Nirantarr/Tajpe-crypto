import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Monitor, Star } from 'lucide-react';

const Banner = ({ imageUrl }) => {
  const trustSignals = [
    { label: 'Trusted by', value: '200M people' },
    { label: 'Founded in', value: '2017' },
    { label: 'Independently', value: 'Audited' },
    { label: 'ISO', value: 'Certified' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
                True crypto ownership.
                <br />
                Powerful Web3
                <br />
                experiences
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
                Unlock the power of your cryptocurrency assets and explore the world of Web3 with Trust Wallet.
              </p>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link
                  to="/download/mobile"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3 border border-blue-600 text-blue-600 rounded-full text-base font-semibold hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                >
                  <Smartphone className="h-6 w-6" />
                  <div className="text-left">
                    <span className="text-xs text-gray-500">Download</span>
                    <br />
                    <span>Mobile App</span>
                  </div>
                </Link>

                <Link
                  to="/download/extension"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3 border border-blue-600 text-blue-600 rounded-full text-base font-semibold hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                >
                  <Monitor className="h-6 w-6" />
                  <div className="text-left">
                    <span className="text-xs text-gray-500">Download</span>
                    <br />
                    <span>Extension</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <img
                src={imageUrl}
                alt="Trust Wallet app on mobile phones"
                className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-6 text-center">
            {trustSignals.map((signal, index) => (
              <div key={index}>
                <p className="text-base text-gray-600">{signal.label}</p>
                <p className="mt-1 text-2xl font-bold text-blue-600">{signal.value}</p>
              </div>
            ))}
            {/* Extra Trust Block for Reviews */}
            <div>
              <p className="text-base text-gray-600">Top reviews</p>
              <div className="mt-1 flex justify-center text-blue-600">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle2, XCircle } from 'lucide-react';
import bnbLogo from '../assets/images/bnb.png';
import tronLogo from '../assets/images/tron-trx-icon.svg';
import solanaLogo from '../assets/images/solana-sol-icon.svg';
import ethLogo from '../assets/images/ethereum-eth-icon.svg';
import suiLogo from '../assets/images/sui-sui-logo.svg';
import polygonLogo from '../assets/images/polygon-matic-icon.svg';
import btcLogo from '../assets/images/bitcoin-icon.svg';
// --- MOCK DATA ---
// Replace this with your actual data source (e.g., an API call)
const allAssets = [
  { name: 'BNB Smart Chain', ticker: 'BNB', logoUrl: bnbLogo, features: { buy: true, sell: true, swap: true, earn: true, dapps: true } },
  { name: 'TRON', ticker: 'TRX', logoUrl: tronLogo, features: { buy: true, sell: true, swap: true, earn: true, dapps: false } },
  { name: 'Solana', ticker: 'SOL', logoUrl: solanaLogo, features: { buy: true, sell: true, swap: true, earn: true, dapps: false } },
  { name: 'Sui', ticker: 'SUI', logoUrl: suiLogo, features: { buy: true, sell: true, swap: false, earn: true, dapps: false } },
  { name: 'Ethereum', ticker: 'ETH', logoUrl:ethLogo, features: { buy: true, sell: true, swap: true, earn: true, dapps: true } },
  { name: 'Bitcoin', ticker: 'BTC', logoUrl: btcLogo, features: { buy: true, sell: true, swap: true, earn: false, dapps: false } },
  { name: 'Polygon', ticker: 'MATIC', logoUrl:polygonLogo, features: { buy: true, sell: true, swap: true, earn: true, dapps: true } },
  { name: 'Kava', ticker: 'KAVA', logoUrl: polygonLogo, features: { buy: true, sell: false, swap: false, earn: true, dapps: false } },
];

// Helper component for the check/cross icons
const StatusIcon = ({ available }) => {
  if (available) {
    return <CheckCircle2 className="h-6 w-6 text-tajpe-500" />;
  }
  return <XCircle className="h-6 w-6 text-gray-300" />;
};

const Platform = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAssets, setFilteredAssets] = useState([]);

  // Filtering logic
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredAssets(allAssets.slice(0, 5)); // Show first 5 by default
    } else {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filtered = allAssets.filter(asset =>
        asset.name.toLowerCase().includes(lowercasedFilter) ||
        asset.ticker.toLowerCase().includes(lowercasedFilter)
      );
      setFilteredAssets(filtered);
    }
  }, [searchTerm]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <motion.section 
      className="bg-gradient-to-b from-tajpe-500 to-tajpe-950 py-20 sm:py-28"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headlines */}
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            One Platform, Millions of Assets
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-tajpe-100">
            As a leading self-custody multi-chain platform, we support millions of assets across 100+ blockchains. From Bitcoin, Ethereum, and Solana, to Cosmos, Optimism, and much more.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h- w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search a chain..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full bg-white/100 backdrop-blur-sm rounded-full py-5 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none shadow-lg"
            />
          </div>
        </div>

        {/* Assets Table */}
        <div className="mt-8 bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-4 sm:p-6">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-7 gap-2 text-sm font-semibold text-gray-500 pb-4 border-b">
              <div className="col-span-2">Chain</div>
              <div className="text-center">dApps</div>
              <div className="text-center">Buy</div>
              <div className="text-center">Sell</div>
              <div className="text-center">Swap</div>
              <div className="text-center">Earn</div>
            </div>
            
            {/* Table Body */}
            <div>
              <AnimatePresence>
                {filteredAssets.map((asset) => (
                  <motion.div
                    key={asset.ticker}
                    layout
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-7 gap-2 items-center py-4 border-b last:border-b-0"
                  >
                    {/* Chain Name & Logo */}
                    <div className="flex items-center gap-4 col-span-2 md:col-span-2">
                      <img src={asset.logoUrl} alt={`${asset.name} logo`} className="h-8 w-8" />
                      <div>
                        <p className="font-semibold text-gray-900">{asset.name}</p>
                        <p className="text-sm text-gray-500 md:hidden">{asset.ticker}</p>
                      </div>
                    </div>

                                         {/* Feature Icons - Each in its own column */}
                     <div className="hidden md:flex justify-center items-center"><StatusIcon available={asset.features.dapps} /></div>
                     <div className="hidden md:flex justify-center items-center"><StatusIcon available={asset.features.buy} /></div>
                     <div className="hidden md:flex justify-center items-center"><StatusIcon available={asset.features.sell} /></div>
                     <div className="hidden md:flex justify-center items-center"><StatusIcon available={asset.features.swap} /></div>
                     <div className="hidden md:flex justify-center items-center"><StatusIcon available={asset.features.earn} /></div>
                    
                    {/* Mobile Feature Display */}
                    <div className="md:hidden col-span-2 mt-2">
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className={`px-2 py-1 rounded-full ${asset.features.buy ? 'bg-tajpe-100 text-tajpe-800' : 'bg-gray-100 text-gray-500'}`}>
                          Buy {asset.features.buy ? '✓' : '✗'}
                        </span>
                        <span className={`px-2 py-1 rounded-full ${asset.features.sell ? 'bg-tajpe-100 text-tajpe-800' : 'bg-gray-100 text-gray-500'}`}>
                          Sell {asset.features.sell ? '✓' : '✗'}
                        </span>
                        <span className={`px-2 py-1 rounded-full ${asset.features.swap ? 'bg-tajpe-100 text-tajpe-800' : 'bg-gray-100 text-gray-500'}`}>
                          Swap {asset.features.swap ? '✓' : '✗'}
                        </span>
                        <span className={`px-2 py-1 rounded-full ${asset.features.earn ? 'bg-tajpe-100 text-tajpe-800' : 'bg-gray-100 text-gray-500'}`}>
                          Earn {asset.features.earn ? '✓' : '✗'}
                        </span>
                        <span className={`px-2 py-1 rounded-full ${asset.features.dapps ? 'bg-tajpe-100 text-tajpe-800' : 'bg-gray-100 text-gray-500'}`}>
                          dApps {asset.features.dapps ? '✓' : '✗'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-white">
          <div>
            <p className="text-4xl font-bold">10M+ Assets</p>
          </div>
          <div>
            <p className="text-4xl font-bold">600M+ NFTs</p>
          </div>
          <div>
            <p className="text-4xl font-bold">100+ Blockchains</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Platform;
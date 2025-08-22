import React, { useState } from 'react';
import OneInchSwap from './OneInchSwap';

// --- CryptoWatchlist Component ---
const CryptoWatchlist = () => {
    const coins = [
        { name: 'Bitcoin', symbol: 'BTC', price: '$68,432.10', change: '+1.25%', changeType: 'positive', icon: 'fa-brands fa-bitcoin', color: 'text-orange-400' },
        { name: 'Ethereum', symbol: 'ETH', price: '$3,540.50', change: '-0.58%', changeType: 'negative', icon: 'fa-brands fa-ethereum', color: 'text-tajpe-400' },
        { name: 'Solana', symbol: 'SOL', price: '$165.78', change: '+3.41%', changeType: 'positive', icon: 'fa-solid fa-s', color: 'text-tajpe-500' },
        { name: 'BNB', symbol: 'BNB', price: '$590.12', change: '+0.99%', changeType: 'positive', icon: 'fa-solid fa-cube', color: 'text-yellow-400' },
        { name: 'XRP', symbol: 'XRP', price: '$0.52', change: '-1.15%', changeType: 'negative', icon: 'fa-solid fa-x', color: 'text-blue-400' },
        { name: 'Dogecoin', symbol: 'DOGE', price: '$0.15', change: '+5.67%', changeType: 'positive', icon: 'fa-solid fa-dog', color: 'text-amber-400' },
        { name: 'Cardano', symbol: 'ADA', price: '$0.45', change: '-2.03%', changeType: 'negative', icon: 'fa-solid fa-c', color: 'text-sky-400' },
    ];

    return (
        <div className="bg-white p-4 h-full">
            <div className="flex justify-between items-center mb-4">
                 {/* Use Ubuntu for the title to match other components */}
                <h3 className="font-bold text-xl text-gray-800" style={{ fontFamily: 'Ubuntu, sans-serif' }}>Watchlist</h3>
                <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
            </div>
            <ul className="space-y-3">
                {coins.map(coin => (
                    <li key={coin.symbol} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center">
                            <i className={`${coin.icon} ${coin.color} fa-2x w-8 text-center`}></i>
                            <div className="ml-3">
                                <p className="font-bold text-gray-900">{coin.name}</p>
                                <p className="text-sm text-gray-500">{coin.symbol}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-mono text-gray-900 text-sm sm:text-base">{coin.price}</p>
                            <p className={`text-sm font-semibold ${coin.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                                {coin.change}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};


// --- HomePage Component (Now Responsive with updated fonts) ---
const HomePage = () => {
    const [isCopied, setIsCopied] = useState(false);
    const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
    
    const handleCopy = () => {
        const contractAddress = "0xAbCdEfGhIjKlMnOpQrStUvWxYz1234567890";
        navigator.clipboard.writeText(contractAddress);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleBuyClick = () => {
         setIsSwapModalOpen(true); 
    };

    return (
        // Apply Poppins as the base font for the entire page
        <div className="min-h-screen w-full bg-gradient-to-br from-tajpe-50 via-white to-tajpe-100 flex flex-col items-center p-4 pt-28 md:pt-4 overflow-x-hidden" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <main className="flex-grow flex items-center w-full max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    
                    {/* Left Column (Text Content) */}
                    <div className="w-full md:w-1/2 text-center md:text-left animate-fade-in-up">
                        {/* Apply Ubuntu and uppercase for the main headline, consistent with other pages */}
                      <h2 
                        className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-gray-900 leading-tight mb-6" 
                        style={{ fontFamily: '"Ubuntu", serif' }}
                    >
                        Welcome to the Future with <span className="text-transparent bg-clip-text bg-gradient-to-r from-tajpe-950 to-tajpe-500">Tajpe</span>
                    </h2>
                        <p className="text-lg text-gray-600 max-w-xl mb-10 mx-auto md:mx-0">
                            Tajpe is a decentralized ecosystem aiming to revolutionize the way we interact with digital assets. Our project is focused on scalability, security, and user empowerment.
                        </p>

                        {/* Contract Info Box */}
                        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 max-w-md mb-10 border border-gray-200/80 shadow-lg mx-auto md:mx-0">
                            <dl className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <dt className="flex items-center text-gray-600 font-semibold">
                                        <i className="fas fa-id-card w-6 text-tajpe-500"></i>
                                        Token Name
                                    </dt>
                                    <dd className="font-mono text-gray-900 font-bold">Tajpe</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="flex items-center text-gray-600 font-semibold">
                                        <i className="fas fa-tag w-6 text-tajpe-500"></i>
                                        Token Symbol
                                    </dt>
                                    <dd className="font-mono text-gray-900 font-bold">TJE</dd>
                                </div>
                                <div className="flex flex-col">
                                    <dt className="flex items-center text-gray-600 font-semibold mb-2">
                                        <i className="fas fa-file-contract w-6 text-tajpe-500"></i>
                                        Contract Address
                                    </dt>
                                    <dd className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                                        <code className="font-mono text-gray-800 text-sm truncate pr-2">0xAbCdEf...67890</code>
                                        <button onClick={handleCopy} className="text-gray-500 hover:text-tajpe-500 text-lg relative">
                                            {isCopied ? <i className="fas fa-check-circle text-green-500"></i> : <i className="far fa-copy"></i>}
                                            {isCopied && <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2">Copied!</div>}
                                        </button>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        
                        {/* Buy Button */}
                        <button
                            className="bg-gradient-to-r from-tajpe-500 to-tajpe-950 text-white font-bold py-4 px-10 rounded-full text-lg hover:from-tajpe-600 hover:to-tajpe-900 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                            onClick={handleBuyClick}
                        >
                            Buy TJE Token Now
                        </button>
                    </div>

                    {/* Right Column (Phone Mockup) */}
                    <div className="w-full md:w-1/2 flex justify-center animate-float mt-12 md:mt-0">
                        <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
                            <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                            <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                            <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                            <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                            <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white">
                                <div className="h-full overflow-y-auto">
                                    <CryptoWatchlist />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <OneInchSwap show={isSwapModalOpen} onClose={() => setIsSwapModalOpen(false)} />
        </div>
    );
};

export default HomePage;
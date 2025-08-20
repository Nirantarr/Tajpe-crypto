import React, { useContext } from 'react'; 
import { WalletContext } from '../context/WalletContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { walletAddress, connectWallet, disconnectWallet, adminAddress,connectPhantomWallet } = useContext(WalletContext);
  
  const navigate = useNavigate();

  const shorten = (addr) => addr.slice(0, 6) + '...' + addr.slice(-4);

 const isAdmin = walletAddress && walletAddress.toLowerCase() === adminAddress;

  return (
    <nav className="p-4 shadow flex justify-between items-center bg-white">
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
        <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 10v-1m0 0c-1.11 0-2.08-.402-2.599-1M9.401 9a2.001 2.001 0 00-2.599-1M14.599 15a2.001 2.001 0 002.599 1M12 20a8 8 0 100-16 8 8 0 000 16z"></path>
        </svg>
        <h1 className="text-3xl font-bold text-gray-900">Tajpe</h1>
      </div>

      <nav className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-gray-600 hover:text-indigo-600 transition font-medium">About</a>
        <a href="#" className="text-gray-600 hover:text-indigo-600 transition font-medium">Features</a>
        <a href="#" className="text-gray-600 hover:text-indigo-600 transition font-medium">Tokenomics</a>
        <a href="#" className="text-gray-600 hover:text-indigo-600 transition font-medium">Roadmap</a>
      </nav>

      <div className="flex items-center gap-4">
        <button className="hidden md:block bg-white text-indigo-600 px-5 py-2 rounded-lg font-bold hover:bg-gray-200 transition shadow-md">
          Whitepaper
        </button>

                {/* Admin only Mint Coin Button */}
        {isAdmin && (
          <button
            onClick={() => navigate('/admin')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Mint Coin
          </button>
        )}

        {walletAddress ? (
          <div className="flex items-center space-x-2">
            <span className="text-gray-800 font-mono">{shorten(walletAddress)}</span>
            <button
              onClick={disconnectWallet}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Connect Wallet
          </button>
          
        )}
      </div>
    </nav>
  );
};

export default Navbar;

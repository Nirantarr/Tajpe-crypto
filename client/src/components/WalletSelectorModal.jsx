// src/components/WalletSelectorModal.jsx
import React from 'react';
import { X } from 'lucide-react';

// Import the connectors we want to offer
import { metaMask } from '../connectors';
import { walletConnect } from '../connectors';
import walletConnectLogo from '../assets/images/walletconnect.png';

const WalletSelectorModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // This function will handle connecting and closing the modal
  const connectWith = async (connector) => {
    try {
      await connector.activate();
      onClose(); // Close the modal on successful connection
    } catch (e) {
      console.error("Failed to connect with connector", e);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[60]">
      <div className="bg-white rounded-2xl p-6 w-full max-w-xs m-4 relative animate-fade-in-up">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Connect Wallet</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
        </div>
        <div className="space-y-4">
          {/* RENAMED to "Browser Wallet" for clarity */}
          <button onClick={() => connectWith(metaMask)} className="w-full flex items-center justify-start gap-4 text-lg p-4 border rounded-xl hover:bg-gray-100 transition-colors">
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="w-8 h-8"/>
            <span>Browser Wallet</span>
          </button>
          <button onClick={() => connectWith(walletConnect)} className="w-full flex items-center justify-start gap-4 text-lg p-4 border rounded-xl hover:bg-gray-100 transition-colors">
             <img src={walletConnectLogo} alt="WalletConnect" className="w-8 h-8"/>  
                <span>WalletConnect</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletSelectorModal;
// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ethers } from 'ethers';

// // Assuming your context and ABI are in these locations. Adjust paths if necessary.
// import { WalletContext } from '../context/WalletContext';
// import TokenABI from '../abis/NTRToken.json';

// const OwnerPage = () => {
//   // --- STATE AND CONTEXT MANAGEMENT ---
//   const { walletAddress, adminAddress } = useContext(WalletContext);
//   const navigate = useNavigate();

//   // State for authorization and data fetching
//   const [authorized, setAuthorized] = useState(false);
//   const [tokenData, setTokenData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // State for the "Send Tokens" form
//   const [recipientAddress, setRecipientAddress] = useState('');
//   const [transferAmount, setTransferAmount] = useState('');
//   const [transferStatus, setTransferStatus] = useState('');

//   // State for the clipboard copy functionality
//   const [isCopied, setIsCopied] = useState(false);

//   // Your deployed token contract address
//   const tokenAddress = "0x5b8F1d2528EA0cd6B835E2bB843B8Ac28562CEBE";

//   // --- HOOKS FOR AUTHORIZATION AND DATA FETCHING ---

//   // 1. Authorization Effect: Check if the connected user is the admin.
//   useEffect(() => {
//     if (!walletAddress) {
//       // If no wallet is connected yet, wait.
//       return;
//     }

//     if (walletAddress.toLowerCase() !== adminAddress.toLowerCase()) {
//       alert('Access Denied: You are not authorized to view this page!');
//       navigate('/'); // Redirect non-admins to the homepage
//     } else {
//       setAuthorized(true);
//     }
//   }, [walletAddress, adminAddress, navigate]);

//   // 2. Data Fetching Effect: Get token details from the blockchain.
//   useEffect(() => {
//     if (!authorized) return; // Don't fetch data if not authorized

//     const fetchTokenData = async () => {
//       setIsLoading(true);
//       try {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const contract = new ethers.Contract(tokenAddress, TokenABI, provider);

//         const name = await contract.name();
//         const symbol = await contract.symbol();
//         const totalSupply = await contract.totalSupply();

//         setTokenData({
//           name,
//           symbol,
//           totalSupply: ethers.utils.formatUnits(totalSupply, 18),
//         });
//       } catch (err) {
//         console.error('Failed to fetch token data:', err);
//         setTokenData(null); // Clear data on error
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchTokenData();
//   }, [authorized, tokenAddress]); // Re-run if authorization status changes

//   // --- HANDLER FUNCTIONS ---

//   // Handler for the "Send Tokens" functionality
//   const handleTransfer = async (event) => {
//     event.preventDefault();
//     if (!ethers.utils.isAddress(recipientAddress)) {
//       setTransferStatus('❌ Invalid recipient address.');
//       return;
//     }
//     if (parseFloat(transferAmount) <= 0) {
//         setTransferStatus('❌ Transfer amount must be greater than zero.');
//         return;
//     }

//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
//       const contract = new ethers.Contract(tokenAddress, TokenABI, signer);

//       const tx = await contract.transfer(
//         recipientAddress,
//         ethers.utils.parseUnits(transferAmount, 18)
//       );

//       setTransferStatus('Submitting transaction...');
//       await tx.wait();
//       setTransferStatus('✅ Tokens transferred successfully!');
      
//       // Clear fields after success
//       setRecipientAddress('');
//       setTransferAmount('');

//       // Refresh total supply
//       const newTotalSupply = await contract.totalSupply();
//       setTokenData(prevData => ({...prevData, totalSupply: ethers.utils.formatUnits(newTotalSupply, 18)}));

//     } catch (err) {
//       console.error(err);
//       setTransferStatus('❌ Error transferring tokens.');
//     }
//   };
  
//   // Handler for the "Create Token" form (currently for demonstration)
//   const handleCreateToken = (event) => {
//     event.preventDefault();
//     alert("This form is for demonstration. Implement your 'create token' logic here.");
//   }

//   // Handler for copying the contract address to the clipboard
//   const handleCopy = () => {
//     navigator.clipboard.writeText(tokenAddress);
//     setIsCopied(true);
//     setTimeout(() => setIsCopied(false), 2000);
//   };

//   // --- RENDER LOGIC ---

//   // Don't render anything until authorization is confirmed
//   if (!authorized) {
//     return (
//         <div className="min-h-screen flex justify-center items-center">
//             <p className="text-xl font-semibold">Verifying authorization...</p>
//         </div>
//     );
//   }

//   return (
//     <div className="min-h-screen w-full bg-[linear-gradient(to_right_bottom,rgba(240,244,255,1),rgba(254,242,255,1))] font-sans">
//       <div className="min-h-screen w-full flex flex-col items-center p-4">
//         {/* Header */}
//         <header className="w-full max-w-7xl mx-auto flex justify-between items-center p-6">
//           <div className="flex items-center space-x-3">
//             <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 10v-1m0 0c-1.11 0-2.08-.402-2.599-1M9.401 9a2.001 2.001 0 00-2.599-1M14.599 15a2.001 2.001 0 002.599 1M12 20a8 8 0 100-16 8 8 0 000 16z"></path></svg>
//             <h1 className="text-3xl font-bold text-gray-900">Tajpe</h1>
//           </div>
//           <div className="flex items-center space-x-4">
//             <span className="font-semibold text-gray-700">Owner Dashboard</span>
//             <i className="fa-solid fa-user-shield text-indigo-600 text-2xl"></i>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-8">
//           <div className="grid lg:grid-cols-5 gap-8">
//             {/* Left Column: Create Token Form */}
//             <div className="lg:col-span-3 animate-fade-in">
//                 <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-fuchsia-500 rounded-2xl shadow-2xl h-full">
//                     <div className="bg-[#10172A] text-white p-8 rounded-xl h-full flex flex-col">
//                         <h2 className="text-3xl font-bold mb-8 text-white">Create a New Token</h2>
//                         <form onSubmit={handleCreateToken} className="flex-grow">
//                              {/* Form fields remain the same as your design */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                                 <div className="col-span-1">
//                                     <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
//                                     <input type="text" id="name" className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., My New Token"/>
//                                 </div>
//                                 <div className="col-span-1">
//                                     <label htmlFor="symbol" className="block text-sm font-medium text-gray-300 mb-2">Symbol</label>
//                                     <input type="text" id="symbol" className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., MNT"/>
//                                 </div>
//                                 <div>
//                                     <label htmlFor="decimals" className="block text-sm font-medium text-gray-300 mb-2">Decimals</label>
//                                     <input type="number" id="decimals" defaultValue="18" className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
//                                 </div>
//                                 <div className="row-span-2">
//                                     <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">Image</label>
//                                     <div className="flex items-center justify-center w-full h-32 bg-[#1e293b] border-2 border-slate-700 border-dashed rounded-lg cursor-pointer hover:bg-slate-700">
//                                         <div className="text-center"><i className="fas fa-upload text-3xl text-gray-400"></i><p className="mt-2 text-sm text-gray-400">Click to upload</p></div>
//                                         <input type="file" className="opacity-0 absolute"/>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label htmlFor="supply" className="block text-sm font-medium text-gray-300 mb-2">Supply</label>
//                                     <input type="number" id="supply" className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="1000000"/>
//                                 </div>
//                                 <div className="col-span-1 md:col-span-2">
//                                     <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Description</label>
//                                     <textarea id="description" rows="4" className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Describe your token..."></textarea>
//                                 </div>
//                             </div>
//                             <button type="submit" className="w-full mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 px-10 rounded-lg text-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl">Create Token</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
            
//             {/* Right Column: Management Sections */}
//             <div className="lg:col-span-2 space-y-8">
//                 {/* Token Details Section - NOW DYNAMIC */}
//                 <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
//                     <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/80 shadow-lg h-full">
//                         <h2 className="text-2xl font-bold mb-6 text-gray-800">Current Token Details</h2>
//                         {isLoading ? <p>Loading token data...</p> : !tokenData ? <p className="text-red-500">Could not fetch token data.</p> : (
//                             <dl className="space-y-4">
//                                 <div className="flex items-center justify-between"><dt className="flex items-center text-gray-600 font-semibold"><i className="fas fa-id-card w-6 text-indigo-500"></i>Token Name</dt><dd className="font-mono text-gray-900 font-bold">{tokenData.name}</dd></div>
//                                 <div className="flex items-center justify-between"><dt className="flex items-center text-gray-600 font-semibold"><i className="fas fa-tag w-6 text-indigo-500"></i>Token Symbol</dt><dd className="font-mono text-gray-900 font-bold">{tokenData.symbol}</dd></div>
//                                 <div className="flex items-center justify-between"><dt className="flex items-center text-gray-600 font-semibold"><i className="fas fa-cubes w-6 text-indigo-500"></i>Total Supply</dt><dd className="font-mono text-gray-900 font-bold">{parseFloat(tokenData.totalSupply).toLocaleString()}</dd></div>
//                                 <div className="flex flex-col">
//                                     <dt className="flex items-center text-gray-600 font-semibold mb-2"><i className="fas fa-file-contract w-6 text-indigo-500"></i>Contract Address</dt>
//                                     <dd className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
//                                         <code className="font-mono text-gray-800 text-sm truncate pr-2">{tokenAddress}</code>
//                                         <button onClick={handleCopy} className="text-gray-500 hover:text-indigo-600 text-lg relative">
//                                             {isCopied ? <i className="fas fa-check-circle text-green-500"></i> : <i className="far fa-copy"></i>}
//                                         </button>
//                                     </dd>
//                                 </div>
//                             </dl>
//                         )}
//                     </div>
//                 </div>

//                 {/* Send Tokens Section - NOW FUNCTIONAL */}
//                 <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
//                     <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/80 shadow-lg h-full">
//                         <h2 className="text-2xl font-bold mb-6 text-gray-800">Send Tokens</h2>
//                         <form onSubmit={handleTransfer} className="space-y-4">
//                             <div>
//                                 <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">Recipient Address</label>
//                                 <input type="text" id="recipient" value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="0x..."/>
//                             </div>
//                             <div>
//                                 <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
//                                 <input type="number" id="amount" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Number of tokens to send"/>
//                             </div>
//                             <button type="submit" className="w-full mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 px-10 rounded-lg text-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed" disabled={transferStatus === 'Submitting transaction...'}>
//                                 <i className="fa-solid fa-paper-plane mr-2"></i>
//                                 {transferStatus === 'Submitting transaction...' ? 'Sending...' : 'Transfer'}
//                             </button>
//                             {transferStatus && (
//                                 <p className="mt-3 text-sm text-center font-semibold">{transferStatus}</p>
//                             )}
//                         </form>
//                     </div>
//                 </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default OwnerPage;

import React from 'react'

const OwnerPage = () => {
  return (
    <div>OwnerPage</div>
  )
}

export default OwnerPage
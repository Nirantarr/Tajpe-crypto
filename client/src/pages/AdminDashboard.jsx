// import React, { useEffect, useState } from 'react';
// import { useWallet } from '@solana/wallet-adapter-react'; // <-- IMPORT THE CORRECT HOOK
// import { useNavigate } from 'react-router-dom';
// import { Connection, PublicKey, Transaction } from '@solana/web3.js';
// import { getOrCreateAssociatedTokenAccount, createMintToInstruction } from '@solana/spl-token';

// // --- CONFIGURATION ---
// const ADMIN_PUBLIC_KEY = "33bcDwMoLjrmWSPfAsBuBsYHHQgK92KQocVYxMnN54rG"; 
// //
// // !!! IMPORTANT !!! You still have a placeholder here.
// // You MUST replace this with the actual Public Key of your "Tajpe" token.
// const YOUR_TOKEN_MINT_ADDRESS = "YourTajpeTokenMintPublicKeyGoesHere"; 

// const rpcUrl = "https://api.mainnet-beta.solana.com";
// const connection = new Connection(rpcUrl);

// const AdminDashboard = () => {
//     // 1. USE THE NEW HOOK. This is the fix.
//     const { publicKey, connected, signTransaction } = useWallet(); 
//     const navigate = useNavigate();
    
//     const [authorized, setAuthorized] = useState(false);
//     const [mintRecipient, setMintRecipient] = useState('');
//     const [mintAmount, setMintAmount] = useState('');
//     const [status, setStatus] = useState('');
//     const [isMinting, setIsMinting] = useState(false);

//     // 2. Authorization check now uses the correct state variables
//     useEffect(() => {

//         if (!connected  || !publicKey) return; // Wait for connection

//         if (publicKey?.toString() !== ADMIN_PUBLIC_KEY) {
//             alert('Access Denied: You are not authorized to view this page.');
//             navigate('/');
//         } else {
//             setAuthorized(true);
//         }
//     }, [connected, publicKey, navigate]);
    
//     const handleMintTokens = async (e) => {
//         e.preventDefault();
//         // 3. We need signTransaction from the hook for this to work
//         if (!mintRecipient || !mintAmount || !publicKey || !signTransaction) {
//             setStatus("Please connect your wallet and fill in all fields.");
//             return;
//         }

//         setIsMinting(true);
//         setStatus("Processing mint transaction...");

//         try {
//             // Check for placeholder
//             if (YOUR_TOKEN_MINT_ADDRESS === "YourTajpeTokenMintPublicKeyGoesHere") {
//                 throw new Error("You must set YOUR_TOKEN_MINT_ADDRESS in the code.");
//             }

//             const mintPublicKey = new PublicKey(YOUR_TOKEN_MINT_ADDRESS);
//             const recipientPublicKey = new PublicKey(mintRecipient);
//             const amountInSmallestUnit = BigInt(parseFloat(mintAmount) * Math.pow(10, 6));

//             // Payer for creating ATA is the connected admin wallet
//             const payer = { publicKey }; 

//             const recipientAta = await getOrCreateAssociatedTokenAccount(
//                 connection,
//                 payer,
//                 mintPublicKey,
//                 recipientPublicKey
//             );

//             const transaction = new Transaction().add(
//                 createMintToInstruction(
//                     mintPublicKey,
//                     recipientAta.address,
//                     publicKey, // Mint Authority is the connected admin
//                     amountInSmallestUnit
//                 )
//             );
            
//             setStatus("Sending transaction... Please approve in your wallet.");
//             const { blockhash } = await connection.getRecentBlockhash();
//             transaction.recentBlockhash = blockhash;
//             transaction.feePayer = publicKey;

//             const signedTx = await signTransaction(transaction);
//             const txid = await connection.sendRawTransaction(signedTx.serialize());
            
//             await connection.confirmTransaction(txid, 'confirmed');
//             setStatus(`✅ Successfully minted ${mintAmount} tokens.`);
//         } catch (error) {
//             console.error("Minting failed:", error);
//             setStatus(`❌ Minting failed: ${error.message}`);
//         } finally {
//             setIsMinting(false);
//         }
//     };

//     if (!authorized) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-100">
//                 <div className="text-xl font-semibold text-gray-700">Verifying Authorization...</div>
//             </div>
//         );
//     }

//     return (
//         // The JSX for the form remains the same
//        <div className="min-h-screen bg-gray-100 p-6">
//             <header className="mb-8 text-center">
//                 <h1 className="text-4xl font-bold text-gray-800">Tajpe Token Admin Panel</h1>
//                 <p className="text-gray-600 mt-2">Manage your SPL Token.</p>
//             </header>

//             <section className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8">
//                 <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">Mint New Tokens</h2>
//                 <form onSubmit={handleMintTokens}>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipient">
//                             Recipient's Solana Address
//                         </label>
//                         <input
//                             id="recipient"
//                             type="text"
//                             placeholder="e.g., 7i7i...wZ"
//                             value={mintRecipient}
//                             onChange={(e) => setMintRecipient(e.target.value)}
//                             className="w-full p-3 border rounded shadow-inner"
//                             required
//                         />
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
//                             Amount to Mint
//                         </label>
//                         <input
//                             id="amount"
//                             type="number"
//                             placeholder="e.g., 1000"
//                             value={mintAmount}
//                             onChange={(e) => setMintAmount(e.target.value)}
//                             className="w-full p-3 border rounded shadow-inner"
//                             required
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         disabled={isMinting}
//                         className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
//                     >
//                         {isMinting ? 'Minting...' : 'Mint Tokens'}
//                     </button>
//                     {status && (
//                         <p className="mt-4 text-sm text-center font-semibold text-gray-600">{status}</p>
//                     )}
//                 </form>
//             </section>
//         </div>
//     );
// };

// export default AdminDashboard;
import React from 'react'

const AdminDashboard = () => {
  return (
    <div>AdminDashboard</div>
  )
}
export default AdminDashboard;


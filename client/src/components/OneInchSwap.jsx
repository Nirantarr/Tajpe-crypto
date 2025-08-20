// src/components/OneInchSwap.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { hooks } from '../connectors'; 
import { ethers } from 'ethers';
import { X } from 'lucide-react';


const { useAccount, useProvider } = hooks;
// --- Placeholder Token Addresses (Ethereum Mainnet) ---
// Replace with your TJE token address once deployed
const TJE_TOKEN_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'; // Using WETH as a placeholder for TJE
const TJE_TOKEN_SYMBOL = 'WETH';
const TJE_TOKEN_LOGO = 'https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png';

const FROM_TOKENS = [
    { address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', symbol: 'USDC', logo: 'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png', decimals: 6 },
    { address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', symbol: 'USDT', logo: 'https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png', decimals: 6 },
    { address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', symbol: 'DAI', logo: 'https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png', decimals: 18 },
];

const API_BASE_URL = '/api/swap/v6.0/1';// Using Chain ID 1 for Ethereum
const API_KEY = import.meta.env.VITE_1INCH_API_KEY;

const apiHeaders = {
    'Authorization': `Bearer ${API_KEY}`,
    'Accept': 'application/json',
};


const OneInchSwap = ({ show, onClose }) => {
    const account = useAccount();
    const provider = useProvider();

    const [fromToken, setFromToken] = useState(FROM_TOKENS[0]);
    const [fromAmount, setFromAmount] = useState('');
    const [toAmount, setToAmount] = useState('');
    const [quote, setQuote] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [txStatus, setTxStatus] = useState({ step: 'idle', message: '' }); // idle, needs_approval, approving, ready_to_swap, swapping, success

    // --- API Call Functions ---
    const getQuote = async (amount) => {
        if (!amount || isNaN(amount) || amount <= 0) {
            setToAmount('');
            setQuote(null);
            return;
        }
        setIsLoading(true);
        setError('');
         setQuote(null);

        const amountInSmallestUnit = ethers.utils.parseUnits(amount, fromToken.decimals);
        const url = `${API_BASE_URL}/quote?src=${fromToken.address}&dst=${TJE_TOKEN_ADDRESS}&amount=${amountInSmallestUnit.toString()}&preset=max`;

        try {
              const response = await fetch(url, { headers: apiHeaders });
            const data = await response.json();
            
            console.log("1inch Quote Response:", data);
            if (data.error || !data.dstToken) {
                // Throw an error with the description from the API if it exists
                throw new Error(data.description || 'Failed to get a valid quote.');
            }
            setQuote(data);
            setToAmount(ethers.utils.formatUnits(data.dstAmount, data.dstToken.decimals));
        } catch (err) {
            setError(err.message);
            setQuote(null);
            setToAmount('');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSwap = async () => {
        if (!account || !provider || !quote) return;
        
        setIsLoading(true);
        setError('');
        setTxStatus({ step: 'start', message: 'Preparing transaction...' });

        const signer = provider.getSigner();
        const amountInSmallestUnit = ethers.utils.parseUnits(fromAmount, fromToken.decimals).toString();

        try {
            // 1. Check Allowance
            setTxStatus({ step: 'checking_allowance', message: 'Checking token allowance...' });
            const allowanceUrl = `${API_BASE_URL}/approve/allowance?tokenAddress=${fromToken.address}&walletAddress=${account}`;
            const allowanceRes = await fetch(allowanceUrl, { headers: { 'Authorization': `Bearer ${API_KEY}` } });
            const allowanceData = await allowanceRes.json();

            if (ethers.BigNumber.from(allowanceData.allowance).lt(amountInSmallestUnit)) {
                // 2. Approve if necessary
                setTxStatus({ step: 'needs_approval', message: 'Approval required. Please confirm in your wallet.' });
                const approveUrl = `${API_BASE_URL}/approve/transaction?tokenAddress=${fromToken.address}&amount=${amountInSmallestUnit}`;
                const approveRes = await fetch(approveUrl, { headers: { 'Authorization': `Bearer ${API_KEY}` } });
                const approveTxData = await approveRes.json();
                
                const tx = await signer.sendTransaction(approveTxData);
                setTxStatus({ step: 'approving', message: 'Waiting for approval confirmation...' });
                await tx.wait();
            }

            // 3. Perform Swap
            setTxStatus({ step: 'ready_to_swap', message: 'Approval confirmed. Please confirm the swap in your wallet.' });
            const swapUrl = `${API_BASE_URL}/swap?src=${fromToken.address}&dst=${TJE_TOKEN_ADDRESS}&amount=${amountInSmallestUnit}&from=${account}&slippage=1&preset=max`;
            const swapRes = await fetch(swapUrl, { headers: { 'Authorization': `Bearer ${API_KEY}` } });
            const swapTxData = await swapRes.json();
            
            const swapTx = await signer.sendTransaction(swapTxData.tx);
            setTxStatus({ step: 'swapping', message: 'Processing your swap...' });
            const receipt = await swapTx.wait();
            
            setTxStatus({ step: 'success', message: `Swap successful! Tx: ${receipt.transactionHash}` });
            
        } catch (err) {
            setError(err.message);
            setTxStatus({ step: 'idle', message: '' });
        } finally {
            setIsLoading(false);
        }
    };

    // Debounce quote fetching
    useEffect(() => {
        const handler = setTimeout(() => {
            getQuote(fromAmount);
        }, 500); // 500ms delay

        return () => {
            clearTimeout(handler);
        };
    }, [fromAmount, fromToken]);


    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md m-4 relative animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>Buy TJE Token</h2>

                {/* From Input */}
                <div className="bg-gray-100 p-4 rounded-xl mb-4">
                    <label className="text-sm font-medium text-gray-500">You Pay</label>
                    <div className="flex items-center justify-between mt-2">
                        <input
                            type="number"
                            placeholder="0"
                            value={fromAmount}
                            onChange={(e) => setFromAmount(e.target.value)}
                            className="text-3xl font-mono bg-transparent w-full focus:outline-none text-gray-800"
                        />
                        <select
                            value={fromToken.address}
                            onChange={(e) => setFromToken(FROM_TOKENS.find(t => t.address === e.target.value))}
                            className="bg-white p-2 rounded-lg font-semibold border"
                        >
                            {FROM_TOKENS.map(token => (
                                <option key={token.address} value={token.address}>{token.symbol}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* To Output */}
                <div className="bg-gray-100 p-4 rounded-xl mb-6">
                     <label className="text-sm font-medium text-gray-500">You Receive</label>
                    <div className="flex items-center justify-between mt-2">
                        <input
                            type="text"
                            placeholder="0"
                            value={toAmount}
                            disabled
                            className="text-3xl font-mono bg-transparent w-full focus:outline-none text-gray-500"
                        />
                         <div className="bg-white p-2 rounded-lg font-semibold border flex items-center">
                            <img src={TJE_TOKEN_LOGO} alt={TJE_TOKEN_SYMBOL} className="w-6 h-6 mr-2" />
                            {TJE_TOKEN_SYMBOL}
                        </div>
                    </div>
                </div>
                
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {txStatus.message && <p className="text-blue-600 text-sm mb-4">{txStatus.message}</p>}

                <button
                    onClick={handleSwap}
                    disabled={!account || isLoading || !quote || fromAmount <= 0}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-4 px-10 rounded-full text-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Loading...' : 'Buy Token'}
                </button>
            </div>
        </div>
    );
};

export default OneInchSwap;
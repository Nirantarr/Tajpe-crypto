// src/components/OneInchSwap.jsx
import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { X, ArrowDown } from 'lucide-react';
import WalletSelectorModal from './WalletSelectorModal';

// --- Constants ---
const TJE_TOKEN_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'; // WETH as placeholder
const TJE_TOKEN_SYMBOL = 'WETH';
const TJE_TOKEN_LOGO = 'https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png';
const TJE_TOKEN_DECIMALS = 18;

const FROM_TOKENS = [
    { address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', symbol: 'USDC', logo: 'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png', decimals: 6 },
    { address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', symbol: 'USDT', logo: 'https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png', decimals: 6 },
    { address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', symbol: 'DAI', logo: 'https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png', decimals: 18 },
];

const API_BASE_URL = '/api/swap/v6.0/1';
const API_KEY = import.meta.env.VITE_1INCH_API_KEY;

const apiHeaders = {
    'Authorization': `Bearer ${API_KEY}`,
    'Accept': 'application/json',
};

// Minimal ERC20 ABI for balance fetching
const ERC20_ABI = ["function balanceOf(address owner) view returns (uint256)"];

const OneInchSwap = ({ show, onClose }) => {
    // Use generic `useWeb3React` to get active status and account
    const { account, isActive, provider } = useWeb3React();
    
    // State Management
    const [fromToken, setFromToken] = useState(FROM_TOKENS[0]);
    const [fromAmount, setFromAmount] = useState('');
    const [fromTokenBalance, setFromTokenBalance] = useState('0.0');
    const [toAmount, setToAmount] = useState('');
    const [quote, setQuote] = useState(null);
    const [usdPrice, setUsdPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [txStatus, setTxStatus] = useState({ step: 'idle', message: '' });
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

    // --- Data Fetching ---
    useEffect(() => {
        const fetchBalance = async () => {
            if (!account || !provider || !fromToken) return;
            try {
                const tokenContract = new ethers.Contract(fromToken.address, ERC20_ABI, provider);
                const balance = await tokenContract.balanceOf(account);
                setFromTokenBalance(ethers.utils.formatUnits(balance, fromToken.decimals));
            } catch (e) {
                console.error("Failed to fetch balance", e);
                setFromTokenBalance('0.0');
            }
        };
        fetchBalance();
    }, [account, provider, fromToken]);

    const getQuote = async (amount) => {
        if (!amount || isNaN(amount) || amount <= 0) {
            setToAmount(''); setQuote(null); setUsdPrice(0); return;
        }
        setIsLoading(true); setError(''); setQuote(null);
        
        const amountInSmallestUnit = ethers.utils.parseUnits(amount, fromToken.decimals);
        const url = `${API_BASE_URL}/quote?src=${fromToken.address}&dst=${TJE_TOKEN_ADDRESS}&amount=${amountInSmallestUnit.toString()}&preset=max`;

        try {
            const response = await fetch(url, { headers: apiHeaders });
            const data = await response.json();
            if (data.error || !data.dstAmount) throw new Error(data.description || 'Failed to get a valid quote.');
            
            setQuote(data);
            setToAmount(ethers.utils.formatUnits(data.dstAmount, TJE_TOKEN_DECIMALS));

            // Fetch USD price for the "from" token
            const priceUrl = `/api/price/v1.1/1/${fromToken.address}`; // Using proxy
            const priceRes = await fetch(priceUrl, { headers: apiHeaders });
            const priceData = await priceRes.json();
            setUsdPrice(priceData.price || 0);

        } catch (err) {
            setError(err.message); setQuote(null); setToAmount(''); setUsdPrice(0);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => getQuote(fromAmount), 500);
        return () => clearTimeout(handler);
    }, [fromAmount, fromToken]);

    // --- Swap Execution ---
    const handleSwap = async () => {
        // ... (The swap logic from before remains the same)
        if (!account || !provider || !quote) return;
        
        setIsLoading(true);
        setError('');
        setTxStatus({ step: 'start', message: 'Preparing transaction...' });

        const signer = provider.getSigner();
        const amountInSmallestUnit = ethers.utils.parseUnits(fromAmount, fromToken.decimals).toString();

        try {
            setTxStatus({ step: 'checking_allowance', message: 'Checking token allowance...' });
            const allowanceUrl = `${API_BASE_URL}/approve/allowance?tokenAddress=${fromToken.address}&walletAddress=${account}`;
            const allowanceRes = await fetch(allowanceUrl, { headers: apiHeaders });
            const allowanceData = await allowanceRes.json();

            if (ethers.BigNumber.from(allowanceData.allowance).lt(amountInSmallestUnit)) {
                setTxStatus({ step: 'needs_approval', message: 'Approval required. Confirm in your wallet.' });
                const approveUrl = `${API_BASE_URL}/approve/transaction?tokenAddress=${fromToken.address}&amount=${amountInSmallestUnit}`;
                const approveRes = await fetch(approveUrl, { headers: apiHeaders });
                const approveTxData = await approveRes.json();
                
                const tx = await signer.sendTransaction(approveTxData);
                setTxStatus({ step: 'approving', message: 'Waiting for approval...' });
                await tx.wait();
            }

            setTxStatus({ step: 'ready_to_swap', message: 'Ready to swap. Confirm in your wallet.' });
            const swapUrl = `${API_BASE_URL}/swap?src=${fromToken.address}&dst=${TJE_TOKEN_ADDRESS}&amount=${amountInSmallestUnit}&from=${account}&slippage=1&preset=max`;
            const swapRes = await fetch(swapUrl, { headers: apiHeaders });
            const swapTxData = await swapRes.json();
            
            const swapTx = await signer.sendTransaction(swapTxData.tx);
            setTxStatus({ step: 'swapping', message: 'Processing swap...' });
            const receipt = await swapTx.wait();
            
            setTxStatus({ step: 'success', message: `Swap successful!` });
            
        } catch (err) {
            // --- Improved Error Handling ---
            if (err.code === 'ACTION_REJECTED') {
                setError('Transaction rejected in wallet.');
            } else {
                setError('An error occurred. Please try again.');
            }
            console.error(err); // Keep detailed error for developers
            setTxStatus({ step: 'idle', message: '' });
        } finally {
            setIsLoading(false);
        }
    };
    
    // --- UI Values ---
    const fromUsdValue = (parseFloat(fromAmount) * usdPrice).toFixed(2);
    const toUsdValue = (parseFloat(toAmount) * (usdPrice * parseFloat(fromAmount) / parseFloat(toAmount))).toFixed(2); // Estimated
    const exchangeRate = toAmount && fromAmount > 0 ? (parseFloat(toAmount) / parseFloat(fromAmount)).toPrecision(4) : 0;
    const isInsufficientBalance = parseFloat(fromTokenBalance) < parseFloat(fromAmount);

    if (!show) return null;

    // --- RENDER ---
    return (
        <>
            {/* Main Swap Modal */}
            <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity">
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md m-4 relative animate-fade-in-up">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24} /></button>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>Buy TJE Token</h2>

                    {/* From Input */}
                    <div className="bg-gray-100 p-4 rounded-xl mb-1">
                        <div className="flex justify-between text-sm font-medium text-gray-500">
                            <span>You Pay</span>
                            <span>Balance: {parseFloat(fromTokenBalance).toFixed(4)}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <input type="number" placeholder="0" value={fromAmount} onChange={(e) => setFromAmount(e.target.value)} className="text-3xl font-mono bg-transparent w-full focus:outline-none text-gray-800" />
                            <select value={fromToken.address} onChange={(e) => setFromToken(FROM_TOKENS.find(t => t.address === e.target.value))} className="bg-white p-2 rounded-lg font-semibold border">
                                {FROM_TOKENS.map(token => <option key={token.address} value={token.address}>{token.symbol}</option>)}
                            </select>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                            {fromAmount > 0 && `≈ $${fromUsdValue}`}
                        </div>
                    </div>
                    
                    <div className="flex justify-center my-2"><ArrowDown className="text-gray-400" /></div>

                    {/* To Output */}
                    <div className="bg-gray-100 p-4 rounded-xl mb-6">
                        <div className="flex justify-between text-sm font-medium text-gray-500"><span>You Receive</span></div>
                        <div className="flex items-center justify-between mt-2">
                            <input type="text" placeholder="0" value={toAmount ? parseFloat(toAmount).toPrecision(6) : ''} disabled className="text-3xl font-mono bg-transparent w-full focus:outline-none text-gray-500" />
                            <div className="bg-white p-2 rounded-lg font-semibold border flex items-center"><img src={TJE_TOKEN_LOGO} alt={TJE_TOKEN_SYMBOL} className="w-6 h-6 mr-2" />{TJE_TOKEN_SYMBOL}</div>
                        </div>
                         <div className="text-sm text-gray-500 mt-1">
                            {toAmount > 0 && `≈ $${toUsdValue}`}
                        </div>
                    </div>

                    {/* Details Section */}
                    {quote && (
                        <div className="text-sm text-gray-600 space-y-1 mb-4">
                            <div className="flex justify-between">
                                <span>Rate</span>
                                <span>1 {fromToken.symbol} ≈ {exchangeRate} {TJE_TOKEN_SYMBOL}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Router</span>
                                <span>1inch Fusion</span>
                            </div>
                        </div>
                    )}
                    
                    {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                    {txStatus.message && <p className="text-blue-600 text-sm mb-4 text-center">{txStatus.message}</p>}

                    {/* Conditional Button */}
                     {!isActive ? (
                        <button onClick={() => setIsWalletModalOpen(true)} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-full text-lg hover:bg-indigo-700 transition-all">
                            Connect Wallet
                        </button>
                    ) : (
                        <button onClick={handleSwap} disabled={isLoading || !quote || fromAmount <= 0 || isInsufficientBalance} className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-4 rounded-full text-lg transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:from-gray-400 disabled:to-gray-500">
                           {isLoading ? txStatus.message || 'Loading...' : (isInsufficientBalance ? `Insufficient ${fromToken.symbol} Balance` : 'Buy Token')}
                        </button>
                    )}
                </div>
            </div>

            <WalletSelectorModal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />
        </>
    );
};

export default OneInchSwap;
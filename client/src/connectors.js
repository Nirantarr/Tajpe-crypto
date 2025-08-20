// src/connectors.js
import { initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

// Define the chains you want to support
const MAINNET_CHAINS = {
  1: {
    rpcUrl: `https://mainnet.infura.io/v3/YOUR_INFURA_OR_ALCHEMY_ID`, // Recommended to use a dedicated RPC
    name: 'Ethereum Mainnet',
  },
};

export const [metaMask, hooks] = initializeConnector(
  (actions) => new MetaMask({ actions })
);

export const [walletConnect, walletConnectHooks] = initializeConnector(
  (actions) =>
    new WalletConnectV2({
      actions,
      options: {
        projectId,
        chains: [1], // Mainnet
        optionalChains: [1],
        showQrModal: true,
      },
    })
);
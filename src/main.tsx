
import './index.css';
import { StrictMode } from 'react';
// import * as ReactDOM from 'react-dom/client';
// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from "./AuthContext";
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react';


// 1. Your WalletConnect Cloud project ID
const projectId = '99b8bb8de0a44e889b511ffeb2fbf79a';

// 2. Set chains
const mainnet = {
  chainId: 137,
  name: 'Polygon Mainnet',
  currency: 'MATIC',
  explorerUrl: 'https://polygonscan.com',
  rpcUrl: 'https://polygon-rpc.com/'
};

/*const testnet = {
  chainId: 97,
  name: 'BSC Testnet',
  currency: 'BNB',
  explorerUrl: 'https://testnet.bscscan.com',
  rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
};*/

// 3. Create a metadata object
const metadata = {
  name: 'BULL BTC',
  description: 'BULL BTC',
  url: 'https://bullbtc.live', // origin must match your domain & subdomain
  icons: ['./apple-touch-icon.png']
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 56, // Default to BSC mainnet
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet], // Include both mainnet and testnet
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
});

// export default function App() {
//   return <YourApp />
// }
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
  <StrictMode>
    <App />
    </StrictMode>
    </AuthProvider>
)
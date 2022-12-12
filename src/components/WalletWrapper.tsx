import React from 'react';
import {
    EthereumClient,
    modalConnectors,
    walletConnectProvider
  } from '@web3modal/ethereum';
import { createClient, WagmiConfig, configureChains } from 'wagmi';
import {
    arbitrum, arbitrumGoerli, avalanche, avalancheFuji, bsc, bscTestnet, fantom, fantomTestnet, foundry, goerli, hardhat, localhost, mainnet, optimism, optimismGoerli, polygon, polygonMumbai, sepolia
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { Web3Modal } from '@web3modal/react';

if(!process.env.REACT_APP_WALLETCONNECT_PROJECT_ID) {
    throw new Error('Please set the REACT_APP_WALLETCONNECT_PROJECT_ID environment variable');
  }
  
const { chains, provider } = configureChains(
    [mainnet],
    [walletConnectProvider({
        projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID
    }), publicProvider()]
);

const wagmiClient = createClient({
    autoConnect: true,
    provider,
    connectors: modalConnectors({
        appName: 'Biconomy',
        chains,
    })
}); 

const ethereumClient = new EthereumClient(wagmiClient, chains);

type WalletWrapperProps = {
    children: React.ReactNode
};
const WalletWrapper = ({ children }: WalletWrapperProps) => {
    return (
        <>
            <WagmiConfig client={wagmiClient}>
                {children}
            </WagmiConfig>

            <Web3Modal
                projectId={process.env.REACT_APP_WALLETCONNECT_PROJECT_ID}
                ethereumClient={ethereumClient}
            />
        </>
    );
};

export default WalletWrapper;
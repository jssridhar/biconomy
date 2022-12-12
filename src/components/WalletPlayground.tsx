import React, { useCallback, useEffect, useState } from 'react';
import { useAccount, useSendTransaction, usePrepareSendTransaction, useConnect, useDisconnect } from 'wagmi';
import { useWeb3Modal } from "@web3modal/react";
import WalletPlaygroundConnected from './WalletPlaygroundConnected';
import Loader from './Loader';
import Button from './Button';

type WalletPlaygroundProps = {};
const WalletPlayground = (props: WalletPlaygroundProps) => {
    const [provider, setProvider] = useState<any>(null);
    const { isOpen, open, close } = useWeb3Modal();
    const { address, isConnected, connector: activeConnector } = useAccount();
    const { isLoading } = useConnect();

    useEffect(() => {
        (async() => {
            const provider = await activeConnector?.getProvider();
            setProvider(provider);
        })();
    }, [activeConnector]);
    const onConnectWallet = useCallback(() => {
        if(!isOpen) {
            open();
        } else {
            close();
        }
    }, [isOpen, open, close]);

    if (provider) {
        return (
            <WalletPlaygroundConnected provider={provider} setProvider={setProvider}/>
        );
    }

    return (
        <Button type='primary' isLoading={isLoading} onClick={onConnectWallet} text='Login' />
    );        
};

export default WalletPlayground;
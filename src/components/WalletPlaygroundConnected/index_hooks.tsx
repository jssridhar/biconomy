import React, { useCallback, useEffect, useState } from "react";
import Balance from './Balance';
import { BigNumber, ethers } from 'ethers';
import { useAccount, useDisconnect, useNetwork, usePrepareSendTransaction, useSendTransaction } from "wagmi";


type WalletPlaygroundConnectedProps = {
    address: `0x${string}`;
    provider: any;
};

const WalletPlaygroundConnected = ({ address, provider }: WalletPlaygroundConnectedProps) => {

    useEffect(() => {
        (async () => {
            if (provider) {
                const ethersProvider = new ethers.providers.Web3Provider(provider);
                const etheresSigner = ethersProvider.getSigner();
            
                const balance = await etheresSigner.getBalance();
                const chainId = await etheresSigner.getChainId();
    
                console.log(balance.toString(), 'Balance');
                console.log(chainId, 'ChainId');
            }
        })();
    }, [provider]);

    const [showBalance, setShowBalance] = useState<boolean>(false);
    const [showChainId, setShowChainId] = useState<boolean>(false);
    const { connector } = useAccount();
    const { disconnect } = useDisconnect();
    const { chain } = useNetwork();

    const getChainId = useCallback(() => {
        setShowChainId(true);
    }, []);
    const getBalance = useCallback(() => {
        setShowBalance(true);
    }, []);
    const disconnectWallet = useCallback(() => {
        setShowBalance(false);
        setShowChainId(false);
        disconnect();
    }, [disconnect]);

    // const { config } = usePrepareSendTransaction({
    //     request: {
    //         to: address,
    //         chainId: chain?.id,
    //         value: BigNumber.from('1000000000000'),
    //     }
    // });
   
    // const { sendTransaction } = useSendTransaction(config);

    return (
        <div className='appContent'>
            <button className='card' onClick={getChainId}>
                Get Chain ID
            </button>
            <button className='card' onClick={getBalance}>
                Get Balance
            </button>
            <button className='card' onClick={() => {
                // sendTransaction?.();
            }}>
                Send Transaction
            </button>
            {/* {sendTransactionError && 
                <div>{(sendTransactionError as any).reason}</div>
            } */}
            <button className='card' onClick={disconnectWallet}>
                Logout
            </button>
            {showChainId && chain && (
                <div> Chain ID: {chain.id}</div>
            )}
            {showBalance && chain && <Balance address={address} chainId={chain.id}/>}
        </div>
    );
};

export default WalletPlaygroundConnected;
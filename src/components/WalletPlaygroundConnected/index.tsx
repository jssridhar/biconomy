import { Dispatch, useCallback, useEffect, useState } from "react";
import { ethers } from 'ethers';
import { useAccount, useDisconnect, useNetwork, usePrepareSendTransaction, useSendTransaction } from "wagmi";
import Button from "../Button";


type WalletPlaygroundConnectedProps = {
    provider: any;
    setProvider: Dispatch<any>
};

const WalletPlaygroundConnected = ({ provider, setProvider }: WalletPlaygroundConnectedProps) => {
    const [ethersSigner, setEthersSigner] = useState<any>(null);
    
    const [errorMsg, setErrorMsg] = useState<any>(null);
    const [chainId, setChainId] = useState<any>(null);
    const [balance, setBalance] = useState<any>(null);
    const [isBalanceLoading, setIsBalanceLoading] = useState<any>(false);
    const [isChainIdLoading, setIsChainIdLoading] = useState<any>(false);

    const getChainId = () => {
        setIsChainIdLoading(true);
        (async () => {
            try {
                const chainId = await ethersSigner.getChainId();
                setChainId(chainId);
            } catch(e) {
                console.error(e);
                setErrorMsg('Error getting chain id'); // not really sure of the error format here
            } finally {
                setIsChainIdLoading(false);
            }
        })();
    };

    const getBalance = () => {
        setIsBalanceLoading(true);
        (async () => {
            try {
                const balance = await ethersSigner.getBalance();
                setBalance(ethers.utils.formatEther(balance));
            } catch(e) {
                console.error(e);
                setErrorMsg('Error getting balance');
            }
            finally {
                setIsBalanceLoading(false);
            }
        })();
    };

    const sendTransaction = () => {
        (async () => {
            const address = await ethersSigner.getAddress();
            try { 
                const receipt = await ethersSigner.sendTransaction({
                    from: address,
                    to: address,
                    value: ethers.utils.parseEther('0.01'),
                    nonce: await ethersSigner.getTransactionCount('latest'),
                    gasLimit: ethers.utils.hexlify(10000),
                    gasPrice: await ethersSigner.getGasPrice(),
                });
                console.log(receipt);
            } catch (e) {
                console.error(e);
                setErrorMsg((e as any).toString());
            }
        })();
    };

    useEffect(() => {
        (async () => {
            const ethersProvider = new ethers.providers.Web3Provider(provider, 'any');
            const ethersSigner = ethersProvider.getSigner();
            setEthersSigner(ethersSigner);
        })();
    }, [provider]);

    const { disconnect } = useDisconnect();
    const disconnectWallet = useCallback(() => {
        setBalance(null);
        setChainId(null);
        setErrorMsg(null);
        disconnect();
    }, [disconnect]);

    return (
        <div>
            <div className='inline-flex flex-col space-y-4'>
                <Button type='primary' isLoading={isChainIdLoading} onClick={getChainId} text='Get Chain ID' />
                <Button type='primary' isLoading={isBalanceLoading} onClick={getBalance} text='Get Balance' />
                <Button type='primary' onClick={sendTransaction} text='Send Transaction' />
                <Button type='primary' onClick={disconnectWallet} text='Logout' />
            </div>
            <div className="mt-4">
                {errorMsg && <div className='text-red-500'>Error: {errorMsg}</div>}
            </div>
            <div className='mt-8'>
                {chainId && <div>Chain ID: {chainId}</div>}
                {balance && <div>Balance: {balance}</div>}
            </div>
        </div>
    );
};

export default WalletPlaygroundConnected;
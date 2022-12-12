import React from "react";
import { useBalance } from 'wagmi';

type BalanceProps = {
    address: `0x${string}`;
    chainId: number;
};
const Balance = ({ address, chainId }: BalanceProps) => {
    const { data, isError, isLoading } = useBalance({
        address,
        chainId
    });

    if (isLoading) {
        return (
            <div>Fetching balance...</div>
        );
    } else if (isError) {
        return (
            <div>Error fetching balance</div>
        );
    }

    return (
        <div>
            Balance: {data?.formatted} {data?.symbol}
        </div>
    );
};

export default Balance;
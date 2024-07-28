import React from 'react';
import { useAccount, useBalance } from 'wagmi';

// Address of your deployed GameToken contract
const GameTokenAddress = "0x720DD4bE9Ee252a2bD5dab0B049bF323f83073b6";

const GameTokenBalance = () => {
  const { address } = useAccount();
  const { data: balance, isError, isLoading } = useBalance({
    address: address,
    token: GameTokenAddress,
  });

  if (isLoading) return <div>Fetching balance…</div>
  if (isError) return <div>Error fetching balance</div>

  return (
    <div>
      Balance: {balance?.formatted} {balance?.symbol}
    </div>
  );
}

export default GameTokenBalance;
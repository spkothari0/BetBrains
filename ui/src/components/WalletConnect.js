import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
 
// ABI for the GameToken contract (you'll need to replace this with your actual ABI)
const GameTokenABI = [
  // This is a simplified ABI, you'll need to include the full ABI of your GameToken contract
  "function balanceOf(address account) view returns (uint256)"
];
 
// Address of your deployed GameToken contract (replace with your actual address)
const GameTokenAddress = "0x720DD4bE9Ee252a2bD5dab0B049bF323f83073b6";
 
const WalletConnect = () => {
  const [account, setAccount] = useState(null);
  const [gtkBalance, setGtkBalance] = useState(null);
 
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
 
        // Get GTK balance
        const gameTokenContract = new ethers.Contract(GameTokenAddress, GameTokenABI, provider);
        const balance = await gameTokenContract.balanceOf(address);
        setGtkBalance(ethers.utils.formatUnits(balance, 18)); // Assuming 18 decimals
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      console.log('Please install MetaMask!');
    }
  };
 
  return (
<div>
      {account ? (
<div>
<p>Connected Account: {account}</p>
<p>GTK Balance: {gtkBalance} GTK</p>
</div>
      ) : (
<button onClick={connectWallet}>Connect Wallet</button>
      )}
</div>
  );
};
 
export default WalletConnect;
import React from 'react';
import Wallet from '../components/Wallet'; // Adjust this import according to where your Wallet component is located
import NavBar from '../components/NavBar';
import { Box } from '@mui/material';
const WalletPage: React.FC = () => {
  return <>
    <NavBar />
    <Box mt={2}> {/* Adjust the value as needed */}
        <Wallet />
    </Box>
    </>;
};

export default WalletPage;
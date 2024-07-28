import React from 'react';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/system';

interface HeroBannerProps {
  imageUrl: string;
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const HeroBanner: React.FC<HeroBannerProps> = ({ imageUrl }) => {
  return (
    <Paper 
      sx={{ 
        width: '100%', 
        height: '700px', 
        backgroundImage: `url(${imageUrl})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' ,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }} 
      elevation={3}
    >
        <Box sx={{ color: '#ffffff', textAlign: 'center', animation: `${fadeIn} 2s` }}>
            <Typography variant="h2" component="div">
            Unlock your potential
            </Typography>
            <Typography variant="h5" component="div">
            Earn tokens, solve challenges, and compete with the best!
            </Typography>
        </Box>
    </Paper>
  );
};

export default HeroBanner;
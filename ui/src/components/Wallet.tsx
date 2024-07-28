import React,{ useState } from 'react';
import { Grid, Box, Button } from '@mui/material';
import Nav from './Nav';
const HamburgerMenu=['User Details','Wallet'];

const Wallet: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleButtonClick = (menu: any) => {
    setSelectedItem(menu);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4} sx={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' }}>
          <Box sx={{ height: 'calc(100vh - 64px)', backgroundColor: '#f5f5f5' }}>
            {/* Content for the 30% width section goes here */}
            {/* iterate Hamburger menu and show in vertical manner with clickable buttons
             */}
            {HamburgerMenu.map((menu, index) => (
              <Box key={index} sx={{ padding: 2, borderBottom: '1px solid #e0e0e0' }}>
                <Button onClick={() => handleButtonClick(menu)} sx={{
                  width: '100%', textTransform: 'none', justifyContent: 'flex-start',
                  color: selectedItem === menu ? '#000000' : '#9e9e9e',
                  fontWeight: selectedItem === menu ? 'bold' : 'normal'
                }}>
                  {menu}
                </Button>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ height: 'calc(100vh - 64px)', backgroundColor: '#ffffff' }}>
            {/* Content for the 70% width section goes here */}
            <Box sx={{ padding: 2 }}>
              <h1>
                {
                  selectedItem === 'Wallet' ? 
                    <Box sx={{display:"flex", flexDirection:'column', alignItems:'center'}}>
                      <Box sx={{fontSize: '20px', fontWeight: 'bold'}}>Wallet</Box>
                      <Box sx={{fontSize: '16px', fontWeight: 'bold'}}><Nav></Nav></Box>
                    </Box>               
                  : 
                  <Box sx={{display:"flex", flexDirection:'column', alignItems:'center'}}>
                    <Box sx={{fontSize: '20px', fontWeight: 'bold'}}>User Details</Box>
                    <Box sx={{fontSize: '16px'}}>Name: John Doe</Box>
                    <Box sx={{fontSize: '16px'}}>Email: john.doe@example.com</Box>
                  </Box>
                }
              </h1>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Wallet;

import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import NavBar from '../components/NavBar';
import HeroBanner from '../components/HeroBanner';
import Footer  from '../components/footer';
import CssBaseline from '@mui/material/CssBaseline' 
const Home: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <CssBaseline />
      <NavBar />
      <HeroBanner imageUrl="/images/banner1.jpg" />
      <Game />
      <Footer />
    </>
  );
};

export default Home;
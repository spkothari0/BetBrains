import type { NextPage } from 'next';
import NavBar from '../components/NavBar';
import HeroBanner from '../components/HeroBanner';
import { footer } from '../components/footer';
const Home: NextPage = () => {
  return (
    <>
      <NavBar />
      <HeroBanner imageUrl="/images/banner1.jpg" />
      {footer()}
    </>
  );
};

export default Home;
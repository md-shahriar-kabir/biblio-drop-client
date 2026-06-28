import FeaturedBooks from '@/components/home/FeaturedBooks';
import HeroSlider from '@/components/home/HeroSlider';
import PopularCategories from '@/components/home/PopularCategories';
import TopProviders from '@/components/home/TopProviders';
import React from 'react';
import BiblioEcosystem from '@/components/home/BiblioEcosystem';
import JoinProvider from '@/components/home/JoinProvider';

const Home = () => {

  
  return (
    <div>
      <HeroSlider/>
      <FeaturedBooks/>
      <TopProviders/>
      <PopularCategories/>
      <BiblioEcosystem/>
      <JoinProvider/>
    </div>
  );
};

export default Home;

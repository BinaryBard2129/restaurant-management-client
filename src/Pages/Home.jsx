import React from 'react';
import Banner from './Banner';
import TopFoods from './TopFood';
import Delivery from './delivery';
import WhyChooseUs from './WhyChooseUs';
import Footer from './Footer';
import Reviews from './Reviews';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <TopFoods></TopFoods>
           <Delivery></Delivery>
           <h1 className='text-4xl font-bold text-center mt-8'>Why Choose us?</h1>
           <WhyChooseUs></WhyChooseUs>
           <Reviews></Reviews>
           <Footer></Footer>
        </div>
    );
};

export default Home;
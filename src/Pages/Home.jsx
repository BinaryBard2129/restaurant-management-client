import React from 'react';
import Banner from './Banner';
import TopFoods from './TopFood';
import Delivery from './delivery';
import WhyChooseUs from './WhyChooseUs';
import Footer from './Footer';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <TopFoods></TopFoods>
           <Delivery></Delivery>
           <h1 className='text-4xl font-bold text-center mt-8'>Why Choose us?</h1>
           <WhyChooseUs></WhyChooseUs>
           <Footer></Footer>
        </div>
    );
};

export default Home;
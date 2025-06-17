import React from 'react';
import Lottie from 'lottie-react';
import eatImg from '../assets/lotties/eat.json.json'

const WhyChooseUs = () => {
  return (
    <section className="max-w-6xl mt-3 mx-auto px-6 py-12 bg-white rounded-lg shadow-lg flex flex-col-reverse md:flex-row items-center gap-10">
       
      
      <div className="md:w-1/2 max-w-md">
        <Lottie 
          animationData={eatImg} 
          loop={true} 
          autoplay={true} 
          style={{ width: '100%', height: 'auto' }} 
        />
      </div>

     
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl font-bold text-green-700 mb-4">Why Choose Us?</h2>
        <ul className="space-y-3 text-lg text-gray-700">
          <li>✅ Fresh & Hygienic Ingredients</li>
          <li>✅ Fast and Safe Home Delivery</li>
          <li>✅ Friendly Support and Easy Ordering</li>
          <li>✅ Wide Variety of Dishes from Different Cultures</li>
          <li>✅ Affordable Prices & Great Discounts</li>
        </ul>
      </div>
    </section>
  );
};

export default WhyChooseUs;

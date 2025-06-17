import React from 'react';
import Lottie from 'lottie-react';
import deliveryAnimation from '../assets/lotties/delivery.json';

const Delivery = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 bg-yellow-50 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-12">
      
      {/* Text Content */}
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-4xl font-extrabold text-yellow-700 mb-6">
          We Have Food Home Delivery Option as Well
        </h2>
        <p className="text-yellow-900 leading-relaxed text-xl max-w-xl mx-auto md:mx-0">
          Enjoy your favorite dishes delivered fresh and hot right at your doorstep. Fast, reliable, and contactless delivery available for your convenience and safety.
        </p>
      </div>
      
      {/* Animation */}
      <div className="md:w-1/2 max-w-lg">
        <Lottie 
          animationData={deliveryAnimation} 
          loop 
          autoplay 
          style={{ width: '100%', height: 'auto' }} 
        />
      </div>
    </section>
  );
};

export default Delivery;

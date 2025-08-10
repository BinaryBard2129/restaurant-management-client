import React from "react";
import Lottie from "lottie-react";
import deliveryAnimation from "../assets/lotties/delivery.json";

const Delivery = () => {
  return (
    <section
      className="
        max-w-7xl rounded-3xl mx-auto  px-4 py-12
        bg-red-600  shadow-2xl 
        flex flex-col md:flex-row items-center gap-12
        animate-fadeIn
      "
      aria-label="Food home delivery information with animation"
    >
      {/* Text content */}
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 drop-shadow-md">
          We Have Food Home Delivery Option as Well
        </h2>
        <p className="text-white leading-relaxed text-lg sm:text-xl max-w-xl mx-auto md:mx-0 tracking-wide">
          Enjoy your favorite dishes delivered fresh and hot right at your doorstep. Fast, reliable, and contactless delivery available for your convenience and safety.
        </p>
      </div>

      {/* Animation */}
      <div className="md:w-1/2 max-w-lg shadow-lg rounded-2xl overflow-hidden bg-white p-6">
        <Lottie
          animationData={deliveryAnimation}
          loop
          autoplay
          style={{ width: "100%", height: "auto" }}
          aria-label="Delivery animation"
        />
      </div>

      {/* Add fade-in animation CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }
      `}</style>
    </section>
  );
};

export default Delivery;

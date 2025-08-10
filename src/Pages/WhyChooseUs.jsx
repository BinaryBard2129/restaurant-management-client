import React from "react";
import Lottie from "lottie-react";
import { FaCheckCircle } from "react-icons/fa";
import eatImg from "../assets/lotties/eat.json";

const WhyChooseUs = () => {
  return (
    <section
      className="max-w-7xl mt-8 mx-auto px-8 py-16 bg-red-600 rounded-3xl shadow-xl flex flex-col-reverse md:flex-row items-center gap-12 overflow-hidden"
      aria-label="Reasons to choose our restaurant"
    >
      {/* Animation */}
      <div className="md:w-1/2 max-w-md animate-fadeInLeft">
        <Lottie
          animationData={eatImg}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "auto" }}
          aria-label="Eating animation"
        />
      </div>

      {/* Text Content */}
      <div className="md:w-1/2 text-center md:text-left animate-fadeInRight">
        <h2 className="text-4xl font-extrabold text-white mb-6 drop-shadow-md">
          Why Choose Us?
        </h2>
        <ul className="space-y-5 text-lg text-white">
          {[
            "Fresh & Hygienic Ingredients",
            "Fast and Safe Home Delivery",
            "Friendly Support and Easy Ordering",
            "Wide Variety of Dishes from Different Cultures",
            "Affordable Prices & Great Discounts",
          ].map((item, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600 text-xl flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Animations CSS */}
      <style jsx>{`
        @keyframes fadeInLeft {
          0% {
            opacity: 0;
            transform: translateX(-30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInRight {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeInLeft {
          animation: fadeInLeft 0.7s ease forwards;
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.7s ease forwards;
          animation-delay: 0.2s;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;

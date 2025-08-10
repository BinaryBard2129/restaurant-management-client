import { Link } from "react-router";

const Banner = () => {
  return (
    <section
      className="relative h-[80vh] mt-5 mx-auto rounded-2xl bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.75)), url('https://i.postimg.cc/QxNst0LF/download-6-scaled-920x518.webp')`,
      }}
      aria-label="Welcome banner with restaurant image"
    >
      {/* Overlay for a subtle shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl px-6 text-center">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg animate-fadeInUp">
          Welcome to Our Restaurant
        </h1>
        <p className="mt-4 text-white text-lg sm:text-xl font-light drop-shadow-md animate-fadeInUp delay-150">
          Delicious food, cozy ambiance, unforgettable experience.
        </p>
        <Link to="/allFoods">
          <button
            className="mt-8 px-8 py-3 bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-400 focus:ring-opacity-50 text-white font-semibold rounded-3xl shadow-lg transition duration-300 ease-in-out animate-fadeInUp delay-300"
            aria-label="Order now button"
          >
            Order Now
          </button>
        </Link>
      </div>

      {/* Custom animations using Tailwind CSS plugin or add these in your global styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.7s ease forwards;
        }
        .delay-150 {
          animation-delay: 0.15s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </section>
  );
};

export default Banner;

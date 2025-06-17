import { Link } from "react-router";

const Banner = () => {
  return (
    <section
      className="h-[80vh] bg-center max-w-7xl mx-auto rounded-2xl bg-cover relative flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://i.postimg.cc/QxNst0LF/download-6-scaled-920x518.webp')`,
      }}
    >
      <div className="text-center text-white px-4">
        <h1 className="text-4xl lg:text-6xl font-bold">Welcome to Our Restaurant</h1>
        <p className="mt-4 text-lg lg:text-xl">
          Delicious food, cozy ambiance, unforgettable experience.
        </p>
        <Link to='/allFoods'>
        <button className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-2xl shadow-md transition duration-300">
          Order Now
        </button>
        </Link>
      </div>
    </section>
  );
};

export default Banner;

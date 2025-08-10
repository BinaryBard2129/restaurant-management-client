import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const TopFoods = () => {
  const [topFoods, setTopFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://restaurants-management-server.vercel.app/foods")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => b.purchaseCount - a.purchaseCount);
        setTopFoods(sorted.slice(0, 6));
      })
      .catch((err) => console.error(err));
  }, []);

  // Utility: truncate text to max length with ellipsis
  const truncate = (text, maxLength = 100) =>
    text?.length > maxLength ? text.slice(0, maxLength) + "…" : text;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-900">
        Top Selling Foods
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {topFoods.map((food) => (
          <div
            key={food._id}
            className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            style={{ height: "430px" }} // fixed height for uniformity
          >
            <div className="h-48 w-full overflow-hidden rounded-t-xl">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col flex-grow p-5">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3 truncate">
                {food.name}
              </h3>

              <p className="text-gray-600 flex-grow">
                {food.description
                  ? truncate(food.description, 120)
                  : "A delicious dish made with fresh ingredients, crafted to satisfy your cravings."}
              </p>

              <div className="mt-5 flex flex-col gap-2">
                <p className="text-lg font-medium text-red-600">
                  Price: ${food.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  Purchased: {food.purchaseCount} times
                </p>

                <button
                  onClick={() => navigate(`/singleFood/${food._id}`)}
                  className="mt-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-300"
                  aria-label={`See more details about ${food.name}`}
                >
                  See More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => navigate("/allFoods")}
          className="inline-block px-8 py-3 border-2 border-red-600 text-red-600 font-semibold rounded-full hover:bg-red-600 hover:text-white transition-colors duration-300"
          aria-label="See all foods"
        >
          See All Foods
        </button>
      </div>
    </section>
  );
};

export default TopFoods;

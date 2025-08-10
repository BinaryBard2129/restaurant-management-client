import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://restaurants-management-server.vercel.app/foods")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setFilteredFoods(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredFoods(foods);
      return;
    }
    const filtered = foods.filter((food) =>
      (food.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFoods(filtered);
  }, [searchTerm, foods]);

  // Utility to truncate text
  const truncate = (text, maxLength = 110) =>
    text?.length > maxLength ? text.slice(0, maxLength) + "…" : text;

  if (loading) return <p className="text-center mt-10">Loading foods...</p>;

  return (
    <div className="max-w-7xl px-4 py-8  mx-auto">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-900">
        All Foods
      </h2>

      <div className="mb-8 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search foods by name..."
          className="input input-bordered w-full rounded-lg border-gray-300 focus:border-red-600 focus:ring-red-300 focus:ring-2 transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search foods by name"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <div
              key={food._id}
              onClick={() => navigate(`/foods/${food._id}`)}
              className="flex flex-col bg-white rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition-shadow duration-300"
              style={{ height: "430px" }} // uniform height
              role="group"
              tabIndex={0}
              aria-label={`Food item: ${food.name}, price $${food.price.toFixed(
                2
              )}`}
              onKeyPress={(e) => {
                if (e.key === "Enter") navigate(`/foods/${food._id}`);
              }}
            >
              <div className="h-48 w-full overflow-hidden rounded-t-xl">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col flex-grow p-5">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3 truncate">
                  {food.name}
                </h3>
                <p className="text-gray-600 flex-grow">
                  {truncate(food.description)}
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  <p className="text-lg font-medium text-red-600">
                    Price: ${food.price.toFixed(2)}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/singleFood/${food._id}`);
                    }}
                    className="mt-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-300"
                    aria-label={`See more details about ${food.name}`}
                    type="button"
                  >
                    See More
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No foods found.</p>
        )}
      </div>
    </div>
  );
};

export default AllFoods;

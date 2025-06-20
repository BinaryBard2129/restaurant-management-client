import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://restaurants-management-server.vercel.app/foods')
      .then(res => res.json())
      .then(data => {
        setFoods(data);
        setFilteredFoods(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  
  useEffect(() => {
  if (!searchTerm) {
    setFilteredFoods(foods);
    return;
  }
  const filtered = foods.filter(food =>
    (food.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredFoods(filtered);
}, [searchTerm, foods]);


  if (loading) return <p className="text-center mt-10">Loading foods...</p>;

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center">All Foods</h2>

     
      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search foods by name..."
          className="input input-bordered w-full"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredFoods.length > 0 ? (
          filteredFoods.map(food => (
            <div
              key={food._id}
              className="cursor-pointer rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white"
              onClick={() => navigate(`/foods/${food._id}`)}
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{food.name}</h3>
                <p className="text-yellow-600 font-bold mb-1">${food.price.toFixed(2)}</p>
                <p className="text-gray-700 text-sm mb-4 truncate">{food.description}</p>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    navigate(`/singleFood/${food._id}`);
                  }}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md font-semibold transition"
                >
                  Details
                </button>
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

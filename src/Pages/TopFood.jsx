import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const TopFoods = () => {
  const [topFoods, setTopFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://restaurants-management-server.vercel.app/foods')
      .then(res => res.json())
      .then(data => {
       
        const sorted = data.sort((a, b) => b.purchaseCount - a.purchaseCount);
        setTopFoods(sorted.slice(0, 6));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Top Selling Foods</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topFoods.map(food => (
          <div key={food._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{food.name}</h3>
              <p className="text-gray-700 mb-1">Price: ${food.price.toFixed(2)}</p>
              <p className="text-gray-600 mb-3">Purchased: {food.purchaseCount} times</p>
              <button
                onClick={() => navigate(`/singleFood/${food._id}`)}
                className="btn btn-primary w-full"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => navigate('/allFoods')}
          className="btn btn-outline"
        >
          See All Foods
        </button>
      </div>
    </section>
  );
};

export default TopFoods;

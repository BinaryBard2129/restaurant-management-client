import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const SingleFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://restaurants-management-server.vercel.app/foods/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Food not found');
        return res.json();
      })
      .then(data => {
        setFood(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-16 text-lg font-medium text-gray-600">
        Loading food details...
      </p>
    );
  if (error)
    return (
      <p className="text-center mt-16 text-red-500 font-semibold">{error}</p>
    );
  if (!food) return null;

  const handlePurchase = () => {
    navigate(`/purchase/${id}`);
  };

  return (
    <div className="max-w-5xl  mx-auto p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-gray-300"
        aria-label="Go back"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="md:w-1/2 h-72 md:h-auto overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              {food.name}
            </h1>
            <p className="text-yellow-600 font-bold text-2xl mb-6">
              ${food.price.toFixed(2)}
            </p>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              {food.description}
            </p>
            <p className="mb-2 text-gray-600">
              <span className="font-semibold">Category:</span> {food.category}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Purchases:</span>{' '}
              {food.purchases ?? 0}
            </p>
          </div>

          <button
            onClick={handlePurchase}
            className="mt-8 w-full py-4 rounded-2xl bg-red-600 text-white text-lg font-semibold shadow-lg hover:bg-red-700 transition focus:outline-none focus:ring-4 focus:ring-red-300"
            aria-label={`Purchase ${food.name}`}
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleFood;

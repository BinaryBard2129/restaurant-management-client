import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';

const SingleFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/foods/${id}`)
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

  if (loading) return <p className="text-center mt-10">Loading food details...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!food) return null;

  const handlePurchase = () => {
    
    navigate(`/purchase/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        &larr; Back
      </button>

      <div className="flex flex-col md:flex-row gap-8 bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="w-full md:w-1/2 h-64 object-cover"
        />
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{food.name}</h1>
            <p className="text-yellow-600 font-semibold text-xl mb-2">${food.price.toFixed(2)}</p>
            <p className="text-gray-700 mb-4">{food.description}</p>
            <p><strong>Category:</strong> {food.category}</p>
            <p><strong>Purchases:</strong> {food.purchases ?? 0}</p>
          </div>
           <button
            onClick={handlePurchase}
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Purchase
          </button>
        
        </div>
      </div>
    </div>
  );
};

export default SingleFood;

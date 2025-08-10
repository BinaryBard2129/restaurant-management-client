import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyFoods = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetch(`https://restaurants-management-server.vercel.app/my-foods?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setFoods(data);
        setLoading(false);
      });
  }, [user, navigate]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete this food?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://restaurants-management-server.vercel.app/foods/${id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Your food has been deleted.', 'success');
              setFoods(prev => prev.filter(food => food._id !== id));
            }
          });
      }
    });
  };

  if (loading) 
    return <p className="text-center mt-20 text-lg font-medium text-gray-600">Loading your foods...</p>;

  return (
    <div className="max-w-7xl mt-30 mx-auto p-6 bg-white rounded-3xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-red-600">My Foods</h2>

      {foods.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">No food items added yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-300">
          <table className="w-full text-left table-auto border-collapse">
            <thead className="bg-red-50 border-b border-red-200">
              <tr>
                <th className="py-3 px-5 text-red-700 font-semibold uppercase tracking-wide">Name</th>
                <th className="py-3 px-5 text-red-700 font-semibold uppercase tracking-wide">Category</th>
                <th className="py-3 px-5 text-red-700 font-semibold uppercase tracking-wide">Status</th>
                <th className="py-3 px-5 text-red-700 font-semibold uppercase tracking-wide">Price</th>
                <th className="py-3 px-5 text-red-700 font-semibold uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map(food => (
                <tr
                  key={food._id}
                  className="border-b border-gray-200 hover:bg-red-50 transition-colors duration-200"
                >
                  <td className="py-4 px-5 font-medium text-gray-800">{food.name}</td>
                  <td className="py-4 px-5 text-gray-600">{food.category}</td>
                  <td className={`py-4 px-5 font-semibold ${food.status === 'available' ? 'text-green-600' : 'text-red-600'}`}>
                    {food.status.charAt(0).toUpperCase() + food.status.slice(1)}
                  </td>
                  <td className="py-4 px-5 text-gray-700">${food.price.toFixed(2)}</td>
                  <td className="py-4 px-5 space-x-3">
                    <button
                      onClick={() => navigate(`/updateFood/${food._id}`)}
                      className="btn btn-sm bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg px-4 py-1 transition"
                      aria-label={`Update ${food.name}`}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="btn btn-sm bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-4 py-1 transition"
                      aria-label={`Delete ${food.name}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFoods;

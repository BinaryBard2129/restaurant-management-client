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

  if (loading) return <p>Loading your foods...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Foods</h2>
      {foods.length === 0 ? (
        <p>No food items added yet.</p>
      ) : (
        <table className="table w-full border">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map(food => (
              <tr key={food._id}>
                <td>{food.name}</td>
                <td>{food.category}</td>
                <td>{food.status}</td>
                <td>${food.price}</td>
                <td className="space-x-2">
                  <button onClick={() => navigate(`/updateFood/${food._id}`)} className="btn btn-sm btn-warning">Update</button>
                  <button onClick={() => handleDelete(food._id)} className="btn btn-sm btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyFoods;

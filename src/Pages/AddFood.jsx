import React, { useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router';

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const foodData = {
      name: form.name.value,
      category: form.category.value,
      price: parseFloat(form.price.value),
      image: form.image.value,
      description: form.description.value,
      status: form.status.value,
      userEmail: user?.email || '',
      userName: user?.displayName || '',
      purchaseCount: 0,
    };

    fetch('http://localhost:5000/foods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(foodData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          Swal.fire('Success!', 'Food item added!', 'success');
          form.reset();
        }
      });
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl mb-4 text-center">Add New Food</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" type="text" placeholder="Food Name" required className="input input-bordered w-full" />
        <input name="category" type="text" placeholder="Category" required className="input input-bordered w-full" />
        <input name="price" type="number" placeholder="Price" required className="input input-bordered w-full" />
        <input name="image" type="text" placeholder="Image URL" required className="input input-bordered w-full" />
        <textarea name="description" placeholder="Description" required className="textarea textarea-bordered w-full"></textarea>
        <select name="status" required className="select select-bordered w-full">
          <option value="">Select Status</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
        <button type="submit" className="btn btn-primary w-full">Add Food</button>
      </form>
    </div>
  );
};

export default AddFood;

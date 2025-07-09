import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthProvider";
import { useNavigate, useParams } from "react-router";

const UpdateFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [food, setFood] = useState(null);

  // Fetch existing food data by ID
  useEffect(() => {
    fetch(`http://localhost:5000/foods/${id}`)
      .then((res) => res.json())
      .then((data) => setFood(data))
      .catch((error) => {
        console.error("Error fetching food:", error);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedFood = {
      name: form.name.value,
      category: form.category.value,
      price: parseFloat(form.price.value),
      image: form.image.value,
      description: form.description.value,
      status: form.status.value,
    };

    fetch(`http://localhost:5000/foods/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFood),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0 || data.acknowledged) {
          Swal.fire("Success!", "Food item updated successfully.", "success").then(() => {
            navigate("/myFood");
          });
        } else {
          Swal.fire("Info", "No changes were made.", "info");
        }
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update food item", "error");
      });
  };

  if (!food) return <p className="text-center mt-10">Loading food data...</p>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Update Food</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          name="name"
          type="text"
          defaultValue={food.name}
          placeholder="Food Name"
          required
          className="input input-bordered w-full"
        />
        <input
          name="category"
          type="text"
          defaultValue={food.category}
          placeholder="Category"
          required
          className="input input-bordered w-full"
        />
        <input
          name="price"
          type="number"
          step="0.01"
          defaultValue={food.price}
          placeholder="Price"
          required
          className="input input-bordered w-full"
        />
        <input
          name="image"
          type="text"
          defaultValue={food.image}
          placeholder="Image URL"
          required
          className="input input-bordered w-full"
        />
        <textarea
          name="description"
          defaultValue={food.description}
          placeholder="Description"
          required
          className="textarea textarea-bordered w-full"
        />
        <select
          name="status"
          defaultValue={food.status}
          required
          className="select select-bordered w-full"
        >
          <option value="">Select Status</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
        <button type="submit" className="btn btn-primary w-full">
          Update Food
        </button>
      </form>
    </div>
  );
};

export default UpdateFood;

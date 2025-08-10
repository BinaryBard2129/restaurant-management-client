import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthProvider";
import { useNavigate, useParams } from "react-router";

const UpdateFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [food, setFood] = useState(null);

  useEffect(() => {
    fetch(`https://restaurants-management-server.vercel.app/foods/${id}`)
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

    fetch(`https://restaurants-management-server.vercel.app/foods/${id}`, {
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

  if (!food)
    return (
      <p className="text-center mt-20 text-lg font-medium text-gray-600">
        Loading food data...
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-3xl shadow-lg border border-gray-200 mt-14">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-red-600">
        Update Food
      </h2>
      <form onSubmit={handleUpdate} className="space-y-6">
        <input
          name="name"
          type="text"
          defaultValue={food.name}
          placeholder="Food Name"
          required
          className="input input-bordered w-full text-lg focus:ring-2 focus:ring-red-400 rounded-xl border-gray-300 transition"
        />
        <input
          name="category"
          type="text"
          defaultValue={food.category}
          placeholder="Category"
          required
          className="input input-bordered w-full text-lg focus:ring-2 focus:ring-red-400 rounded-xl border-gray-300 transition"
        />
        <input
          name="price"
          type="number"
          step="0.01"
          defaultValue={food.price}
          placeholder="Price"
          required
          className="input input-bordered w-full text-lg focus:ring-2 focus:ring-red-400 rounded-xl border-gray-300 transition"
        />
        <input
          name="image"
          type="text"
          defaultValue={food.image}
          placeholder="Image URL"
          required
          className="input input-bordered w-full text-lg focus:ring-2 focus:ring-red-400 rounded-xl border-gray-300 transition"
        />
        <textarea
          name="description"
          defaultValue={food.description}
          placeholder="Description"
          required
          rows={5}
          className="textarea textarea-bordered w-full text-lg focus:ring-2 focus:ring-red-400 rounded-xl border-gray-300 transition resize-none"
        />
        <select
          name="status"
          defaultValue={food.status}
          required
          className="select select-bordered w-full text-lg focus:ring-2 focus:ring-red-400 rounded-xl border-gray-300 transition"
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg transition duration-300"
        >
          Update Food
        </button>
      </form>
    </div>
  );
};

export default UpdateFood;

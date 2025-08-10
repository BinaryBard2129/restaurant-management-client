import React, { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const foodData = {
      name: form.name.value.trim(),
      category: form.category.value.trim(),
      price: parseFloat(form.price.value),
      image: form.image.value.trim(),
      description: form.description.value.trim(),
      status: form.status.value,
      userEmail: user?.email || "",
      userName: user?.displayName || "",
      purchaseCount: 0,
    };

    fetch("https://restaurants-management-server.vercel.app/foods", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(foodData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Food item added successfully!",
            timer: 2000,
            showConfirmButton: false,
          });
          form.reset();
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again.",
        });
      });
  };

  return (
    <div className="max-w-xl mt-14 mx-auto p-8 bg-white rounded-3xl shadow-lg border border-gray-200">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-red-600">
        Add New Food
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="name"
          type="text"
          placeholder="Food Name"
          required
          className="input input-bordered w-full rounded-xl border-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-300 transition"
        />
        <input
          name="category"
          type="text"
          placeholder="Category"
          required
          className="input input-bordered w-full rounded-xl border-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-300 transition"
        />
        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          placeholder="Price"
          required
          className="input input-bordered w-full rounded-xl border-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-300 transition"
        />
        <input
          name="image"
          type="url"
          placeholder="Image URL"
          required
          className="input input-bordered w-full rounded-xl border-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-300 transition"
        />
        <textarea
          name="description"
          placeholder="Description"
          required
          rows={5}
          className="textarea textarea-bordered w-full rounded-xl border-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-300 transition resize-none"
        ></textarea>
        <select
          name="status"
          required
          className="select select-bordered w-full rounded-xl border-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-300 transition"
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
        <button
          type="submit"
          className="btn bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-2xl shadow-lg transition-colors duration-300 w-full"
        >
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddFood;

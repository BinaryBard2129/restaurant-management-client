import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthProvider";
import { useNavigate, useParams } from "react-router";

const Purchase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetch(`https://restaurants-management-server.vercel.app/foods/${id}`)
      .then((res) => res.json())
      .then((data) => setFood(data));
  }, [id, user, navigate]);

  const handlePurchase = (e) => {
    e.preventDefault();

    const orderData = {
      foodId: food._id,
      foodName: food.name,
      userEmail: user?.email,
      userName: user?.displayName,
      quantity: parseInt(quantity),
      address,
    };

    fetch("https://restaurants-management-server.vercel.app/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire("Success!", "Your order was placed.", "success");
        } else {
          Swal.fire("Error", data.message || "Something went wrong", "error");
        }
      });
  };

  if (!food)
    return (
      <p className="text-center mt-20 text-lg font-medium text-gray-600">
        Loading...
      </p>
    );

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-3xl shadow-lg border border-gray-200 pt-24">
      <h2 className="text-3xl font-extrabold mb-8 text-red-600 text-center">
        Purchase: {food.name}
      </h2>
      <form onSubmit={handlePurchase} className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            User Name
          </label>
          <input
            type="text"
            value={user?.displayName || ""}
            disabled
            className="input input-bordered w-full text-lg rounded-xl border-gray-300 focus:ring-2 focus:ring-red-400 transition"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Food Name
          </label>
          <input
            type="text"
            value={food.name}
            disabled
            className="input input-bordered w-full text-lg rounded-xl border-gray-300 focus:ring-2 focus:ring-red-400 transition"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="input input-bordered w-full text-lg rounded-xl border-gray-300 focus:ring-2 focus:ring-red-400 transition"
            min="1"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Delivery Address
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="textarea textarea-bordered w-full text-lg rounded-xl border-gray-300 focus:ring-2 focus:ring-red-400 transition resize-none"
            rows={4}
            placeholder="Enter your delivery address"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg transition duration-300"
        >
          Confirm Purchase
        </button>
      </form>
    </div>
  );
};

export default Purchase;

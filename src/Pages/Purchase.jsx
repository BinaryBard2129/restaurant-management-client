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

    fetch(`http://localhost:5000/foods/${id}`)
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

    fetch("http://localhost:5000/orders", {
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

  if (!food) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Purchase: {food.name}</h2>
      <form onSubmit={handlePurchase} className="space-y-4">
        <div>
          <label className="block font-medium">User Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            disabled
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Food Name</label>
          <input
            type="text"
            value={food.name}
            disabled
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="input input-bordered w-full"
            min="1"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Delivery Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Confirm Purchase
        </button>
      </form>
    </div>
  );
};

export default Purchase;

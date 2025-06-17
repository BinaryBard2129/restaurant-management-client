import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import moment from "moment";
import Swal from "sweetalert2";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/orders?userEmail=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch orders:", error);
        setLoading(false);
      });
  }, [user]);

  
  const handleDelete = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/orders/${orderId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire("Deleted!", "Your order has been deleted.", "success");
              setOrders((prev) => prev.filter((order) => String(order._id) !== String(orderId)));
            } else {
              Swal.fire("Error", data.message || "Failed to delete", "error");
            }
          })
          .catch(() => {
            Swal.fire("Error", "Failed to delete order", "error");
          });
      }
    });
  };

  if (loading) return <p>Loading your orders...</p>;

  if (orders.length === 0)
    return <p className="text-center mt-10">No orders found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col md:flex-row items-center md:items-start border p-4 rounded shadow"
          >
            {/* Food Image */}
            {order.foodImage && (
              <img
                src={order.foodImage}
                alt={order.foodName}
                className="w-24 h-24 object-cover rounded mr-4"
              />
            )}

            <div className="flex-grow">
              <h3 className="text-xl font-semibold">{order.foodName}</h3>
              <p>Quantity: {order.quantity}</p>
              <p>Price: ${order.price || "N/A"}</p>
              <p>Ordered by: {order.userName || user.displayName}</p>
              <p>Delivery Address: {order.address}</p>
              <p>
                Ordered on:{" "}
                {moment(order.createdAt || order.orderDate).format(
                  "MMMM Do YYYY, h:mm A"
                )}
              </p>
            </div>
            <button
              onClick={() => handleDelete(order._id)}
              className="btn btn-error mt-4 md:mt-0 md:ml-4"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;

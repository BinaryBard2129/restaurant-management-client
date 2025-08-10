import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import moment from "moment";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://restaurants-management-server.vercel.app/orders?userEmail=${user.email}`)
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
        fetch(`https://restaurants-management-server.vercel.app/orders/${orderId}`, {
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

  if (loading)
    return <p className="text-center mt-20 text-lg font-medium text-gray-600">Loading your orders...</p>;

  if (orders.length === 0)
    return <p className="text-center mt-20 text-xl font-semibold text-gray-500">No orders found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-red-600">My Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col md:flex-row items-center md:items-start bg-white rounded-2xl shadow-lg border border-gray-200 p-5 hover:shadow-2xl transition-shadow duration-300"
            style={{ minHeight: "140px" }}
          >
            {order.foodImage && (
              <img
                src={order.foodImage}
                alt={order.foodName}
                className="w-28 h-28 object-cover rounded-xl md:mr-6 mb-4 md:mb-0 flex-shrink-0"
                loading="lazy"
              />
            )}
            <div className="flex-grow text-gray-800">
              <h3 className="text-2xl font-semibold mb-1">{order.foodName}</h3>
              <p className="text-gray-600 mb-0">
                <span className="font-medium">Quantity:</span> {order.quantity}
              </p>
              <p className="text-gray-600 mb-0">
                <span className="font-medium">Price:</span> ${order.price || "N/A"}
              </p>
              <p className="text-gray-600 mb-0">
                <span className="font-medium">Ordered by:</span> {order.userName || user.displayName}
              </p>
              <p className="text-gray-600 mb-0">
                <span className="font-medium">Delivery Address:</span> {order.address}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Ordered on:{" "}
                {moment(order.createdAt || order.orderDate).format("MMMM Do YYYY, h:mm A")}
              </p>
            </div>
            <button
              onClick={() => handleDelete(order._id)}
              className="btn btn-error mt-5 md:mt-0 md:ml-6 px-6 py-2 rounded-2xl font-semibold shadow-md hover:shadow-lg transition"
              aria-label={`Delete order for ${order.foodName}`}
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

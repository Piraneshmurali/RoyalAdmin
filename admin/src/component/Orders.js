import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [editOrder, setEditOrder] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleEditOrder = (order) => {
    setEditOrder(order);
    setUpdatedDetails(order);
  };

  const handleUpdateOrder = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/orders/${editOrder._id}`,
        updatedDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setOrders(
        orders.map((order) =>
          order._id === editOrder._id ? { ...response.data } : order
        )
      );
      setEditOrder(null);
      setUpdatedDetails({});
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-rose-100 to-rose-200 min-h-screen">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Orders List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-rose-500 text-white uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Customer Name</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-left">Message</th>
              <th className="py-3 px-6 text-left">Occasion</th>
              <th className="py-3 px-6 text-left">Cake Name</th>
              <th className="py-3 px-6 text-left">Cake Price</th>
              <th className="py-3 px-6 text-left">Cake Photo</th>
              <th className="py-3 px-6 text-left">Toppings</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-gray-300 hover:bg-rose-50">
                <td className="py-3 px-6 text-left">{order.customerName}</td>
                <td className="py-3 px-6 text-left">{order.customerPhone}</td>
                <td className="py-3 px-6 text-left">{order.address}</td>
                <td className="py-3 px-6 text-left">{order.message}</td>
                <td className="py-3 px-6 text-left">{order.occasion}</td>
                <td className="py-3 px-6 text-left">{order.cakeId?.name || "No Cake Name"}</td>
                <td className="py-3 px-6 text-left">Rs {order.cakeId?.price || "N/A"}</td>
                <td className="py-3 px-6 text-left">
                  {order.cakeId?.photo ? (
                    <img
                      src={order.cakeId.photo}
                      alt={order.cakeId.name}
                      className="w-16 h-16 object-cover rounded-full border-2 border-rose-400"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="py-3 px-6 text-left">{order.toppings?.join(", ") || "No Toppings"}</td>
                <td className="py-3 px-6 text-left">{order.status}</td>
                <td className="py-3 px-6 text-center space-x-2">
                  <button
                    onClick={() => handleEditOrder(order)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition transform hover:scale-105"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition transform hover:scale-105"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Editing Order */}
      {editOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4 text-rose-600">Edit Order</h3>
            <label className="block mb-2">
              Customer Name:
              <input
                type="text"
                value={updatedDetails.customerName || ""}
                onChange={(e) =>
                  setUpdatedDetails({ ...updatedDetails, customerName: e.target.value })
                }
                className="w-full border border-rose-300 rounded-full p-2 focus:ring-2 focus:ring-rose-500"
              />
            </label>
            <label className="block mb-2">
              Phone:
              <input
                type="text"
                value={updatedDetails.customerPhone || ""}
                onChange={(e) =>
                  setUpdatedDetails({ ...updatedDetails, customerPhone: e.target.value })
                }
                className="w-full border border-rose-300 rounded-full p-2 focus:ring-2 focus:ring-rose-500"
              />
            </label>
            <label className="block mb-2">
              Address:
              <input
                type="text"
                value={updatedDetails.address || ""}
                onChange={(e) =>
                  setUpdatedDetails({ ...updatedDetails, address: e.target.value })
                }
                className="w-full border border-rose-300 rounded-full p-2 focus:ring-2 focus:ring-rose-500"
              />
            </label>
            <label className="block mb-2">
              Status:
              <select
                value={updatedDetails.status || ""}
                onChange={(e) =>
                  setUpdatedDetails({ ...updatedDetails, status: e.target.value })
                }
                className="w-full border border-rose-300 rounded-full p-2 focus:ring-2 focus:ring-rose-500"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setEditOrder(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateOrder}
                className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;

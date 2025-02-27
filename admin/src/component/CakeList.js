import React, { useState, useEffect } from "react";
import axios from "axios";

const CakeList = () => {
  const [cakes, setCakes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCake, setSelectedCake] = useState(null);
  const [updatedCake, setUpdatedCake] = useState({
    name: "",
    description: "",
    price: "",
    photo: null, // Changed to null for file uploads
  });

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/customer/cakes", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCakes(response.data);
      } catch (error) {
        console.error("Error fetching cakes", error);
      }
    };

    fetchCakes();
  }, []);

  const handleEditClick = (cake) => {
    setIsEditing(true);
    setSelectedCake(cake);
    setUpdatedCake({
      name: cake.name,
      description: cake.description,
      price: cake.price,
      photo: null, // File upload will be handled separately
    });
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/cakes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCakes(cakes.filter((cake) => cake._id !== id));
    } catch (error) {
      console.error("Error deleting cake", error);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", updatedCake.name);
      formData.append("description", updatedCake.description);
      formData.append("price", updatedCake.price);
      if (updatedCake.photo) {
        formData.append("photo", updatedCake.photo);
      }

      const response = await axios.put(
        `http://localhost:5000/api/admin/cakes/${selectedCake._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setCakes(cakes.map((cake) => (cake._id === selectedCake._id ? response.data : cake)));
      closeModal();
    } catch (error) {
      console.error("Error updating cake", error);
    }
  };

  const closeModal = () => {
    setIsEditing(false);
    setSelectedCake(null);
    setUpdatedCake({
      name: "",
      description: "",
      price: "",
      photo: null,
    });
  };

  return (
    <div className="p-6 bg-pink-50 rounded-lg shadow-md max-w-6xl mx-auto my-8">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">Cake Menu</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-pink-100">
          <tr>
            <th className="px-4 py-3 border-b text-gray-800 font-semibold">Name</th>
            <th className="px-4 py-3 border-b text-gray-800 font-semibold">Description</th>
            <th className="px-4 py-3 border-b text-gray-800 font-semibold">Price</th>
            <th className="px-4 py-3 border-b text-gray-800 font-semibold">Photo</th>
            <th className="px-4 py-3 border-b text-gray-800 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cakes.map((cake) => (
            <tr key={cake._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{cake.name}</td>
              <td className="px-4 py-2 border-b">{cake.description}</td>
              <td className="px-4 py-2 border-b">Rs {cake.price}</td>
              <td className="px-4 py-2 border-b">
                <img
                  src={cake.photo ? cake.photo : "default-image.jpg"}
                  alt={cake.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2 border-b space-x-2">
                <button
                  onClick={() => handleEditClick(cake)}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(cake._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold text-purple-600 mb-4">Update Cake</h3>
            <form onSubmit={handleUpdateSubmit}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={updatedCake.name}
                onChange={(e) => setUpdatedCake({ ...updatedCake, name: e.target.value })}
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                value={updatedCake.description}
                onChange={(e) => setUpdatedCake({ ...updatedCake, description: e.target.value })}
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                value={updatedCake.price}
                onChange={(e) => setUpdatedCake({ ...updatedCake, price: e.target.value })}
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload New Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setUpdatedCake({ ...updatedCake, photo: e.target.files[0] })}
                className="w-full p-2 border rounded mb-4"
              />
              <button
                type="submit"
                className="w-full py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
              >
                Update Cake
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CakeList;

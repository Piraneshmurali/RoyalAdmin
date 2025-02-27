import React, { useState } from "react";
import axios from "axios";

const AddCake = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState(null); // Change photo state to hold file
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !photo) {
      setMessage("All fields are required.");
      return;
    }

    const formData = new FormData(); // Use FormData to handle file upload
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("photo", photo); // Append the photo file

    try {
      const response = await axios.post(
        "https://royalbakeryjaffna.com:5000/api/admin/cakes", 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important to set this for file uploads
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage(response.data.message || "Cake added successfully!");
      setName("");
      setDescription("");
      setPrice("");
      setPhoto(null); // Reset photo input
    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding cake.");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-12 p-8 bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Add New Cake</h1>
      {message && (
        <div
          className={`mb-6 p-4 rounded-md text-center ${
            message.includes("successfully")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter cake name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter cake description"
            rows="4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter cake price"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo</label>
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])} // Handle file change
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition duration-200"
        >
          Add Cake
        </button>
      </form>
    </div>
  );
};

export default AddCake;

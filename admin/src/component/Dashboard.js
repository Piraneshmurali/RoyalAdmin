import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-gradient-to-r from-indigo-100 to-indigo-300 rounded-lg shadow-xl">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Link
          to="/add-cake"
          className="bg-indigo-600 text-white py-4 px-8 rounded-xl text-center font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          Add Cake
        </Link>
        <Link
          to="/cakes"
          className="bg-indigo-600 text-white py-4 px-8 rounded-xl text-center font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          View Cakes
        </Link>
        <Link
          to="/orders"
          className="bg-indigo-600 text-white py-4 px-8 rounded-xl text-center font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          View Orders
        </Link>
        <Link
          to="/blogs"
          className="bg-indigo-600 text-white py-4 px-8 rounded-xl text-center font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          Add Blogs
        </Link>
        <Link
          to="/blogsview"
          className="bg-indigo-600 text-white py-4 px-8 rounded-xl text-center font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          Blogs View
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

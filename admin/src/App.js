import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/AdminLogin"; // Ensure correct path to your Login component
import Dashboard from "./component/Dashboard";
import CakeList from "./component/CakeList";
import AddCake from "./component/AddCake";
import Orders from "./component/Orders";
import Blogs from "./component/BlogForm";
import Blogsview from "./component/Blogview";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login by default */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cakes" element={<CakeList />} />
        <Route path="/add-cake" element={<AddCake />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogsview" element={<Blogsview />} />


      </Routes>
    </Router>
  );
};

export default App;

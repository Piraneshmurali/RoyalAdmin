import React, { useState } from "react";
import axios from "axios";

const CreateBlogPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("photo", image); // Use "photo" as the field name

    try {
      await axios.post("http://localhost:5000/api/blogs/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Blog post created successfully!");
      setTitle("");
      setContent("");
      setImage(null);
    } catch (error) {
      console.error("Error creating blog post:", error);
      setMessage("Failed to create blog post.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Create a New Blog Post
      </h2>

      {message && (
        <p className="text-center text-lg font-medium text-green-600 bg-green-100 p-2 rounded-lg">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Upload Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Create Blog Post
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPost;

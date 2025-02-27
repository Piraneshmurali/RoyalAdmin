import { useEffect, useState } from "react";
import axios from "axios";

const AdminBlogView = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "", image: null });

  useEffect(() => {
    axios.get("https://royalbakeryjaffna.com:5000/api/blogs")
      .then(response => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("Failed to fetch blogs");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`https://royalbakeryjaffna.com:5000/api/blogs/${id}`);
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (error) {
      alert("Failed to delete blog");
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({ title: blog.title, content: blog.content, image: null });
  };

  const handleUpdate = async () => {
    if (!editingBlog) return;
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      if (formData.image) formDataToSend.append("photo", formData.image);

      await axios.put(`https://royalbakeryjaffna.com:5000/api/blogs/${editingBlog._id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      const updatedBlogs = blogs.map(blog => 
        blog._id === editingBlog._id ? { ...blog, title: formData.title, content: formData.content, imageUrl: formData.image ? URL.createObjectURL(formData.image) : blog.imageUrl } : blog
      );
      
      setBlogs(updatedBlogs);
      setEditingBlog(null);
      setFormData({ title: "", content: "", image: null });
      alert("Blog updated successfully");
    } catch (error) {
      alert("Failed to update blog");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-yellow-200 via-yellow-100 to-white">
      <h1 className="text-3xl font-bold text-center text-brown-800 mb-6">Admin Blog Management</h1>
      {editingBlog && (
        <div className="mb-6 p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold text-brown-800 mb-4">Edit Blog</h2>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 border rounded-md mb-4 text-lg"
            placeholder="Title"
          />
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full p-3 border rounded-md mb-4 text-lg"
            placeholder="Content"
          ></textarea>
          <input 
            type="file" 
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            className="w-full p-3 border rounded-md mb-4 text-lg"
          />
          <button 
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-400 text-lg"
            onClick={handleUpdate}
          >Save Changes</button>
        </div>
      )}
      {loading ? (
        <p className="text-center text-xl text-gray-600">Loading blogs...</p>
      ) : error ? (
        <p className="text-center text-xl text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <div key={blog._id} className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
              <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h2 className="text-2xl font-semibold text-brown-800">{blog.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{blog.content.substring(0, 100)}...</p>
              <div className="flex justify-between mt-4">
                <button 
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-400"
                  onClick={() => handleEdit(blog)}
                >Edit</button>
                <button 
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400"
                  onClick={() => handleDelete(blog._id)}
                >Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlogView;

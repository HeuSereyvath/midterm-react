import React, { useState, useEffect } from "react";
import axios from "axios";

const PostList = ({ onEdit }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://midterm-json-server.vercel.app/animal")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://midterm-json-server.vercel.app/animal/${id}`)
      .then(() => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      })
      .catch((error) => console.error("Error deleting post:", error));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Animal Posts</h2>
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex gap-4 bg-white shadow-md rounded-xl overflow-hidden mb-6 border"
        >
          <img
            src={post.photo}
            alt={post.name}
            className="w-40 h-40 object-cover"
          />
          <div className="flex flex-col justify-between p-4 flex-1">
            <div>
              <h4 className="text-xl font-bold mb-2">{post.name}</h4>
              <p className="text-gray-600 mb-4">{post.country}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => onEdit(post)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;

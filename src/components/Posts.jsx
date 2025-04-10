import React, { useState, useEffect } from "react";
import axios from "axios";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  // Fetch posts from JSON Server
  useEffect(() => {
    axios
      .get("https://midterm-json-server.vercel.app/animal")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);
  // Add a new post
  const addPost = (e) => {
    e.preventDefault();
    axios
      .post("https://midterm-json-server.vercel.app/animal", { title, body })
      .then((response) => {
        setPosts([...posts, response.data]); // Add new post to state
        setTitle("");
        setBody("");
      })
      .catch((error) => console.error("Error adding post:", error));
  };
  return (
    <div>
      <h1>React Posts App</h1>
      {/* Add Post Form */}
      <form onSubmit={addPost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>
        <button type="submit">Add Post</button>
      </form>
      {/* Display Posts */}
      <h2>Posts</h2>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};
export default Posts;

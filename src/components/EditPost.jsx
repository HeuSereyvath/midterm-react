import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
const EditPost = ({ selectedPost, onUpdate }) => {
  const [name, setName] = useState(selectedPost?.name || "");
  const [photo, setPhoto] = useState(selectedPost?.photo || "");
  const [country, setCountry] = useState(selectedPost?.country || "");
  const fileInputRef = useRef(null);
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setName(selectedPost?.name || "");
    setPhoto(selectedPost?.photo || "");
    setCountry(selectedPost?.country || "");
  }, [selectedPost]);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://midterm-json-server.vercel.app/animal/${selectedPost.id}`, {
        name,
        photo,
        country,
      })
      .then((response) => {
        onUpdate(response.data);
      })
      .catch((error) => console.error("Error updating post:", error));
  };
  return selectedPost ? (
    <form onSubmit={handleSubmit}>
      <h2>Edit Post</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      <input
        type="text"
        value={country}
        placeholder="Country"
        onChange={(e) => setCountry(e.target.value)}
        required
      />
      <button type="submit">Add Post</button>
    </form>
  ) : null;
};
export default EditPost;

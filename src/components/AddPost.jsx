import React, { useRef, useState } from "react";
import axios from "axios";

const AddPost = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(""); 
  const [country, setCountry] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://midterm-json-server.vercel.app/animal", {
        name,
        photo,
        country,
      })
      .then((response) => {
        onAdd(response.data);
        setName("");
        setPhoto("");
        setCountry("");
        if (fileInputRef.current) {
          fileInputRef.current.value = null; // Clear file input
        }
      })
      .catch((error) => console.error("Error adding post:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Post</h2>
      <input
        type="text"
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        required
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
  );
};

export default AddPost;

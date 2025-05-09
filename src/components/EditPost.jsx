import {
  Button,
  FileInput,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const EditPost = ({ selectedPost, onUpdate, setIsEdit, openModal, onCloseModal }) => {
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
        setIsEdit(true);
        onCloseModal(); // Optionally close modal after save
      })
      .catch((error) => console.error("Error updating post:", error));
  };

  return selectedPost ? (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <ModalHeader />
      <ModalBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Animal</h3>

          <div>
            <Label>Name</Label>
            <TextInput
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Country</Label>
            <TextInput
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="file-upload">Upload file</Label>
            <FileInput
              id="file-upload"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>

          <div className="w-full flex justify-end">
            <Button type="submit">Update</Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  ) : null;
};

export default EditPost;
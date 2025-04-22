import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
  FileInput,
  Label,
} from "flowbite-react";
import React, { useState, useRef } from "react";
import axios from "axios";

function AddNewModal({ openModal, onCloseModal, onAdd }) {
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

  const handleSubmit = async () => {
    if (!name || !country || !photo) return;

    try {
      const response = await axios.post("https://midterm-json-server.vercel.app/animal", {
        name,
        photo,
        country,
      });

      onAdd(response.data); // trigger parent to update list

      // Reset form
      setName("");
      setCountry("");
      setPhoto("");
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }

      // Close modal
      onCloseModal();
    } catch (error) {
      console.error("Error adding animal:", error);
    }
  };

  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <ModalHeader />
      <ModalBody>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add New Animal</h3>

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
              required
            />
          </div>

          {photo && (
            <img
              src={photo}
              alt="Preview"
              className="h-32 w-full object-contain rounded-md shadow"
            />
          )}

          <div className="w-full flex justify-end">
            <Button onClick={handleSubmit}>Post</Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default AddNewModal;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Modal, ModalBody, ModalHeader } from "flowbite-react";

const PostList = ({ onEdit, isAddNew, isEdit }) => {
  const [posts, setPosts] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    axios
      .get("https://midterm-json-server.vercel.app/animal")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, [isAddNew, isEdit]);

  const confirmDelete = (id) => {
    setPostToDelete(id);
    setShowConfirmModal(true);
  };

  const handleDelete = () => {
    if (!postToDelete) return;

    axios
      .delete(`https://midterm-json-server.vercel.app/animal/${postToDelete}`)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== postToDelete));
        setPostToDelete(null);
        setShowConfirmModal(false);
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
        setShowConfirmModal(false);
      });
  };

  return (
    <div>
      <div className="m-8">
        <h2>Animal List</h2>
      </div>
      <div className="grid xl:grid-cols-6 lg:grid-cols-3 sm:grid-cols-1 gap-5 mx-20">
        {posts.map((post) => (
          <Card key={post.id}>
            <div className="w-full h-[300px] overflow-hidden">
              <img src={post.photo} alt="" className="w-full h-full object-cover" />
            </div>
            <h4>Name : {post.name}</h4>
            <p>Country : {post.country}</p>
            <Button onClick={() => onEdit(post)}>Edit</Button>
            <Button color="red" onClick={() => confirmDelete(post.id)}>Delete</Button>
          </Card>
        ))}
      </div>

      {/* Confirm Delete Modal */}
      <Modal show={showConfirmModal} onClose={() => setShowConfirmModal(false)} size="md" popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowConfirmModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default PostList;

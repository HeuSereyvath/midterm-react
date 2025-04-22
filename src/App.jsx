import { useState } from "react";
import PostList from "./components/PostList";
import EditPost from "./components/EditPost";
import { Button, Navbar, NavbarBrand } from "flowbite-react";
import AddNewModal from "./components/AddNewModal";

function App() {
  const [isEdit, setIsEdit] = useState(false);
  const [isAddNew, setIsAddNew] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAddPost = (newPost) => {
    setPosts([...posts, newPost]); // Correct way to update state
    setIsAddNew(true);
  };

  const handleUpdatePost = (updatedPost) => {
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
    setSelectedPost(null);
    setIsEdit(true);
  };

  const onCloseAddModal = () => setIsAddModalOpen(false);
  const onCloseEditModal = () => setIsEditModalOpen(false);

  const handleEditClick = (post) => {
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };

  return (
    <div>
      <Navbar fluid rounded>
        <NavbarBrand href="#">
          <img src="https://d2zp5xs5cp8zlg.cloudfront.net/image-79322-340.jpg" className="mr-3 h-6 sm:h-9 rounded-4xl" alt="Flowbite React Logo"  />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Animal</span>
        </NavbarBrand>
        <div className="flex md:order-2">
          <Button onClick={() => setIsAddModalOpen(true)}>Add New Animal</Button>
        </div>
      </Navbar>

      <AddNewModal
        openModal={isAddModalOpen}
        onCloseModal={onCloseAddModal}
        onAdd={handleAddPost}
        setIsAddNew={setIsAddNew}
      />

      <EditPost
        selectedPost={selectedPost}
        onUpdate={handleUpdatePost}
        setIsEdit={setIsEdit}
        openModal={isEditModalOpen}
        onCloseModal={onCloseEditModal}
      />

      <PostList onEdit={handleEditClick} isAddNew={isAddNew} isEdit={isEdit} />
    </div>
  );
}

export default App;

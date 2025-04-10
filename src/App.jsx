import { useState } from "react";
import Posts from "./components/Posts";
import PostList from "./components/PostList";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";
import "./App.css";
function App() {
  const [isEdit, setIsEdit] = useState(false);
  const [isAddNew, setIsAddNew] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const handleAddPost = (newPost) => {
    setPosts([...posts, newPost]); // Add new post to state
    setIsAddNew(newPost);
  };
  const handleUpdatePost = (updatedPost) => {
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    ); // Update state
    setSelectedPost(null); // Hide edit form
    setIsEdit(updatedPost);
  };
  return (
    <div>
      <h1>React CRUD with JSONPlaceholder</h1>
      <AddPost onAdd={handleAddPost} setIsAddNew={setIsAddNew}/>
      <EditPost selectedPost={selectedPost} onUpdate={handleUpdatePost} setIsEdit={setIsEdit}/>
      <PostList onEdit={setSelectedPost} isAddNew={isAddNew} isEdit={isEdit}/>
    </div>
  );
}
export default App;

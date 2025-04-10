import { useState } from "react";
import Posts from "./components/Posts";
import PostList from "./components/PostList";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";
import "./App.css";
function App() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const handleAddPost = (newPost) => {
    setPosts([...posts, newPost]); // Add new post to state
  };
  const handleUpdatePost = (updatedPost) => {
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    ); // Update state
    setSelectedPost(null); // Hide edit form
  };
  return (
    <div>
      <h1>React CRUD with JSONPlaceholder</h1>
      <AddPost onAdd={handleAddPost} />
      <EditPost selectedPost={selectedPost} onUpdate={handleUpdatePost} />
      <PostList onEdit={setSelectedPost} />
    </div>
  );
}
export default App;

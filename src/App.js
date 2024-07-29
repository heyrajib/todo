// src/App.js
import React, { useState } from "react";
import {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
} from "./store/reducers/post";

const App = () => {
  const { data: posts, error, isLoading, refetch } = useGetPostsQuery();
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  const handleCreatePost = async () => {
    await createPost(newPost);
    setNewPost({ title: "", body: "" });
    refetch();
  };

  const handleUpdatePost = async (id) => {
    await updatePost({ id, title: "Updated Title" });
    refetch();
  };

  const handleDeletePost = async (id) => {
    await deletePost(id);
    refetch();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div>
      <h1>Posts</h1>
      <input
        type="text"
        placeholder="Title"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Body"
        value={newPost.body}
        onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
      />
      <button onClick={handleCreatePost}>Create Post</button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title}
            <button onClick={() => handleUpdatePost(post.id)}>Update</button>
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

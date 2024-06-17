import React, { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const EditPostForm = ({ post, user, onSave }) => {
  const [editedTitle, setEditedTitle] = useState(post.naslov);
  const [editedContent, setEditedContent] = useState(post.sadrzaj);
  const [editedImage, setEditedImage] = useState(post.naziv_slike);

  const handleSave = async () => {
    try {
      const editedPost = {
        post_id: post.post_id,
        title: editedTitle,
        content: editedContent,
        post_image: editedImage,
        user_id: user.id,
      };

      await axios.put('http://localhost:8000/posts/edit-post', editedPost);
      onSave(editedPost); // Notify parent component of successful save
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  return (
    <div>
      <h3>Uredi post</h3>
      <label>Naslov:</label>
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <label>Sadržaj:</label>
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
      />
      <label>Naziv slike:</label>
      <input
        type="text"
        value={editedImage}
        onChange={(e) => setEditedImage(e.target.value)}
      />
      <button onClick={handleSave}>Spremi</button>
    </div>
  );
};

export default EditPostForm;

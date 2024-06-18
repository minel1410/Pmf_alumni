import React, { useState } from 'react';
import axios from 'axios';
import './EditPostFormStyles.css';

axios.defaults.withCredentials = true;

const EditPostForm = ({ post, user, onSave }) => {
  const [editedTitle, setEditedTitle] = useState(post.naslov);
  const [editedContent, setEditedContent] = useState(post.sadrzaj);

  const handleSave = async () => {
    try {
      const editedPost = {
        post_id: post.post_id,
        title: editedTitle,
        content: editedContent,
        user_id: user.id,
      };

      await axios.put('http://localhost:8000/posts/edit-post', editedPost);
      onSave(editedPost); 
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  return (
    <div className="form-container">
      <h3>Uredi post</h3>
      <label className="label">Naslov:</label>
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        className="input-field"
      />
      <label className="label">Sadržaj:</label>
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className="textarea-field"
      />
      <button onClick={handleSave} className="submit-button">Spremi</button>
    </div>
  );
};

export default EditPostForm;
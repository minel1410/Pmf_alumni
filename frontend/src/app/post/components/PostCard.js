import React, { useState } from 'react';
import axios from 'axios';
import EditPostForm from '@/app/user/my-posts/components/EditPostForm';


const PostCard = ({ post, user, showEdit = false, showDelete = false, onDelete }) => {
  const [likes, setLikes] = useState(post.lajkovi);
  const [dislikes, setDislikes] = useState(post.dislajkovi);
  const [isEditing, setIsEditing] = useState(false);

  const handleLike = async () => {
    try {
      await axios.put('http://localhost:8000/posts/like-post', {
        post_id: post.post_id,
        user_id: user.id,
      });
      setLikes(likes + 1);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleDislike = async () => {
    try {
      await axios.put('http://localhost:8000/posts/dislike-post', {
        post_id: post.post_id,
        user_id: user.id,
      });
      setDislikes(dislikes + 1);
    } catch (error) {
      console.error('Error disliking post:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/posts/delete/${post.post_id}`);
      onDelete(post.post_id); 
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEditedPost = (editedPost) => {
    // Update local state or perform any necessary actions after saving edited post
    console.log('Edited post saved:', editedPost);
    setIsEditing(false); // Close edit mode after saving
  };

  const cardStyle = {
    border: '1px solid rgba(21, 172, 227, 1)',
    padding: '16px',
    margin: '16px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.55)',
    backgroundColor: 'rgba(39, 47, 63, 1)',
    color: '#fff',
  };

  const imageStyle = {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: '8px',
    marginBottom: '8px',
  };

  const actionsStyle = {
    marginTop: '8px',
  };

  const buttonStyle = {
    marginRight: '8px',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: 'rgba(21, 172, 227, 1)',
    color: '#fff',
  };

  return (
    <div style={cardStyle}>
      {isEditing ? (
        <EditPostForm post={post} user={user} onSave={handleSaveEditedPost} />
      ) : (
        <>
          <h4>{post.korisnik_ime} {post.korisnik_prezime}</h4>
          <h2>{post.naslov}</h2>
          <p>{post.sadrzaj}</p>
          <p>{new Date(post.datum_objave).toLocaleDateString()}</p>
          <div style={actionsStyle}>
            <button style={buttonStyle} onClick={handleLike}>Sviđa mi se ({likes})</button>
            <button style={buttonStyle} onClick={handleDislike}>Ne sviđa mi se ({dislikes})</button>
            {showEdit && (
              <button style={buttonStyle} onClick={handleEdit}>Uredi</button>
            )}
            {showDelete && (
              <button style={buttonStyle} onClick={handleDelete}>Obriši</button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PostCard;


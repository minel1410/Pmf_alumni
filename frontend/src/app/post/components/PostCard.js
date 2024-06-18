import React, { useState } from 'react';
import axios from 'axios';
import EditPostForm from '@/app/user/my-posts/components/EditPostForm';
import './PostCardStyles.css'; 


const PostCard = ({ post, user, showEdit = false, showDelete = false, onDelete }) => {
  const [likes, setLikes] = useState(post.lajkovi);
  const [dislikes, setDislikes] = useState(post.dislajkovi);
  const [isEditing, setIsEditing] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false); 

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
    setIsFormOpen(true); // Otvori formu za uređivanje
  };

  const handleCloseForm = () => {
    setIsFormOpen(false); // Zatvori formu za uređivanje
  };

  return (
    <div className="card">
      {isFormOpen ? ( // Prikazuje formu za uređivanje ako je isFormOpen true
        <EditPostForm post={post} user={user} onSave={handleCloseForm} />
      ) : (
        <>
          <h4>{post.korisnik_ime} {post.korisnik_prezime}</h4>
          <h2>{post.naslov}</h2>
          <p>{post.sadrzaj}</p>
          <p>{new Date(post.datum_objave).toLocaleDateString()}</p>
          <div className="actions">
            <button className="action-button like-button" onClick={handleLike}>Sviđa mi se ({likes})</button>
            <button className="action-button like-button" onClick={handleDislike}>Ne sviđa mi se ({dislikes})</button>
            {showEdit && (
              <button className="action-button edit-button" onClick={handleEdit}>Uredi</button>
            )}
            {showDelete && (
              <button className="action-button delete-button" onClick={handleDelete}>Obriši</button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PostCard;
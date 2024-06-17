import React, { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
const PostCard = ({ post, user }) => {
  const [likes, setLikes] = useState(post.lajkovi);
  const [dislikes, setDislikes] = useState(post.dislajkovi);

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

  const cardStyle = {
    border: '1px solid #ccc',
    padding: '16px',
    margin: '16px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  };

  const imageStyle = {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
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
  };

  return (
    <div style={cardStyle}>
      <h2>{post.naslov}</h2>
      <p>{post.sadrzaj}</p>
      <p>{new Date(post.datum_objave).toLocaleDateString()}</p>
      <p>{post.korisnik_ime}</p>
      {post.naziv_slike && <img src={post.naziv_slike} alt={post.naslov} style={imageStyle} />}
      <div style={actionsStyle}>
        <button style={buttonStyle} onClick={handleLike}>Like ({likes})</button>
        <button style={buttonStyle} onClick={handleDislike}>Dislike ({dislikes})</button>
      </div>
    </div>
  );
};

export default PostCard;
"use client"
 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './PostPage.module.css';
import PostCard from './components/PostCard';
 
axios.defaults.withCredentials = true;
 
const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [showAddPostForm, setShowAddPostForm] = useState(false);
  const [newPostData, setNewPostData] = useState({
    title: '',
    content: '',
    post_date: '',
  });
  const [id, setId] = useState(null);
 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await axios.get('http://localhost:8000/auth/get_cookies', { withCredentials: true });
        setUser(userResponse.data);
        setId(userResponse.data.id);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
 
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/posts/all-posts');
        setPosts(response.data.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
 
    fetchUser();
    fetchPosts();
  }, []);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPostData({
      ...newPostData,
      [name]: value,
    });
  };
 
  const onSubmitNewPost = async (e) => {
    e.preventDefault();
 
    try {
      const response = await fetch('http://localhost:8000/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newPostData.title,
          content: newPostData.content,
          post_date: newPostData.post_date,
          user_id: id,
        }),
      });
 
      if (!response.ok) {
        throw new Error('Ne mogu dodati novi post');
      }
 
      const data = await response.json();
 
      setNewPostData({
        title: '',
        content: '',
        post_date: '',
      });
 
      setShowAddPostForm(false);
      setPosts([...posts, data]);
 
    } catch (error) {
      console.error(error);
    }
  };
 
  if (showAddPostForm) {
    return (
      <div className={styles.postFormPage}>
        <div className={styles.formContainer}>
          <h2>Nova objava</h2>
          <form onSubmit={onSubmitNewPost}>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="title"
                placeholder="Naslov"
                value={newPostData.title}
                onChange={handleChange}
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <textarea
                name="content"
                placeholder="Tekst objave"
                value={newPostData.content}
                onChange={handleChange}
                className={styles.formInput}
                rows="6"
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="date"
                name="post_date"
                value={newPostData.post_date}
                onChange={handleChange}
                className={styles.formInput}
              />
            </div>
            <div className={styles.formFooter}>
              <button type="submit" className={styles.submitButton}>Dodaj objavu</button>
              <button type="button" onClick={() => setShowAddPostForm(false)} className={styles.cancelButton}>Odustani</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
 
  return (
    <div className="post-page">
      <div className={styles.header}>
        <h1>Postovi...</h1>
        <button
          type="button"
          onClick={() => setShowAddPostForm(true)}
          className={styles.addButton}
        >
          Dodaj objavu
        </button>
      </div>
      <div className="post-list">
        {posts.map(post => (
          <PostCard key={post.post_id} post={post} user={user} />
        ))}
      </div>
    </div>
  );
};
 
export default PostPage;
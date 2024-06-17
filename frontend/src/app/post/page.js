"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './components/PostCard';

axios.defaults.withCredentials = true;
const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await axios.get('http://localhost:8000/auth/get_cookies', { withCredentials: true });
        setUser(userResponse.data);
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

  return (
    <div className="post-page">
      <h1>Postovi...</h1>
      <div className="post-list">
        {posts.map(post => (
          <PostCard key={post.post_id} post={post} user={user} />
        ))}
      </div>
    </div>
  );
};

export default PostPage;
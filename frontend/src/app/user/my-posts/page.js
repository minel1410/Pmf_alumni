"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '@/app/post/components/PostCard';

const API_URL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const fetchUserAndPosts = async (setUser, setPosts) => {
  try {
    const userResponse = await axios.get(`${API_URL}/auth/get_cookies`, { withCredentials: true });
    setUser(userResponse.data);

    const postsResponse = await axios.get(`${API_URL}/posts/${userResponse.data.id}/my-posts`);
    setPosts(postsResponse.data.data);
  } catch (error) {
    console.error('Error fetching user or posts:', error);
  }
};

const UserPosts = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchUserAndPosts(setUser, setPosts);
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      setPosts(posts.filter(post => post.post_id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}> 
      <h1>Moje objave</h1>
      {posts.length === 0 ? (
        <p>Nema pronađenih objava.</p>
      ) : (
        posts.map((post, index) => (
          <div key={post.post_id} style={{ marginBottom: index !== posts.length - 1 ? '20px' : '0' }}>
            <PostCard
              post={post}
              user={user}
              showEdit={true} 
              showDelete={true} 
              onDelete={handleDeletePost} 
            />
          </div>
        ))
      )}
    </div>
  );
};

export default UserPosts;

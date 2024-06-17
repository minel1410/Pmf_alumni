"use client";
import React from 'react';
import Hero from './components/Hero';
import FeaturedJobs from './components/FeaturedJobs';

const Home = () => {
  return (
    <div className='min-h-screen'>
      <Hero />
      <FeaturedJobs />
    </div>
  );
};

export default Home;
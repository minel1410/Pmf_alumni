"use client"
import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import Link from 'next/link';
import styles from './FeaturedJobs.module.css';
import axios from 'axios';

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]); 
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const userResponse = await axios.get("http://localhost:8000/auth/get_cookies", { withCredentials: true });
        setUser(userResponse.data);

        const jobsResponse = await axios.get(`http://localhost:8000/jobs/user/${userResponse.data.id}`);
        setJobs(jobsResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Izdvojeni oglasi</h1>
      <p className={styles.description}>
        Pronađi posao koji će ispuniti tvoje profesionalne ambicije.
      </p>
      <div className={styles.jobList}>
        {jobs.map((job) => (
          <Link href={`/jobs/${job.posao_id}`} key={job.posao_id} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
            <JobCard job={job} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedJobs;
"use client";
import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import styles from './JobCard.module.css';

const JobCard = ({ job }) => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div>
          <h1 className={styles.jobTitle}>
            {job.naziv_posla}
          </h1>
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <FaLocationDot style={{ width: '0.8rem', color: '#24272E' }} />
              <p className={styles.infoText}>
                {job.lokacija}
              </p>
            </div>
            <div className={styles.infoItem}>
              <MdOutlineDateRange style={{ width: '0.8rem', color: '#24272E' }} />
              <p className={styles.infoText}>
                {job.datum_pocetka}
              </p>
            </div>
          </div>
          <div className={styles.info} style={{ marginTop: '1rem' }}>
            <div className={styles.jobType}>
              {job.tip_posla}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default JobCard;
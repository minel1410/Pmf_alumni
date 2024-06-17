"use client";
import React from 'react';
import styles from './Hero.module.css'

export const Hero = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.heading}>
          <h1>
            <span className={styles.highlighted}>Personalizirani oglasi:</span> Brz i jednostavan put do Vašeg novog posla!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
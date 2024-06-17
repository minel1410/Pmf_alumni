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
          <p className={styles.paragraph}>
            Nudimo najveću bazu poslova i kompanija za alumni studente s Prirodno-matematičkog fakulteta u Sarajevu.
            Svaki dan, korisnici posjećuju našu platformu kako bi postavili oglase, pronašli poslove ili istražili mogućnosti karijere.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
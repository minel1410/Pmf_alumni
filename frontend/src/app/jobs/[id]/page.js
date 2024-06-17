"use client";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './SingleJob.module.css';

import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineWorkHistory } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";

const SingleJobPage = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`http://localhost:8000/jobs/${id}`);
                if (!response.ok) {
                    throw new Error("Ne mogu dohvatiti podatke o poslu");
                }
                const job = await response.json();
                setJob(job.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchJob();
    }, [id]);

    const calculateDaysRemaining = (endDate) => {
        const today = new Date();
        const end = new Date(endDate);
        const timeDiff = end - today;
        const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        return daysRemaining;
    };

    const handleApplyClick = () => {
        if (job && job.email) {
            const mailtoLink = `mailto:${job.email}`;
            window.location.href = mailtoLink;
        }
    };

    if (!job) {
        return (
            <div className={styles.loadingContainer}>
                <h2 className={styles.loadingText}>Učitavanje...</h2>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <section className={styles.headerSection}>
                <div className={styles.headerContent}>
                    <h2 className={styles.companyName}>
                        {job.naziv_firme}
                    </h2>
                    <h1 className={styles.jobTitle}>
                        {job.naziv_posla}
                    </h1>
                </div>
            </section>
            <div className={styles.detailsSection}>
                <div className={styles.detailsContent}>
                    <div className={styles.detailsGrid}>
                        <div>
                            <div className={styles.iconContainer}>
                                <FaLocationDot className={styles.iconStyle} />
                            </div>
                            <div className={styles.detailText}>{job.lokacija}</div>
                        </div>
                        <div>
                            <div className={styles.iconContainer}>
                                <MdOutlineWorkHistory className={styles.iconStyle} />
                            </div>
                            <div className={styles.detailText}>{job.tip_posla}</div>
                        </div>
                        <div className={styles.fullWidth}>
                            <div className={styles.iconContainer}>
                                <CiClock2 className={styles.iconStyle} />
                            </div>
                            <div className={styles.detailText}>Oglas ističe za {calculateDaysRemaining(job.datum_zavrsetka)} dana</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.jobDescriptionSection}>
                <section>
                    <div className={styles.descriptionContent}>
                        <h3 className={styles.descriptionTitle}>Opis posla</h3>
                        <h5>{job.opis_posla}</h5>
                    </div>
                </section>
            </div>
            <div className={styles.buttonContainer}>
                <button 
                    type="button" 
                    onClick={handleApplyClick} 
                    className={styles.applyButton}>
                    Apliciraj
                </button>
            </div>
        </div>
    );
};

export default SingleJobPage;
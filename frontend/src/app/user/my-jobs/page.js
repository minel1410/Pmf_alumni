"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import '../../../app/globals.css';
import JobCard from "../../../app/jobs/components/JobCard";
import { FaTrash, FaEdit } from 'react-icons/fa';
import Modal from '../../../app/components/Modal';
import Input from '../../../app/components/Input';
import Select from 'react-select';
import styles from './MyJobs.module.css';
import axios from 'axios';

const MyJobs = () => {
    const [tags, setTags] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [jobToDelete, setJobToDelete] = useState(null);
    const [showAddJobForm, setShowAddJobForm] = useState(false);
    const [showUpdateJobForm, setShowUpdateJobForm] = useState(false);
    const [newJobData, setNewJobData] = useState({
        job_name: '',
        company_name: '',
        email: '',
        job_description: '',
        location: '',
        job_type: '',
        start_date: '',
        end_date: '',
        tag_id: ''
    });

    const [updatedJobData, setUpdatedJobData] = useState({
        job_name: '',
        company_name: '',
        email: '',
        job_description: '',
        location: '',
        job_type: '',
        start_date: '',
        end_date: '',
        tag_id: ''
    });

    const [jobToUpdate, setJobToUpdate] = useState(null);
    const [selectedTag, setSelectedTag] = useState(null); 
    const [id, setId] = useState(null); 

    useEffect(() => {
      const fetchData = async () => {
          try {            
              const userResponse = await axios.get("http://localhost:8000/auth/get_cookies", { withCredentials: true });
              const userId = userResponse.data.id; 
              setId(userId);

              const jobsResponse = await axios.get(`http://localhost:8000/jobs/user/${userId}/my_jobs`);
              setJobs(jobsResponse.data.data);

              const tagsResponse = await axios.get(`http://localhost:8000/jobs/tags`);
              setTags(tagsResponse.data);
  
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
  
      fetchData(); 
  }, []);
  

    const confirmDelete = (jobId) => {
        setJobToDelete(jobId);
        setShowModal(true);
    };

    const onDelete = async () => {
        if (!jobToDelete) return;
        
        try {
            const response = await fetch(`http://localhost:8000/jobs/delete/${jobToDelete}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Ne mogu izbrisati posao');
            }
            
            setJobs(jobs.filter(job => job.posao_id !== jobToDelete));
            setShowModal(false);
            setJobToDelete(null);
        } catch (error) {
            console.error(error);
        }
    };

    const onUpdate = (jobId) => {
        const job = jobs.find(job => job.posao_id === jobId);
        if (job) {
            
            setUpdatedJobData({
                job_name: job.naziv_posla,
                company_name: job.naziv_firme,
                email: job.email,
                job_description: job.opis_posla,
                location: job.lokacija,
                job_type: job.tip_posla,
                start_date: job.datum_pocetka,
                end_date: job.datum_zavrsetka,
                tag_id: job.tag_id
            });

            setJobToUpdate(jobId);
            
            setShowUpdateJobForm(true);
            
            
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewJobData({
            ...newJobData,
            [name]: value
        });
    };

    const handleTagChange = (selectedOption) => {
        setSelectedTag(selectedOption);
        setNewJobData({
            ...newJobData,
            tag_id: selectedOption ? selectedOption.value : '' 
        });
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdatedJobData({
            ...updatedJobData,
            [name]: value
        });
    };

    const handleUpdateTagChange = (selectedOption) => {
        setSelectedTag(selectedOption);
        setUpdatedJobData({
            ...updatedJobData,
            tag_id: selectedOption ? selectedOption.value : ''
        });
    };

    const onSubmitNewJob = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`http://localhost:8000/jobs/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    job_name: newJobData.job_name,
                    company_name: newJobData.company_name,
                    email: newJobData.email,
                    job_description: newJobData.job_description,
                    location: newJobData.location,
                    job_type: newJobData.job_type,
                    start_date: newJobData.start_date,
                    end_date: newJobData.end_date,
                    tag_id: newJobData.tag_id, 
                    user_id: id,
                }),
            });
            if (!response.ok) {
                throw new Error('Ne mogu dodati novi posao');
            }
    
            const data = await response.json();
            console.log(data);
    
            setNewJobData({
                job_name: '',
                company_name: '',
                email: '',
                job_description: '',
                location: '',
                job_type: '',
                start_date: '',
                end_date: '',
                tag_id: '' 
            });
    
            setShowAddJobForm(false);
            setJobs([...jobs, data]); 
    
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmitUpdatedJob = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/jobs/update/${jobToUpdate}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    job_name: updatedJobData.job_name,
                    company_name: updatedJobData.company_name,
                    email: updatedJobData.email,
                    job_description: updatedJobData.job_description,
                    location: updatedJobData.location,
                    job_type: updatedJobData.job_type,
                    start_date: updatedJobData.start_date,
                    end_date: updatedJobData.end_date,
                    tag_id: updatedJobData.tag_id,
                    user_id: id,
                }),
            });
            if (!response.ok) {
                throw new Error('Ne mogu ažurirati posao');
            }

            const data = await response.json();
            console.log(data);

            setJobs(jobs.map(job => job.posao_id === jobToUpdate ? data : job));
            setShowUpdateJobForm(false);
            setJobToUpdate(null);

        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.headerTitle}>Moji poslovi</h1>
            <button
              type="button"
              onClick={() => setShowAddJobForm(true)}
              className={styles.addButton}
            >
              Dodaj posao
            </button>
          </div>
          <div className={styles.results}>
            <h1 className={styles.resultsTitle}>Rezultati({jobs.length})</h1>
          </div>
          <div className={styles.jobList}>
            {jobs.map((job) => (
              <div key={job.posao_id} className={styles.jobItem}>
                <JobCard job={job} />
                <div className={styles.jobActions}>
                  <button
                    className={styles.deleteButton}
                    onClick={() => confirmDelete(job.posao_id)}
                  >
                    <FaTrash size={20} />
                  </button>
                  <button
                    className={styles.editButton}
                    onClick={() => onUpdate(job.posao_id)}
                  >
                    <FaEdit size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
    
          <Modal open={showModal} onClose={() => setShowModal(false)}>
            <h2>Potvrda brisanja</h2>
            <p>Da li ste sigurni da želite obrisati ovaj posao?</p>
            <div className={styles.modalFooter}>
              <button
                className={styles.modalButton}
                onClick={onDelete}
              >
                Da
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setShowModal(false)}
              >
                Ne
              </button>
            </div>
          </Modal>
    
          {showAddJobForm && (
                  <Modal open={showAddJobForm} onClose={() => setShowAddJobForm(false)}>
                  <form onSubmit={onSubmitNewJob} className={styles.form}>
                    <h2 className={styles.formTitle}>Dodaj novi posao</h2>
                    <Input
                      type="text"
                      name="job_name"
                      value={newJobData.job_name}
                      onChange={handleChange}
                      label="Naziv posla"
                      className={styles.formInput}
                    />
                    <Input
                      type="text"
                      name="company_name"
                      value={newJobData.company_name}
                      onChange={handleChange}
                      label="Ime firme"
                      className={styles.formInput}
                    />
                    <Input
                      type="email"
                      name="email"
                      value={newJobData.email}
                      onChange={handleChange}
                      label="Email"
                      className={styles.formInput}
                    />
                    <Input
                      type="text"
                      name="job_description"
                      value={newJobData.job_description}
                      onChange={handleChange}
                      label="Opis posla"
                      className={styles.formInput}
                    />
                    <Input
                      type="text"
                      name="location"
                      value={newJobData.location}
                      onChange={handleChange}
                      label="Lokacija"
                      className={styles.formInput}
                    />
                    <Input
                      type="text"
                      name="job_type"
                      value={newJobData.job_type}
                      onChange={handleChange}
                      label="Tip posla"
                      className={styles.formInput}
                    />
                    <Input
                      type="date"
                      name="start_date"
                      value={newJobData.start_date}
                      onChange={handleChange}
                      label="Datum početka"
                      className={styles.formInput}
                    />
                    <Input
                      type="date"
                      name="end_date"
                      value={newJobData.end_date}
                      onChange={handleChange}
                      label="Datum završetka"
                      className={styles.formInput}
                    />
                    <div className={styles.formInput}>
                      <label htmlFor="tags" className={styles.formLabel}>Tagovi</label>
                      <Select
                        id="tags"
                        name="tags"
                        placeholder="Odaberi..."
                        options={tags.map(tag => ({ value: tag.tag_id, label: tag.naziv }))}
                        onChange={handleTagChange}
                        value={selectedTag}
                        className={styles.selectInput}
                      />
                    </div>
                    <div className={styles.formFooter}>
                      <button
                        type="submit"
                        className={styles.submitButton}
                      >
                        Dodaj posao
                      </button>
                    </div>
                  </form>
                </Modal>
          )}
    
          {showUpdateJobForm && (
            <Modal open={showUpdateJobForm} onClose={() => setShowUpdateJobForm(false)}>
            <form onSubmit={onSubmitUpdatedJob} className={styles.form}>
              <h2 className={styles.formTitle}>Ažuriraj posao</h2>
              <Input
                type="text"
                name="job_name"
                value={updatedJobData.job_name}
                onChange={handleUpdateChange}
                label="Naziv posla"
                className={styles.formInput}
              />
              <Input
                type="text"
                name="company_name"
                value={updatedJobData.company_name}
                onChange={handleUpdateChange}
                label="Ime firme"
                className={styles.formInput}
              />
              <Input
                type="email"
                name="email"
                value={updatedJobData.email}
                onChange={handleUpdateChange}
                label="Email"
                className={styles.formInput}
              />
              <Input
                type="text"
                name="job_description"
                value={updatedJobData.job_description}
                onChange={handleUpdateChange}
                label="Opis posla"
                className={styles.formInput}
              />
              <Input
                type="text"
                name="location"
                value={updatedJobData.location}
                onChange={handleUpdateChange}
                label="Lokacija"
                className={styles.formInput}
              />
              <Input
                type="text"
                name="job_type"
                value={updatedJobData.job_type}
                onChange={handleUpdateChange}
                label="Tip posla"
                className={styles.formInput}
              />
              <Input
                type="date"
                name="start_date"
                value={updatedJobData.start_date}
                onChange={handleUpdateChange}
                label="Datum početka"
                className={styles.formInput}
              />
              <Input
                type="date"
                name="end_date"
                value={updatedJobData.end_date}
                onChange={handleUpdateChange}
                label="Datum završetka"
                className={styles.formInput}
              />
              <div className={styles.formInput}>
              <label htmlFor="tags" className={styles.formLabel}>Tagovi</label>
                <Select
                  id="tags"
                  name="tags"
                  placeholder="Odaberi..."
                  options={tags.map(tag => ({ value: tag.tag_id, label: tag.naziv }))}
                  onChange={handleUpdateTagChange}
                  value={selectedTag}
                  className={styles.selectInput}
                />
              </div>
              <div className={styles.formFooter}>
                <button
                  type="submit"
                  className={styles.submitButton}
                >
                  Ažuriraj posao
                </button>
              </div>
            </form>
          </Modal>
          )}
        </div>
      );
    
};

export default MyJobs;
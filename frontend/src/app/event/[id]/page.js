"use client";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// CSS styles
const styles = {
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#f7f7f7',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
  },
  section: {
    marginBottom: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  infoContainer: {
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
  },
  infoItem: {
    marginBottom: '10px',
  },
  description: {
    lineHeight: '1.6',
  },
};

const EventDetailPage = () => {
    const { id } = useParams();
  const [event, setEvent] = useState(null);
 

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/events/event_info/${id}`);
        setEvent(response.data.data);
      } catch (error) {
        console.error('Error kod dohvacanja detalaj o dogadjaju', error);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  if (!event) {
    return (
      <div>
        <h2 style={styles.header}>Učitavanje...</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <section style={styles.section}>
        <div>
          <h1 style={styles.header}>{event.naziv_dogadjaja}</h1>
        </div>
      </section>
      <div style={styles.infoContainer}>
        <div style={styles.infoItem}>
          <div><strong>Lokacija:</strong> {event.ulica}, {event.grad}</div>
        </div>
        <div style={styles.infoItem}>
          <div><strong>Datum:</strong> {event.datum_dogadjaja}</div>
        </div>
      </div>
      <section style={styles.section}>
        <div>
          <h3 style={styles.header}>Opis događaja</h3>
          <p style={styles.description}>{event.opis_dogadjaja}</p>
        </div>
      </section>
    </div>
  );
};

export default EventDetailPage;

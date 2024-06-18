"use client";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EventDetailPage.css'

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/events/event_info/${id}`);
        setEvent(response.data.data);
      } catch (error) {
        console.error('Error kod dohvaćanja detalja o događaju', error);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  if (!event) {
    return (
      <div>
        <h2 className="header">Učitavanje...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <section className="section">
        <div>
          <h1 className="header">{event.naziv_dogadjaja}</h1>
        </div>
      </section>
      <div className="infoContainer">
        <div className="infoItem">
          <div><strong>Lokacija:</strong> {event.ulica}, {event.grad}</div>
        </div>
        <div className="infoItem">
          <div><strong>Datum:</strong> {event.datum_dogadjaja}</div>
        </div>
      </div>
      <section className="section">
        <div>
          <h3 className="header">Opis događaja</h3>
          <p className="description">{event.opis_dogadjaja}</p>
        </div>
      </section>
    </div>
  );
};

export default EventDetailPage;
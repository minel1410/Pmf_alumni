"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from './components/EventCard';
import Link from 'next/link';

const EventPage = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);

  // Funkcija za dohvaanje podataka o korisniku i događajima
  const fetchData = async () => {
    try {
      // Dohvati podatke o korisniku
      const userResponse = await axios.get("http://localhost:8000/auth/get_cookies", { withCredentials: true });
      setUser(userResponse.data);

      // Dohvati podatke o događajima za koje je korisnik zainteresiran
      const eventsResponse = await axios.get(`http://localhost:8000/events/user/${userResponse.data.id}`);
      setEvents(eventsResponse.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!user) {
    return <div>Učitavanje...</div>; 
  }

  return (
    <div>
      <h2>Preporučeni događaji: </h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }} className="events-container">
        {events.map(event => (
          <div style={{ flex: '1 0 calc(33.33% - 20px)', maxWidth: 'calc(33.33% - 20px)' }}>
            <Link href={`/event/${event.dogadjaj_id}`} key={event.dogadjaj_id} passHref style={{ textDecoration: 'none', color: 'inherit' }}> 
            <EventCard event={event} showActions={false} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPage;


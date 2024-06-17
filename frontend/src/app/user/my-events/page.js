"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import { FaPlus } from 'react-icons/fa';


const API_URL = 'http://localhost:8000';
const MyEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [user, setUser] = useState(null);
  const [tags, setTags] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false); // Dodano stanje za prikaz forme za kreiranje

  useEffect(() => {
      const fetchUserAndEvents = async () => {
          try {
              // Dohvati podatke o korisniku
              const userResponse = await axios.get(`${API_URL}/auth/get_cookies`, { withCredentials: true });
              setUser(userResponse.data);

              // Dohvati događaje korisnika
              const eventsResponse = await axios.get(`${API_URL}/events/user/${userResponse.data.id}/my_events`, { withCredentials: true });
              setEvents(eventsResponse.data.data);

              // Dohvati tagove
              const tagsResponse = await axios.get(`${API_URL}/events/tags`, { withCredentials: true });
              setTags(tagsResponse.data);

              // Dohvati vrste događaja (event types)
              const eventTypesResponse = await axios.get(`${API_URL}/events/event-type`, { withCredentials: true });
              setEventTypes(eventTypesResponse.data);
          } catch (error) {
              console.error('Error fetching user, events, tags, or event types:', error);
          }
      };
      fetchUserAndEvents();
  }, []);

  const handleDelete = async (eventId) => {
      try {
          await axios.delete(`${API_URL}/events/delete/${eventId}`, { withCredentials: true });
          setEvents(events.filter(event => event.dogadjaj_id !== eventId));
      } catch (error) {
          console.error('Error deleting event:', error);
      }
  };

  const handleEdit = (event) => {
      setSelectedEvent(event);
      setShowCreateForm(true); // Prikazi formu za uređivanje
  };

  const handleSave = async (eventData) => {
      try {
          if (eventData.event_id) {
              // Ažuriranje postojećeg događaja PUT zahtjevom
              await axios.put(`${API_URL}/events/event_edit`, eventData, { withCredentials: true });
              setEvents(events.map(event => event.dogadjaj_id === eventData.event_id ? { ...event, ...eventData } : event));
          } else {
              // Kreiranje novog događaja POST zahtjevom
              const response = await axios.post(`${API_URL}/events/create`, eventData, { withCredentials: true });
              eventData.event_id = response.data.event_id; // Postavi novi event_id nakon kreiranja
              setEvents([...events, eventData]);
          }

          setSelectedEvent(null); // Resetiraj selektirani događaj
          setShowCreateForm(false); // Sakrij formu nakon spremanja
      } catch (error) {
          console.error('Error saving event:', error);
      }
  };

  const handleCreateEvent = () => {
      setShowCreateForm(true); // Prikazi formu za kreiranje događaja
      setSelectedEvent(null); // Resetiraj selektirani događaj ako je bio otvoren za uređivanje
  };

  if (!user) {
      return <div>Učitavanje...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Moji događaji</h1>
        <button
          onClick={handleCreateEvent}
          style={{
            backgroundColor: 'rgba(21, 172, 227, 1)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FaPlus style={{ marginRight: '5px' }} /> Kreiraj događaj
        </button>
      </div>
      {showCreateForm ? (
        <div style={{ marginTop: '20px' }}>
          <EventForm onSave={handleSave} tags={tags} userId={user.id} event={selectedEvent} eventTypes={eventTypes} />
        </div>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <EventList events={events} onDelete={handleDelete} onEdit={handleEdit} showActions={true} />
        </div>
      )}
    </div>
  );
};

export default MyEventsPage;
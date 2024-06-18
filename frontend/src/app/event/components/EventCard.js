import React from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import './EventCard.css'

const EventCard = ({ event, onDelete, onEdit, showActions }) => {
  return (
    <div className="event-card">
      <div className="event-card-body">
        <h5 className="event-card-title">{event.naziv_dogadjaja}</h5>
        <p className="event-card-text">Datum: {event.datum_dogadjaja}</p>
        <p className="event-card-text">Lokacija: {event.ulica}, {event.grad}</p>
        {showActions && (
          <div className="button-container">
            <FaTrashAlt
              className="icon delete-icon"
              onClick={() => onDelete(event.dogadjaj_id)}
            />
            <FaEdit className="icon edit-icon" onClick={() => onEdit(event)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
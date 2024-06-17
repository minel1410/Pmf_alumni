import React from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const EventCard = ({ event, onDelete, onEdit, showActions }) => {
  const cardStyle = {
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',
    width: '100%',
    backgroundColor: 'rgba(39, 47, 63, 1)', // Nova boja pozadine
    color: '#fff', // Nova boja teksta
  };

  const bodyStyle = {
    padding: '20px',
  };

  const titleStyle = {
    fontSize: '1.25rem',
    marginBottom: '10px',
  };

  const textStyle = {
    color: '#fff', // Nova boja teksta
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px',
  };

  const iconStyle = {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    marginLeft: '10px',
    transition: 'color 0.3s ease',
  };

  const deleteIconStyle = {
    ...iconStyle,
    color: '#e74c3c', // Boja za ikonicu brisanja
  };

  const editIconStyle = {
    ...iconStyle,
    color: '#3498db', // Boja za ikonicu izmene
  };

  return (
    <div style={cardStyle}>
      <div style={bodyStyle}>
        <h5 style={titleStyle}>{event.naziv_dogadjaja}</h5>
        <p style={textStyle}>{event.opis_dogadjaja}</p>
        <p style={textStyle}>Datum: {event.datum_dogadjaja}</p>
        <p style={textStyle}>Lokacija: {event.ulica}, {event.grad}</p>
        {showActions && (
          <div style={buttonContainerStyle}>
            <FaTrashAlt
              style={deleteIconStyle}
              onClick={() => onDelete(event.dogadjaj_id)}
            />
            <FaEdit style={editIconStyle} onClick={() => onEdit(event)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
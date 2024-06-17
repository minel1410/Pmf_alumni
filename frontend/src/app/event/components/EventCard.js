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
width: '100%'
};

const imgStyle = {
width: '100%',
height: '200px',
objectFit: 'cover'
};

const bodyStyle = {
padding: '20px'
};

const titleStyle = {
fontSize: '1.25rem',
marginBottom: '10px'
};

const textStyle = {
color: '#555'
};

const buttonContainerStyle = {
display: 'flex',
justifyContent: 'flex-end', // Poravnanje na desno
marginTop: '10px'
};

const iconStyle = {
width: '20px',
height: '20px',
cursor: 'pointer',
marginLeft: '10px', // Prostor sa leve strane ikonice
transition: 'color 0.3s ease',
};

const deleteIconStyle = {
...iconStyle,
color: '#e74c3c',
};

const editIconStyle = {
...iconStyle,
color: '#3498db',
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
<FaTrashAlt style={deleteIconStyle} onClick={() => onDelete(event.dogadjaj_id)} />
<FaEdit style={editIconStyle} onClick={() => onEdit(event)} />
</div>
)}
</div>
</div>
);
};

export default EventCard;
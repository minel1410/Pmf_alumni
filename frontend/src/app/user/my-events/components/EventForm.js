import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const EventForm = ({ event, onSave, userId, tags, eventTypes }) => {
  const initialFormData = {
    event_id: event ? event.dogadjaj_id : '',
    event_name: event ? event.naziv_dogadjaja : '',
    event_description: event ? event.opis_dogadjaja : '',
    street: event ? event.ulica : '',
    city: event ? event.grad : '',
    event_date: event ? new Date(event.datum_dogadjaja).toISOString().split('T')[0] : '',
    tag_id: event ? event.tag_id : '',
    user_id: userId,
    event_type_id: event ? event.tip_dogadjaja_id : '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [selectedEventType, setSelectedEventType] = useState(null);

  useEffect(() => {
    // Reset form when event changes (for editing)
    if (event) {
      setFormData({
        event_id: event.dogadjaj_id,
        event_name: event.naziv_dogadjaja,
        event_description: event.opis_dogadjaja,
        street: event.ulica,
        city: event.grad,
        event_date: new Date(event.datum_dogadjaja).toISOString().split('T')[0],
        tag_id: event.tag_id,
        user_id: userId,
        event_type_id: event.tip_dogadjaja_id,
      });

      // Initialize selectedEventType if event has event_type_id
      const selectedType = eventTypes.find(type => type.tip_dogadjaja_id === event.tip_dogadjaja_id);
      setSelectedEventType(selectedType ? { value: selectedType.tip_dogadjaja_id, label: selectedType.naziv_tipa_dogadjaja } : null);
    } else {
      // Initialize with empty values (for creating new)
      setFormData({
        event_id: '',
        event_name: '',
        event_description: '',
        street: '',
        city: '',
        event_date: '',
        tag_id: '',
        user_id: userId,
        event_type_id: '',
      });
    }
  }, [event, userId, eventTypes]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateEventTypeChange = (selectedOption) => {
    setSelectedEventType(selectedOption);
    setFormData({
      ...formData,
      event_type_id: selectedOption ? selectedOption.value : '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      event_id: formData.event_id,
      event_name: formData.event_name,
      event_description: formData.event_description,
      street: formData.street,
      city: formData.city,
      event_date: new Date(formData.event_date).toISOString(),
      tag_id: formData.tag_id,
      user_id: formData.user_id,
      event_type_id: formData.event_type_id,
    };

    onSave(formattedData);
  };

  const formStyle = {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <label style={{ marginBottom: '0.5rem', display: 'block' }}>Naziv događaja:</label>
      <input type="text" name="event_name" value={formData.event_name} onChange={handleChange} style={inputStyle} />
      
      <label style={{ marginBottom: '0.5rem', display: 'block' }}>Opis događaja:</label>
      <textarea name="event_description" value={formData.event_description} onChange={handleChange} style={inputStyle} />
      
      <label style={{ marginBottom: '0.5rem', display: 'block' }}>Ulica:</label>
      <input type="text" name="street" value={formData.street} onChange={handleChange} style={inputStyle} />
      
      <label style={{ marginBottom: '0.5rem', display: 'block' }}>Grad:</label>
      <input type="text" name="city" value={formData.city} onChange={handleChange} style={inputStyle} />
      
      <label style={{ marginBottom: '0.5rem', display: 'block' }}>Datum:</label>
      <input type="date" name="event_date" value={formData.event_date} onChange={handleChange} style={inputStyle} />

      <label style={{ marginBottom: '0.5rem', display: 'block' }}>Tag:</label>
      <select name="tag_id" value={formData.tag_id} onChange={handleChange} style={inputStyle}>
        {tags.map(tag => (
          <option key={tag.tag_id} value={tag.tag_id}>{tag.naziv}</option>
        ))}
      </select>

      <label style={{ marginBottom: '0.9rem', display: 'block' }}>Tip događaja:</label>
      <Select
        value={selectedEventType}
        onChange={handleUpdateEventTypeChange}
        options={eventTypes.map(type => ({ value: type.tip_dogadjaja_id, label: type.naziv_tipa_dogadjaja }))}
        style={inputStyle}
      />
      
      <button type="submit" style={buttonStyle}>Sačuvaj</button>
    </form>
  );
};

export default EventForm;


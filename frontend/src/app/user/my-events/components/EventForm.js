import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './EventFormStyles.css';

const EventForm = ({ event, onSave, userId, tags, eventTypes }) => {
  const initialFormData = {
    event_id: event ? event.dogadjaj_id : '',
    event_name: event ? event.naziv_dogadjaja : '',
    event_description: event ? event.opis_dogadjaja : '',
    street: event ? event.ulica : '',
    city: event ? event.grad : '',
    event_date: event ? new Date(event.datum_dogadjaja).toISOString().split('T')[0] : '',
    tag_id: event ? event.tag_id : '',
    user_id: event? event.user_id: userId,
    event_type_id: event ? event.tip_dogadjaja_id : '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [selectedEventType, setSelectedEventType] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

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

      // Initialize selectedTag if event has tag_id
      const selectedTagObj = tags.find(tag => tag.tag_id === event.tag_id);
      setSelectedTag(selectedTagObj ? { value: selectedTagObj.tag_id, label: selectedTagObj.naziv } : null);

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
  }, [event, userId, eventTypes, tags]);

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

  const handleUpdateTagChange = (selectedOption) => {
    setSelectedTag(selectedOption);
    setFormData({
      ...formData,
      tag_id: selectedOption ? selectedOption.value : '',
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
      event_date: new Date(formData.event_date),
      tag_id: formData.tag_id,
      user_id: formData.user_id,
      event_type_id: formData.event_type_id,
    };

    onSave(formattedData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label className="label">Naziv događaja:</label>
      <input type="text" name="event_name" value={formData.event_name} onChange={handleChange} className="input-field" />
      
      <label className="label">Opis događaja:</label>
      <textarea name="event_description" value={formData.event_description} onChange={handleChange} className="textarea-field" />
      
      <label className="label">Ulica:</label>
      <input type="text" name="street" value={formData.street} onChange={handleChange} className="input-field" />
      
      <label className="label">Grad:</label>
      <input type="text" name="city" value={formData.city} onChange={handleChange} className="input-field" />
      
      <label className="label">Datum:</label>
      <input type="date" name="event_date" value={formData.event_date} onChange={handleChange} className="input-field" />

      <label className="label">Tag:</label>
      <Select
        value={selectedTag}
        onChange={handleUpdateTagChange}
        options={tags.map(tag => ({ value: tag.tag_id, label: tag.naziv }))}
        className="select-field"
      />

      <label className="label">Tip događaja:</label>
      <Select
        value={selectedEventType}
        onChange={handleUpdateEventTypeChange}
        options={eventTypes.map(type => ({ value: type.tip_dogadjaja_id, label: type.naziv_tipa_dogadjaja }))}
        className="select-field"
      />
      
      <button type="submit" className="submit-button">Sačuvaj</button>
    </form>
  );
};

export default EventForm;

import EventCard from "@/app/event/components/EventCard";

const EventList = ({ events, onDelete, onEdit, showActions }) => {
  return (
    <div>
      {events.map((event) => (
        <EventCard 
          key={event.dogadjaj_id} 
          event={event} 
          onDelete={onDelete} 
          onEdit={onEdit} 
          showActions={showActions} 
        />
      ))}
    </div>
  );
};

export default EventList;

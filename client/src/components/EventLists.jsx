import eventsData from "../data/event.js";
import { Link } from "react-router-dom";
const events = eventsData;

function EventLists() {
  //   console.log(events.map((event) => event.event_name));
  return (
    <>
      <h2>All Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <Link to={`/events/${event.id}`}>{event.event_name}</Link>
          </li>
        ))}
      </ul>
      <p>List of upcoming events</p>
    </>
  );
}

export default EventLists;

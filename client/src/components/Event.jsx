import { useParams } from "react-router-dom";
import eventsData from "../data/event.js";
const events = eventsData;

function Event() {
  let { eventId } = useParams();
  //   console.log("Event id", eventId);

  const event = events.find((event) => event.id === +eventId);
  //   console.log(event);
  if (!event) {
    return <span>The event you've requested doesn't exist.</span>;
  }
  const { event_name, event_description } = event;
  return (
    <div>
      <h3>{event_name}</h3>
      <p>{event_description}</p>
    </div>
  );
}

export default Event;

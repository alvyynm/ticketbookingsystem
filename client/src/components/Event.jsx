import { useParams } from "react-router-dom";
import Moment from "moment";
import eventsData from "../data/event.js";
const events = eventsData;
import featuredImage from "../assets/party1.jpg";

function Event() {
  let { eventId } = useParams();
  //   console.log("Event id", eventId);

  const event = events.find((event) => event.id === +eventId);
  //   console.log(event);
  if (!event) {
    return <span>The event you've requested doesn't exist.</span>;
  }
  const { event_name, event_description, start_date } = event;
  return (
    <div className="min-h-64 py-8 text-left">
      <div className="grid md:grid-cols-2 lg:gap-36 gap-8">
        <div>
          <p className="badge badge-accent badge-outline">
            {Moment(start_date).format("D MMM YYYY, h:mm A")}
          </p>
          <h1 className="text-5xl font-bold pb-6 pt-3">{event_name}</h1>

          <p>{event_description}</p>
        </div>
        <div>
          <img
            src={featuredImage}
            className="rounded-xl"
            width="350"
            height="auto"
            alt="featured event image"
          />
        </div>
      </div>
    </div>
  );
}

export default Event;

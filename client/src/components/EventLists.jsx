import eventsData from "../data/event.js";
import Moment from "moment";
import { Link } from "react-router-dom";
const events = eventsData;

function EventLists() {
  //   console.log(events.map((event) => event.event_name));
  return (
    <>
      <h2>All Upcoming Events</h2>
      <ul className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <li key={event.id} className="pb-8">
            <div className="card w-78 bg-base-100 shadow-xl">
              <figure className="px-5 pt-5">
                <img
                  src={
                    "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  }
                  alt="Shoes"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-white">{event.event_name}</h2>
                <p>{Moment(event.start_date).format("D MMM YYYY, h:mm A")}</p>
                <div className="card-actions">
                  <Link to={`/events/${event.id}`}>
                    <button className="btn btn-accent btn-wide font-semibold">
                      Buy Tickets
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p>List of upcoming events</p>
    </>
  );
}

export default EventLists;

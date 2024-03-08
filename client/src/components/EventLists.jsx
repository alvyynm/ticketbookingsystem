import Moment from "moment";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetEventsQuery } from "../app/api/eventApiSlice";
import { setEvents } from "../features/events/eventsSlice";
import { useDispatch } from "react-redux";
import partyImg1 from "../assets/party.jpg";
import partyImg2 from "../assets/party1.jpg";
import partyImg3 from "../assets/party2.jpg";
import partyImg4 from "../assets/party3.jpg";

function EventLists() {
  const { data, isLoading } = useGetEventsQuery();
  const images = [partyImg1, partyImg2, partyImg3, partyImg4];
  const dispatch = useDispatch();

  let eventsData = data?.data;

  useEffect(() => {
    dispatch(setEvents({ data: eventsData }));
  }, [data]);

  if (isLoading) {
    return (
      <>
        <p>Loading events </p>
      </>
    );
  } else if (!data) {
    return <>No events</>;
  }

  return (
    <>
      <h2>All Upcoming Events</h2>
      <ul className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        {eventsData.map((event) => (
          <li key={event.id} className="pb-8">
            <Link to={`/events/${event.id}`}>
              <div className="card w-78 bg-base-100 shadow-xl">
                <figure className="px-5 pt-5">
                  <img
                    src={images[Math.floor(Math.random() * images.length)]}
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
            </Link>
          </li>
        ))}
      </ul>
      <p>List of upcoming events</p>
    </>
  );
}

export default EventLists;

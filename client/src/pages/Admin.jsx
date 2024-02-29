import { useGetEventsQuery } from "../slices/eventApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { setEvents } from "../slices/eventsSlice";
import { useEffect } from "react";
import Moment from "moment";
function Admin() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetEventsQuery();
  console.log("customers", data);
  useEffect(() => {
    dispatch(setEvents(data));
  }, [data]);

  const { events } = useSelector((state) => state.events);
  console.log("events", events);

  events?.map((event) => console.log(event));
  if (!events) {
    return (
      <>
        <p>No event </p>
      </>
    );
  }
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Event Name</th>
              <th>Event Date</th>
              <th>Max Attendees</th>
              <th>VIP Price</th>
              <th>Regular Price</th>
              <th>Rem. Seats</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => {
              return (
                <>
                  <tr>
                    <th>{event.id}</th>
                    <td>{event.event_name}</td>
                    <td>{Moment().calendar(event.start_date)}</td>
                    <td>{event.max_attendees}</td>
                    <td>{event.ticket_price_vip}</td>
                    <td>{event.ticket_price_regular}</td>
                    <td>{event.available_seats}</td>
                    <td>
                      <button>Edit</button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Admin;

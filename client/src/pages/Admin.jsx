import { useGetEventsQuery } from "../app/api/eventApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { setEvents } from "../slices/eventsSlice";
import { useEffect, useState } from "react";
import Moment from "moment";
function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // form data
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [vipPrice, setVipPrice] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [seats, setSeats] = useState("");

  const dispatch = useDispatch();
  const { data, isLoading } = useGetEventsQuery();
  console.log("customers", data);
  useEffect(() => {
    dispatch(setEvents(data));
  }, [data]);

  const { events } = useSelector((state) => state.events);
  console.log("events", events);

  events?.map((event) => console.log(event));

  const handleEventEdit = (e) => {
    e.preventDefault();

    console.log("Event data updated", {
      eventName,
      eventDate,
      eventDesc,
      ticketType,
      maxAttendees,
      vipPrice,
      regularPrice,
      seats,
    });
  };

  const resetFieldsHandler = () => {
    setEventName("");
    setEventDate("");
    setEventDesc("");
    setEventDate("");
    setMaxAttendees("");
    setTicketType("");
    setVipPrice("");
    setRegularPrice("");
  };

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
                      {/* <button onClick={handleModal}>Edit</button> */}
                      <button
                        className="btn"
                        onClick={() =>
                          document.getElementById("my_modal_1").showModal()
                        }
                      >
                        Edit
                      </button>
                      <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                          <h3 className=" text-center font-bold text-lg">
                            Update Event Details
                          </h3>
                          <form onSubmit={handleEventEdit}>
                            <label>
                              <span className="label-text">Name</span>
                            </label>
                            <input
                              id="name"
                              name="name"
                              type="text"
                              placeholder={event.event_name}
                              value={eventName}
                              onChange={(e) => setEventName(e.target.value)}
                              className="input input-bordered"
                              required
                            />
                            <hr />
                            <label>
                              <span className="label-text">Description</span>
                            </label>
                            <textarea
                              id="description"
                              name="description"
                              type="textarea"
                              placeholder="Description"
                              value={event.event_description}
                              onChange={(e) => setEventDesc(e.target.value)}
                              className="input input-bordered"
                              required
                            />
                            <hr />
                            <label>
                              <span className="label-text">Date</span>
                            </label>
                            <input
                              id="date"
                              name="date"
                              type="date"
                              placeholder="Event name"
                              value={event.event_date}
                              onChange={(e) => setEventDate(e.target.value)}
                              className="input input-bordered"
                              required
                            />
                            <hr />
                            <label>
                              <span className="label-text">Max Attendees</span>
                            </label>
                            <input
                              id="attendees"
                              name="attendees"
                              type="number"
                              placeholder="Event name"
                              value={event.max_attendees}
                              onChange={(e) => setMaxAttendees(e.target.value)}
                              className="input input-bordered"
                              required
                            />
                            <hr />
                            <label>
                              <span className="label-text">VIP Price</span>
                            </label>
                            <input
                              id="vipprice"
                              name="vipprice"
                              type="number"
                              placeholder="VIP price"
                              value={event.ticket_price_vip}
                              onChange={(e) => setVipPrice(e.target.value)}
                              className="input input-bordered"
                              required
                            />
                            <hr />
                            <label>
                              <span className="label-text">Regular Price</span>
                            </label>
                            <input
                              id="rprice"
                              name="rprice"
                              type="number"
                              placeholder="Regular price"
                              value={event.ticket_price_regular}
                              onChange={(e) => setRegularPrice(e.target.value)}
                              className="input input-bordered"
                              required
                            />
                            <hr />
                            <label>
                              <span className="label-text">
                                Seats available
                              </span>
                            </label>
                            <input
                              id="seats"
                              name="seats"
                              type="number"
                              placeholder="available seats"
                              value={event.available_seats}
                              onChange={(e) => setSeats(e.target.value)}
                              className="input input-bordered"
                              required
                            />
                          </form>
                          <p className="py-4">
                            Press ESC key or click the button below to close
                          </p>
                          <div className="modal-action">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button
                                className="btn"
                                onClick={resetFieldsHandler}
                              >
                                Close
                              </button>
                            </form>
                          </div>
                        </div>
                      </dialog>
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

import { useParams } from "react-router-dom";
import Moment from "moment";
import eventsData from "../data/event.js";
const events = eventsData;
import featuredImage from "../assets/party1.jpg";
import { useState, useEffect } from "react";

function Event() {
  let { eventId } = useParams();
  //   console.log("Event id", eventId);
  const [ticketType, setTicketType] = useState("regular");
  const [seatsReserved, setSeatsReserved] = useState(1);
  const [ticketPrice, setTicketPrice] = useState(0);

  // Calculate ticket price whenever ticket type or seats reserved change
  useEffect(() => {
    const basePrice =
      ticketType == "regular" ? ticket_price_regular : ticket_price_vip; // Assume $50 per seat
    setTicketPrice(basePrice * seatsReserved);
  }, [ticketType, seatsReserved]);

  const handleSeatsChange = (e) => {
    setSeatsReserved(parseInt(e.target.value));
  };

  const event = events.find((event) => event.id === +eventId);
  //   console.log(event);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    // Your form submission logic here
    const ticketData = {
      user_id: 6,
      event_id: eventId,
      seats_reserved: seatsReserved,
      ticket_type: ticketType,
      ticket_price: ticketPrice,
    };
    console.log(ticketData);
    // TODO: Send data to API server
  };

  if (!event) {
    return <span>The event you&apos;ve requested doesn&apos;t exist.</span>;
  }
  const {
    event_name,
    event_description,
    start_date,
    ticket_price_regular,
    ticket_price_vip,
  } = event;
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
      <h2 className="text-3xl font-semibold py-6">Tickets</h2>
      {/* Take two */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-black">
          Ticket Booking
        </h2>
        <div className="mb-4">
          <label className="block text-secondary-content font-medium">
            Ticket Type
          </label>
          <select
            className="block w-full mt-1 p-2 border rounded-md"
            value={ticketType}
            onChange={(e) => setTicketType(e.target.value)}
          >
            <option value="regular">{`Regular: KES ${ticket_price_regular}`}</option>
            <option value="vip">{`VIP: KES ${ticket_price_vip}`}</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-secondary-content font-medium">
            Seats Reserved
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={seatsReserved}
            onChange={handleSeatsChange}
            className="block w-full mt-1"
          />
          <span className="text-gray-600">{seatsReserved}</span>
        </div>
        <div className="mb-4">
          <label className="block text-secondary-content font-medium">
            Ticket Price
          </label>
          <input
            type="text"
            value={`$${ticketPrice}`}
            readOnly
            className="block w-full mt-1 p-2 border rounded-md bg-gray-100"
          />
        </div>
        <button
          type="submit"
          className="btn btn-active font-semibold btn-accent"
        >
          Reserve Tickets
        </button>
      </form>
      {/* Take two ends */}
    </div>
  );
}

export default Event;

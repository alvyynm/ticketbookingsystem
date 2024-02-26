const { Event } = require("../db/models");
const { validationResult } = require("express-validator");

const getEvents = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "event data",
    message: "Events data fetched successfully",
  });
};

const createEvent = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Invalid data received");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  // read payload data from request body
  const event_name = req.body.event_name;
  const event_description = req.body.event_description;
  const start_date = req.body.start_date;
  const end_date = req.body.end_date;
  const max_attendees = req.body.max_attendees;
  const ticket_price_vip = req.body.ticket_price_vip;
  const ticket_price_regular = req.body.ticket_price_regular;

  // create a new event
  Event.create({
    event_name: event_name,
    event_description: event_description,
    start_date: start_date,
    end_date: end_date,
    max_attendees: max_attendees,
    ticket_price_regular: ticket_price_regular,
    ticket_price_vip: ticket_price_vip,
  })
    .then((result) => {
      res.status(201).json({
        status: "success",
        data: result,
        message: "Event created successfully",
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 422;
      }
      error.message = "Event creation failed";
      next(error);
    });
};

const getEventById = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "event data",
    message: "Event data fetched successfully",
  });
};

const getEventAttendees = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "event attendees data",
    message: "Event attendees fetched successfully",
  });
};

const updateEvent = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "event data",
    message: "Event updated successfully",
  });
};

const deleteEvent = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Event deleted successfully",
  });
};

module.exports = {
  getEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  getEventAttendees,
};

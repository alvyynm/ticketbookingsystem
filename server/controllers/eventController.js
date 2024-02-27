const { Event, EventArchive } = require("../db/models");
const { validationResult } = require("express-validator");

const getEvents = (req, res, next) => {
  Event.findAll()
    .then((events) => {
      res.status(200).json({
        status: "success",
        message: "Events data fetched successfully",
        data: events,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 404;
      }
      error.message = "Failed to fetch events data";
      next();
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
    created_by: req.id,
  })
    .then((result) => {
      res.status(201).json({
        status: "success",
        message: "Event created successfully",
        data: result,
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
  Event.findByPk(req.params.eventId)
    .then((result) => {
      if (!result) {
        res.status(404).json({
          status: "success",
          message: "No event found",
          data: {},
        });
      }
      // if event exists, return success
      res.status(200).json({
        status: "success",
        message: "Event data fetched successfully",
        data: result,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 404;
      }
      error.message = "Can't find requested event";
      next(error);
    });
};

const getEventAttendees = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Event attendees fetched successfully",
    data: "event attendees data",
  });
};

const updateEvent = (req, res, next) => {
  // read payload data from request body
  const event_name = req.body.event_name;
  const event_description = req.body.event_description;
  const start_date = req.body.start_date;
  const end_date = req.body.end_date;
  const max_attendees = req.body.max_attendees;
  const ticket_price_vip = req.body.ticket_price_vip;
  const ticket_price_regular = req.body.ticket_price_regular;

  Event.upsert({
    id: req.params.eventId,
    event_name: event_name,
    event_description: event_description,
    start_date: start_date,
    end_date: end_date || null,
    max_attendees: max_attendees,
    ticket_price_vip: ticket_price_vip,
    ticket_price_regular: ticket_price_regular,
  })
    .then((response) => {
      res.status(200).json({
        status: "success",
        message: "Event updated successfully",
        data: response,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 404;
      }
      error.message = "Can't find requested event";
      next(error);
    });
};

const deleteEvent = (req, res, next) => {
  const eventId = req.params.eventId;

  // first, retrieve the event's data from db
  Event.findByPk(eventId)
    .then((eventData) => {
      // check if event with id doesn't exist and throw an error
      if (!eventData) {
        res.status(404).json({
          status: "success",
          message: "No event found",
          data: {},
        });
      }
      // if event exists, then delete it
      Event.destroy({
        where: {
          id: eventId,
        },
      })
        .then((result) => {
          // if deletion is successful, create a new archive
          EventArchive.create({
            id: eventId,
            event_name: eventData.event_name,
            event_description: eventData.event_description,
            start_date: eventData.start_date,
            end_date: eventData.end_date,
            max_attendees: eventData.max_attendees,
            ticket_price_regular: eventData.ticket_price_regular,
            ticket_price_vip: eventData.ticket_price_vip,
            created_by: eventData.created_by,
            deleted_by: req.id,
          })
            .then((response) => {
              // return response after successful archiving and deletion
              res.status(200).json({
                status: "success",
                message: "Event deleted successfully",
                data: {
                  deletedItems: result,
                },
              });
            })
            .catch((error) => {
              if (!error.statusCode) {
                error.statusCode = 500;
              }
              error.message = "Something went wrong";
              next(error);
            });
        })
        .catch((error) => {
          if (!error.statusCode) {
            error.statusCode = 404;
          }
          error.message = "Can't find requested event";
          next(error);
        });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      error.message = "Oops, something went wrong";
      next(error);
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

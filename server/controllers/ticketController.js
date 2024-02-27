const { validationResult } = require("express-validator");
const crypto = require("crypto");
const { Ticket, UserEvent } = require("../db/models");

const getTickets = (req, res, next) => {
  Ticket.findAll({
    where: {
      user_id: req.id,
    },
  })
    .then((tickets) => {
      res.status(200).json({
        status: "success",
        message: "Tickets data fetched successfully",
        data: tickets,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 404;
      }
      error.message = "Failed to fetch tickets data";
      next();
    });
};

const createTicket = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Invalid data received");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const user_id = req.id;
  const event_id = req.body.event_id;
  const seats_reserved = req.body.seats_reserved;
  const ticket_type = req.body.ticket_type;
  const ticket_price = req.body.ticket_price;
  const ticket_serial = crypto.randomUUID({ disableEntropyCache: true });

  // create a new ticket
  Ticket.create({
    user_id: user_id,
    event_id: event_id,
    seats_reserved: seats_reserved,
    ticket_type: ticket_type,
    ticket_price: ticket_price,
    ticket_serial: ticket_serial,
  })
    .then((result) => {
      // upon successful ticket reservation, update joint table
      UserEvent.create({
        user_id: user_id,
        event_id: event_id,
      }).then((userEvent) => {
        res.status(200).json({
          status: "success",
          message: "Ticket created successfully",
          data: result,
        });
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 422;
      }
      error.message = "Ticket reservation failed";
      next(error);
    });
};

const getTicketById = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "ticket data",
    message: "Ticket data fetched successfully",
  });
};

module.exports = {
  createTicket,
  getTicketById,
  getTickets,
};

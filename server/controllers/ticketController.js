const { validationResult } = require("express-validator");
const crypto = require("crypto");
const { Ticket } = require("../db/models");

const getTickets = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "tickets data",
    message: "Tickets data fetched successfully",
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
      res.status(200).json({
        status: "success",
        message: "Ticket created successfully",
        data: result,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 422;
      }
      error.message = "Ticket reservation failed";
      next(error);
    });

  // res.status(200).json({
  //   status: "success",
  //   data: "ticket data",
  //   message: "Ticket created successfully",
  // });
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

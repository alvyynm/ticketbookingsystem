const { validationResult } = require("express-validator");
const crypto = require("crypto");
const { Resend } = require("resend");
const { Ticket, UserEvent, Event } = require("../db/models");

const resend = new Resend(process.env.RESEND_API_KEY);
const resendEmail = process.env.RESEND_EMAIL;

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

  const userEmail = resendEmail || req.email;
  const userName = req.name;
  const user_id = req.id;
  const event_id = req.body.event_id;
  const seats_reserved = req.body.seats_reserved;
  const ticket_type = req.body.ticket_type;
  const ticket_price = req.body.ticket_price;
  const ticket_serial = crypto.randomUUID({ disableEntropyCache: true });

  // 1. find event and check the available_seats for the event
  Event.findByPk(event_id)
    .then((result) => {
      if (!result) {
        res.status(404).json({
          status: "error",
          message: "Event not found",
          data: [],
        });
      }

      const available_seats = result.available_seats;
      // 2. calculate the number of available_seats after successful ticket reservation
      const available_seats_after_reservation =
        available_seats - seats_reserved;

      if (available_seats == 0) {
        // 3. if available_seats is 0, tell user event is fully booked
        res.status(404).json({
          status: "failed",
          message: "Event is fully booked",
          data: [],
        });
      } else {
        // 4. if available_seats != 0:
        // 4a. check if the number of seats the user wants to reserve are available
        if (available_seats < seats_reserved) {
          // 4a 1. if the user wants to reserve more than available_seats

          res.status(409).json({
            status: "error",
            message: `Only ${available_seats} seats are currently available`,
            data: [],
          });
        } else {
          // 4a 2. if seats are available, continue to reserve

          let remaining_reservations;

          // 5. check how many tickets the user has reserved so far for the specified event

          Ticket.findAll({
            where: {
              event_id: event_id,
              user_id: user_id,
            },
          })
            .then((data) => {
              // 6. Calculate the total seats reserved by the user for the specified event

              const totalSeatsReserved = data.reduce((total, reservation) => {
                return total + reservation.seats_reserved;
              }, 0);

              // Users can only reserve five seats per event
              remaining_reservations = 5 - totalSeatsReserved;

              // 7a. If remaining_reservations for the user is 0 or < 0, user can't reserve more tickets)
              if (remaining_reservations === 0 || remaining_reservations < 0) {
                res.status(403).json({
                  status: "failed",
                  message: "Ticket reservation limit per event exceeded",
                  data: [],
                });
              } else {
                // 7b. If user hasn't exceeded the reservation limit of 5 per event

                if (remaining_reservations >= seats_reserved) {
                  // 8 create a new ticket
                  Ticket.create({
                    user_id: user_id,
                    event_id: event_id,
                    seats_reserved: seats_reserved,
                    ticket_type: ticket_type,
                    ticket_price: ticket_price,
                    ticket_serial: ticket_serial,
                  })
                    .then((result) => {
                      // 8a. upon successful ticket reservation,
                      // 8a 1. reduce the number of seats_available in the event by seats_reserved
                      Event.upsert({
                        id: event_id,
                        available_seats: available_seats_after_reservation,
                      }).then((updateEventResult) => {
                        if (!updateEventResult) {
                          // throw an error if event update failed
                          res.status(403).json({
                            status: "failed",
                            message: "Something went wrong (event updating)",
                            data: [],
                          });
                        }
                        // 8a 2. update joint table
                        UserEvent.create({
                          user_id: user_id,
                          event_id: event_id,
                        }).then((userEvent) => {
                          resend.emails.send({
                            from: "onboarding@resend.dev",
                            to: userEmail,
                            subject: "Ticket Reserved",
                            html: `<p>Congrats, ${userName}, you've reserved a ticket</strong>!</p>`,
                          });

                          res.status(200).json({
                            status: "success",
                            message: "Ticket created successfully",
                            data: result,
                          });
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
                } else {
                  // if user wants to reserve more than remaining reservation
                  res.status(403).json({
                    status: "failed",
                    message: `You can only reserve ${remaining_reservations} seats for this event.`,
                    data: result,
                  });
                }
              }
            })
            .catch((error) => {
              if (!error.statusCode) {
                error.statusCode = 422;
              }
              error.message = "Ticket reservation failed";
              next(error);
            });
        }
      }
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

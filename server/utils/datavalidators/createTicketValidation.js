const { body } = require("express-validator");

module.exports = [
  body("event_id").trim().not().isEmpty().withMessage("Event id is required"),
  body("seats_reserved")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Seat reserved is required")
    .isInt({ min: 1, max: 5 })
    .withMessage("Must reserve at least one seat and a maximum of five"),
  body("ticket_type")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Ticket type is required"),
  body("ticket_price")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Ticket price is required"),
];

const express = require("express");
const { body } = require("express-validator");
const ticketController = require("../controllers/ticketController");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// GET v1/tickets/ticketId
router.get("/tickets/:ticketId", isAuth, ticketController.getTicketById);

// GET v1/tickets
router.get("/tickets", isAuth, ticketController.getTickets);

// POST v1/tickets
router.post(
  "/tickets",
  isAuth,
  [
    body("user_id").trim().not().isEmpty().withMessage("User id is required"),
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
  ],
  ticketController.createTicket
);

module.exports = router;

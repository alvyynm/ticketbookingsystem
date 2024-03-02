const express = require("express");
const { body } = require("express-validator");
const ticketController = require("../controllers/ticketController");
const isAuth = require("../middleware/is-auth");
const isAdmin = require("../middleware/is-admin");
const createTicketValidation = require("../utils/datavalidators/createTicketValidation");

const router = express.Router();

// GET v1/tickets/ticketId
router.get(
  "/tickets/:ticketId",
  isAuth,
  isAdmin,
  ticketController.getTicketById
);

// POST v1/tickets
router.post(
  "/tickets/verify",
  [
    body("ticket_serial")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Event id is required"),
  ],
  ticketController.verifyTicket
);

// GET v1/tickets
router.get("/tickets", isAuth, ticketController.getTickets);

// POST v1/tickets
router.post(
  "/tickets",
  isAuth,
  createTicketValidation,
  ticketController.createTicket
);

module.exports = router;

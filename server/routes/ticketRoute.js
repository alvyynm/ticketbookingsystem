const express = require("express");
const ticketController = require("../controllers/ticketController");

const router = express.Router();

// GET v1/tickets/ticketId
router.get("/tickets/:ticketId", ticketController.getTicketById);

// GET v1/tickets
router.get("/tickets", ticketController.getTickets);

// POST v1/tickets
router.post("/tickets", ticketController.createTicket);

module.exports = router;

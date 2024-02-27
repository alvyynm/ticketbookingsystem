const express = require("express");
const ticketController = require("../controllers/ticketController");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// GET v1/tickets/ticketId
router.get("/tickets/:ticketId", isAuth, ticketController.getTicketById);

// GET v1/tickets
router.get("/tickets", isAuth, ticketController.getTickets);

// POST v1/tickets
router.post("/tickets", isAuth, ticketController.createTicket);

module.exports = router;

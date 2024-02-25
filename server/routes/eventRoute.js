const express = require("express");
const { body } = require("express-validator");
const eventController = require("../controllers/eventController");
const router = express.Router();

// GET v1/events/eventId
router.get("/events/:eventId", eventController.getEventById);

// GET v1/events
router.get("/events", eventController.getEvents);

// POST v1/events
router.post("/events", eventController.createEvent);

// PUT v1/events
router.put("/events", eventController.updateEvent);

// DELETE v1/events
router.delete("/events", eventController.deleteEvent);

module.exports = router;

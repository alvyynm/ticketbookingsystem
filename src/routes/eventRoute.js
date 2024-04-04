const express = require("express");
const eventController = require("../controllers/eventController");
const isAuthenticated = require("../middleware/is-auth");
const isAdmin = require("../middleware/is-admin");
const getCacheData = require("../middleware/events-cache");
const eventValidation = require("../utils/datavalidators/eventValidation");
const router = express.Router();

// GET v1/events/:eventId/attendees
router.get("/events/:eventId/attendees", eventController.getEventAttendees);

// GET v1/events/eventId
router.get("/events/:eventId", eventController.getEventById);

// GET v1/events
router.get("/events", getCacheData, eventController.getEvents);

// POST v1/events
router.post(
  "/events",
  isAuthenticated,
  isAdmin,
  eventValidation,
  eventController.createEvent
);

// PUT v1/events/eventId
router.put(
  "/events/:eventId",
  isAuthenticated,
  isAdmin,
  eventValidation,
  eventController.updateEvent
);

// DELETE v1/events/eventId
router.delete(
  "/events/:eventId",
  isAuthenticated,
  isAdmin,
  eventController.deleteEvent
);

module.exports = router;

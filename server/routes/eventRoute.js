const express = require("express");
const { body } = require("express-validator");
const eventController = require("../controllers/eventController");
const router = express.Router();

// GET v1/events/:eventId/attendees
router.get("/events/:eventId/attendees", eventController.getEventAttendees);

// GET v1/events/eventId
router.get("/events/:eventId", eventController.getEventById);

// GET v1/events
router.get("/events", eventController.getEvents);

// POST v1/events
router.post(
  "/events",
  [
    body("event_name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Event name is required"),
    body("event_description")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Event description is required")
      .matches(/^(?=.*[A-Za-z]).{150,}$/)
      .withMessage(
        "Event description must be at least 150 characters, including white spaces, letters, digits, dollar sign, euro sign, or pound sign, and at least several letters"
      ),
    body("start_date")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Event start date is required")
      .isISO8601()
      .withMessage("Invalid datetime format for start_date"),
    body("end_date")
      .optional()
      .trim()
      .not()
      .isEmpty()
      .withMessage("Event end date is required")
      .isISO8601()
      .withMessage("Invalid datetime format for end_date"),
    body("max_attendees")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Maximum attendees is required")
      .isInt({ min: 10 })
      .withMessage(
        "Maximum attendees must be a valid integer with a minimum value of 10"
      ),
    body("ticket_price_vip")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Ticket price for VIP is required")
      .isNumeric({ min: 0 })
      .withMessage(
        "VIP ticket price must be a valid integer or float with a minimum value of 0"
      ),
    body("ticket_price_regular")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Ticket price for regular is required")
      .isNumeric({ min: 0 })
      .withMessage(
        "Regular ticket price must be a valid integer or float with a minimum value of 0"
      ),
  ],
  eventController.createEvent
);

// PUT v1/events
router.put("/events", eventController.updateEvent);

// DELETE v1/events
router.delete("/events", eventController.deleteEvent);

module.exports = router;

const { body } = require("express-validator");

module.exports = [
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
    .matches(/^(?=.*[A-Za-z]).{100,300}$/)
    .withMessage(
      "Event description must be between 100 and 300 characters, including white spaces, letters, digits, dollar sign, euro sign, or pound sign, and at least several letters"
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
    .isInt({ min: 2 })
    .withMessage(
      "Maximum attendees must be a valid integer with a minimum value of 1"
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
];

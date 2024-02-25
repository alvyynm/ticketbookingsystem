const getEvents = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "event data",
    message: "Events data fetched successfully",
  });
};

const createEvent = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "event data",
    message: "Event created successfully",
  });
};

const getEventById = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "event data",
    message: "Event data fetched successfully",
  });
};

const updateEvent = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "event data",
    message: "Event updated successfully",
  });
};

const deleteEvent = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Event deleted successfully",
  });
};

module.exports = {
  getEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
};

const getTickets = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "tickets data",
    message: "Tickets data fetched successfully",
  });
};

const createTicket = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "ticket data",
    message: "Ticket created successfully",
  });
};

const getTicketById = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "ticket data",
    message: "Ticket data fetched successfully",
  });
};

module.exports = {
  createTicket,
  getTicketById,
  getTickets,
};

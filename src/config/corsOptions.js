const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    // `origin` represents the incoming request’s origin (where the request is coming from).
    // If the origin is found in the allowedOrigins array (i.e., it’s an allowed origin), the callback is invoked with null (indicating no error) and true (indicating permission granted).
    // TIP: array.indexOf returns -1 if an item is not found in the allowedOrigins array
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;

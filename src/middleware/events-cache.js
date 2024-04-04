const { createClient } = require("redis");
require("dotenv").config({ path: `${process.cwd()}/.env` });

const redisPassword = process.env.REDIS_CACHE_PASSWORD;
const redisHost = process.env.REDIS_CACHE_HOST;
const redisPort = process.env.REDIS_CACHE_PORT;

module.exports = async (req, res, next) => {
  let client;

  (async () => {
    client = createClient({
      password: redisPassword,
      socket: {
        host: redisHost,
        port: redisPort,
      },
    });

    client.on("error", (err) => {
      console.log("Redis client error: ", err);
    });

    await client.connect();
  })();

  // after connecting to Redis, get events data
  let eventsData;

  try {
    eventsData = await client.get("events");
    console.log("trying to get events data from Redis");

    if (eventsData) {
      // return events data to client
      res.status(200).json({
        status: "success",
        message: "Events data fetched successfully",
        data: JSON.parse(eventsData),
      });
    } else {
      req.redisClient = client;
      next();
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      error.message = "Fetching data from Redis cache failed";
    }
    next(error);
  }
};

// module.exports = { getCacheData };

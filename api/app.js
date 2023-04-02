const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const cookieParser = require("cookie-parser");
require("./config/db");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const drinkRoutes = require("./routes/drinkRoutes");
const eatRoutes = require("./routes/eatRoutes");
const sleepRoutes = require("./routes/sleepRoutes");
const travelRoutes = require("./routes/travelRoutes");
const enjoyRoutes = require("./routes/enjoyRoutes");
const placeDetailRoutes = require("./routes/placeDetailRoutes");
const searchParametersRoutes = require("./routes/searchParametersRoutes");
const directionsRoutes = require("./routes/directionsRoutes");
const eventRoutes = require("./routes/eventRoutes");
const userParameterRoutes = require("./routes/userParameterRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/userRoutes.js", 
                        "./routes/drinkRoutes.js", 
                        "./routes/eatRoutes.js", 
                        "./routes/sleepRoutes.js",
                        "./routes/travelRoutes.js",
                        "./routes/enjoyRoutes.js",
                        "./routes/placeDetailRoutes.js",
                        "./routes/searchParametersRoutes.js",
                        "./routes/directionsRoutes.js",
                        "./routes/eventRoutes.js",
                        "./routes/userParameterRoutes.js"];

const hostName = dotenv.config().parsed.WEBSITE_HOSTNAME;
const doc = {
  info: {
    title: "Trip Planner API",
  },
  host: hostName + "/api",
  schemes: ["http", "https"],
  apis: endpointsFiles,
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./server.js");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const corsOptions = {
  origin: [process.env.CLIENT_URL],
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

// ROUTES

app.use("/api/auth/", userRoutes);
app.use("/api/drinks/", drinkRoutes);
app.use("/api/eats/", eatRoutes);
app.use("/api/sleep/", sleepRoutes);
app.use("/api/travel/", travelRoutes);
app.use("/api/enjoy/", enjoyRoutes);
app.use("/api/place-details/", placeDetailRoutes);
app.use("/api/search-parameters/", searchParametersRoutes);
app.use("/api/directions/", directionsRoutes);
app.use("/api/events/", eventRoutes);
app.use("/api/user/", userParameterRoutes);

module.exports = app;

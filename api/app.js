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

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/userRoutes.js", "./routes/drinkRoutes.js", "./routes/eatRoutes.js", "./routes/sleepRoutes.js"];

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

module.exports = app;

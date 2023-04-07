const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { connectInMemoryDB, closeInMemoryDB } = require("./helpers/mongoHelper");
const UserModel = require("../models/userModel");
const userController = require("../controllers/userController");

const testUserId = new mongoose.Types.ObjectId(); // Generate a valid ObjectId


const app = express();
app.use(express.json());
app.use((req, res, next) => {
  req.user = { _id: testUserId };
  next();
});

app.post("/saveEventFavorites", userController.saveEventFavorites);
app.get("/getEventFavorites", userController.getEventFavorites);
app.post("/saveAddress", userController.saveAddress);
app.get("/getAddress", userController.getAddress);
app.post("/saveProfile", userController.saveProfile);
app.get("/getProfile", userController.getProfile);

beforeAll(async () => {
  await connectInMemoryDB();
});

afterAll(async () => {
  await closeInMemoryDB();
});

beforeEach(async () => {
  await UserModel.create({
    _id: testUserId,
    eventFavorites: [],
    address: {},
    favoriteDestination: "",
  });
});

afterEach(async () => {
  await UserModel.deleteMany({});
});

describe("userController", () => {
  test("saveEventFavorites and getEventFavorites", async () => {
    const eventFavorites = ["event1", "event2", "event3"];

    // Test saveEventFavorites
    const saveRes = await request(app)
      .post("/saveEventFavorites")
      .send({ eventFavorites });

    expect(saveRes.status).toBe(200);
    expect(saveRes.body).toMatchObject({
      message: "Event favorites saved successfully!",
      eventFavorites,
    });

    // Test getEventFavorites
    const getRes = await request(app).get("/getEventFavorites");

    expect(getRes.status).toBe(200);
    expect(getRes.body).toMatchObject({ eventFavorites });
  });

  // Add more tests for the other functions here
});

const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const {
  connectInMemoryDB,
  closeInMemoryDB,
} = require("../helpers/mongoHelper");
const UserModel = require("../../models/userModel");
const userController = require("../../controllers/userController");
const { geocodeAddress } = require("../../utils/maps.utils");

const testUserId = new mongoose.Types.ObjectId(); // Generate a valid ObjectId

jest.mock("../.././utils/maps.utils");

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

  test("saveAdress and getAdress", async () => {
    const mockGeocodeAddress = jest
      .fn()
      .mockResolvedValue({ lat: 133, lng: 896 });
    geocodeAddress.mockImplementation(mockGeocodeAddress);
    const address = {
      text: "une adresse de test",
    };
    // Test saveAdress
    const saveAddress = await request(app).post("/saveAddress").send({
      address: address.text,
    });

    expect(saveAddress.status).toBe(200);
    expect(saveAddress.body).toMatchObject({
      message: "Address saved successfully!",
      address: address.text,
    });

    // Test getAddress
    const getAddress = await request(app).get("/getAddress");

    expect(getAddress.status).toBe(200);
    expect(getAddress.body).toMatchObject({ address });
  });

  test("Save profile and get profile", async () => {
    const favoriteDestination = "Paris";

    // Test save profile
    const saveProfile = await request(app).post("/saveProfile").send({
      favoriteDestination,
    });

    expect(saveProfile.status).toBe(200);
    expect(saveProfile.body).toMatchObject({
      message: "Profile saved successfully!",
      favoriteDestination,
    });

    // Test getProfile

    const getProfile = await request(app).get("/getProfile");

    expect(getProfile.status).toBe(200);
    expect(getProfile.body).toMatchObject({});
  });
});

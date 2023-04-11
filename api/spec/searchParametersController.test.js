const express = require("express");
const mongoose = require("mongoose");
const request = require("supertest");

const UserModel = require('../models/userModel')
const SearchModel = require(".././models/searchParameters");
const { connectInMemoryDB, closeInMemoryDB } = require("./helpers/mongoHelper");
const searchParameterController = require("../controllers/searchParametersController");

// Creating a valid user id for tests
const testUserId = new mongoose.Types.ObjectId();

// lauching the server with the necessary middlewares for testing
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  req.user = { _id: testUserId };
  next();
});

// defining the test routes
app.post("/search-parameters/", searchParameterController.saveSearchParameters);
app.get("/search-parameters/", searchParameterController.getSearchParameters);

// Preping database for tests

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
  await SearchModel.deleteMany({});
});

describe("searchParametersController", () => {
  // TEST CASE GOES HERE

  test("saveSearchParameters and getsearchParamaters", async () => {
    const searchParameters = {
      location: "paris",
    };

    const saveRes = await request(app)
      .post("/search-parameters")
      .query( searchParameters );

    expect(saveRes.status).toBe(200);
    expect(saveRes.body).toMatchObject({
        message: 'Search parameters saved successfully!',
        searchParameters
    })
  });


});

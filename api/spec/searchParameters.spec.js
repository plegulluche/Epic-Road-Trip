const httpMocks = require("node-mocks-http");
const dotenv = require("dotenv");
const { connectInMemoryDB, closeInMemoryDB } = require("./helpers/mongoHelper");
const {
  saveSearchParameters,
  getSearchParameters,
} = require(".././controllers/searchParametersController");
const SearchParameters = require("./../models/searchParameters");
const User = require('.././models/userModel')

dotenv.config();

const mockUser = {
  _id: 'testUserId',
};

const validParams = {
  location: "Lisbonne",
};

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; // 10 seconds

describe("SearchParametersController", () => {
  beforeAll(async () => {
    await connectInMemoryDB();
  });

  afterAll(async () => {
    await closeInMemoryDB();
  });

  beforeEach(async () => {
    const user = new User({
      name: "Test User",
      email: "testuser@example.com",
      password: "testpassword",
    });
  
    // Save the user to the database
    await user.save();
  
    // Create a new search parameter object
    const searchParams = new SearchParameters({
      user: user._id, // Use the user's _id instead of "testUserId"
      keywords: ["test keyword"],
      location: "test location",
      radius: 10,
      priceRange: [0, 100],
    });
  
    // Save the search parameter object to the database
    await searchParams.save();
  });

  it("should save search parameters", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/api/search-parameters",
      body: validParams,
      user: mockUser,
    });

    const res = httpMocks.createResponse();

    await saveSearchParameters(req, res);
    const rawData = res._getData();

    expect(res.statusCode).toBe(200);
    expect(rawData.message).toBe("Search parameters saved successfully!");
    expect(rawData.searchParameters.user).toBe(mockUser._id);
  });

  it("should get search parameters", async () => {
    const searchParams = new SearchParameters({ ...validParams, user: mockUser._id });
    await searchParams.save();

    const req = httpMocks.createRequest({
      method: "GET",
      url: "/api/search-parameters",
      user: mockUser,
    });

    const res = httpMocks.createResponse();

    await getSearchParameters(req, res);
    const rawData = res._getData();

    expect(res.statusCode).toBe(200);
    expect(rawData.searchParameters.location).toBe(validParams.location);
  });
});



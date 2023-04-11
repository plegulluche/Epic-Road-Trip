const { connectInMemoryDB, closeInMemoryDB } = require(".././helpers/mongoHelper");
const UserModel = require("../../models/userModel");
const SearchParameters = require("../../models/searchParameters");

describe("SearchParameters Model", () => {
  beforeAll(async () => {
    await connectInMemoryDB();
  });

  afterAll(async () => {
    await closeInMemoryDB();
  });

  beforeEach(async () => {
    await UserModel.deleteMany({});
    await SearchParameters.deleteMany({});
  });

  it("should create a new search parameter", async () => {
    const user = new UserModel({
      email: "john.doe@example.com",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
      country: "USA",
    });
    await user.save();

    const searchParameters = new SearchParameters({
      location: "New York",
      lat: 40.7128,
      lng: -74.0060,
      open_now: true,
      min_price: 1,
      max_price: 4,
      radius: 5000,
      category: "restaurant",
      user: user._id,
    });

    await searchParameters.save();
    const savedParameters = await SearchParameters.findOne({
      user: user._id,
    });

    expect(savedParameters.location).toEqual("New York");
    expect(savedParameters.lat).toEqual(40.7128);
    expect(savedParameters.lng).toEqual(-74.0060);
    expect(savedParameters.open_now).toEqual(true);
    expect(savedParameters.min_price).toEqual(1);
    expect(savedParameters.max_price).toEqual(4);
    expect(savedParameters.radius).toEqual(5000);
    expect(savedParameters.category).toEqual("restaurant");
  });

  it("should get search parameters by user ID using getByUserId static method", async () => {
    const user = new UserModel({
      email: "john.doe@example.com",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
      country: "USA",
    });
    await user.save();

    const searchParameters = new SearchParameters({
      location: "New York",
      lat: 40.7128,
      lng: -74.0060,
      open_now: true,
      min_price: 1,
      max_price: 4,
      radius: 5000,
      category: "restaurant",
      user: user._id,
    });

    await searchParameters.save();
    const fetchedParameters = await SearchParameters.getByUserId(user._id);

    expect(fetchedParameters.location).toEqual("New York");
    expect(fetchedParameters.lat).toEqual(40.7128);
    expect(fetchedParameters.lng).toEqual(-74.0060);
    expect(fetchedParameters.open_now).toEqual(true);
    expect(fetchedParameters.min_price).toEqual(1);
    expect(fetchedParameters.max_price).toEqual(4);
    expect(fetchedParameters.radius).toEqual(5000);
    expect(fetchedParameters.category).toEqual("restaurant");
  });
});

const httpMocks = require("node-mocks-http");
const dotenv = require("dotenv");
const { connectInMemoryDB, closeInMemoryDB } = require("./helpers/mongoHelper");
const {
  saveSearchParameters,
  getSearchParameters,
} = require(".././controllers/searchParametersController");
const SearchParameters = require("./../models/searchParameters");

dotenv.config();

const validParams = {
  user: "testUser",
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
    await SearchParameters.deleteMany({});
  });

  it("should save search parameters", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/api/search-parameters",
      body: validParams,
    });

    const res = httpMocks.createResponse();

    await saveSearchParameters(req, res);
    const rawData = res._getData();

    try {
    } catch (error) {}
  });
});

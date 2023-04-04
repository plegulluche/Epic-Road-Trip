const { signUp, signIn, signOut } = require(".././controllers/authController");
const UserModel = require(".././models/userModel");
const httpMocks = require("node-mocks-http");
const { connectInMemoryDB, closeInMemoryDB } = require("./helpers/mongoHelper");

const validUser = {
  firstName: "testuser",
  lastName: "testeur",
  country: "france",
  email: "test@example.com",
  password: "testpassword",
};

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; // 10 seconds

describe("AuthController", () => {
  beforeAll(async () => {
    await connectInMemoryDB();
  });

  afterAll(async () => {
    await closeInMemoryDB();
  });

  beforeEach(async () => {
    await UserModel.deleteMany({});
  });

  it("should successfully sign up a user", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/api/auth/signup",
      body: validUser,
    });

    const res = httpMocks.createResponse();

    // In the "should successfully sign up a user" test
    await signUp(req, res);
    const rawData = res._getData();

    try {
      const data = JSON.parse(rawData);

      expect(res.statusCode).toBe(200);
      expect(data).toHaveProperty("user");
    } catch (error) {
    }
  });

  it("should successfully sign in a user", async () => {
    await UserModel.createUser(validUser);

    const req = httpMocks.createRequest({
      method: "POST",
      url: "/api/auth/signin",
      body: {
        email: validUser.email,
        password: validUser.password,
      },
    });

    const res = httpMocks.createResponse();

    await signIn(req, res);
    const data = JSON.parse(res._getData());

    expect(res.statusCode).toBe(200);
    expect(data).withContext("user");
  });

  it("should successfully sign out a user", async () => {
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/api/auth/signout",
    });

    const res = httpMocks.createResponse();

    await signOut(req, res);

    expect(res.statusCode).toBe(302);
    expect(res._getRedirectUrl()).toBe("/");
  });
});

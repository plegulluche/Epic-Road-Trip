const mongoose = require("mongoose");
const UserModel = require("../models/userModel");
const { connectInMemoryDB, closeInMemoryDB } = require("./helpers/mongoHelper");

describe("UserModel", () => {
  beforeAll(async () => {
    await connectInMemoryDB();
  });

  afterAll(async () => {
    await closeInMemoryDB();
  });

  afterEach(async () => {
    await UserModel.deleteMany({});
  });

  it("should create a new user successfully", async () => {
    const user = {
      email: "john.doe@example.com",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
      country: "USA",
    };

    const createdUser = await UserModel.create(user);

    expect(createdUser.email).toEqual(user.email);
    expect(createdUser.firstName).toEqual(user.firstName);
    expect(createdUser.lastName).toEqual(user.lastName);
    expect(createdUser.country).toEqual(user.country);
    // Password should be hashed
    expect(createdUser.password).not.toEqual(user.password);
  });

  it("should fail to create a user with an invalid email", async () => {
    const user = {
      email: "invalid.email",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
      country: "USA",
    };

    await expect(UserModel.create(user)).rejects.toThrow(
      mongoose.Error.ValidationError
    );
  });

  it("should fail to create a user with a password less than 6 characters", async () => {
    const user = {
      email: "john.doe@example.com",
      password: "pass",
      firstName: "John",
      lastName: "Doe",
      country: "USA",
    };

    await expect(UserModel.create(user)).rejects.toThrow(
      mongoose.Error.ValidationError
    );
  });
  it("should log in the user with valid email and password", async () => {
    const user = {
      email: "john.doe@example.com",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
      country: "USA",
    };

    await UserModel.create(user);
    const loggedInUser = await UserModel.login(user.email, user.password);

    expect(loggedInUser.email).toEqual(user.email);
  });

  it("should fail to log in the user with incorrect email", async () => {
    const user = {
      email: "john.doe@example.com",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
      country: "USA",
    };

    await UserModel.create(user);

    await expect(
      UserModel.login("incorrect.email@example.com", user.password)
    ).rejects.toThrow("incorrect email");
  });
  it("should fail to log in the user with incorrect password", async () => {
    const user = {
      email: "john.doe@example.com",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
      country: "USA",
    };

    await UserModel.create(user);

    await expect(
      UserModel.login(user.email, "incorrectPassword")
    ).rejects.toThrow("incorrect password");
  });

  it("should create a user using createUser static method", async () => {
    const user = {
      email: "john.doe@example.com",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
      country: "USA",
    };

    const createdUser = await UserModel.createUser(user);

    expect(createdUser.email).toEqual(user.email);
    expect(createdUser.firstName).toEqual(user.firstName);
    expect(createdUser.lastName).toEqual(user.lastName);
    expect(createdUser.country).toEqual(user.country);
    // Password should be hashed
    expect(createdUser.password).not.toEqual(user.password);
  });
});

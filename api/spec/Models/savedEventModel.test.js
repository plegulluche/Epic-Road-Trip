const {
  connectInMemoryDB,
  closeInMemoryDB,
} = require(".././helpers/mongoHelper");
const UserModel = require("../../models/userModel");
const SavedEventModel = require("../../models/savedEventModel");

describe("SavedEvent Model", () => {
  beforeAll(async () => {
    await connectInMemoryDB();
  });

  afterAll(async () => {
    await closeInMemoryDB();
  });

  beforeEach(async () => {
    await UserModel.deleteMany({});
    await SavedEventModel.deleteMany({});
  });

  it("should create and save a new saved event", async () => {
    const user = new UserModel({
      email: "john.doe@example.com",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
      country: "USA",
    });
    await user.save();

    const savedEvent = new SavedEventModel({
      relevance: 100,
      id: "event_id",
      title: "Event Title",
      description: "Event Description",
      category: "Event Category",
      labels: ["label1", "label2"],
      rank: 1,
      local_rank: 2,
      aviation_rank: 3,
      phq_attendance: 50,
      entities: [],
      duration: 3600,
      start: new Date(),
      end: new Date(),
      updated: new Date(),
      first_seen: new Date(),
      timezone: "UTC",
      location: [40.7128, -74.006],
      geo: {
        geometry: JSON.stringify({
          coordinates: [40.7128, -74.006],
          type: "Point",
        }),
        placekey: "place_key",
      },
      scope: "scope",
      country: "USA",
      place_hierarchies: [["hierarchy1"], ["hierarchy2"]],
      state: "NY",
      brand_safe: true,
      private: false,
      user: user._id,
    });

    await savedEvent.save();
    const fetchedEvent = await SavedEventModel.findOne({ user: user._id });
    const fetchedGeometry = JSON.parse(fetchedEvent.geo.geometry);

    expect(fetchedEvent.relevance).toEqual(100);
    expect(fetchedEvent.id).toEqual("event_id");
    expect(fetchedEvent.title).toEqual("Event Title");
    expect(fetchedEvent.description).toEqual("Event Description");
    expect(fetchedEvent.category).toEqual("Event Category");
    expect(fetchedEvent.labels).toEqual(["label1", "label2"]);
    expect(fetchedEvent.rank).toEqual(1);
    expect(fetchedEvent.local_rank).toEqual(2);
    expect(fetchedEvent.aviation_rank).toEqual(3);
    expect(fetchedEvent.phq_attendance).toEqual(50);
    expect(fetchedEvent.duration).toEqual(3600);
    expect(fetchedEvent.timezone).toEqual("UTC");
    expect(fetchedEvent.location).toEqual([40.7128, -74.006]);
    expect(fetchedGeometry.coordinates).toEqual([40.7128, -74.006]);
    expect(fetchedGeometry.type).toEqual("Point");
    expect(fetchedEvent.geo.placekey).toEqual("place_key");
    expect(fetchedEvent.scope).toEqual("scope");
    expect(fetchedEvent.country).toEqual("USA");
    expect(fetchedEvent.place_hierarchies).toEqual([
      ["hierarchy1"],
      ["hierarchy2"],
    ]);
    expect(fetchedEvent.state).toEqual("NY");
    expect(fetchedEvent.brand_safe).toEqual(true);
    expect(fetchedEvent.private).toEqual(false);
  });
});

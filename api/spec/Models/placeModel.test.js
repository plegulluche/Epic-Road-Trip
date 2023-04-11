const { connectInMemoryDB, closeInMemoryDB } = require("../helpers/mongoHelper");
const PlaceModel = require("../../models/placeModel");

describe("Place Model", () => {
  beforeAll(async () => {
    await connectInMemoryDB();
  });

  afterAll(async () => {
    await closeInMemoryDB();
  });

  beforeEach(async () => {
    await PlaceModel.deleteMany({});
  });

  it("should create and save a new place", async () => {
    const place = new PlaceModel({
      fsq_id: "12345",
      categories: [
        {
          id: 1,
          name: "Restaurant",
          icon: {
            prefix: "https://example.com/",
            suffix: ".png",
          },
        },
      ],
      chains: ["Chain1", "Chain2"],
      geocodes: {
        drop_off: {
          latitude: 40.7128,
          longitude: -74.006,
        },
        main: {
          latitude: 40.7128,
          longitude: -74.006,
        },
        roof: {
          latitude: 40.7128,
          longitude: -74.006,
        },
      },
      place_images: ["image1.jpg", "image2.jpg"],
      link: "https://example.com/place",
      location: {
        address: "123 Main St",
        admin_region: "AdminRegion",
        country: "USA",
        cross_street: "Cross St",
        formatted_address: "123 Main St, New York, NY 10001, USA",
        locality: "New York",
        postcode: "10001",
        region: "NY",
      },
      name: "Example Place",
      related_places: { place1: "Place 1", place2: "Place 2" },
      timezone: "America/New_York",
    });

    await place.save();
    const fetchedPlace = await PlaceModel.findOne({ fsq_id: "12345" });

    expect(fetchedPlace.fsq_id).toEqual("12345");
    expect(fetchedPlace.categories[0].id).toEqual(1);
    expect(fetchedPlace.categories[0].name).toEqual("Restaurant");
    expect(fetchedPlace.categories[0].icon.prefix).toEqual("https://example.com/");
    expect(fetchedPlace.categories[0].icon.suffix).toEqual(".png");
    expect(fetchedPlace.chains).toEqual(["Chain1", "Chain2"]);
    expect(fetchedPlace.geocodes.drop_off.latitude).toEqual(40.7128);
    expect(fetchedPlace.geocodes.drop_off.longitude).toEqual(-74.006);
    expect(fetchedPlace.geocodes.main.latitude).toEqual(40.7128);
    expect(fetchedPlace.geocodes.main.longitude).toEqual(-74.006);
    expect(fetchedPlace.geocodes.roof.latitude).toEqual(40.7128);
    expect(fetchedPlace.geocodes.roof.longitude).toEqual(-74.006);
    expect(fetchedPlace.place_images).toEqual(["image1.jpg", "image2.jpg"]);
    expect(fetchedPlace.link).toEqual("https://example.com/place");
    expect(fetchedPlace.location.address).toEqual("123 Main St");
    expect(fetchedPlace.location.admin_region).toEqual("AdminRegion");
    expect(fetchedPlace.location.country).toEqual("USA");
    expect(fetchedPlace.location.cross_street).toEqual("Cross St");
    expect(fetchedPlace.location.formatted_address).toEqual("123 Main St, New York, NY 10001, USA");
    expect(fetchedPlace.location.locality).toEqual("New York");
    expect(fetchedPlace.location.postcode).toEqual("10001");
    expect(fetchedPlace.location.region).toEqual("NY");
    expect(fetchedPlace.name).toEqual("Example Place");
    expect(fetchedPlace.related_places).toEqual({ place1: "Place 1", place2: "Place 2" });
    expect(fetchedPlace.timezone).toEqual("America/New_York");
  });
});

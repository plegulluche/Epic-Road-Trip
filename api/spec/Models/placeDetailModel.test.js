const { connectInMemoryDB, closeInMemoryDB } = require("../helpers/mongoHelper");
const PlaceDetails = require("../../models/placeDetailModel");

describe("PlaceDetails Model", () => {
    beforeAll(async () => {
        await connectInMemoryDB();
      });
    
      afterAll(async () => {
        await closeInMemoryDB();
      });
    
      beforeEach(async () => {
        await PlaceDetails.deleteMany({});
      });

  it("should create and save a new place details", async () => {
    const placeDetailsData = new PlaceDetails({
      fsq_id: "12345",
      categories: [
        {
          id: 1,
          name: "Category 1",
          icon: {
            prefix: "https://example.com/",
            suffix: ".png",
          },
        },
      ],
      chains: ["Chain 1", "Chain 2"],
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
      static_map_url: "https://example.com/static_map",
      place_images: [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg",
      ],
      link: "https://example.com/place_details",
      location: {
        address: "123 Main St",
        admin_region: "New York",
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

    const savedPlaceDetails = await placeDetailsData.save();
    const fetchedPlaceDetails = await PlaceDetails.findById(
      savedPlaceDetails._id
    );

    expect(fetchedPlaceDetails.fsq_id).toEqual("12345");
    expect(fetchedPlaceDetails.categories.length).toEqual(1);
    expect(fetchedPlaceDetails.categories[0].id).toEqual(1);
    expect(fetchedPlaceDetails.categories[0].name).toEqual("Category 1");
    expect(fetchedPlaceDetails.categories[0].icon.prefix).toEqual(
      "https://example.com/"
    );
    expect(fetchedPlaceDetails.categories[0].icon.suffix).toEqual(".png");
    expect(fetchedPlaceDetails.chains).toEqual(["Chain 1", "Chain 2"]);
    expect(fetchedPlaceDetails.geocodes.drop_off.latitude).toEqual(40.7128);
    expect(fetchedPlaceDetails.geocodes.drop_off.longitude).toEqual(-74.006);
    expect(fetchedPlaceDetails.geocodes.main.latitude).toEqual(40.7128);
    expect(fetchedPlaceDetails.geocodes.main.longitude).toEqual(-74.006);
    expect(fetchedPlaceDetails.geocodes.roof.latitude).toEqual(40.7128);
    expect(fetchedPlaceDetails.geocodes.roof.longitude).toEqual(-74.006);
    expect(fetchedPlaceDetails.static_map_url).toEqual(
      "https://example.com/static_map"
    );
    expect(fetchedPlaceDetails.place_images).toEqual([
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
    ]);
    expect(fetchedPlaceDetails.link).toEqual(
      "https://example.com/place_details"
    );
    expect(fetchedPlaceDetails.location.address).toEqual("123 Main St");
    expect(fetchedPlaceDetails.location.admin_region).toEqual("New York");
    expect(fetchedPlaceDetails.location.country).toEqual("USA");
    expect(fetchedPlaceDetails.location.cross_street).toEqual("Cross St");
    expect(fetchedPlaceDetails.location.formatted_address).toEqual(
      "123 Main St, New York, NY 10001, USA"
    );
    expect(fetchedPlaceDetails.location.locality).toEqual("New York");
    expect(fetchedPlaceDetails.location.postcode).toEqual("10001");
    expect(fetchedPlaceDetails.location.region).toEqual("NY");
    expect(fetchedPlaceDetails.name).toEqual("Example Place");
    expect(fetchedPlaceDetails.related_places).toEqual({
      place1: "Place 1",
      place2: "Place 2",
    });
    expect(fetchedPlaceDetails.timezone).toEqual("America/New_York");
  });
});

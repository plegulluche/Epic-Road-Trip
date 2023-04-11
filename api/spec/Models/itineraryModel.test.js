const { connectInMemoryDB, closeInMemoryDB } = require('../helpers/mongoHelper');
const Itinerary = require('../../models/itineraryModel');
const Place = require('../../models/placeModel');

beforeAll(async () => {
  await connectInMemoryDB();
});

afterAll(async () => {
  await closeInMemoryDB();
});

describe('Itinerary', () => {
  it('should create a new itinerary', async () => {
    const place1 = new Place({
      fsq_id: 'place123',
      geocodes: {
        main: {
          latitude: 3,
          longitude: 4,
        },
      },
    });

    const itinerary = new Itinerary({
      user_id: 'user123',
      itinerary_name: 'My itinerary',
      itinerary_description: 'This is my itinerary',
      itinerary_places: [place1],
    });

    const savedItinerary = await itinerary.save();
    expect(savedItinerary._id).toBeDefined();
    expect(savedItinerary.user_id).toBe('user123');
    expect(savedItinerary.itinerary_name).toBe('My itinerary');
    expect(savedItinerary.itinerary_description).toBe('This is my itinerary');
    expect(savedItinerary.itinerary_places.length).toBe(1);
    expect(savedItinerary.itinerary_places[0].fsq_id).toBe('place123');
    expect(savedItinerary.itinerary_places[0].geocodes.main.latitude).toBe(3);
    expect(savedItinerary.itinerary_places[0].geocodes.main.longitude).toBe(4);
  });
});

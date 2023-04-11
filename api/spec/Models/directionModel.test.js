const mongoose = require("mongoose");
const Direction = require("../../models/directionsModel");
const {
  connectInMemoryDB,
  closeInMemoryDB,
} = require("../helpers/mongoHelper");

beforeAll(async () => {
  await connectInMemoryDB();
});

afterAll(async () => {
  await closeInMemoryDB();
});

describe("Direction", () => {
  it("should create a new direction", async () => {
    const direction = new Direction({
      bbox: [1, 2, 3, 4],
      routes: [
        {
          summary: {
            distance: 1000,
            duration: 600,
          },
          segments: [
            {
              distance: 500,
              duration: 300,
              steps: [
                {
                  distance: 200,
                  duration: 120,
                  instruction: "Turn left",
                  name: "Main St",
                  way_points: [0, 1],
                },
              ],
            },
          ],
          bbox: [1, 2, 3, 4],
          geometry: "xyz",
          way_points: [0, 1],
        },
      ],
      metadata: {
        query: {
          coordinates: [
            [1, 2],
            [3, 4],
          ],
          profile: "driving",
        },
      },
      user: new mongoose.Types.ObjectId(),
      saved: false,
    });

    const savedDirection = await direction.save();
    expect(savedDirection._id).toBeDefined();
    expect(savedDirection.bbox).toEqual([1, 2, 3, 4]);
    expect(savedDirection.routes.length).toBe(1);
    expect(savedDirection.routes[0].summary.distance).toBe(1000);
    expect(savedDirection.routes[0].summary.duration).toBe(600);
    expect(savedDirection.routes[0].segments.length).toBe(1);
    expect(savedDirection.routes[0].segments[0].distance).toBe(500);
    expect(savedDirection.routes[0].segments[0].duration).toBe(300);
    expect(savedDirection.routes[0].segments[0].steps.length).toBe(1);
    expect(savedDirection.routes[0].segments[0].steps[0].distance).toBe(200);
    expect(savedDirection.routes[0].segments[0].steps[0].duration).toBe(120);
    expect(savedDirection.routes[0].segments[0].steps[0].instruction).toBe(
      "Turn left"
    );
    expect(savedDirection.routes[0].segments[0].steps[0].name).toBe("Main St");
    expect(savedDirection.routes[0].segments[0].steps[0].way_points).toEqual([
      0, 1,
    ]);
    expect(savedDirection.routes[0].bbox).toEqual([1, 2, 3, 4]);
    expect(savedDirection.routes[0].geometry).toBe("xyz");
    expect(savedDirection.routes[0].way_points).toEqual([0, 1]);
    expect(savedDirection.metadata.query.coordinates).toEqual([
      [1, 2],
      [3, 4],
    ]);
    expect(savedDirection.metadata.query.profile).toBe("driving");
  });

  it("should find multiple directions", async () => {
    await mongoose.connection.dropDatabase();

    const direction1 = new Direction({
      bbox: [1, 2, 3, 4],
      routes: [
        {
          summary: {
            distance: 1000,
            duration: 600,
          },
          segments: [
            {
              distance: 500,
              duration: 300,
              steps: [
                {
                  distance: 200,
                  duration: 120,
                  instruction: "Turn left",
                  name: "Main St",
                  way_points: [0, 1],
                },
              ],
            },
          ],
          bbox: [1, 2, 3, 4],
          geometry: "xyz",
          way_points: [0, 1],
        },
      ],
      metadata: {
        query: {
          coordinates: [
            [1, 2],
            [3, 4],
          ],
          profile: "driving",
        },
      },
      user: new mongoose.Types.ObjectId(),
      saved: false,
    });

    const direction2 = new Direction({
      bbox: [5, 6, 7, 8],
      routes: [
        {
          summary: {
            distance: 2000,
            duration: 1200,
          },
          segments: [
            {
              distance: 1000,
              duration: 600,
              steps: [
                {
                  distance: 500,
                  duration: 300,
                  instruction: "Turn right",
                  name: "Broadway",
                  way_points: [0, 1],
                },
              ],
            },
          ],
          bbox: [5, 6, 7, 8],
          geometry: "abc",
          way_points: [0, 1],
        },
      ],
      metadata: {
        query: {
          coordinates: [
            [5, 6],
            [7, 8],
          ],
          profile: "walking",
        },
      },
      user: new mongoose.Types.ObjectId(),
      saved: true,
    });

    await direction1.save();
    await direction2.save();

    const directions = await Direction.find();
    expect(directions.length).toBe(2);
    expect(directions[0].bbox).toEqual([1, 2, 3, 4]);
    expect(directions[0].routes.length).toBe(1);
    expect(directions[0].metadata.query.coordinates).toEqual([
      [1, 2],
      [3, 4],
    ]);
    expect(directions[1].bbox).toEqual([5, 6, 7, 8]);
    expect(directions[1].routes.length).toBe(1);
    expect(directions[1].metadata.query.coordinates).toEqual([
      [5, 6],
      [7, 8],
    ]);
  });
});

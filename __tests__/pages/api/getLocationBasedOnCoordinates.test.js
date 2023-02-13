import axios from "axios";

describe("API Resonse using Latitude and Longitude coordinates from openstreetapi", () => {
  async function mockRequestResponse() {
    const [ coordinateXLat, coordinateYLat, coordinateXLong, coordinateYLong ] = [69, 69, 72, 72];
    const query = `[out:json];(way[building](${coordinateXLat},${coordinateYLat},${coordinateXLong},${coordinateYLong}););out;`;
    const url = `http://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    const { data: mockResponse } = await axios.get(url);
    const req = {
      body: {
        coordinateXLat,
        coordinateXLong,
        coordinateYLat,
        coordinateYLong
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: mockResponse,
    };
    return { req, res };
  }

  it("should return a successful response from Open Street Api", async () => {
    const { req, res } = await mockRequestResponse();
    const firstObjectTag = res.json.elements[0].tags;
    expect(firstObjectTag.building).toBe("yes")
  });
});

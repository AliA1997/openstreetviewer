import axios from "axios";

describe("API Resonse using Latidude and Longitude from openstreetapi", () => {
  async function mockRequestResponse() {
    const mockLat = 40.7831;
    const mockLong = -73.971321;
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${mockLat}&lon=${mockLong}`;
    const { data: mockResponse } = await axios.get(url);
    const req = {
      body: {
        lat: mockLat,
        long: mockLong,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: mockResponse,
    };
    return { req, res };
  }
  let expectedCity = 'New York';
  let expectedStreetName = 'West 82nd Street';

  it("should return a successful response from Open Street Api", async () => {
    const { req, res } = await mockRequestResponse();
    const openStreetData = res.json.address;
    expect(openStreetData.city).toBe(expectedCity);
    expect(openStreetData.road).toBe(expectedStreetName);
  });
});

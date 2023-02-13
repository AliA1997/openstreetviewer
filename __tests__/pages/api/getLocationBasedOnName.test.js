import axios from "axios";

describe("API Resonse using Location from openstreetapi", () => {
  async function mockRequestResponse() {
    const mockLocation = "St. Petersburg, FL";
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      mockLocation
    )}&format=json&limit=1`;
    const { data: mockResponse } = await axios.get(url);
    const req = {
      body: {
        location: "St. Petersburg, FL",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: mockResponse,
    };
    return { req, res };
  }
  let expectedDisplayName = 'Saint Petersburg, Pinellas County, Florida, United States';
  let expeectedLat = '27.7703796';
  let expectedLong = '-82.6695085';

  it("should return a successful response from Open Street Api", async () => {
    const { req, res } = await mockRequestResponse();
    const openStreetData = res.json[0];
    expect(openStreetData.display_name).toBe(expectedDisplayName);
    expect(openStreetData.lat).toBe(expeectedLat);
    expect(openStreetData.lon).toBe(expectedLong);
  });
});

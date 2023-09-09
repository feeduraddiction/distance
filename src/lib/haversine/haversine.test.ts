import { haversine } from "../../lib/haversine";
import { CITIES } from "../../mocks/cities";

describe("haversine function", () => {
  it.each(CITIES)(
    "should calculate distance between two points correctly for %s",
    (cityName, lat1, lon1) => {
      const [otherCityName, lat2, lon2] =
        CITIES[Math.floor(Math.random() * CITIES.length)];
      const expectedDistance = calculateExpectedDistance(
        lat1,
        lon1,
        lat2,
        lon2
      );
      const calculatedDistance = haversine(lat1, lon1, lat2, lon2);
      expect(calculatedDistance).toBeCloseTo(expectedDistance, 2);
    }
  );
});

function calculateExpectedDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const toRadians = (angle: number) => (angle * Math.PI) / 180;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = 6371 * c;

  return distance;
}

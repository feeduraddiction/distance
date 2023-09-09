import { haversine } from "../../lib/haversine";
import findDistances from "../distance";

jest.mock("../../lib", () => ({
  delay: async (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms)),
}));

describe("findDistances", () => {
  it("should calculate distances and total distance correctly", async () => {
    const origin = "Paris";
    const destinations = ["Marseille", "Lyon", "Toulouse"];

    const expectedDistances = [
      haversine(48.856614, 2.352222, 43.296482, 5.36978),
      haversine(43.296482, 5.36978, 45.764043, 4.835659),
      haversine(45.764043, 4.835659, 43.604652, 1.444209),
    ];
    const expectedTotalDistance = expectedDistances.reduce(
      (acc, distance) => acc + distance,
      0
    );
    const result = await findDistances(origin, destinations);

    expect(result.distances).toEqual(expectedDistances);
    expect(result.totalDistance).toEqual(expectedTotalDistance);
  });

  it("should throw an error if Dijon is included in destinations", async () => {
    const origin = "Paris";
    const destinations = ["Marseille", "Lyon", "Dijon"];
    await expect(findDistances(origin, destinations)).rejects.toThrow(
      "City Dijon is forbidden"
    );
  });

  it("should throw an error if a destination city is not found in CITIES", async () => {
    const origin = "Paris";
    const destinations = ["Marseille", "Lyon", "UnknownCity"];
    await expect(findDistances(origin, destinations)).rejects.toThrow(
      '"UnknownCity" not found'
    );
  });
});

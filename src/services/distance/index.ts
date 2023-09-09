import { delay } from "../../lib";
import { haversine } from "../../lib/haversine";
import { CITIES } from "../../mocks/cities";

async function findDistances(
  origin: string,
  destinations: string[]
): Promise<{ distances: number[]; totalDistance: number | null }> {
  try {
    await delay(1000);
    destinations.unshift(origin);

    if (destinations.includes("Dijon")) {
      throw new Error("City Dijon is forbidden");
    }

    const newDistances: number[] = [];
    let totalDistance = 0;

    for (let i = 1; i < destinations.length; i++) {
      const city2Name = destinations[i];
      const city1 = CITIES.find((city) => city[0].toLowerCase() === destinations[i - 1].toLowerCase());
      const city2 = CITIES.find((city) => city[0].toLowerCase() === city2Name.toLowerCase());

      if (city1 && city2) {
        const distance = haversine(city1[1], city1[2], city2[1], city2[2]);
        newDistances.push(distance);
        totalDistance += distance;
      } else {
        throw new Error(` "${city2Name}" not found`);
      }
    }

    return { distances: newDistances, totalDistance };
  } catch (error) {
    throw error;
  }
}

export default findDistances;

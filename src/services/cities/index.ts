import { delay } from "../../lib";
import { CITIES } from "../../mocks/cities";

export const getCities = async (keyword: string) => {
  try {
    await delay(1000);

    if (!keyword) {
      return [];
    }

    if (keyword.trim().toLowerCase() === "fail") {
      throw new Error("Oops! Failed to search with this keyword. ");
    }

    return CITIES.filter(([cityName]) =>
      cityName.toLowerCase().trim().includes(keyword.toLowerCase())
    ).map(([cityName]) => cityName);
  } catch (error) {
    throw error;
  }
};

export const validateCities = async (
  origin: string,
  destinations: { cityName: string }[]
) => {
  await delay(500);

  const cities = CITIES.map(([city]) => city);

  if (!cities.includes(origin)) {
    return -2;
  }

  const unvalidCityIndex = destinations.findIndex((destination) =>
   !cities.includes(destination.cityName)
  );

  if (unvalidCityIndex >= 0) {
    return unvalidCityIndex;
  }
};

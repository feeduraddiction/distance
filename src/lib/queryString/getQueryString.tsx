import queryString from "query-string";
import { DestinationsForm } from "../../schema/form";

export const getMappedQueryString = (data: DestinationsForm) => {
  const destinationsString = data.destinations
    ? data.destinations.map((destination) => destination.cityName).join(",")
    : "";
  const updatedData = { ...data, destinations: destinationsString };
  return queryString.stringify(updatedData);
};

import { useSearchParams } from "react-router-dom";
import { DestinationsForm } from "../../../../schema/form";
import { validateCities } from "../../../../services/cities";

export const useSearch = () => {
  const [searchParams] = useSearchParams();

  const getDestinationSearchParams = () => {
    if (searchParams.get("destinations") === null) {
      return [{ cityName: "" }];
    }
    return searchParams
      .get("destinations")
      ?.split(",")
      .map((cityName) => {
        return {
          cityName,
        };
      });
  };

  const defaultValues: DestinationsForm = {
    origin: searchParams.get("origin") || "",
    date: searchParams.get("date") || "",
    passengers: +searchParams.get("passengers")! || 0,
    destinations: getDestinationSearchParams(),
  };

  const validateCityNames = async (
    data: DestinationsForm
  ): Promise<{
    key: "origin" | `destinations.${number}.cityName`;
    message: string;
  } | null> => {
    const invalidIndex = await validateCities(
      data.origin,
      data.destinations || []
    );

    if (invalidIndex && invalidIndex === -2) {
      return { key: "origin", message: "City is not valid" };
    }

    if (invalidIndex !== undefined && invalidIndex >= 0) {
      return {
        key: `destinations.${invalidIndex}.cityName`,
        message: "City is not valid",
      };
    }
    return null;
  };

  return {
    defaultValues,
    validateCityNames,
  };
};

import { useState, useRef, useEffect } from "react";
import { RoutesEnum } from "../../../../schema/routes";
import findDistances from "../../../../services/distance";
import { DestinationsForm } from "../../../../schema/form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getMappedQueryString } from "../../../../lib/queryString/getQueryString";

export const useSearchResultsData = () => {
  const navigate = useNavigate();
  const [distances, setDistances] = useState<number[]>([]);
  const [totalDistance, setTotalDistance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const loadingRef = useRef(true);
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date") || "";
  
  const localDate = new Date(date).toLocaleDateString(
    "en-EN",
    { month: "short", day: "2-digit", year: "numeric" }
  );
  const passengers = +searchParams.get("passengers")! || 0;
  const destinations = searchParams.get("destinations")?.split(",") || [];
  const origin = searchParams.get("origin") || "";

  const data: DestinationsForm = {
    origin,
    date,
    passengers,
    destinations: destinations.map((cityName) => {
      return {
        cityName,
      };
    }),
  };

  const backQueryString = getMappedQueryString(data);

  useEffect(() => {
    const getDistances = async () => {
      try {
        const { distances, totalDistance } = await findDistances(
          origin,
          destinations
        );
        setDistances(distances);
        setTotalDistance(totalDistance);
        loadingRef.current = false;
      } catch (error: any) {
        setError(error.message);
        loadingRef.current = false;
      }
    };
    getDistances();
  }, []);

  const navigateBack = () => {
    navigate(RoutesEnum.HOME + `?${backQueryString}`);
  };

  return {
    distances,
    totalDistance,
    error,
    loadingRef,
    passengers,
    destinations,
    origin,
    localDate,
    navigateBack,
  };
};

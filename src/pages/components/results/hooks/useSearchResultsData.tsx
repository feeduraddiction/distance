import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import findDistances from "../../../../services/distance";

export const useSearchResultsData = () => {
  const [distances, setDistances] = useState<number[]>([]);
  const [totalDistance, setTotalDistance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const loadingRef = useRef(true);
  const [searchParams] = useSearchParams();
  const date = new Date(searchParams.get("date") || "").toLocaleDateString(
    "en-EN",
    { month: "short", day: "2-digit", year: "numeric" }
  );
  const passangers = +searchParams.get("passangers")! || 0;
  const destinations = searchParams.get("destinations")?.split(",") || [];
  const origin = searchParams.get("origin") || "";

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

  return {
    distances,
    totalDistance,
    error,
    loadingRef,
    passangers,
    destinations,
    origin,
    date,
  };
};

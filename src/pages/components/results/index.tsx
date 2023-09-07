import { useNavigate } from "react-router-dom";
import classes from "./styles.module.scss";
import { Button } from "../../../shared/button";
import { DistanceResults } from "./components/distance";
import { DestinationResult } from "./components/destination";
import { useSearchResultsData } from "./hooks/useSearchResultsData";

export const Results = () => {
  const navigate = useNavigate();
  const {
    error,
    date,
    destinations,
    distances,
    totalDistance,
    loadingRef,
    origin,
    passangers,
  } = useSearchResultsData();

  if (error) {
    return (
      <div className={classes.resultsError}>
        Something went wrong
        <Button onClick={() => navigate(-1)}>Back</Button>
      </div>
    );
  }

  return loadingRef.current ? (
    <div className={classes.resultsLoading}>Loading</div>
  ) : (
    <div className={classes.results}>
      <div className={classes.destinationsWrapper}>
        <div className={classes.distances}>
          {distances.map((distance) => (
            <DistanceResults distance={distance} />
          ))}
        </div>
        <div className={classes.destinations}>
          <DestinationResult isLast={false} destination={origin} />
          {destinations?.map((destination, index, array) => (
            <DestinationResult
              destination={destination}
              isLast={index === array.length - 1}
            />
          ))}
        </div>
      </div>
      <div className={classes.summary}>
        <h5>
          {totalDistance?.toFixed(2)} <span>is total distance</span>
        </h5>

        <h5>
          {passangers}
          <span>{`${passangers > 1 ? " passangers" : " passanger"}`}</span>
        </h5>
        <h5>{date}</h5>
      </div>
      <div className={classes.controls}>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </div>
    </div>
  );
};

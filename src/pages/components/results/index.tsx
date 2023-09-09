import classes from "./styles.module.scss";
import { DistanceResults } from "./components/distance";
import { DestinationResult } from "./components/destination";
import { useSearchResultsData } from "./hooks/useSearchResultsData";
import { Loader, Button } from "../../../shared";

export const Results = () => {
  const {
    error,
    localDate,
    destinations,
    distances,
    totalDistance,
    loadingRef,
    origin,
    passengers,
    navigateBack,
  } = useSearchResultsData();

  if (error) {
    return (
      <div className={classes.resultsError}>
        Something went wrong
        <Button onClick={navigateBack}>Back</Button>
      </div>
    );
  }

  return loadingRef.current ? (
    <div className={classes.resultsLoading}>
      Calculating... <Loader />
    </div>
  ) : (
    <div className={classes.results}>
      <div className={classes.destinationsWrapper}>
        <div className={classes.distances}>
          {distances.map((distance) => (
            <DistanceResults key={Math.random()} distance={distance} />
          ))}
        </div>
        <div className={classes.destinations}>
          <DestinationResult isLast={false} destination={origin} />
          {destinations?.map((destination, index, array) => (
            <DestinationResult
              key={Math.random()}
              destination={destination}
              isLast={index === array.length - 1}
            />
          ))}
        </div>
      </div>
      <div className={classes.summary}>
        <h5>
          {totalDistance?.toFixed(2)} km <span>is total distance</span>
        </h5>

        <h5>
          {passengers}
          <span>{`${passengers > 1 ? " passengers" : " passanger"}`}</span>
        </h5>
        <h5>{localDate}</h5>
      </div>
      <div className={classes.controls}>
        <Button onClick={navigateBack}>Back</Button>
      </div>
    </div>
  );
};

import classes from "./styles.module.scss";

export const DistanceResults = ({ distance }: { distance: number }) => {
  return <div className={classes.distance}>{distance.toFixed(2)} km</div>;
};

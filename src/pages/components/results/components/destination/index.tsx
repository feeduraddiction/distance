import { PinIcon } from "../../../../../assets/img/svg";
import { firstLetterUppercase } from "../../../../../lib";
import classes from "./styles.module.scss";

interface DestinationResultProps {
  destination: string;
  isLast: boolean;
}

export const DestinationResult = ({
  destination,
  isLast,
}: DestinationResultProps) => {
  return (
    <>
      <div className={classes.destination}>
        {isLast ? <PinIcon /> : <div className={classes.circle}></div>}
        <h5>{firstLetterUppercase(destination)}</h5>
      </div>
      {!isLast && <div className={classes.boxSeparator}></div>}
    </>
  );
};

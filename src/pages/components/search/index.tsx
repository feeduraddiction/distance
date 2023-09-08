import { getCities, validateCities } from "../../../services/cities";
import { yupResolver } from "@hookform/resolvers/yup";
import { BaseSyntheticEvent } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Select } from "../../../shared/select";
import { citiesFormSchema } from "../../../schema/form";
import classes from "./styles.module.scss";
import queryString from "query-string";
import { Input } from "../../../shared/input";
import { Button } from "../../../shared/button";
import { CrossIcon } from "../../../assets/img/svg";
import { RoutesEnum } from "../../../schema/routes";
import { updateQueryString } from "../../../lib/updateQueryString";

interface DestinationsForm {
  origin: string;
  destinations?: { cityName: string }[];
  date: string;
  passengers: number;
}

export const Search = () => {
  const navigate = useNavigate();
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

  const {
    handleSubmit,
    register,
    setValue,
    control,
    getValues,
    setError,
    formState: { errors, isValid },
  } = useForm<DestinationsForm>({
    resolver: yupResolver(citiesFormSchema),
    defaultValues,
  });
  const onSubmit: SubmitHandler<DestinationsForm> = async (data) => {
    const destinationsString = data.destinations
      ? data.destinations.map((destination) => destination.cityName).join(",")
      : "";
    const updatedData = { ...data, destinations: destinationsString };
    const queryStringData = queryString.stringify(updatedData);

    const invalidIndex = await validateCities(
      data.origin,
      data.destinations || []
    );

    if (invalidIndex && invalidIndex === -2) {
      setError("origin", { message: "City is not valid" });
      return;
    }
    if (invalidIndex !== undefined && invalidIndex >= 0) {
      setError(`destinations.${invalidIndex}.cityName`, {
        message: "City is not valid",
      });
      return;
    }

    navigate(RoutesEnum.SEARCH_RESULTS + `?${queryStringData}`);
  };

  const selectOriginOptionHandler = (value: string) => {
    setValue("origin", value);
    updateQueryString("origin", value);
  };

  const selectDestinationsOptionHandler = (value: string, index: number) => {
    setValue(`destinations.${index}.cityName`, value);
    updateDestinationsQueryString();
  };

  const updateDestinationsQueryString = () => {
    updateQueryString(
      "destinations",
      getValues("destinations")
        ?.map((destination) => destination.cityName)
        .join(",") as string
    );
  };

  const changeInputHandler = (name: string) => (event: BaseSyntheticEvent) => {
    const { value } = event.currentTarget;
    updateQueryString(name, value);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "destinations" as never,
  });

  return (
    <div className={classes.search}>
      <form
        id="destinations"
        onSubmit={handleSubmit(onSubmit)}
        className={classes.form}
      >
        <div className={classes.destinationInputs}>
          <div className={classes.input}>
            <Select
              label="City of Origin"
              register={register}
              name="origin"
              loadingFn={getCities}
              onSelect={selectOriginOptionHandler}
              errorMessage={errors.origin?.message}
            />
          </div>
          {fields.map((item, index) => (
            <div
              key={item.id}
              className={`${classes.input} ${classes.destinationsInput}`}
            >
              <Select
                label="City of Destination"
                register={register}
                name={`destinations.${index}.cityName`}
                loadingFn={getCities}
                onSelect={(e) => selectDestinationsOptionHandler(e, index)}
                errorMessage={errors.destinations?.[index]?.cityName?.message}
              />
              {index > 0 && (
                <div className={classes.remove}>
                  <Button
                    variant="blank"
                    onClick={() => {
                      remove(index);
                      updateDestinationsQueryString();
                    }}
                  >
                    <CrossIcon />
                  </Button>
                </div>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="blank"
            onClick={() => append({ cityName: "" })}
          >
            Add destination
          </Button>
        </div>
        <div className={classes.dateAndPassengers}>
          <div className={classes.input}>
            <Input
              name="passengers"
              register={register}
              type="number"
              label="Passengers"
              onChange={changeInputHandler("passengers")}
              errorMessage={errors.passengers?.message}
            />
          </div>
          <div className={classes.input}>
            <Input
              name="date"
              register={register}
              type="date"
              label="Date"
              onChange={changeInputHandler("date")}
              errorMessage={errors.date?.message}
            />
          </div>
        </div>
      </form>
      <div className={classes.submit}>
        <Button type="submit" form="destinations" disabled={!isValid}>
          Submit
        </Button>
      </div>
    </div>
  );
};

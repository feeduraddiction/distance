import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { BaseSyntheticEvent } from "react";
import { DestinationsForm, citiesFormSchema } from "../../../schema/form";
import { getMappedQueryString, updateQueryString } from "../../../lib";
import { Button, Input, Loader, Select } from "../../../shared";
import { getCities } from "../../../services/cities";
import { CrossIcon } from "../../../assets/img/svg";
import { RoutesEnum } from "../../../schema/routes";
import { useSearch } from "./hooks/useSearch";
import classes from "./styles.module.scss";

export const Search = () => {
  const navigate = useNavigate();
  const { defaultValues, validateCityNames } = useSearch();

  const {
    handleSubmit,
    register,
    setValue,
    control,
    getValues,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<DestinationsForm>({
    resolver: yupResolver(citiesFormSchema),
    mode: "onTouched",
    defaultValues,
  });
  const onSubmit: SubmitHandler<DestinationsForm> = async (data) => {
    const queryStringData = getMappedQueryString(data);

    const invalidFields = await validateCityNames(data);
    if (invalidFields) {
      setError(invalidFields.key, { message: invalidFields.message });
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
            id="add-new-destination"
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
        <Button
          type="submit"
          form="destinations"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? (
            <div className={classes.loaderContainer}>
              <Loader />
            </div>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </div>
  );
};

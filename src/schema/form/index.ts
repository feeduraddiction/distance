import * as yup from "yup";

export const citiesFormSchema = yup.object({
  origin: yup.string().required("City of origin is required"),
  destinations: yup.array().of(
    yup.object({
      cityName: yup.string().required("City of destination is required"),
    })
  ),
  date: yup.string().required("Date is required"),
  passangers: yup
    .number()
    .typeError("Passagners must be a number")
    .required("Passangers required")
    .min(1, "Minimum 1 passager"),
});

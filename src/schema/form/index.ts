import * as yup from "yup";

export const citiesFormSchema = yup.object({
  origin: yup.string().required("City of origin is required"),
  destinations: yup.array().of(
    yup.object({
      cityName: yup
        .string()
        .required("City of destination is required")
        .matches(/\w/i),
    })
  ),
  date: yup.string().required("Date is required"),
  passengers: yup
    .number()
    .typeError("Passegners must be a number")
    .required("Passengers required")
    .integer("Passengers must be not decimal number")
    .min(1, "Minimum 1 passager"),
});

export interface DestinationsForm {
  origin: string;
  destinations?: { cityName: string }[];
  date: string;
  passengers: number;
}

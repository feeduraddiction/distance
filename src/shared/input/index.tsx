import { BaseSyntheticEvent } from "react";
import classes from "./styles.module.scss";

interface InputProps {
  name: string;
  value?: string | number;
  onChange?: (event: BaseSyntheticEvent) => void;
  register: any;
  label?: string;
  errorMessage?: string;
  type?: "text" | "number" | "date";
  onBlur?: (event: BaseSyntheticEvent) => void;
}

export const Input = ({
  name,
  onChange,
  register,
  value,
  label,
  errorMessage,
  type = "text",
  onBlur,
}: InputProps) => {
  return (
    <div
      className={
        errorMessage ? `${classes.error} ${classes.input}` : `${classes.input}`
      }
    >
      <label htmlFor={name}>{label}</label>
      <input
        min={
          type === "date" ? new Date().toISOString().split("T")[0] : undefined
        }
        autoComplete="off"
        id={name}
        type={type}
        {...register(name, { onChange, value, onBlur })}
      />
      {errorMessage ? (
        <p className={classes.errorMessage}>{errorMessage}</p>
      ) : (
        <br />
      )}
    </div>
  );
};

import { ReactNode } from "react";
import classes from "./styles.module.scss";

interface ButtonProps {
  children: ReactNode | ReactNode[];
  variant?: "blank" | "filled";
  type?: "submit" | "button";
  form?: string;
  disabled?: boolean;
  onClick?: () => void;
  id?: string;
}

export const Button = ({
  children,
  variant = "filled",
  type = "button",
  form,
  disabled = false,
  onClick,
  id,
}: ButtonProps) => {
  return (
    <button
      id={id}
      onClick={onClick}
      disabled={disabled}
      type={type}
      form={form}
      className={`${classes.button} ${classes[variant]}`}
    >
      {children}
    </button>
  );
};

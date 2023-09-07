import { BaseSyntheticEvent, useState } from "react";
import { Input } from "../input";
import { debounce } from "lodash";
import classes from "./styles.module.scss";

interface SelectProps {
  value?: string;
  name: string;
  register: any;
  loadingFn: (keyword: string) => Promise<string[]>;
  onSelect: (value: string) => void;
  errorMessage?: string;
  label?: string;
}

export const Select = ({
  value,
  name,
  register,
  loadingFn,
  onSelect,
  errorMessage,
  label,
}: SelectProps) => {
  const [data, setData] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getData = async (keyword: string) => {
    try {
      setLoading(true);
      const res = await loadingFn(keyword);
      setData(res);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const chageCitySearchHandler = (event: BaseSyntheticEvent) => {
    const { value } = event.currentTarget;
    getData(value);
    setInputValue(value);
    setError(null);
  };

  return (
    <div className={classes.select}>
      <Input
        value={value}
        register={register}
        name={name}
        onChange={chageCitySearchHandler}
        errorMessage={errorMessage}
        label={label}
      />
      {inputValue && !errorMessage && (
        <div className={classes.options}>
          {error && <p>{error}</p>}
          {loading && <p>Loading</p>}
          {!loading &&
            !!data.length &&
            !error &&
            data.map((item) => (
              <button
                className={classes.option}
                key={item}
                onClick={() => {
                  console.log("hm");
                  onSelect(item);
                  setInputValue("");
                }}
              >
                {item}
              </button>
            ))}
          {!loading && !data.length && !error && <p>No results found</p>}
        </div>
      )}
    </div>
  );
};

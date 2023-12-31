import {
  BaseSyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Input } from "../input";
import classes from "./styles.module.scss";
import { useClickOutside } from "../../lib/hooks";
import { debounce } from "lodash";

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
  const selectRef = useRef<HTMLDivElement>(null);

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
    const { value } = event.target;
    setInputValue(value);
    setError(null);
  };

  const debouncedChangeCitySearchHandler = useCallback(
    debounce(chageCitySearchHandler, 300),
    []
  );

  useEffect(() => {
    getData(inputValue);
  }, [inputValue]);

  useClickOutside(selectRef, () => setInputValue(""));

  return (
    <div ref={selectRef} className={classes.select}>
      <Input
        value={value}
        register={register}
        name={name}
        onChange={debouncedChangeCitySearchHandler}
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

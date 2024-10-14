import { useEffect, useState } from "react";
import type { ZealInputProps } from "./types";
import classes from "./zealInput.module.scss";

export default function ZealInput(props: ZealInputProps) {
  const [fieldBulr, setFieldBlur] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleOnBulr = () => {
    setFieldBlur(true);
    handleInputOnChange(inputValue);
  };

  const handleOnFocus = () => {
    setFieldBlur(false);
  };

  const inputStyles =
    "outline-none autofill:bg-white block w-full pr-10 placeholder:text-base sm:font-normal sm:text-base rounded-lg h-12 p-4 border focus:border-2 focus:border-indigo-800";

  const handleInputOnChange = (value: string) => {
    props.onInputChange(value);
  };

  useEffect(() => {
    setInputValue(props.value);
  }, [props.value]);

  return (
    <div
      className={`${classes.input_container} ${props.classes}`}
      style={{
        width: props.width ? props.width : "100%",
      }}
    >
      <label
        htmlFor={props.name}
        className={`block text-base font-medium text-gray-700 ${classes["input-label"]}`}
      >
        {props.label}
      </label>
      <div className="mt-1 relative rounded-lg">
        <input
          type={"text"}
          name={props.name}
          className={inputStyles}
          placeholder={props.placeholder}
          disabled={props.disabled}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onBlur={handleOnBulr}
          onFocus={handleOnFocus}
        />
      </div>
    </div>
  );
}

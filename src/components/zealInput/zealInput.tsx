import { useEffect, useState } from "react";
import type { ZealInputProps } from "./types";
import classes from "./zealInput.module.scss";

export default function ZealInput(props: ZealInputProps) {
  const [, setFieldBlur] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleOnBulr = () => {
    setFieldBlur(true);
    handleInputOnChange(inputValue);
  };

  const handleOnFocus = () => {
    setFieldBlur(false);
  };

  const handleInputOnChange = (value: string) => {
    props.onInputChange(value);
  };

  useEffect(() => {
    setInputValue(props.value);
  }, [props.value]);

  return (
    <div
      className={classes.input_container}
      style={{
        width: props.width ? props.width : "100%",
      }}
    >
      <input
        type={"text"}
        name={props.name}
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
  );
}

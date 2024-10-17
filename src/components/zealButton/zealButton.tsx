import classes from "./zealButton.module.scss";
import type { ZealButtonProps } from "./types";

export function ZealButton(props: ZealButtonProps) {
  return (
    <button
      disabled={props.disabled || props.question}
      style={{ minWidth: props.width ?? "20vw" }}
      className={
        props.question
          ? classes.zeal_btnQuestion
          : props.disabled
            ? classes.zeal_btnClicked
            : props.correctAnswer
              ? classes.zeal_btnCorrect
              : props.clicked
                ? classes.zeal_btnClicked
                : classes.zeal_btn
      }
      onClick={props.click}
    >
      {props.children}
    </button>
  );
}

export default ZealButton;

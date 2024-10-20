import ZealButton from "../zealButton/zealButton";
import { DifficultyButtonsProps } from "./types";
import classes from "./difficultybuttons.module.scss";

const DifficultyButtons = (props: DifficultyButtonsProps) => {
  const difficultyHandler = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        props.setDifficulty("easy");
        break;
      case "medium":
        props.setDifficulty("medium");
        break;
      case "hard":
        props.setDifficulty("hard");
        break;
    }
  };
  return (
    <div className={classes.difficulty}>
      <ZealButton
        clicked={props.difficulty === "easy"}
        click={() => difficultyHandler("easy")}
        width={"10vw"}
      >
        EASY
      </ZealButton>
      <ZealButton
        clicked={props.difficulty === "medium"}
        click={() => difficultyHandler("medium")}
        width={"10vw"}
      >
        MEDIUM
      </ZealButton>
      <ZealButton
        clicked={props.difficulty === "hard"}
        click={() => difficultyHandler("hard")}
        width={"10vw"}
      >
        HARD
      </ZealButton>
    </div>
  );
};

export default DifficultyButtons;

import ZealButton from "../zealButton/zealButton";
import classes from "./questionsModal.module.scss";
import { QuestionsModalProps } from "./types";
import Timer from "../timer/timer";
import { addAnswerRandomly, replaceQuotes } from "../../config/constant";
import { useState } from "react";
import ZealInput from "../zealInput/zealInput";
import { toast } from "react-toastify";
import { getData, storeData } from "../../config/storage";

const QuestionsModal = (props: QuestionsModalProps) => {
  const allAnswers = addAnswerRandomly(
    props.incorrect_answers,
    props.correct_answer
  );
  const sortedAnswers = allAnswers.sort();
  const wrongAnswers = getData("wrongAnswers");
  const correctAnswers = getData("correctAnswers");
  const skippedQuestions = getData("skippedQuestions");
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [revealAnswer, setRevealAnswer] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);

  const answerHandler = () => {
    if (selectedAnswer === "") {
      toast("please select answer!");
    } else {
      let updatedCorrect;
      let updatedWrong;
      if (selectedAnswer === props.correct_answer) {
        if (!correctAnswers) {
          updatedCorrect = 1;
        } else {
          updatedCorrect = correctAnswers + 1;
        }
        const sound = new Audio("/assets/soundtracks/Win.mp3");
        sound.play();
        storeData("correctAnswers", updatedCorrect);
      } else {
        if (!wrongAnswers) {
          updatedWrong = 1;
        } else {
          updatedWrong = wrongAnswers + 1;
        }
        const sound = new Audio("/assets/soundtracks/Lose.mp3");
        sound.play();
        storeData("wrongAnswers", updatedWrong);
      }
      setRevealAnswer(true);
      setResetTimer(true);
      setTimeout(() => {
        props.onNext();
        setRevealAnswer(false);
        setSelectedAnswer("");
        setResetTimer(false);
      }, 1000);
    }
  };

  const skipHandler = () => {
    setResetTimer(true);
    let updatedSkipped;
    if (!skippedQuestions) {
      updatedSkipped = 1;
    } else {
      updatedSkipped = skippedQuestions + 1;
    }

    storeData("skippedQuestions", updatedSkipped);
    setTimeout(() => {
      props.onNext();
      setSelectedAnswer("");
      setResetTimer(false);
    }, 500);
  };

  return (
    <div className={classes.container}>
      <div className={classes.container_modal}>
        <div className={classes.container_modal_questions}>
          <ZealButton question>{replaceQuotes(props.question)}</ZealButton>
        </div>
        <div className="flex justify-center mt-8">
          <Timer
            difficulty={props.difficulty}
            resetTimer={resetTimer}
            nextQuestion={skipHandler}
          />
        </div>
        <div className={classes.container_modal_action}>
          {sortedAnswers.map((answer) => (
            <div className={classes.container_modal_action_single} key={answer}>
              <ZealButton
                clicked={selectedAnswer === answer && !revealAnswer}
                correctAnswer={revealAnswer && answer === props.correct_answer}
                click={() => !revealAnswer && setSelectedAnswer(answer)}
              >
                {replaceQuotes(answer)}
              </ZealButton>
            </div>
          ))}
        </div>
        <div className={classes.container_modal_answer}>
          <ZealButton width={"10vw"} click={skipHandler}>
            Skip
          </ZealButton>
          <ZealButton width={"10vw"} click={answerHandler}>
            Answer
          </ZealButton>
        </div>
      </div>
    </div>
  );
};

export default QuestionsModal;

import ZealInput from "../zealInput/zealInput";
import { ScoreCardProps } from "./types";
import Chart from "react-apexcharts";
import classes from "./scoreCard.module.scss";
import ZealButton from "../zealButton/zealButton";
import { useEffect, useState } from "react";
import ZealLoader from "../zealLoader/zealLoader";
import { getData, removeData, storeData } from "../../config/storage";
import DifficultyButtons from "../difficultyButtons/difficultyButtons";
import { useNavigate } from "react-router-dom";

const ScoreCard = (props: ScoreCardProps) => {
  const [newGame, setNewGame] = useState(false);
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState("");
  const timeConsumed = getData("timeConsumed");
  const navigate = useNavigate();
  const [pieChart, setPieChart] = useState<{
    options: { labels: string[] };
    series: number[];
  }>({
    options: { labels: [] },
    series: [],
  });

  useEffect(() => {
    const labels: string[] = [];
    const series: number[] = [];

    const data = [
      { label: "skipped questions", value: props.skippedQuestions },
      { label: "correct answers", value: props.correctAnswers },
      { label: "wrong answers", value: props.wrongAnswers },
    ];

    data.forEach((item) => {
      if (item.value && item.value > 0) {
        labels.push(item.label);
        series.push(item.value);
      }
    });

    setPieChart({ options: { labels }, series });
  }, [props.skippedQuestions, props.correctAnswers, props.wrongAnswers]);

  const newHandler = () => {
    setNewGame(true);
  };

  const startNewGameHandler = () => {
    setLoading(true);
    storeData("difficulty", difficulty);
    removeData("categoriesSelected");
    removeData("category");
    navigate("/categories");
  };
  return (
    <div className="mt-8 flex flex-col items-center">
      <ZealInput
        disabled
        name="name"
        onInputChange={() => {}}
        value={props.playerName}
        placeholder=""
      />
      <div className={classes.score_wrapper}>
        <div className={classes.score_wrapper_time}>
          <p>TIME CONSUMED</p>
          <p>{timeConsumed}s</p>
        </div>
        <Chart
          options={pieChart.options}
          series={pieChart.series}
          type="pie"
          width="380"
        />
      </div>

      {!newGame ? (
        <ZealButton click={() => newHandler()}>START NEW GAME</ZealButton>
      ) : (
        <div className="flex flex-col items-center">
          <DifficultyButtons
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
          <ZealButton click={() => startNewGameHandler()}>
            {loading ? <ZealLoader /> : "START"}
          </ZealButton>
        </div>
      )}
    </div>
  );
};

export default ScoreCard;

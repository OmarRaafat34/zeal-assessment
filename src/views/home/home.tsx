import { useEffect } from "react";
import ScoreCard from "../../components/scoreCard/scoreCard";
import StartModal from "../../components/startModal/startModal";
import { clearData, getData, removeData } from "../../config/storage";
const Home = () => {
  const token = getData("token");
  const playerName = getData("name");
  const timeConsumed = getData("timeConsumed");
  const wrongAnswers = getData("wrongAnswers");
  const correctAnswers = getData("correctAnswers");
  const skippedQuestions = getData("skippedQuestions");

  useEffect(() => {
    if (!token) {
      clearData();
    }
  }, []);
  return (
    <div>
      {!token ? (
        <StartModal />
      ) : (
        <ScoreCard
          playerName={playerName}
          timeConsumed={timeConsumed}
          wrongAnswers={wrongAnswers}
          correctAnswers={correctAnswers}
          skippedQuestions={skippedQuestions}
        />
      )}
    </div>
  );
};

export default Home;

import { useEffect, useState } from "react";
import QuestionsModal from "../../components/questionsModal/questionsModal";
import { getQuestions } from "../../config/apis";
import { getData } from "../../config/storage";
import { QuestionsType } from "./types";
import { useNavigate } from "react-router-dom";

const Questions = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuestionsType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const token = getData("token");
  const category = getData("category");
  const difficulty = getData("difficulty");

  useEffect(() => {
    const fetchQuestions = async () => {
      const fetchedQuestions = await getQuestions(
        3,
        category,
        difficulty,
        token
      );
      setQuestions(fetchedQuestions);
    };

    fetchQuestions();
  }, [category, difficulty, token]);

  const handleNextQuestion = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    if (currentIndex >= questions?.length - 1) {
      navigate("/categories");
    }
  };

  return (
    <>
      {currentIndex < questions?.length && (
        <QuestionsModal
          question={questions[currentIndex].question}
          correct_answer={questions[currentIndex].correct_answer}
          incorrect_answers={questions[currentIndex].incorrect_answers}
          type={questions[currentIndex].type}
          difficulty={questions[currentIndex].difficulty}
          onNext={handleNextQuestion}
        />
      )}
    </>
  );
};

export default Questions;

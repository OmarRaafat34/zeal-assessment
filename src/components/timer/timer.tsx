import { useEffect, useState } from "react";
import { TimerProps } from "./types";
import { getData, storeData } from "../../config/storage";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Timer = (props: TimerProps) => {
  const [time, setTime] = useState<number>(0);
  const [initialTime, setInitialTime] = useState<number>(0);
  const [previousTimeConsumed, setPreviousTimeConsumed] = useState<number>(0);
  const [key, setKey] = useState<number>(0);

  const getInitialTime = () => {
    switch (props.difficulty) {
      case "hard":
        return 1.5 * 60;
      case "medium":
        return 1 * 60;
      case "easy":
        return 0.5 * 60;
      default:
        return 0;
    }
  };

  useEffect(() => {
    const storedTimeConsumed = JSON.parse(getData("timeConsumed") || "0");
    setPreviousTimeConsumed(storedTimeConsumed);
    setInitialTime(getInitialTime());
    setTime(getInitialTime());

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          const sound = new Audio("/assets/soundtracks/TimesUp.mp3");
          sound.play();
          clearInterval(interval);
          props.nextQuestion();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      const timeConsumed = initialTime - time;
      const newTotalTime = previousTimeConsumed + timeConsumed;
      storeData("timeConsumed", newTotalTime);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.difficulty, props.resetTimer]);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [props.difficulty, props.resetTimer]);
  return (
    <div>
      <CountdownCircleTimer
        key={key}
        isPlaying
        duration={getInitialTime()}
        colors={["#f59e0b", "#f59e0b"]}
        colorsTime={[getInitialTime(), getInitialTime() / 2]}
        size={60}
        trailColor="#040d15"
        strokeWidth={5}
        strokeLinecap={"butt"}
      >
        {({ remainingTime }) => <p className="text-white">{time}</p>}
      </CountdownCircleTimer>
    </div>
  );
};

export default Timer;

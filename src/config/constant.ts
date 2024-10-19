export const addAnswerRandomly = (arr: string[], str: string) => {
  const randomIndex = Math.floor(Math.random() * (arr.length + 1));
  const newArray = [...arr];
  newArray.splice(randomIndex, 0, str);

  return newArray;
};

export const replaceQuotes = (paragraph: string) => {
  return paragraph.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
};

export const LetsPlaySound = new Audio("/assets/soundtracks/LetsPlay.mp3");
export const QuestionsStartSound = new Audio(
  "/assets/soundtracks/QuestionsStart.mp3"
);
export const WinSound = new Audio("/assets/soundtracks/Win.mp3");
export const LoseSound = new Audio("/assets/soundtracks/Lose.mp3");
export const TimesUpSound = new Audio("/assets/soundtracks/TimesUp.mp3");
export const CongratulationsSound = new Audio(
  "/assets/soundtracks/Congratulations.mp3"
);

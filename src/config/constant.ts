export const addAnswerRandomly = (arr: string[], str: string) => {
  const randomIndex = Math.floor(Math.random() * (arr.length + 1));
  const newArray = [...arr];
  newArray.splice(randomIndex, 0, str);

  return newArray;
};

export const replaceQuotes = (paragraph: string) => {
  return paragraph.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
};

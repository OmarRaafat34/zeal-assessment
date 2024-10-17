import { CategoriesSelectedBefore } from "./types";

export const storeData = (
  key: string,
  value: string | number | CategoriesSelectedBefore[]
) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getData = (key: string) => {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const removeData = (key: string) => {
  return sessionStorage.removeItem(key);
};

export const clearData = () => {
  removeData("token");
  removeData("wrongAnswers");
  removeData("correctAnswers");
  removeData("skippedQuestions");
  removeData("name");
  removeData("timeConsumed");
  removeData("categoriesSelected");
  removeData("category");
  removeData("difficulty");
  return;
};

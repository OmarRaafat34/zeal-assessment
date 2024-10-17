import axios from "axios";
import { storeData } from "./storage";
import { toast } from "react-toastify";

export const requestNewToken = async () => {
  try {
    const response = await axios.get(
      "https://opentdb.com/api_token.php?command=request"
    );
    const token = response.data.token;

    await storeData("token", token);

    return response.data;
  } catch (error) {
    toast("Something went wrong! Please refresh");
    return null;
  }
};

export const resetMemory = async (token: string) => {
  try {
    const response = await axios.get(
      `https://opentdb.com/api_token.php?command=reset&token=${token}`
    );

    return response.data;
  } catch (error) {
    toast("Something went wrong! Please refresh");
    return null;
  }
};

export const getCategories = async (token: string) => {
  try {
    const response = await axios.get("https://opentdb.com/api_category.php", {
      params: {
        token: token,
      },
    });
    return response.data.trivia_categories;
  } catch (error) {
    toast("Something went wrong! Please refresh");
    return null;
  }
};

export const getQuestions = async (
  amount: number,
  category: number,
  difficulty: string,
  token: string
) => {
  try {
    const response = await axios.get("https://opentdb.com/api.php", {
      params: {
        amount,
        category,
        difficulty,
        token,
      },
    });
    return response.data.results;
  } catch (error) {
    toast("Something went wrong! Please refresh");
    return null;
  }
};

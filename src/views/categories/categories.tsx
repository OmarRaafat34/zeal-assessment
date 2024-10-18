import { useEffect, useState } from "react";
import CategoriesModal from "../../components/categoriesModal/categoriesModal";
import { getData } from "../../config/storage";
import { CategoriesType } from "./types";
import { getCategories } from "../../config/apis";
import { useNavigate } from "react-router-dom";
import ZealInput from "../../components/zealInput/zealInput";
import { toast } from "react-toastify";
const Categories = () => {
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [finishedGame, setFinishedGamed] = useState(false);
  const token = getData("token");
  const categoriesSelected = getData("categoriesSelected");
  const navigate = useNavigate();

  useEffect(() => {
    if (categoriesSelected?.length >= 3) {
      const sound = new Audio("/assets/soundtracks/Congratulations.mp3");
      sound.play();
      setFinishedGamed(true);
      toast("Gongratulations you finished the game!");
      setTimeout(() => {
        navigate("/");
      }, 4000);
    }
  }, []);

  useEffect(() => {
    getCategoriesHandler();
  }, []);

  const getCategoriesHandler = async () => {
    setCategories(await getCategories(token));
  };

  return (
    <>
      {finishedGame ? (
        <div className="flex justify-center items-center h-full">
          <ZealInput
            name="finish"
            disabled
            placeholder=""
            onInputChange={() => {}}
            value="Gongratulations you finished the game! You will be redirected shortly."
            width={"50vw"}
          />
        </div>
      ) : (
        <CategoriesModal categories={categories} />
      )}
    </>
  );
};

export default Categories;

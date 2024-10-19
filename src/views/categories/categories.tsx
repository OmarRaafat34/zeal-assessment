import { useEffect, useState } from "react";
import CategoriesModal from "../../components/categoriesModal/categoriesModal";
import { getData } from "../../config/storage";
import { CategoriesType } from "./types";
import { getCategories } from "../../config/apis";
import { useNavigate } from "react-router-dom";
import ZealInput from "../../components/zealInput/zealInput";
import { toast } from "react-toastify";
import { CongratulationsSound } from "../../config/constant";
const Categories = () => {
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [finishedGame, setFinishedGamed] = useState(false);
  const token = getData("token");
  const categoriesSelected = getData("categoriesSelected");
  const navigate = useNavigate();

  useEffect(() => {
    if (categoriesSelected?.length >= 3) {
      CongratulationsSound.play();
      setFinishedGamed(true);
      toast("Gongratulations you finished the game!");
      setTimeout(() => {
        navigate("/");
      }, 4000);
    }
  }, [categoriesSelected?.length, navigate]);

  useEffect(() => {
    getCategoriesHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

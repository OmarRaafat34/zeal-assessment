import { useNavigate } from "react-router-dom";
import ZealButton from "../zealButton/zealButton";
import classes from "./categoriesModal.module.scss";
import { CategoriesModalProps } from "./types";
import { useState } from "react";
import { getData, storeData } from "../../config/storage";
import { CategoriesSelectedBefore } from "../../config/types";
import { toast } from "react-toastify";
import ZealLoader from "../zealLoader/zealLoader";
import { LetsPlaySound, QuestionsStartSound } from "../../config/constant";

const CategoriesModal = (props: CategoriesModalProps) => {
  const navigate = useNavigate();

  const [categorySelected, setCategorySelected] = useState(0);
  const categoriesSelectedBefore = getData("categoriesSelected");

  const startGameHandler = () => {
    if (categorySelected === 0) {
      toast("Please select a category");
    } else {
      let updatedCategories;
      if (categorySelected !== 1) {
        storeData("category", categorySelected);
      }
      if (!categoriesSelectedBefore) {
        updatedCategories = [{ id: categorySelected }];
      } else {
        updatedCategories = [
          ...categoriesSelectedBefore,
          { id: categorySelected },
        ];
      }
      LetsPlaySound.pause();
      QuestionsStartSound.play();
      storeData("categoriesSelected", updatedCategories);
      navigate("/questions");
    }
  };

  return (
    <>
      <p className={classes.header}>Questions Category</p>
      <div className={classes.container_modal}>
        {props.categories?.length === 0 ? (
          <div className="flex justify-center">
            <ZealButton>
              <ZealLoader width="80" height="80" />
            </ZealButton>
          </div>
        ) : (
          <div className={classes.container_modal_categories}>
            {props.categories.map((category) => {
              return (
                <ZealButton
                  key={category.id}
                  clicked={categorySelected === category.id}
                  click={() => setCategorySelected(category.id)}
                  disabled={categoriesSelectedBefore?.find(
                    (item: CategoriesSelectedBefore) => item.id === category.id
                  )}
                >
                  {category.name}
                </ZealButton>
              );
            })}
          </div>
        )}
      </div>
      <div className={classes.container_modal_action}>
        <ZealButton
          key={1}
          click={() => setCategorySelected(1)}
          clicked={categorySelected === 1}
        >
          RANDOM
        </ZealButton>
        <ZealButton click={startGameHandler}>START</ZealButton>
      </div>
    </>
  );
};

export default CategoriesModal;

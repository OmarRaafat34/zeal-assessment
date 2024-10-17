import { useNavigate } from "react-router-dom";
import ZealButton from "../zealButton/zealButton";
import ZealInput from "../zealInput/zealInput";
import classes from "./startModal.module.scss";
import { useState } from "react";
import { storeData } from "../../config/storage";
import { toast } from "react-toastify";
import { requestNewToken } from "../../config/apis";
import DifficultyButtons from "../difficultyButtons/difficultyButtons";

const StartModal = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const playHandler = async () => {
    if (name === "" || difficulty === "") {
      toast("You must fill name and select difficulty before we start!");
    } else {
      await requestNewToken();
      storeData("name", name);
      storeData("difficulty", difficulty);
      navigate("/categories");
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.container_modal}>
        <ZealInput
          name="Name"
          value={name}
          placeholder="Enter your name"
          onInputChange={(value) => setName(value)}
          width="70%"
        />
        <DifficultyButtons
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
        <div className="mt-8">
          <ZealButton click={playHandler}>PLAY</ZealButton>
        </div>
      </div>
    </div>
  );
};

export default StartModal;

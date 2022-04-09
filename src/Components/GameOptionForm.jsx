import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import clickSound from "../SoundEffects/click.mp3";

import "../CSS/GameOptionForm.css";
import { GrClose } from "react-icons/gr";
import DifficultyBtn from "./DifficultyBtn";

function GameOptionForm(props) {
  const [playerNameInput, setPlayerNameInput] = useState("");
  const [difficulty, setDifficulty] = useState("mix");
  let navigate = useNavigate();
  const [clickS] = useSound(clickSound);

  const startGame = () => {
    let playerName = playerNameInput;
    if (playerName === "") {
      alert("Insert name");
    } else {
      createGame(playerName, difficulty);
      navigate("/Game", {
        state: { playerName: playerNameInput, difficulty: difficulty },
      });
    }
  };

  const createGame = (playerName, difficulty) => {
    let path = `newPath`;
    navigate(path);
  };

  return (
    <div className="gameFormContainer">
      <div className="section1">
        <button onClick={() => props.setIsOpen(false)}>
          <GrClose />
        </button>
      </div>
      <div className="nameSection">
        <h1>Player Name</h1>
        <input
          type="text"
          name="name"
          value={playerNameInput}
          onChange={(e) => setPlayerNameInput(e.target.value)}
        />
      </div>
      <div className="difficultySection">
        <h1>Select Difficulty:</h1>
        <div>
          <DifficultyBtn
            val={"easy"}
            setDifficulty={setDifficulty}
            difficulty={difficulty}
          />
          <DifficultyBtn
            val={"medium"}
            setDifficulty={setDifficulty}
            difficulty={difficulty}
          />
          <DifficultyBtn
            val={"hard"}
            setDifficulty={setDifficulty}
            difficulty={difficulty}
          />
          <DifficultyBtn
            val={"mix"}
            setDifficulty={setDifficulty}
            difficulty={difficulty}
          />
        </div>
      </div>
      <div className="section4">
        <button
          onClick={() => {
            clickS();
            startGame();
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default GameOptionForm;

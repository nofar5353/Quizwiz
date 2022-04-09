import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/GameOverMsg.css";
import Confetti from "./Confetti";
import useSound from "use-sound";
import GameOverSound from "../SoundEffects/gameOver.mp3";
import clickSound from "../SoundEffects/click.mp3";

function GameOverMsg(props) {
  const [gameOverS] = useSound(GameOverSound);
  const [clickS] = useSound(clickSound);
  let navigate = useNavigate();

  const closeGame = () => {
    navigate("/", {
      state: { playerName: props.playerName, score: props.score },
    });
  };
  return (
    <div className="gameOverMsgContainer">
      {gameOverS()}
      <Confetti />
      <div className="msgContainer">
        <h1>Game Over</h1>
        <h2>score:{props.score}</h2>
        <button
          onClick={() => {
            clickS();
            closeGame();
          }}
        >
          close
        </button>
      </div>
    </div>
  );
}

export default GameOverMsg;

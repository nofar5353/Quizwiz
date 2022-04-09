import React from "react";
import "../CSS/GameInstructions.css";
import useSound from "use-sound";
import clickSound from "../SoundEffects/click.mp3";

function GameInstructions(props) {
  const [clickS] = useSound(clickSound);

  return (
    <div className="gameInstContainer">
      <div className="textContainer">
        <h1>Hello {props.playerName}</h1>
        <p>
          Notice! Once you click Start, the clock will start running.
          <br /> There are 15 questions, and for each question you will have 30
          seconds.
          <br /> You have help buttons that can only be used once. <br /> The
          points for each question are calculated according to the difficulty
          level of the question and the time in which you solved it <br />
          Good Luck!
        </p>
      </div>
      <button
        onClick={() => {
          clickS();
          props.setStartGame(true);
        }}
      >
        start
      </button>
    </div>
  );
}

export default GameInstructions;

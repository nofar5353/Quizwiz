import React from "react";
import "../CSS/Gameinfo.css";
import useSound from "use-sound";
import clickSound from "../SoundEffects/click.mp3";

function Gameinfo(props) {
  const [clickS] = useSound(clickSound);

  return (
    <div className="infoContainer">
      <div className="questionSection">
        <h1>
          {props.questionNum}/{props.questionCount}
        </h1>
      </div>
      <div className="scoreSection">
        <h1>Score: {props.score}</h1>
      </div>
      <div className="helpSection">
        <button
          className="addTimeHelp"
          disabled={!props.addTimeHelp}
          onClick={() => {
            clickS();
            props.addTime();
          }}
        >
          Add 30 seconds
        </button>
        <button
          className="50/50Help"
          disabled={!props.fiftyHelp}
          onClick={() => {
            clickS();
            props.fiftyFiftyHelp();
          }}
        >
          50/50
        </button>
      </div>
    </div>
  );
}

export default Gameinfo;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useSound from "use-sound";
import clickSound from "../SoundEffects/click.mp3";
import "../CSS/Home.css";
import GameOptionForm from "./GameOptionForm";
import LeaderBoard from "./LeaderBoard";

function Home() {
  const param = useLocation();
  const props = param.state;

  const [clickS] = useSound(clickSound);

  const [openGameForm, setOpenGameForm] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("leaderboard"));

    if (props != null) {
      let tempPlayer = { playerName: props.playerName, score: props.score };

      if (
        items != null &&
        items.some(
          (item) =>
            tempPlayer.playerName === item.playerName &&
            tempPlayer.score === item.score
        )
      ) {
        setLeaderboard((prev) => [...items]);
      } else {
        setLeaderboard((prev) => [...items, tempPlayer]);
      }
    }
  }, []);

  useEffect(() => {
    if (props != null) {
      localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    }
  }, [leaderboard]);

  return (
    <div className="homeContainer">
      <div className="logoContainer">
        <img src={require("../images/Logo.png")} />
      </div>
      <button
        className="PlayBtn"
        onClick={() => {
          clickS();
          setOpenGameForm(true);
        }}
      >
        Play
      </button>
      <button
        onClick={() => {
          setShowLeaderboard(true);
          clickS();
        }}
        className="leaderBoardBtn"
      >
        Leader Board
      </button>
      {openGameForm ? <GameOptionForm setIsOpen={setOpenGameForm} /> : ""}
      {showLeaderboard ? (
        <LeaderBoard
          setShowLeaderboard={setShowLeaderboard}
          leaders={leaderboard}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;

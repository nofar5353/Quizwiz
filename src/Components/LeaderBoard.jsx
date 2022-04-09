import React, { useEffect } from "react";
import "../CSS/LeaderBoard.css";
import { GrClose } from "react-icons/gr";

function LeaderBoard(props) {
  useEffect(() => {
    console.log(props.leaders);
    //sort the leaders array
    props.leaders.sort((a, b) => {
      return b.score - a.score;
    });
  });

  return (
    <div className="leaderBoardContainer">
      <div className="btnContainer">
        <button
          onClick={() => props.setShowLeaderboard(false)}
          className="closeBtn"
        >
          <GrClose />
        </button>
      </div>
      <h1>Leader Board</h1>
      <table>
        <tbody>
          <tr className="tableFirstRow">
            <th>Place</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
          {props.leaders.slice(0, 11).map((item, index) => (
            <tr key={index} className="tableRow">
              <th>{index + 1}</th>
              <th>{item.playerName}</th>
              <th>{item.score}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderBoard;

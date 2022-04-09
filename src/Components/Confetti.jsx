import React from "react";
import ConfettiPiece from "./ConfettiPiece";

function Confetti() {
  return (
    <div>
      {new Array(50).fill(true).map((_, i) => (
        <ConfettiPiece key={i} />
      ))}
    </div>
  );
}

export default Confetti;

import React, { useEffect } from "react";
import useSound from "use-sound";

import "../CSS/Timer.css";
import { MdOutlineTimer } from "react-icons/md";
import timerSound from "../SoundEffects/mixkit-ticking-timer-1056.mp3";
import wrongSound from "../SoundEffects/wrong.mp3";

function Timer(props) {
  const [timeOutS] = useSound(timerSound, { volume: 0.25 });
  const [wrongS] = useSound(wrongSound);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (props.timeLeft > 0) {
        props.setTimeLeft((prev) => prev - 1);
        if (props.timeLeft === 11) {
          timeOutS();
        }
      } else {
        wrongS();
        clearInterval(myInterval);
        props.timeOut("", false);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [props.timeLeft]);

  return (
    <div className="timerContainer">
      <div className="timeIconContainer">
        <MdOutlineTimer className="timeIcon" />
      </div>
      <div className="timeLeftContainer">
        <p>
          {Math.floor(props.timeLeft / 60)}:
          {props.timeLeft - Math.floor(props.timeLeft / 60) * 60 < 10
            ? "0" + (props.timeLeft - Math.floor(props.timeLeft / 60) * 60)
            : props.timeLeft - Math.floor(props.timeLeft / 60) * 60}
        </p>
      </div>
    </div>
  );
}

export default Timer;

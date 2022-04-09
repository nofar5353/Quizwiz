import React, { useState } from "react";
import styled from "styled-components";
import useSound from "use-sound";
import successSound from "../SoundEffects/success.mp3";
import wrongSound from "../SoundEffects/wrong.mp3";

function AnswerBtn(props) {
  const [successS] = useSound(successSound);
  const [wrongS] = useSound(wrongSound);

  var color = props.txt === props.currectAns ? "#0ea600" : "#db0000";
  const [isClick, setIsClick] = useState(false);
  const AnsBtn = styled.button`
    ${isClick
      ? "background-color:" + color + ";"
      : "background-color: #577590;"}
    flex: 1;
    height: 50%;
    border-radius: 20vh;
    border: none;
    transition-duration: 0.2s;
    margin: 1vh;
    font-size: calc(0.5vw + 0.7vh + 0.5vmin);

    &:hover {
      cursor: pointer;
    }
  `;
  return (
    <AnsBtn
      onClick={() => {
        setIsClick(true);
        props.txt === props.currectAns ? successS() : wrongS();
        setTimeout(() => {
          props.calculateScore(props.txt, true);
          setIsClick(false);
        }, 1000);
      }}
    >
      {props.txt}
    </AnsBtn>
  );
}

export default AnswerBtn;

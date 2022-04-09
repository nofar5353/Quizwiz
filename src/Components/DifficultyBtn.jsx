import React, { useState } from "react";
import styled from "styled-components";
import useSound from "use-sound";
import clickSound from "../SoundEffects/click.mp3";

function DifficultyBtn(props) {
  const [isClick, setIsClick] = useState(props.val == "Mix" ? true : false);
  const [clickS] = useSound(clickSound);

  const DifBtn = styled.button`
    ${isClick && props.val === props.difficulty
      ? "background-color: #43AA8B;"
      : "  background-color: #F3722C;"}
    border:none;
    font-size: calc(0.7vw + 0.7vh + 0.5vmin);

    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
      rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
      rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
    &:hover {
      cursor: pointer;
    }
  `;

  const chooseDifficulty = (val) => {
    setIsClick(!isClick);
    props.setDifficulty(props.val);
  };
  return (
    <DifBtn
      onClick={() => {
        clickS();
        chooseDifficulty(props.val);
      }}
    >
      {props.val}
    </DifBtn>
  );
}

export default DifficultyBtn;

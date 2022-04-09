import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

function ConfettiPiece() {
  const [config, setConfig] = useState(() => getConfig());

  const Circle = styled.div`
    background-color: #9b5de5;
    width: ${config.size};
    height: ${config.size};
    border-radius: 50%;
    bordercolor: white;
  `;

  const Square = styled.div`
    background-color: #f15bb5;
    width: ${config.size};
    height: ${config.size};
  `;

  const Triangular = styled.div`
    width: 0;
    height: 0;
    border-left: ${config.size} solid transparent;
    border-right: ${config.size} solid transparent;
    border-bottom: ${config.sizeX2} solid #fee440;
  `;

  const SHAPE_TYPES = [
    <Circle />,
    <Square />,
    <Triangular />,
    <Circle />,
    <Square />,
    <Circle />,
    <Square />,
  ];
  const fall = useSpring({
    from: {
      // backgroundColor: "blue",
      position: "absolute",
      zIndex: "-2",
      top: "-3%",
      left: config.left1,
      opacity: 1,
      rotateZ: 0,
      borderRadius: 50,
    },
    to: {
      // backgroundColor: "red",
      position: "absolute",
      zIndex: "-2",
      top: "90%",
      opacity: 0,
      rotateZ: 360,
    },
    reset: true,
    config: { duration: config.fallDuration, mass: 2 },
    delay: config.fallDelay,
  });

  return (
    <animated.div style={({ position: "absolute" }, fall)}>
      {SHAPE_TYPES[randomInt(0, 4)]}
    </animated.div>
  );
}
const getConfig = () => {
  const intSize = randomInt(0.2, 0.7);
  const size = intSize.toString() + "vh";
  const sizeX2 = (intSize * 2).toString() + "vh";
  const left1 = randomInt(2, 98).toString() + "%";
  const fallDuration = randomInt(10000, 20000);
  const fallDelay = randomInt(0, 10000);

  return {
    size,
    sizeX2,
    left1,
    fallDuration,
    fallDelay,
  };
};
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default ConfettiPiece;

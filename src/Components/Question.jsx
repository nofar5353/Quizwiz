import React, { useEffect, useState } from "react";
import "../CSS/Question.css";
import AnswerBtn from "./AnswerBtn";
import Timer from "./Timer";
import { unescape } from "html-escaper";

function Question(props) {
  const [ansArr, setAnsArr] = useState([]);

  useEffect(() => {
    setAnsArr(() => {
      //set answer array and shuffle it
      let temp = [];
      temp.push(props.currectAns);
      temp = temp.concat(props.ansArr);
      temp = temp.sort((a, b) => 0.5 - Math.random());
      return temp;
    });
  }, [props.questionTxt, props.ansArr]);

  const calculateScore = (ans, timeBool) => {
    //Calculating the score by time and difficulty
    var score = 0;
    if (timeBool) {
      if (ans === props.currectAns) {
        if (props.difficulty === "hard") {
          score = 3 * props.timeLeft * 10;
        } else if (props.difficulty === "easy") {
          score = 2 * props.timeLeft * 10;
        } else {
          score = 1 * props.timeLeft * 10;
        }
      }
    }
    props.ansClickHandle(score);
  };

  return (
    <div className="questionContainer">
      <div className="QSection">
        <div className="question">
          <h3>
            Category: {props.category} | Difficulty: {props.difficulty}
          </h3>
          <div>
            <p>{unescape(props.questionTxt)}</p>
          </div>
        </div>
        <div className="time">
          <Timer
            timeInSec={props.timeLeft}
            questionTxt={props.questionTxt}
            timeOut={calculateScore}
            timeLeft={props.timeLeft}
            setTimeLeft={props.setTimeLeft}
          />
        </div>
      </div>
      <div className="AnsSection">
        {ansArr.map((ans, index) => (
          <AnswerBtn
            txt={unescape(ans)}
            key={index}
            calculateScore={calculateScore}
            currectAns={props.currectAns}
          />
        ))}
      </div>
    </div>
  );
}

export default Question;

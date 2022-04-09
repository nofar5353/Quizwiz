import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useSound from "use-sound";

import "../CSS/Game.css";
import nextSound from "../SoundEffects/next.mp3";
import Question from "./Question";
import GameInstructions from "./GameInstructions";
import Gameinfo from "./Gameinfo";
import GameOverMsg from "./GameOverMsg";

function Game() {
  const param = useLocation();
  const props = param.state;
  const timeForQ = 30;
  const [gameData, setGameDate] = useState({
    playerName: props.playerName,
    score: 0,
    questions: [],
  });
  const [startGame, setStartGame] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeForQ);
  const [nextS] = useSound(nextSound);

  //disable the help btn
  const [addTimeHelp, setAddTimeHelp] = useState(true);
  const [fiftyHelp, setFiftyHelp] = useState(true);

  const [showGameOver, setShowGameOver] = useState(false);

  const apiUrl =
    props.difficulty === "mix"
      ? "https://opentdb.com/api.php?amount=15"
      : "https://opentdb.com/api.php?amount=15&difficulty=" + props.difficulty;

  //get question from OPEN TRIVIA DB
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let questions = data["results"];
        setGameDate((prev) => ({
          ...prev,
          questions: questions,
        }));
        setCurrentQuestion(questions[currentQuestionIndex]);
      });
  }, []);

  useEffect(() => {
    if (currentQuestionIndex < gameData.questions.length) {
      setShowGameOver(false);
      setCurrentQuestion((prev) => gameData.questions[currentQuestionIndex]);
      nextS();
    } else if (
      currentQuestionIndex === gameData.questions.length &&
      currentQuestionIndex > 1
    ) {
      setShowGameOver(true);
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    //Initialize time when the question changes
    setTimeLeft(timeForQ);
  }, [currentQuestionIndex]);

  const ansClickHandle = (score) => {
    setGameDate((prev) => ({
      ...prev,
      score: prev.score + score,
    }));

    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const addTime = () => {
    setTimeLeft((prev) => prev + 30);
    setAddTimeHelp(false);
  };

  const fiftyFiftyHelp = () => {
    setFiftyHelp(false);
    let tempObj = gameData.questions[currentQuestionIndex];
    tempObj.incorrect_answers = currentQuestion.incorrect_answers[0];
    setCurrentQuestion(tempObj);
  };
  return (
    <div className="gameContainer">
      {startGame ? (
        showGameOver ? (
          <GameOverMsg
            playerName={gameData.playerName}
            score={gameData.score}
          />
        ) : (
          <>
            <div className="questionGameConteiner">
              <Question
                questionTxt={currentQuestion.question}
                ansArr={currentQuestion.incorrect_answers}
                currectAns={currentQuestion.correct_answer}
                category={currentQuestion.category}
                difficulty={currentQuestion.difficulty}
                ansClickHandle={ansClickHandle}
                timeLeft={timeLeft}
                setTimeLeft={setTimeLeft}
              />
            </div>
            <div className="gameInfoConteiner">
              <Gameinfo
                score={gameData.score}
                questionNum={
                  currentQuestionIndex + 1 > gameData.questions.length
                    ? gameData.questions.length
                    : currentQuestionIndex + 1
                }
                questionCount={gameData.questions.length}
                addTimeHelp={addTimeHelp}
                addTime={addTime}
                fiftyHelp={fiftyHelp}
                fiftyFiftyHelp={fiftyFiftyHelp}
              />
            </div>
          </>
        )
      ) : (
        <GameInstructions
          setStartGame={setStartGame}
          playerName={props.playerName}
        />
      )}
    </div>
  );
}

export default Game;

import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import _ from "lodash";

const StartScreen = () => {
  const displayGame = () => {
    root.render(<Game />);
  };

  return (
    <div className="start-main">
      <div className="start-text" onClick={() => displayGame()}>
        Start Game
      </div>
    </div>
  );
};

const gameOver = () => {
  return (
    <div>

    </div>
  )
}

const Game = () => {
  const [cards, setcards] = useState([]);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  let Flipped = [];
  let checkId = [];
  let checkValue = [];
  useEffect(() => {
    let cardData = [];

    for (var i = 0; i < 18; i++) {
      cardData.push({
        face: i,
        value: i,
        id: i,
      });
      cardData.push({
        face: i,
        value: i,
        id: i + 18,
      });
    }
    setcards(cardData);
    setcards(_.shuffle(cardData));
  }, []);
  const rows = _.chunk(cards, 6);

  const show = (element) => {
    document.getElementById(element).childNodes[0].style.display = "block";
    document.getElementById(element).style.cursor = "default";
  };

  const hide = (element) => {
    document.getElementById(element).childNodes[0].style.display = "none";
    document.getElementById(element).style.cursor = "pointer";
  };

  const flipHandler = (id1, id2) => {
    
    Flipped.push(id1, id2);
    Flipped.forEach(show);
  };

  const startGame = () => {
    var x = 0;

    for (x = 0; x < 36; x++) {
      show(x);
      setTimeout(function () {}, 1000);
    }
  };

  const CheckGameCompletion = () => {
    if (correct == 18){
      root.render(<gameOver/>)
    }
    console.log(correct)
  }

  const clickHandler = (clickedId, clickedValue) => {
    for (var x = 0; x < Flipped.length; x++) {
      if (Flipped[x] == clickedId) {
        return;
      }
    }

    if (clickedId == checkId[0]) {
      return;
    }

    if (checkValue.length < 2) {
      checkValue.push(clickedValue);
      checkId.push(clickedId);
      show(clickedId);

      if (checkValue.length == 2) {
        setTimeout(function () {
          //checking if values match
          if (checkValue[0] == checkValue[1]) {
            flipHandler(checkId[0], checkId[1]);
            checkId.splice(0, 2);
            checkValue.splice(0, 2);
            setScore(score + 1);
            setCorrect(correct + 1);
            CheckGameCompletion()
          } else {
            checkId.forEach(hide);
            checkId.splice(0, 2);
            checkValue.splice(0, 2);
            setScore(score + 1);
            console.log(score);
          }
        }, 1000);
      }
    }
    
  };

  return (
    <div id="container">
      <div id="score">Turns: {score}</div>
      {rows.map((Cards) => (
        <div className="cards">
          {Cards.map((card) => (
            <div
              id={card.id}
              className="card"
              onClick={() => clickHandler(card.id, card.value)}
            >
              <div className="cardFace">{card.face}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const rootEl = document.getElementById("root");
const root = createRoot(rootEl);
root.render(<StartScreen />);

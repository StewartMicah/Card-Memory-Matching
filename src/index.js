import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import _ from "lodash";

const App = () => {
  const [cards, setcards] = useState([]);
  const [score, setScore] = useState(0);
  let Flipped = [];
  let checkId = [];
  let checkValue = [];
  useEffect(() => {
    let cardData = [];

    for (let i = 0; i < 15; i++) {
      cardData.push({
        face: i,
        value: i,
        id: _.uniqueId(),
      });
      cardData.push({
        face: i,
        value: i,
        id: _.uniqueId(),
      });
    }

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

  console.log();
  // return (
  //   <div id="container">
  //     <div id="score">Turns: {score}</div>
  //     {rows.map((Cards) => (
  //       <div className="cards">
  //         {Cards.map((card) => (
  //           <div
  //             id={card.id}
  //             className="card"
  //             onClick={() => clickHandler(card.id, card.value)}
  //           >
  //             <div className="cardFace">{card.face}</div>
  //           </div>
  //         ))}
  //       </div>
  //     ))}
  //   </div>
  // );

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
              <div class="flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front"></div>
                  <div class="flip-card-back">{card.face}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

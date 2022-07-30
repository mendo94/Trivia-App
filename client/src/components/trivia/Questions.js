import React, { useState, useEffect } from "react";
import * as actionCreators from "../../store/creators/actionCreators";
import { connect } from "react-redux";
import "./Question.css";

function Questions(props) {
  const points = props.points;

  const getTriviaQuestion = () => {
    fetch("https://the-trivia-api.com/api/questions?limit=1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((question) => {
        if (question) {
          console.log(question);
          props.onQuestionLoaded(question);
        }
      });
  };

  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  const triviaItems = props.question.map((trivia) => {
    const shuffledAnswers = shuffle([
      trivia.incorrectAnswers[0],
      trivia.incorrectAnswers[1],
      trivia.incorrectAnswers[2],
      trivia.correctAnswer,
    ]);

    const handleChoice1 = () => {
      if (shuffledAnswers[0] !== trivia.correctAnswer) {
        console.log("wrong");
        props.onSubtractPoints(points);
      } else {
        props.onAddPoints(points);
        console.log("correct!!");
      }
    };

    const handleChoice2 = () => {
      if (shuffledAnswers[1] !== trivia.correctAnswer) {
        console.log("wrong");
        props.onSubtractPoints(points);
      } else {
        props.onAddPoints(points);
        console.log("correct!!");
      }
    };

    const handleChoice3 = () => {
      if (shuffledAnswers[2] !== trivia.correctAnswer) {
        console.log("wrong");
        props.onSubtractPoints(points);
      } else {
        props.onAddPoints(points);
        console.log("correct!!");
      }
    };

    const handleChoice4 = () => {
      if (shuffledAnswers[3] !== trivia.correctAnswer) {
        console.log("wrong");
        props.onSubtractPoints(points);
      } else {
        props.onAddPoints(points);
        console.log("correct!!");
      }
    };

    return (
      <div className="trivia-container">
        <h4 key={trivia.id}>{trivia.question}</h4>
        <div className="answer-container">
          <button className="trivia-btn" onClick={handleChoice1}>
            <li>A. {shuffledAnswers[0]}</li>
          </button>
          <button className="trivia-btn" onClick={handleChoice2}>
            <li>B. {shuffledAnswers[1]}</li>
          </button>
          <button className="trivia-btn" onClick={handleChoice3}>
            <li>C. {shuffledAnswers[2]}</li>
          </button>
          <button className="trivia-btn" onClick={handleChoice4}>
            <li>D. {shuffledAnswers[3]}</li>
          </button>
        </div>
        <div className="category-container">
          <h2 className="category" key={trivia.id}>
            Category: {trivia.category}
          </h2>
        </div>
      </div>
    );
  });

  return (
    <>
      <button onClick={() => getTriviaQuestion()}>Start</button>
      <ul>{triviaItems}</ul>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    question: state.questionReducer.question,
    points: state.pointReducer.points,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onQuestionLoaded: (question) =>
      dispatch(actionCreators.getQuestion(question)),
    onSubtractPoints: (points) =>
      dispatch(actionCreators.subtractPoints(points)),
    onAddPoints: (points) => dispatch(actionCreators.addPoints(points)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

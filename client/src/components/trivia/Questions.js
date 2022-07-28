import React, { useState, useEffect } from "react";
import * as actionCreators from "../../store/creators/actionCreators";
import { connect } from "react-redux";

function Questions(props) {
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

    const handleChoice = () => {
      if (shuffledAnswers[0] !== trivia.correctAnswer) {
        console.log("wrong!!!!!");
      } else {
        console.log("correct");
      }
    };

    console.log(shuffledAnswers);
    return (
      <div>
        <h2 key={trivia.id}>{trivia.category}</h2>
        <h4>{trivia.question}</h4>
        <button onClick={handleChoice}>
          <li>{shuffledAnswers[0]}</li>
        </button>
        <button onClick={handleChoice}>
          <li>{shuffledAnswers[1]}</li>
        </button>
        <button onClick={handleChoice}>
          <li>{shuffledAnswers[2]}</li>
        </button>
        <button onClick={handleChoice}>
          <li>{shuffledAnswers[3]}</li>
        </button>
      </div>
    );
  });

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

  return (
    <>
      <button onClick={() => getTriviaQuestion()}>Start</button>
      {/* <button onClick={() => getAllAnswers()}>answer</button> */}
      <ul>{triviaItems}</ul>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    question: state.questionReducer.question,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onQuestionLoaded: (question) =>
      dispatch(actionCreators.getQuestion(question)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

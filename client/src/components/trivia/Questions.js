import React, { useState } from "react";
import * as actionCreators from "../../store/creators/actionCreators";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import SelectMenu from "./SelectMenu";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import style from "styled-components";
import Grid from "@mui/material/Grid";
import GridUi from "./GridUI";
import "./Question.css";
import { db } from "../../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import Timer from "./Timer";

function Questions(props) {
  const COLORS = {
    primaryDark: "#374e49",
    primaryLight: "#B6EDC8",
  };
  const Card = style.label`
  background-color: ${COLORS.primaryDark};
  box-shadow: 0 0rem 1rem rgba(182, 237, 200, 0.3);
  text-align: center

`;

  const [difficulty, setDifficulty] = useState("");
  const [show, setShow] = useState(false);
  const Navigate = useNavigate();
  const [result, setResult] = React.useState(0);
  const databaseRef = collection(db, "Rankings");

  const handleShowClick = () => {
    setShow((current) => !current);
  };

  const handleChange = (e) => {
    setDifficulty(e.target.value);
  };

  const getTriviaQuestion = () => {
    fetch(
      `https://the-trivia-api.com/api/questions?limit=1&difficulty=${difficulty}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((question) => {
        if (question) {
          console.log(question);
          props.onQuestionLoaded(question);
        }
      })
      .catch((error) => console.log(error));
  };

  const navigateToRankings = () => {
    addDoc(databaseRef, {
      difficulty: difficulty,
      result: result,
    }).then(() => {
      Navigate("/rankings", {
        state: {
          userRankings: result,
        },
      });
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

    const content = (
      <React.Fragment>
        <CardContent>
          <CardMedia
            component="img"
            height="450vh"
            image={
              "https://images.unsplash.com/photo-1600924779117-927b4f81457d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            }
            alt="Knight on Horse"
          />
          <div>
            <Typography sx={{ fontSize: 14 }} gutterBottom></Typography>
            <Typography
              style={{ marginBottom: "1rem" }}
              variant="h4"
              component="div"
            >
              {trivia.question}
            </Typography>
          </div>
          <Box>
            <Grid>
              <Grid>
                {shuffle([
                  ...trivia.incorrectAnswers,
                  trivia.correctAnswer,
                ]).map((options) => {
                  shuffle([options]);
                  return (
                    <div>
                      <GridUi
                        key={options}
                        options={options}
                        correctAnswer={trivia.correctAnswer}
                        result={result}
                        setResult={setResult}
                      />
                    </div>
                  );
                })}
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </React.Fragment>
    );

    return (
      <>
        <Timer result={result} />
        <div>
          <h2>Score: {result}</h2>

          <h5 className="category" key={trivia.id}>
            Category: {trivia.category}
          </h5>
        </div>
        <div className="trivia-container">
          <Box>
            <Card variant="outlined">{content}</Card>
          </Box>
        </div>
      </>
    );
  });

  return (
    <>
      {!show && (
        <SelectMenu
          setDifficulty={setDifficulty}
          difficulty={difficulty}
          handleChange={handleChange}
        />
      )}

      <ul>{triviaItems}</ul>
      {!show && (
        <Button
          variant="contained"
          style={{
            marginTop: 10,
            backgroundColor: "#374e49",
            color: "#fff",
            padding: 10,
            fontSize: "2rem",
          }}
          onClick={() => {
            getTriviaQuestion();
            handleShowClick();
          }}
        >
          Begin
        </Button>
      )}

      <div className="nextBtn">
        {show && (
          <Button
            variant="contained"
            style={{
              margin: 5,
              backgroundColor: "#374e49",
              color: "#fff",
              padding: 10,
              fontSize: "2rem",
            }}
            onClick={() => {
              getTriviaQuestion();
            }}
          >
            Next
          </Button>
        )}
        {show && (
          <Button
            variant="contained"
            onClick={navigateToRankings}
            style={{
              backgroundColor: "#374e49",
              color: "#fff",
              padding: 10,
              fontSize: "2rem",
              margin: 5,
            }}
          >
            See Rank
          </Button>
        )}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    question: state.questionReducer.question,
    points: state.pointReducer.points,
    userId: state.userReducer.userId,
    isAuthenticated: state.userReducer.isAuthenticated,
    rank: state.pointReducer.rank,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onQuestionLoaded: (question) =>
      dispatch(actionCreators.getQuestion(question)),
    onSubtractPoints: (points) =>
      dispatch(actionCreators.subtractPoints(points)),
    onAddPoints: (points) => dispatch(actionCreators.addPoints(points)),
    onRankLoaded: (rank) => dispatch(actionCreators.getRank(rank)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

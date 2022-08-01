import React, { useState, useEffect } from "react";
import * as actionCreators from "../../store/creators/actionCreators";
import { connect } from "react-redux";
import SelectMenu from "./SelectMenu";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import style from "styled-components";
import Grid from "@mui/material/Grid";
import "./Question.css";

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
  const points = props.points;
  const isAuthenticated = props.isAuthenticated;
  const userId = props.userId;
  const rank = props.rank;
  const token = localStorage.getItem("jsonwebtoken");
  const [difficulty, setDifficulty] = useState("");
  const [trivia, setTrivia] = useState([]);
  const [show, setShow] = useState(false);
  const [buttonText, setButtonText] = useState("Begin");

  function buttonChangeText() {
    setButtonText("Next");
    setTimeout(() => {
      setButtonText("Next");
    }, 1000);
  }

  const handleShowClick = (e) => {
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

    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    }));

    const content = (
      <React.Fragment>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} gutterBottom></Typography>
          <Typography
            style={{ marginBottom: "1rem" }}
            variant="h5"
            component="div"
          >
            {trivia.question}
          </Typography>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Item onClick={handleChoice1}>{shuffledAnswers[0]}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item onClick={handleChoice2}>{shuffledAnswers[1]}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item onClick={handleChoice3}>{shuffledAnswers[2]}</Item>
              </Grid>
              <Grid item xs={6}>
                <Item onClick={handleChoice4}>{shuffledAnswers[3]}</Item>
              </Grid>
            </Grid>
          </Box>
          <Typography variant="body2"></Typography>
        </CardContent>
      </React.Fragment>
    );

    return (
      <>
        <div>
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
          style={{ marginTop: 10 }}
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
            style={{ marginTop: 10 }}
            onClick={() => {
              getTriviaQuestion();
            }}
          >
            Next
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

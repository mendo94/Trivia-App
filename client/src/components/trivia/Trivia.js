import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Timer from "./Timer";
import Questions from "./Questions";
import TitleRanks from "../rankings/TitleRanks";
import LoadingScreen from "../loader/LoadingScreen";
import SelectMenu from "./SelectMenu";
import { connect } from "react-redux";
import axios from "axios";
import Score from "./Score";
import Button from "@mui/material/Button";

function Trivia(props) {
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState("");
  const [trivia, setTrivia] = useState([]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 5000);
  }, []);

  console.log(props.isAuthenticated);

  return (
    <>
      {/* {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          <Score />
          <Timer />
          <Questions />
        </div>
      )} */}
      <div>
        {props.isAuthenticated ? <Score /> : null}
        {/* <SelectMenu
          setDifficulty={setDifficulty}
          difficulty={difficulty}
          handleChange={handleChange}
        /> */}
        {/* <Button
          onClick={getTrivia}
          variant="contained"
          style={{ marginTop: 10 }}
        >
          Start
        </Button> */}
        {/* <Timer /> */}

        <Questions />
        {/* <TitleRanks /> */}
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.userReducer.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Trivia);

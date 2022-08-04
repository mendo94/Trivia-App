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
import Soundify from "../music/Soundify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

function Trivia(props) {
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState("");
  const [trivia, setTrivia] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoading(false), 5000);
  }, []);

  const handleShowClick = () => {
    setShow((current) => !current);
  };

  console.log(props.isAuthenticated);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          {/* <Score /> */}
          <Timer />

          <Questions />
          {!show && (
            <Button variant="contained" onClick={handleShowClick}>
              {" "}
              <FontAwesomeIcon icon={faMusic} />
            </Button>
          )}
          {show && <Soundify />}
        </div>
      )}
      <div>
        {/* {props.isAuthenticated ? <Score /> : null} */}

        {/* <Timer /> */}

        {/* <Questions /> */}
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

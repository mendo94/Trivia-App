import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import Questions from "./Questions";
import TitleRanks from "../rankings/TitleRanks";
import LoadingScreen from "../loader/LoadingScreen";
import { connect } from "react-redux";
import Score from "./Score";

function Trivia(props) {
  const [loading, setLoading] = useState(true);

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
        <Timer />
        <Questions />
        <TitleRanks />
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

import React, { useEffect } from "react";
import * as actionCreators from "../../store/creators/actionCreators";
import { connect } from "react-redux";

function Score(props) {
  const points = props.points;

  useEffect(() => {
    updateScore();
  }, []);

  const updateScore = () => {
    const token = localStorage.getItem("jsonwebtoken");
    const userId = localStorage.getItem("userId");
    console.log(userId);
    if (token && userId && props.isAuthenticated) {
      fetch(`http://localhost:2000/trivia/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((points) => {
          if (points) {
            props.calcPoints(points);
          }
        });
      props.calcPoints(points);
    } else {
      console.log("User is playing without being logged in.");
    }
  };

  console.log(points);

  const handlePointSystem = () => {
    if (points !== 0) {
      const scoreItem = points.map((point) => {
        return <li key={point.id}>{point.points}</li>;
      });
    } else {
      return <li>{props.points}</li>;
    }
  };

  return (
    <div>
      <ul>Score: {handlePointSystem}</ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    points: state.pointReducer.points,
    isAuthenticated: state.userReducer.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    calcPoints: (points) => dispatch(actionCreators.calcPoints(points)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Score);

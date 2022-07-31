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
    if (token && userId) {
      fetch(`http://localhost:2000/rankings/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result) {
            console.log(result);
            props.calcPoints(result);
          }
        })
        .catch((error) => console.log(error));
    }

    return <div>Score: {points}</div>;
  };
}

const mapStateToProps = (state) => {
  return {
    points: state.pointReducer.points,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    calcPoints: (points) => dispatch(actionCreators.calcPoints(points)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Score);

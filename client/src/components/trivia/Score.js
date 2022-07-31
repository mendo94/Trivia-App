import React from "react";
import * as actionCreators from "../../store/creators/actionCreators";

import { connect } from "react-redux";

function Score(props) {
  const points = props.points;
  return <div>Score: {points}</div>;
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

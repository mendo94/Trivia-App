import React from "react";
import * as actionCreators from "../../store/creators/actionCreators";

import { connect } from "react-redux";

function Score(props) {
  return <div>Score: {props.points}</div>;
}

const mapStateToProps = (state) => {
  return {
    points: state.pointReducer.points,
  };
};

export default connect(mapStateToProps)(Score);

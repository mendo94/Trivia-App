import React, { useEffect } from "react";
import * as actionCreators from "../../store/creators/actionCreators";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

//0-20 = peasant
//20-30 = Squire
// 30-40 = Knight
//40-60 = Marquess
//60 - 80 = Price
//80 - 150 = Duke
//150 - 200 = King
//200+ = Emperor

function TitleRanks(props) {
  const points = props.points;
  const isAuthenticated = props.isAuthenticated;
  const userId = props.userId;
  const rank = props.rank;
  const token = localStorage.getItem("jsonwebtoken");
  const Navigate = useNavigate();

  useEffect(() => {
    getUserRank();
  }, []);

  const handleUserPoints = async () => {
    const addRank = await fetch(`http://localhost:2000/rankings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rank),
    });
    const response = await addRank.json();
    if (response.success) {
      props.onRankLoaded(rank);
      Navigate("/rankings");
    } else {
      alert("You must be logged in!");
    }
  };

  const getUserRank = () => {
    if (points > 20) {
      props.onRankLoaded("Peasant");
    } else if (points >= 20 && points <= 30) {
      props.onRankLoaded("Squire");
    } else if (points >= 40 && points <= 60) {
      props.onRankLoaded("Marquess");
    }
  };
  return (
    <div>
      <button onClick={handleUserPoints}>Save Score</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    points: state.pointReducer.points,
    rank: state.pointReducer.rank,
    userId: state.userReducer.userId,
    isAuthenticated: state.userReducer.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRankLoaded: (rank) => dispatch(actionCreators.getRank(rank)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TitleRanks);

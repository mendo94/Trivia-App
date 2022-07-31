import React, { useEffect, useState } from "react";
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
  console.log(points);
  const isAuthenticated = props.isAuthenticated;
  const userId = props.userId;
  console.log(userId);
  const rank = props.rank;
  const token = localStorage.getItem("jsonwebtoken");
  localStorage.getItem("userId");
  console.log(userId);
  const Navigate = useNavigate();
  const [pointsGained, setPointsGained] = useState([]);

  //   console.log(rank);
  //   useEffect(() => {
  //     getUserRank();
  //   }, []);

  const getUserRank = () => {
    if (points > 20) {
      props.onRankLoaded("Peasant");
    } else if (points >= 20 && points < 30) {
      props.onRankLoaded("Squire");
    } else if (points >= 40 && points < 60) {
      props.onRankLoaded("Marquess");
    } else if (points >= 60 && points < 80) {
      props.onRankLoaded("Prince");
    } else if (points >= 80 && points < 150) {
      props.onRankLoaded("Duke");
    } else if (points >= 150 && points < 200) {
      props.onRankLoaded("King");
    } else if (points > 200) {
      props.onRankLoaded("Emperor");
    }
  };

  const handleUserPoints = async () => {
    const addRank = await fetch(`http://localhost:2000/rankings/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rank),
    });
    const response = await addRank.json();
    if (response.success && token) {
      getUserRank();

      props.calcPoints(points);
      props.onRankLoaded(rank);
      Navigate("/rankings");
    } else {
      alert("You must be logged in!");
    }
  };

  //   const handlePointsGained = () => {
  //     setPointsGained({
  //       ...pointsGained,
  //       points,
  //     });
  //   };

  return (
    <div>
      <button
        onClick={() => {
          handleUserPoints();
          // handlePointsGained();
        }}
      >
        Save Score
      </button>
      <p>{rank}</p>
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
    calcPoints: (points) => dispatch(actionCreators.calcPoints(points)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TitleRanks);

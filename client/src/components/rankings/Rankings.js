import React, { useEffect } from "react";
import * as actionCreators from "../../store/creators/actionCreators";
import { connect } from "react-redux";
import "./Ranking.css";

function Rankings(props) {
  const rankings = props.rankings;

  useEffect(() => {
    getRankings();
  }, []);

  const getRankings = () => {
    fetch("http://localhost:2000/rankings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((rankings) => {
        if (rankings) {
          console.log(rankings);
          props.getRankings(rankings);
        }
      });
    props.getRankings(rankings);
  };
  const rankingItems = rankings.map((ranking) => {
    return (
      <>
        <tr>
          <td>
            {ranking.first_name} {ranking.last_name}
          </td>
          <td>{ranking.username} </td>
          <td> {ranking.points[0].points}</td>
        </tr>
      </>
    );
  });

  return (
    <div className="ranking-container">
      <h1 className="ranking-heading">Rankings</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Score</th>
        </tr>
        {rankingItems}
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    rankings: state.pointReducer.rankings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRankings: (rankings) => dispatch(actionCreators.getRankings(rankings)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rankings);

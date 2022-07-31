import React, { useEffect, useState } from "react";
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
        rankings.sort((a, b) =>
          a.points[0].points > b.points[0].points ? -1 : 1
        );
        props.getRankings(rankings);
      });
  };

  const rankingItems = rankings.map((ranking) => {
    console.log(ranking);
    return (
      <>
        <tr>
          <td key={ranking.id}>{ranking.first_name}</td>
          <td>{ranking.username}</td>
          <td> {ranking.points[0].points}</td>
          <td> {ranking.points[0].rank}</td>
        </tr>
      </>
    );
  });

  return (
    <div className="ranking-container">
      <h1 className="ranking-heading">Rankings</h1>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Score</th>
            <th>Rank</th>
          </tr>
          {rankingItems}
        </tbody>
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

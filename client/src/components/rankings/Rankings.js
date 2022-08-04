import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { db } from "../../firebase-config";
import { getDocs, collection } from "firebase/firestore";
import RankingTable from "../rankings/RankingTable";

function Rankings() {
  const { state } = useLocation();
  const [userRankings, setUserRankings] = useState(0);
  const Navigate = useNavigate();
  const [result, setResult] = useState(0);
  const databaseRef = collection(db, "Rankings");
  const [rankingsData, setRankingsData] = useState([]);

  useEffect(() => {
    if (state) {
      const { userRankings } = state;
      setUserRankings(userRankings);
      getData();
    } else {
      getData();
    }
  }, []);

  const playAgain = () => {
    Navigate("/trivia");
  };

  const getData = async () => {
    const data = await getDocs(databaseRef);
    setRankingsData(
      data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => parseFloat(b.result) - parseFloat(a.result))
    );
  };

  return (
    <div>
      <h1 style={{ marginTop: 10, fontFamily: "Almendra" }}>Rankings</h1>

      <Button
        variant="contained"
        style={{ marginTop: 10, fontFamily: "Almendra" }}
        onClick={() => {
          playAgain();
          window.location.reload();
        }}
      >
        Play Again
      </Button>
      <h3 style={{ marginTop: 10, fontFamily: "Almendra" }}>
        Your Score: {userRankings}
      </h3>

      <div style={{ margin: 20 }}>
        <RankingTable rankingsData={rankingsData} />
      </div>
    </div>
  );
}

export default Rankings;

// import React, { useEffect, useState } from "react";
// import * as actionCreators from "../../store/creators/actionCreators";
// import { connect } from "react-redux";
// import "./Ranking.css";

// function Rankings(props) {
//   const rankings = props.rankings;

//   useEffect(() => {
//     getRankings();
//   }, []);

//   const getRankings = () => {
//     fetch("http://localhost:2000/rankings", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((rankings) => {
//         rankings.sort((a, b) =>
//           a.points[0].points > b.points[0].points ? -1 : 1
//         );
//         props.getRankings(rankings);
//       });
//   };

//   const rankingItems = rankings.map((ranking) => {
//     console.log(ranking);
//     return (
//       <>
//         <tr>
//           <td key={ranking.id}>{ranking.first_name}</td>
//           <td>{ranking.username}</td>
//           <td> {ranking.points[0].points}</td>
//           <td> {ranking.points[0].rank}</td>
//         </tr>
//       </>
//     );
//   });

//   return (
//     <div className="ranking-container">
//       <h1 className="ranking-heading">Rankings</h1>
//       <table>
//         <tbody>
//           <tr>
//             <th>Name</th>
//             <th>Username</th>
//             <th>Score</th>
//             <th>Rank</th>
//           </tr>
//           {rankingItems}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// const mapStateToProps = (state) => {
//   return {
//     rankings: state.pointReducer.rankings,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getRankings: (rankings) => dispatch(actionCreators.getRankings(rankings)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Rankings);

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
      <h2 style={{ marginTop: 10, fontFamily: "Almendra" }}>
        Your Score: {userRankings}
      </h2>

      <div style={{ margin: 20 }}>
        <RankingTable rankingsData={rankingsData} />
      </div>
    </div>
  );
}

export default Rankings;

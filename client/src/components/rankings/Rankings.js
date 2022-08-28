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
      <Button
        variant="contained"
        style={{
          margin: "1rem",
          fontFamily: "Almendra",

          backgroundColor: "#374e49",
          color: "#fff",
          padding: 10,
          fontSize: "2rem",
        }}
        onClick={() => {
          playAgain();
          window.location.reload();
        }}
      >
        Play Again
      </Button>
      <h2 style={{ margin: 10, fontFamily: "Almendra" }}>
        Your Score: {userRankings}
      </h2>
      <h1 style={{ margin: 10, fontFamily: "Almendra", fontSize: "5rem" }}>
        Rankings
      </h1>
      <div style={{ margin: 20 }}>
        <RankingTable rankingsData={rankingsData} />
      </div>
    </div>
  );
}

export default Rankings;

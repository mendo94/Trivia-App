import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import Questions from "./Questions";
import TitleRanks from "../rankings/TitleRanks";
import LoadingScreen from "../loader/LoadingScreen";
import Score from "./Score";

function Trivia() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 5000);
  }, []);

  return (
    <>
      {/* {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          <Score />
          <Timer />
          <Questions />
        </div>
      )} */}
      <div>
        <Score />
        <Timer />
        <Questions />
        <TitleRanks />
      </div>
    </>
  );
}

export default Trivia;

import React, { useState, useRef, useEffect } from "react";
import Timer from "./Timer";
import Questions from "./Questions";
import LoadingScreen from "../loader/LoadingScreen";

function Trivia() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 6000);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          <Timer />
          <Questions />
        </div>
      )}
    </>
  );
}

export default Trivia;

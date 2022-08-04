import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

import Video from "./components/assets/Video";

function App() {
  const Navigate = useNavigate();
  const handleQuestButton = () => {
    Navigate("/trivia");
  };

  return (
    <div>
      <h1 className="app-header" style={{ textAlign: "center", margin: 10 }}>
        We need your help to defeat Genghis Khan and his Mongol Empire
      </h1>

      <div style={{ display: "flex", justifyContent: "center", margin: 10 }}>
        <button
          onClick={handleQuestButton}
          style={{
            backgroundColor: "#374e49",
            color: "#fff",
            padding: 10,
            fontSize: "2rem",
          }}
        >
          Begin Quest
        </button>
      </div>
      <Video />
    </div>
  );
}

export default App;

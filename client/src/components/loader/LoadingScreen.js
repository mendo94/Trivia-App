import React from "react";
import "./LoadingScreen.css";
function LoadingScreen() {
  return (
    <>
      <div className="loading-gif">
        <img
          className="animated-gif"
          src={require("../assets/animated-logo.gif")}
          alt="logo"
        />
      </div>
    </>
  );
}

export default LoadingScreen;

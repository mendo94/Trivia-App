import React from "react";
const music = require("./loop1.mp3");

// const sound = () => <audio src={music} autoPlay />;

// export default sound;

export default function App() {
  const audio = new Audio(music);

  function togglePlay() {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  return (
    <div>
      <button onClick={togglePlay}>Music</button>
    </div>
  );
}

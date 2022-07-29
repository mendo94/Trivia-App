import React from "react";
const music = require("./assets/loop1.mp3");
const GOT = require("./assets/GOT.mp3");
const epic = require("./assets/epic.mp3");
const pirates = require("./assets/Pirates.mp3");

export default function App() {
  // const audio = new Audio(music);
  // const audio2 = new Audio(GOT);
  // const audio3 = new Audio(epic);
  // const audio4 = new Audio(pirates);
  let songIndex = 0;
  const songs = [music, GOT, epic, pirates];
  let audio = new Audio(songs[songIndex]);

  function togglePlay() {
    if (audio.pause) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  function skipButton() {
    songIndex += 1;
    let audio = new Audio(songs[songIndex]);
    if (audio.pause) {
      console.log(audio);
      audio.play();
    }
    if (songIndex >= 4) {
      songIndex = 0;
    }
  }

  // function togglePlay() {
  //   audio.pause();
  //   // audio2.pause();
  //   // audio3.pause();
  //   // audio4.pause();
  // }
  // function next() {
  //   if (audio.pause) {
  //   }
  // }

  // function skipButton() {
  //   if (audio2.paused) {
  //     audio.pause();
  //     audio3.pause();
  //     audio4.pause();
  //     audio2.play();
  //   } else {
  //     audio2.pause();
  //   }
  //   if (audio3.paused) {
  //     audio.pause();
  //     audio2.pause();
  //     audio3.play();
  //   } else {
  //     audio3.pause();
  //   }
  //   if (audio4.paused) {
  //     audio3.pause();
  //     audio2.pause();
  //     audio4.play();
  //   } else {
  //     audio4.pause();
  //   }
  // }

  return (
    <div>
      <button onClick={togglePlay}>Pause</button>
      <button onClick={skipButton}>Play/Skip</button>
    </div>
  );
}

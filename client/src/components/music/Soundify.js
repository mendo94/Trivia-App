import { useState } from "react";
// import "./Soundify.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
const oldie = require("../assets/loop1.mp3");
const GOT = require("../assets/GOT.mp3");
const epic = require("../assets/epic.mp3");
const pirates = require("../assets/Pirates.mp3");

export default function Soundify() {
  const musicTracks = [
    {
      name: "By the Quarry",
      src: oldie,
    },
    {
      name: "GOT",
      src: GOT,
    },
    {
      name: "An Epic Tale",
      src: epic,
    },
    {
      name: "Ready for Battle",
      src: pirates,
    },
  ];

  const [trackIndex, setTrackIndex] = useState(0);

  const handleClickPrevious = () => {
    setTrackIndex((currentTrack) =>
      currentTrack === 0 ? musicTracks.length - 1 : currentTrack - 1
    );
  };

  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < musicTracks.length - 1 ? currentTrack + 1 : 0
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "rgba(182, 237, 200, 0.3)",
      }}
    >
      <AudioPlayer
        style={{
          borderRadius: "1rem",
          textAlign: "center",
          backgroundColor: "#282c34",
        }}
        src={musicTracks[trackIndex].src}
        onPlay={(e) => console.log("onPlay")}
        showSkipControls={true}
        showJumpControls={false}
        header={`Now playing: ${musicTracks[trackIndex].name}`}
        onClickPrevious={handleClickPrevious}
        onClickNext={handleClickNext}
        onEnded={handleClickNext}
      />
    </div>
  );
}

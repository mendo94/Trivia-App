import React, { Component } from "react";
import video1 from "../assets/video1.mp4";

class Video extends Component {
  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <video
            src={video1}
            width="60%"
            height="auto"
            controls="controls"
            autoplay="true"
            style={{ border: "5px solid black" }}
          />
        </div>
      </div>
    );
  }
}

export default Video;

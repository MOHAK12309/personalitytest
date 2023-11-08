import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
const register = new URL("../../images/a1_White-01 (1).png", import.meta.url);

const Background = new URL(
  "../../images/Background Advanced.gif",
  import.meta.url
);
const Background2 = new URL(
  "../../images/image-removebg-preview.png",
  import.meta.url
);
function Game() {
    const videoRef = useRef(null);

  return (
    <div className="video">
      <div className="a1_white">
        <div className="img-game">
          <img src={register} width="100%" ></img>
          <div style={{textAlign:"center"}}>
          
          
          </div>
        </div>
      </div>
      <video
        src={Background}
        disablePictureInPicture
        autoplay="autoplay"
        muted
        className="video2"
     
        loop
      ></video>
    </div>
  );
}

export default Game;

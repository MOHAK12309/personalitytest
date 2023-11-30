import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
const register = new URL(
  "../../images/a1_White-01 (1).png",
  import.meta.url
);

const Background = new URL(
  "../../images/Background Advanced.gif",
  import.meta.url
);
const Background2 = new URL(
  "../../images/image-removebg-preview.png",
  import.meta.url
);
const Background3 = new URL(
  "../../images/A new era of LBE XR Gaming.png",
  import.meta.url
);
const joinNow = new URL("../../images/JOIN NOW.png", import.meta.url);
function Game() {
  const videoRef = useRef(null);

  return (
    <div>
   
    
      <div className="video">
        <div className="a1_white">
          <div className="img-game">
            <img src={register} width="100%"></img>
            
            <div style={{ textAlign: "center" }}></div>
          </div>
          <div className="img-game1">
          <img src={Background3} width="100%"></img>
            
            <div style={{ textAlign: "center" }}></div>
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
    
      <div className="joinFooter">
        <div className="join-btn-main">
        <Link to="join"> <button className="join-btn"> <img width="100%" src={joinNow}></img> </button></Link> 
      
        </div>
        <div  style={{textAlign:"center",width:"100%",margin:"auto auto 10px auto"}}>
         <h3 className="right">ALL RIGHTS RESERVED | © www.OURCADIUM.com</h3>
         </div>
     
      </div>
    
    </div>
  );
}

export default Game;

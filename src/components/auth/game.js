import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import QrScanner from "react-qr-scanner";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Button } from "@mui/material";
const register = new URL("../../images/a1_White-01 (1).png", import.meta.url);

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
const Scan = new URL("../../images/SCAN CODE.png", import.meta.url);

const joinNow = new URL("../../images/JOIN NOW.png", import.meta.url);
const newera = new URL("../../images/newera.png", import.meta.url);
function Game() {
  const videoRef = useRef(null);
  const [scanneropen, setopenScan] = useState(false);
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };
    if (scanneropen) {
      startCamera();
    }
    return () => {
      const video = videoRef.current;

      if (video) {
        const stream = video.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
      }
    };
  }, []);
  const handleScan = (result) => {
    if (result) {
      console.log("qr folund");
      console.log(result, "hhhhj");
      // Use a regex to check if the result is a valid URL

      if (result) {
        // Navigate to the detected URL

        window.location.href = result.text;
        setopenScan(false);
      } else {
        console.error("Invalid URL format");
      }
    }
  };
  const handleScanOpen = () => {
    setopenScan(true);
    window.scrollTo(0, 0);
  };

  const handleError = (error) => {
    console.error("Error accessing camera:", error);
  };
  const [flashOn, setFlashOn] = useState(false);
  const toggleFlash = () => {
    setFlashOn(!flashOn);
  };
  return (
    <div>
      {scanneropen &&
        <div style={{width:"100%",textAlign:"center"}}> <Button style={{backgroundColor:"#0d4f74",color:"white",position:"relative",top:"80vh",fontFamily:"'Rajdhani',sans-serif",zIndex:"99999"}} onClick={()=>setopenScan(false)}>Close</Button></div>
        }
          {scanneropen &&
        <div style={{width:"100%",textAlign:"center" ,zIndex:"9999"}} className="X2"> Scan Ride Qr Code</div>
        }
         
      <div className="scanner-container">
        {scanneropen && (
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%", height: "50vh" }}
            facingMode="environment"
            facingModeChanged={(value) => {
              if (value === "user") {
                // Flash is not supported when using the front camera
                setFlashOn(false);
              }
            }}
            constraints={{
              video: {
                facingMode: "environment",
                torch: flashOn,
              },
            }}
          />
        )}
    
      </div>
      <div className={`video ${scanneropen ? "blurred-background" : ""}`}>
        <div className="a1_white">
          <div className="img-game">
            <img src={register} width="100%"></img>

            <div style={{ textAlign: "center" }}></div>
          </div>
          <div className="img-game1">
            <img src={newera} width="100%"></img>

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
          <Link to="join">
            {" "}
            <button className="join-btn">
              {" "}
              <img width="200px" src={joinNow}></img>{" "}
            </button>
          </Link>

          <div>
            <button
              onClick={handleScanOpen}
              style={{
                marginTop: "10px",
              }}
              className="join-btn"
            >
              <img width="200px" height="25px" src={Scan}></img>
            </button>
          </div>
        </div>
        <div
          style={{
            textAlign:"center",
            width: "100%",
            margin: "auto auto 10px auto",
            paddingTop:"150px"
          }}
        
        
        >
        <h3   className="right">ALL RIGHTS RESERVED | © www.OURCADIUM.com</h3>  
        </div>
        
      </div>
    </div>
  );
}

export default Game;

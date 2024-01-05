import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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
const joinNow = new URL("../../images/JOIN NOW.png", import.meta.url);

function Rides() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    handleRide();
  }, []);
  const handleRide = async () => {
    try {
      const res = await axios.get("https://server.youthbuzz.in/api/v1/ride/getRide");
      setData(res.data.data.ride);
      console.log(
        res.data.data.ride[0].Gallery[0].slice(0, 500),
        "<----api data"
      );
    } catch (err) {
      console.log(err, "<--- err in api fetching");
    }
  };
  return (
    <>
      {data.map((item) => {
        return (
          <div>
            <div style={{ height: "auto" }} className="video">
              <div style={{
                    position: "fixed",
                    width: "400px",
                    bottom: "30px",
                    width:"100%",
                    zIndex: "99",
                  }}>
                    <div style={{width:"100%",textAlign:"center"}}>
                <button
                 style={{width:"400px"}}
                  className="join-btn"
                >
                  BOOK NOW
                </button>
                </div>
              </div>

              <div style={{ paddingTop: "100px" }} className="">
                <div className="img-game">
                  <div className="RidePic">
                    <h1>{item.Name}</h1>
                    <img
                      width="100%"
                      src={`https://ourcadium.s3.ap-south-1.amazonaws.com/Ride%20Thumbnails%20and%20Gallery%20Images/thumbnail-6597d231ae1baa8234a9d881-1704448736153.jpeg`}
                    ></img>

                    <h2>Location:{item.Location}</h2>
                    <h2>Rating:{item.Rating}</h2>
                    <h2>ID:{item.RideID}</h2>

                    <Carousel
                      minimumTouchDrag={80}
                      swipeable={true}
                      draggable={true}
                      showDots={false}
                      responsive={responsive}
                      ssr={true} // means to render carousel on server-side.
                      infinite={true}
                      autoPlaySpeed={4000}
                      autoPlay={true}
                      keyBoardControl={true}
                      transitionDuration={500}
                      containerClass="rideSlide"
                    >
                      {item.Gallery.map((item2) => {
                        return (
                          <div>
                            <img
                              width="100%"
                              src={`https://ourcadium.s3.ap-south-1.amazonaws.com/${item2}`}
                            ></img>
                          </div>
                        );
                      })}
                    </Carousel>
                    <p>{item.Description}</p>
                  </div>

                  <div></div>
                  <div></div>
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
          </div>
        );
      })}
    </>
  );
}
export default Rides;

import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getUserIdFromAuth } from "../../Redux/actions/GetSellerIdFromAuthActionCreators";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
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
const vrspaceShip = new URL(
  "../../images/THE VR Spaceship.png",
  import.meta.url
);
function Rides() {
  const baseUrl = "https://server.youthbuzz.in";
  const baseUrls = "http://localhost:8000";
  const { resetToken } = useParams();
  const navigate = useNavigate("");

  console.log(resetToken);
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
  const [timeSlot, setTimeSlot] = useState("");
  const [amount, setAmont] = useState("");
  const [Status, setStatus] = useState("");
  const [bookStatus, setBookstatus] = useState("");
  const handleTime = (e) => {
    e.preventDefault();
    setAmont(timeSlot);
  };
  useEffect(() => {
    handleRide();
  }, []);
  useEffect(() => {
    if (data === undefined || data.length === 0) return;
    setStatus(data[0].Status !== null ? data[0].Status : "");
  }, [data]);
  console.log(Status);
  const id = useSelector((state) => state.get_seller_profile_id.user_id);

  const RideBuy = async () => {
    try {
      const res = await axios.post(`${baseUrl}/api/v1/booking/BookRide/1184`, {
        Coins: amount,
        RideName: "Vr Spaceship",
        Slot: timeSlot,
      });
      console.log(res, "jkhjkljkl");
      if (res.data.status == "Success") {
        setBookstatus("processing");
        buytest();
      }
    } catch (error) {
      alert("Booked");
      setBookstatus("");
    }
  };
  const RideStatus = async () => {
    try {
      const res = await axios.patch(
        `${baseUrl}/api/v1/ride/updateRideStatus/1184`
      );
      console.log(res);
      if (res.data.status == "Success") {
        alert("your slot is booked");
      }
    } catch (error) {
      alert("Booked Try Again Later");
    }
  };
  const buytest = async () => {
    try {
      const res = await axios.patch(
        `https://server.youthbuzz.in/api/v1/user/updatecoin/${id}`,
        {
          amount: timeSlot,
        }
      );
      console.log(res);
      if (res.data.status == true) {
        setBookstatus("confirm");
        RideStatus();
      }
    } catch (error) {}
  };

  const handleRide = async () => {
    try {
      const res = await axios.get(
        "https://server.youthbuzz.in/api/v1/ride/getRide"
      );
      setData(res.data.data.ride);
      console.log(
        res.data.data.ride[0].Gallery[0].slice(0, 500),
        "<----api data"
      );
    } catch (err) {
      console.log(err, "<--- err in api fetching");
    }
  };
  useEffect(() => {
    if (!id) {
      navigate("/login", {
        replace: true,
        state: {
          signIn: true,
        },
      });
    } else {
      navigate("/rides/1184/VR Spaceship");

      // Assuming fetchData is a function you want to call when 'id' is truthy
    }
  }, [navigate, id]);
  return (
    <>
      {bookStatus == "form" && (
        <div>
          {data.map((item) => {
            return (
              <div
                style={{ position: "absolute", width: "100%", zIndex: "100" }}
              >
                <div className="bookslot">
                  <h1>
                    <img width="100%" src={vrspaceShip}></img>{" "}
                  </h1>
                  <img
                    width="200px"
                    height="200px"
                    src="https://ourcadium.s3.ap-south-1.amazonaws.com/Ride%20Thumbnails%20and%20Gallery%20Images/thumbnail-6597d231ae1baa8234a9d881-1704448736153.jpeg"
                  ></img>
                  <div className="bookfont"> Status:{item.Status}</div>
                  <div className="bookfont" style={{ display: "flex" }}>
                    Book for:{" "}
                    <select
                      className="timeselection"
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                    >
                      <option value="10">10</option>
                      <option value="30">30</option>
                      <option value="45">45</option>
                      <option value="60">60</option>
                    </select>{" "}
                    min
                  </div>
                  <div className="bookfont">
                    cost:
                    <input
                      type="text"
                      disabled
                      className="bookfont"
                      style={{
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        margin: "0px",
                        width: "60px",
                      }}
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                    ></input>
                  </div>
                  <button onClick={RideBuy} className="confirm">
                    Confirm Booking
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {bookStatus == "processing" && (
        <div>
          {data.map((item) => {
            return (
              <div
                style={{ position: "absolute", width: "100%", zIndex: "100" }}
              >
                <div className="bookslot">
                  <h1>
                    <img width="100%" src={vrspaceShip}></img>{" "}
                  </h1>
                  <img
                    width="200px"
                    height="200px"
                    src="https://ourcadium.s3.ap-south-1.amazonaws.com/Ride%20Thumbnails%20and%20Gallery%20Images/thumbnail-6597d231ae1baa8234a9d881-1704448736153.jpeg"
                  ></img>
                  <h4 className="bookfont">Processing booking...........</h4>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {bookStatus == "confirm" && (
        <div>
          {data.map((item) => {
            return (
              <div
                style={{ position: "absolute", width: "100%", zIndex: "100" }}
              >
                <div className="bookslot">
                  <h1>
                    <img width="100%" src={vrspaceShip}></img>{" "}
                  </h1>
                  <img
                    width="200px"
                    height="200px"
                    src="https://ourcadium.s3.ap-south-1.amazonaws.com/Ride%20Thumbnails%20and%20Gallery%20Images/thumbnail-6597d231ae1baa8234a9d881-1704448736153.jpeg"
                  ></img>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h4
                      style={{ textAlign: "center", margin: "0px" }}
                      className="bookfont"
                    >
                      Booking Confirmed!
                    </h4>
                    <h4 className="bookfont">Start Time:</h4>
                    <h4 className="bookfont">End Time:</h4>

                    <button
                      onClick={() => setBookstatus("")}
                      className="confirm"
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div>
        {data.map((item) => {
          return (
            <div>
              <div style={{ height: "auto" }} className="video">
                <div
                  style={{
                    position: "fixed",
                    width: "400px",
                    bottom: "30px",
                    width: "100%",
                    zIndex: "99",
                  }}
                  className={`profile-b ${
                    bookStatus ? "blurred-background" : ""
                  }`}
                >
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <button
                      onClick={(e) => setBookstatus("form")}
                      style={{ width: "400px" }}
                      className="join-btn"
                    >
                      BOOK NOW
                    </button>
                  </div>
                </div>

                <div>
                  <div
                    style={{ paddingTop: "100px" }}
                    className={`profile-b ${
                      bookStatus ? "blurred-background" : ""
                    }`}
                  >
                    <div className="img-game">
                      <div className="RidePic">
                        <h1>
                          <img width="80%" src={vrspaceShip}></img>{" "}
                        </h1>
                        <br></br>
                        <img
                          width="70%"
                          height="400px"
                          src={`https://ourcadium.s3.ap-south-1.amazonaws.com/Ride%20Thumbnails%20and%20Gallery%20Images/thumbnail-6597d231ae1baa8234a9d881-1704448736153.jpeg`}
                        ></img>

                        <h2
                          style={{
                            textAlign: "left",
                            color: "white",
                            marginTop: "50px",
                          }}
                        >
                          Location:{item.Location}
                        </h2>
                        <h2 style={{ textAlign: "left", color: "white" }}>
                          Rating:{item.Rating}
                        </h2>
                        <h2 style={{ textAlign: "left", color: "white" }}>
                          ID:{item.RideID}
                        </h2>

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
                        <p className="ridedes">{item.Description}</p>
                      </div>

                      <div></div>
                      <div></div>
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
            </div>
          );
        })}
      </div>
    </>
  );
}
export default Rides;

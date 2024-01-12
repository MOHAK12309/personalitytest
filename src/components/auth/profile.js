import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { initializeApp } from "firebase/app";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserIdFromAuth } from "../../Redux/actions/GetSellerIdFromAuthActionCreators";
const Background = new URL(
  "../../images/Background Advanced.gif",
  import.meta.url
);
const logo = new URL("../../images/Color_Gradient 2 (1).png", import.meta.url);

function Profile() {
  const videoRef = useRef(null);
  const [data, setData] = useState([]);
  const baseUrl = "https://server.youthbuzz.in";
  const id = useSelector((state) => state.get_seller_profile_id.user_id);
  const navigate=useNavigate('')
  const dispatch=useDispatch('')
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/user/getOneuser/${id}`
      );
      setData([response.data.data.user]);

      console.log(response);
    } catch (error) {}
  };
  const handleLogout = async (e) => {
    e.preventDefault();

    dispatch(getUserIdFromAuth(""));
    toast.success("You logged Out Successfully");
    navigate("/login");
  };
  return (
    <>
      {data.map((item) => {
        return (
          <div className="video3">
            <div className="nav">
              <div className="logo" style={{ width: "200px" }}>
                <img width="100%" src={logo}></img>
              </div>
              <div>
                <button
                  onClick={handleLogout}
                  style={{ background: "#0d4f74" }}
                  variant="contained"
                  className="logout pc"
                >
                  LOGOUT
                </button>
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
            <div></div>
            <div className="abso">
              <div className="profile-main">
                <div>
                  <h2 className="p-name pc">{item.name}</h2>
                </div>
                <div className="profile-des">
                  <div className="profile-pic">
                    <img
                      width="100%"
                      height="150px"
                      style={{ borderRadius: "50%" }}
                      src={`https://youthbuzzdata.s3.ap-south-1.amazonaws.com/${item.photo}`}
                    ></img>
                  </div>
                  <h2 className="p-name mobile">{item.name}</h2>
                  <div className="profile-des-para-main">
                    <h2 className="profile-des-para">
                      A paragraph about you and some other data
                    </h2>
                    <div>
                      <button
                        onClick={handleLogout}
                        style={{ background: "#0d4f74", margin: "10px auto" }}
                        variant="contained"
                        className="logout mobile"
                      >
                        LOGOUT
                      </button>
                    </div>
                  </div>
                </div>
                <div className="profile-more">
                  <div className="profile-flex">
                    <div className="profile-flex1">
                      <h3 className="profile-wallet-main">
                        COINS:{item.yourCoin}
                      </h3>
                    </div>
                    <div className="profile-flex2">
                      {" "}
                      <h3 className="profile-wallet-main">
                        NEWS AND BLOGS
                      </h3>{" "}
                    </div>
                  </div>
                </div>
                <div className="profile-more">
                  <div className="profile-flex">
                    <div className="profile-flex1"></div>
                    <div className="profile-flex2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Profile;

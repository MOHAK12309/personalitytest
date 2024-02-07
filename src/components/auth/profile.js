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
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserIdFromAuth } from "../../Redux/actions/GetSellerIdFromAuthActionCreators";
import QrScanner from "react-qr-scanner";
const Background = new URL(
  "../../images/Background Advanced.gif",
  import.meta.url
);
const logo = new URL("../../images/Color_Gradient 2 (1).png", import.meta.url);
const Scan = new URL("../../images/SCAN CODE.png", import.meta.url);
const LOGOUT = new URL("../../images/LOGOUT.png", import.meta.url);

function Profile() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState("profile");
  const [show, setShow] = useState("case1");
  const [show3, setShow3] = useState(true);
  const [name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [sign, setSign] = useState("firstVerify");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setCPassword] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [token, setToken] = useState("");
  const [cookie, setCookie] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [gender, setGender] = useState("");
  const [OTP, setOTP] = useState("");
  const [sign2, setSign2] = useState("login");
  const [dob, setDob] = useState();
  const [number, setNumber] = useState("");
  const [lastname, setLastname] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [showUpload, setUpload] = useState(false);
  const [country, setcountry] = useState("");
  const [file, setFile] = useState("");
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailphoneNumber, setemailPhoneNumber] = useState("");
  const [current, setCurrent] = useState("");
  const [code, setCode] = useState(0);
  const baseUrl = "https://server.youthbuzz.in";
  const id = useSelector((state) => state.get_seller_profile_id.user_id);
  const navigate = useNavigate("");
  const dispatch = useDispatch("");
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${baseUrl}/api/v1/user/update/${id}`,
        {
          Description: Description,
          lastname: lastname,
          name: name,

          // isEmailVerified: isEmailVerified
        }
      );
      // dispatch(getUserIdFromAuth(response.data.data.user._id, response.data.data.user.name, response.data.data.user.email));
      if (response.data.status === "success") {
        toast("Profile updated success");

        // dispatch(getUserIdFromAuth(response.data.data.user._id,  response.data.data.user.name, response.data.data.user.email));
        console.log(response.data.data.user._id);

        // settoken(response.data.token);
        // navigate("/home")
        // console.log(response.data.data.user.name)
        // settoken(response.data.token);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (data === undefined || data.length === 0) return;
    setDescription(data[0].Description !== null ? data[0].Description : "");
    setName(data[0].name !== null ? data[0].name : "");
    setLastname(data[0].lastname !== null ? data[0].lastname : "");
  }, [data]);
  const handleError = (error) => {
    console.error("Error accessing camera:", error);
  };
  const [flashOn, setFlashOn] = useState(false);
  const toggleFlash = () => {
    setFlashOn(!flashOn);
  };

  //   profile update
  const handleSubmitphoto = async (e) => {
    e.preventDefault();

    toast.success("image uploaded");
    const formData = new FormData();
    formData.append("photo", file);
    try {
      const response = await axios.patch(
        `${baseUrl}/api/v1/user/updatePhoto/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // Handle the response from the server
      if (response.data.status === "success") {
      }
      // setFile(response.data);
    } catch (error) {
      setUpload(false);
      console.error(error);
    }
  };

  const handleFileChange = (event) => {
    console.log(event.target.value);
    setFile(event.target.files[0]);
    // setUpload("show")
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `${baseUrl}/api/v1/user/updatepass/${id}`,
        {
          // lastname:lastname,
          passwordCurrent: current,
          password: password,

          // isEmailVerified: isEmailVerified
        }
      );

      if (response.data.statusbar === "success") {
        toast.success("Password Updated");

        console.log(response);
      }
      // if (response.data.statusbar === "success") {
      //   dispatch(getUserIdFromAuth(response.data.data.user._id, response.data.data.user.lastname, response.data.data.user.name, response.data.data.user.email));
      //   navigate("/home")
      // }
    } catch (error) {
      console.log(error);
      toast.error("Current password is wrong");
      // if (error.message === "Request failed with status code 403") {
      //   setsign("OTP")

      // }
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
      navigate("/userProfile");

      // Assuming fetchData is a function you want to call when 'id' is truthy
    }
  }, [navigate, id]);

  return (
    <>
      {data.map((item) => {
        return (
          <div className="video3">
            <div className="nav">
              <div className="logo" style={{ width: "200px" }}>
                <Link to="/">
                  {" "}
                  <img width="100%" src={logo}></img>
                </Link>
              </div>
              <div>
                <button
                  onClick={handleLogout}
                  style={{ background: "#0d4f74" }}
                  variant="contained"
                  className="logout pc"
                >
                  <img width="70%" src={LOGOUT}></img>
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
              {edit == "profile" && (
                <div className="profile-main">
                  <div className="mobile">
                    <EditNoteOutlinedIcon
                      onClick={() => setEdit("edit")}
                      style={{
                        color: "white",
                        position: "absolute",
                        cursor: "pointer",
                        top: "59px",
                        right: "50px",
                      }}
                    />
                  </div>
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
                      <h2 className="profile-des-para">{item.Description}</h2>
                      <div className="pc">
                        <EditNoteOutlinedIcon
                          style={{ color: "white", cursor: "pointer" }}
                          onClick={() => setEdit("edit")}
                        />
                      </div>
                      <div>
                        <button
                          onClick={handleLogout}
                          style={{ background: "#0d4f74", margin: "10px auto" }}
                          variant="contained"
                          className="logout mobile"
                        >
                          <img width="70%" src={LOGOUT}></img>
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
                  {scanneropen && (
                    <div className="scanner-container">
                      <QrScanner
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: "100%", zIndex: "99" }}
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
                    </div>
                  )}
                  <div style={{ textAlign: "center" }}>
                    {scanneropen ? (
                      <button
                        onClick={() => {
                          setopenScan(false);
                        }}
                        className="X"
                        style={{ marginTop: "10px" }}
                      >
                        X
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setopenScan(true);
                        }}
                        style={{
                          padding: "20px 30px 20px 30px",
                          marginTop: "10px",
                        }}
                        className="join-btn"
                      >
                        <img width="200px" src={Scan}></img>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {edit == "edit" && (
                <div style={{ width: "60%", margin: "auto" }}>
                  <div className="profile-main" style={{ textAlign: "center" }}>
                    <h4 className="join-font">EDIT PROFILE</h4>
                    <form onSubmit={handleSubmitphoto}>
                      <br></br>
                      <h4 className="join-font">UPLOAD PHOTO</h4>
                      <input
                        onChange={handleFileChange}
                        className="input-form"
                        type="file"
                      ></input>
                      <button type="submit" className="join-btn2">
                        SAVE
                      </button>
                    </form>
                    <form onSubmit={handleSignUp}>
                      <br></br>
                      <h4 className="join-font">PERSONAL DETIALS</h4>
                      <input
                        type="text"
                        placeholder={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-form"
                      ></input>
                      <input
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder={lastname}
                        className="input-form"
                      ></input>
                      <textarea
                        rows="10"
                        value={Description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={Description}
                        className="input-form"
                      ></textarea>
                      <button type="submit" className="join-btn2">
                        SAVE
                      </button>
                    </form>
                    <form onSubmit={handleLogin}>
                      <br></br>
                      <h4 className="join-font">UPDATE PASSWORD</h4>
                      <input
                        type="password"
                        value={current}
                        onChange={(e) => setCurrent(e.target.value)}
                        className="input-form"
                      ></input>

                      <input
                        type="password"
                        value={confirm_password}
                        onChange={(e) => setCPassword(e.target.value)}
                        className="input-form"
                      ></input>
                      <button type="submit" className="join-btn2">
                        SAVE
                      </button>
                    </form>
                    <button
                      onClick={() => setEdit("profile")}
                      className="join-btn2"
                    >
                      BACK
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Profile;

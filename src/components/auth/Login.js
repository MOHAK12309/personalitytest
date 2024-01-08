import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function Login() {
  const [number, setNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [show, setShow] = useState("number");
  const HandleLogin=async()=>{
    try {
        res=await axios.post('https://server.youthbuzz.in/api/v1/user/loginWithOtp',{
            number:number,
            OTP:otp

        })
        
    } catch (error) {
        console.log(error,"error")
        
    }

  }
  return (
    <div>
      {show == "number" && (
        <form>
          <div>Number</div>
          <div>
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            ></input>
          </div>
          <div>
            <button>SEND OTP</button>
          </div>
        </form>
      )}
      {show == "otp" && (
        <form>
          <div>Enter Otp</div>
          <div>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            ></input>
          </div>
          <div>
            <button>Verify OTP</button>
          </div>
        </form>
      )}
    </div>
  );
}
export default Login;

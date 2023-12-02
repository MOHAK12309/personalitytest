import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";

function Join() {
  const [name, setName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null); // New state for reCAPTCHA
  const Navigate = useNavigate("");

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaValue) {
      toast.error("Please verify that you are not a robot.");
      return;
    }

    try {
      const res = await axios.post(
        "https://server.ourcadium.com/api/v1/user/signup",
        {
          name: name,
          phoneNumber: phone,
          desc: description,
          email: email,
        }
      );

      if (res.data.statusbar === "success") {
        toast.success("Recruitment initiated");
        Navigate("/end");
      }

      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("You are already registered");
    }
  };

  return (
    <div className="joinback">
      <div className="join-form">
        <h4 className="join-font">JOIN THE ARMADA TO BEYOND THE KNOWN</h4>
        <form onSubmit={handleSubmit} className="join-form-main">
          <div style={{ width: "80%", margin: "auto" }}>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="input-form"
              type="text"
              placeholder="Name*"
            ></input>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-form"
              type="email"
              placeholder="Email*"
            ></input>

            <input
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phone}
              className="input-form"
              type="tel"
              placeholder="Contact*"
            ></input>

            <textarea
              placeholder="Additional Note"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="input-form"
              style={{ height: "180px" }}
            ></textarea>

            {/* Add reCAPTCHA component */}
            <ReCAPTCHA
              sitekey="6Ld7FCQpAAAAAEVxVaBwSAXPjfljYxrfArXTSLDz"
              onChange={handleRecaptchaChange}
            />

            <button type="submit" className="join-btn2">
              JOIN NOW
            </button>
          </div>
        </form>
      </div>
      <div
        style={{
          textAlign: "center",
          width: "100%",
          margin: "auto",
          position: "absolute",
          bottom: "10px",
        }}
      >
        <h3 className="right">ALL RIGHTS RESERVED | © www.OURCADIUM.com</h3>
      </div>
    </div>
  );
}

export default Join;

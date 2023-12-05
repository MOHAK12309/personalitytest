import React, { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "@mui/material/Button";

function Join() {
  const [name, setName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const recaptchaRef = useRef(null); // Create a ref for the reCAPTCHA component
  const navigate = useNavigate();

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Execute reCAPTCHA programmatically
      const recaptchaValue = await recaptchaRef.current.executeAsync();

      const res = await axios.post(
        "https://server.ourcadium.com/api/v1/user/signup",
        {
          name: name,
          phoneNumber: phone,
          desc: description,
          email: email,
          recaptchaValue: recaptchaValue,
        }
      );

      if (res.data.statusbar === "success") {
        toast.success("Recruitment initiated");
        navigate("/end");
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

        <div className="join-form-main">
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
              placeholder="Contact number (with country code)"
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
              ref={recaptchaRef} // Attach the ref to the reCAPTCHA component
              sitekey="6Ld7FCQpAAAAAEVxVaBwSAXPjfljYxrfArXTSLDz"
              onChange={handleRecaptchaChange}
              style={{ display: "none" }} // Hide the reCAPTCHA element
            />

            <div style={{ width: "80%", textAlign: "left" }}>
              <Button
                type="submit"
                onClick={handleSubmit}
                style={{ background: "#0d4f74" }}
                variant="contained"
                className="join-btn2"
              >
                JOIN NOW
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          width: "100%",
          margin: "auto",
          position: "absolute",
          bottom: "0px",
        }}
      >
        <h3 className="right">ALL RIGHTS RESERVED | © www.OURCADIUM.com</h3>
      </div>
    </div>
  );
}

export default Join;

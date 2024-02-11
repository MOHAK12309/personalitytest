import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Background2 = new URL("../../images/JOIN.png", import.meta.url);

function Join() {
  const [name, setName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const Navigate = useNavigate("");

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };
  const Background3 = new URL("../../images/Armada.png", import.meta.url);
  const validateEmail = (email) => {
    // Email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Numeric characters only regex pattern
    const numericRegex = /^[0-9]+$/;
    return numericRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    // Validate email and phone fields
    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (!validatePhone(phone)) {
      toast.error("Phone number should contain only numeric characters");
      return;
    }

    try {
      const res = await axios.post(
        "https://server.youthbuzz.in/api/v1/ourcadium/Lead",
        {
          nameOflead: name,
          ContactOfaLead: phone,
          DescriptionOfLead: description,
          EmailOfLead: email,
        }
      );
   
      if (res.data.status === "Success") {
        
        toast.success("Recruitment initiated");
        Navigate("/end");
      }

    } catch (error) {

      toast.error("You are already registered");
    }
  };

  return (
    <div className="joinback">
      <div className="join-form">
        <form>
          <div className="join-form-main">
            <div style={{ width: "80%", margin: "auto" }}>
              <img src={Background3} width="100%"></img>
              <div style={{ width: "90%", margin: "auto" }}>
                <input
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="input-form"
                  type="text"
                  placeholder="Name*"
                ></input>

                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-form"
                  type="email"
                  placeholder="Email*"
                ></input>

                <input
                  onChange={(e) => {
                    // Allow only numeric characters in the phone input
                    const numericValue = e.target.value.replace(/[^0-9]/g, "");
                    setPhoneNumber(numericValue);
                  }}
                  value={phone}
                  className="input-form"
                  type="tel"
                  required
                  placeholder="Contact number (with country code)"
                ></input>

                <textarea
                  placeholder="Additional Note"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="input-form"
                  style={{ height: "180px" }}
                ></textarea>

                <ReCAPTCHA
                  sitekey="6Ld7FCQpAAAAAEVxVaBwSAXPjfljYxrfArXTSLDz"
                  onChange={handleRecaptchaChange}
                  style={{ marginTop: "20px" }}
                />

                <div
                  style={{ width: "80%", textAlign: "left", marginTop: "20px" }}
                >
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    style={{ background: "#0d4f74" }}
                    variant="contained"
                    className="join-btn2"
                  >
                    <img src={Background2}></img>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            <h3 style={{margin:"0px"}} className="right">ALL RIGHTS RESERVED | © www.OURCADIUM.com</h3>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Join;

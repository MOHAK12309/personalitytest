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
      {/* ... your existing code ... */}
      <form onSubmit={handleSubmit} className="join-form-main">
        {/* ... your existing input fields ... */}
        {/* Add reCAPTCHA component */}
        <ReCAPTCHA
          sitekey="6Ld7FCQpAAAAAEVxVaBwSAXPjfljYxrfArXTSLDz"
          onChange={handleRecaptchaChange}
        />
        <button type="submit" className="join-btn2">
          JOIN NOW
        </button>
      </form>
    </div>
  );
}

export default Join;

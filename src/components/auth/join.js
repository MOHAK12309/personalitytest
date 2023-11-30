import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
function Join() {
  const [name, setName] = useState("");
  const [phone, setphoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const Navigate=useNavigate('')

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://server.ourcadium.com/api/v1/user/signup", {
        name: name,
        phoneNumber: phone,
        desc: description,
        email: email,
      });
      if(res.data.statusbar === "success"){
        toast.success('Recruitment initiated')
        Navigate('/end')
        


      }

      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error('you are already registerd')
    }
  };
  return (
    <div className="joinback">
      <div className="join-form">
        <h4 className="join-font">JOIN THE ARMADA TO BEYOND THE KNOWN</h4>
        <form onSubmit={handlesubmit} className="join-form-main">
          <div style={{ width: "80%", margin: "auto" }}>
            <div>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="input-form"
                type="text"
                placeholder="Name*"
              ></input>
            </div>
            <div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-form"
                type="email"
                placeholder="Email*"
              ></input>
            </div>
            <div>
              <input
                onChange={(e) => setphoneNumber(e.target.value)}
                value={phone}
                className="input-form"
                type="tel"
                placeholder="Contact*"
              ></input>
            </div>
            <div>
              <textarea
                placeholder="Additional Note"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="input-form"
                style={{ height: "180px" }}
              ></textarea>
            </div>
            <div style={{ textAlign: "left", width: "60%" }}>
              <input type="submit" value="JOIN NOW" className="join-btn2"></input>
            </div>
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

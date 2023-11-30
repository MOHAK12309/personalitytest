import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const register = new URL("../../images/a1_White-01 (1).png", import.meta.url);

const Background2 = new URL(
  "../../images/RECRUITMENT INITIATED.png",
  import.meta.url
);

function PasswordReset() {
  return (
    <div>
    <div className="color">
      <div className="back">
        <div className="position">
        <div style={{ width: "70%", margin: "auto" }}>
          <img width="100%" src={Background2}></img>
        </div>
        <div className="thankYou">
        Thank you for joining the cause, you will hear from us soon
        </div>
        <div style={{marginTop:"20px"}} className="thankYou">
       <Link to="/"><button className="join-btn2">HOME</button></Link> 
        </div>
        </div>
      </div>
      <div style={{textAlign:"center",width:"100%",margin:"310px auto 0px auto"}}>
         <h3 className="right">ALL RIGHTS RESERVED | © www.OURCADIUM.com</h3>
         </div>
    </div>
    </div>
  );
}

export default PasswordReset;

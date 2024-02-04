import "./App.css";
import React, { useEffect } from "react";

import { Route, Routes } from "react-router-dom";

import PasswordReset from "./components/auth/end";
import Game from "./components/auth/game";
import Join from "./components/auth/join";
import { Toaster } from "react-hot-toast";
import Rides from "./components/auth/rides";
import Login from "./components/auth/Login";
import Profile from "./components/auth/profile";
import LandingPage from "./components/auth/landingPage";
import ARScene from "./components/auth/ArScene";
import ARImageTracking from "./components/auth/ArScene";

// importing service creation pages

// importing static pages

// ReactPixel.init('390972365769622',  options);

// ReactPixel.pageView();

function App() {
  return (
    <div>
      <div className="" style={{ background: "" }}>
        <Routes>
          {/* header routing */}

          <Route path="/" element={<Game />}></Route>
          <Route path="/join" element={<Join />}></Route>
          <Route path="/end" element={<PasswordReset />}></Route>
          <Route path="/rides/1184/VR Spaceship" element={<Rides/>} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/userProfile" element={<Profile />}></Route>
          <Route path="/landingPage" element={<LandingPage />}></Route>
          <Route path="/ArLanding" element ={<ARScene/>}></Route>
        </Routes>
      </div>
      <Toaster/>
    </div>
  );
}

export default App;

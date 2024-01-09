import "./App.css";
import React, { useEffect } from "react";

import { Route, Routes } from "react-router-dom";

import PasswordReset from "./components/auth/end";
import Game from "./components/auth/game";
import Join from "./components/auth/join";
import { Toaster } from "react-hot-toast";
import Rides from "./components/auth/rides";

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
          <Route path="/rides/1184/VR-Spaceship" element={<Rides/>} />
        </Routes>
      </div>
      <Toaster/>
    </div>
  );
}

export default App;

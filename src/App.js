import './App.css';
import React, { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';




import PasswordReset from './components/auth/end';
import Game from './components/auth/game';

// importing service creation pages



// importing static pages

// ReactPixel.init('390972365769622',  options);


// ReactPixel.pageView();

function App() {
  return (
    <div>
      <div className='' style={{background:""}}>
     
        <Routes>
          {/* header routing */}
      
      
   
   
       <Route path='/' element={<Game/>}></Route>

        </Routes>


      </div>


    </div>
  );
}

export default App;

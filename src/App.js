import './App.css';
import React, { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';


import Signup2 from './components/auth/siginupBecome';
import Profile from './components/auth/profile';

import PasswordReset from './components/auth/reset';
import PhoneAuth from './components/auth/fire';
import PhoneVerification from './components/auth/fire';
import Edit from './components/auth/credential';

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
      
       <Route path='/' element={<Profile/>}></Route>
       <Route path='/credential' element={<Edit/>}></Route> 
       <Route path="/reset" element={<PasswordReset/>} />
       <Route path='/auth' element={<PhoneVerification/>}></Route>
       

        </Routes>


      </div>


    </div>
  );
}

export default App;

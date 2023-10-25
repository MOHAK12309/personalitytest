import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserIdFromAuth } from "../../Redux/actions/GetSellerIdFromAuthActionCreators";
import toast, { Toaster } from 'react-hot-toast';
import OtpInput from 'react-otp-input';
import ImageUploading from 'react-images-uploading';
import { UseSelector } from "react-redux/es/hooks/useSelector";

function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const baseUrl = "http://localhost:8000";
    const id = useSelector((state) => state.get_seller_profile_id.user_id);
 
    const [data, setData] = useState('')
    // useEffect(() => {
    //     if (!id) {
            
    //       navigate('/signup', {
    //         replace: true,
    //         state: {
    //           signIn: true,
    //         },
    //       }
          
    //       );
    //     } else {
    //       toast.error('You are not allowed to open this URL');
    //       navigate('/');
    //       fetchData(); // Assuming fetchData is a function you want to call when 'id' is truthy
    //     }
    //   }, [navigate,id]);
    const fetchData = async (e) => {
      e.preventDefault()
        try {
            const response = await axios.post(`${baseUrl}/api/v1/test/signup3`,{
              username:data
            });
           

            console.log(response)
            if(response.data.statusbar==="true"){
              const dis=dispatch(getUserIdFromAuth(response.data.data.newUser2._id));

console.log(dis)

              navigate("/auth")

            }

        } catch (error) {
        }
    };
    const handleLogout = async (e) => {
        e.preventDefault();
      
        try {
          const res = await axios.get(`${baseUrl}/api/v1/user/logout`, {
            withCredentials: true
          });
          if (res.data.status === "success") {
            dispatch(getUserIdFromAuth(""));
            toast.success('You logged Out Successfully');
            navigate('/signup');
          }
        } catch (err) {
          console.error(err);
          toast.error('There may be some internal server error');
        }
      }
    
    return (
        <div>
      
 

      <div class="header" id="myHeader">
        <p><a href="https://theyouthbuzz.com/" target = "_blank">
          <img  src="images/rEGISTEREDBLACK.png" alt="Youth Buzz - Career counselling & assessment" / >
          </a></p>
      </div>
    <div>
       <div class="main">
        
        <section class="signup">
            <div class="container">
                <div class="signup-content">
                    <div class="signup-form">
                        <h2 class="form-title">Welcome aspirant</h2>                
                        <form onSubmit={fetchData} class="register-form" name="welcome_form" id="register-form">
                            <div class="form-group">
                                <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" id="name" value={data} onChange={(e)=>setData(e.target.value)} placeholder="Enter Your Name to begin"/>
                            </div>
                            <div class="form-group form-button">
                                <input type="submit" name="signup" id="signup" class="form-submit" />
                            </div>
                            <p class="signup-image-link" >Please read information below.</p>
                        </form>
                    </div>
                    <div class="signup-image">
                        <figure><img src="images/careerconfusion.svg" alt="Youth Buzz Career assesment sign up"/></figure>
                        <p class="signup-image-link" >Identify your career potentials</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="signup">
            <div class="container">
                <div class="signup-content">
                    <div class="signup-form">
                        <h2 class="form-title">About & Instructions</h2>
                        <ul>
                            <li>This test analyses a person's occupational interest.</li>
                            <li>It identifies the strengths and weaknesses of a person.</li>
                            <li>It, therefore, helps in identifying career options one is suitable for.</li>
                            <li>It also helps in identifying the scope of improvement.</li>
                            <li>There is no time limit.</li>
                            <li>Please answer as truthfully as possible.</li>
                          </ul> 
                    </div>
                    <div class="signup-image" >
                        <figure><img src="images/logonew512512.png" alt="Youth Buzz Career assesment logo"/></figure>
                        <a href="https://www.theyouthbuzz.com" target="_blank" class="signup-image-link">made in India by Youth Buzz</a>
                    </div>
                </div>
            </div>
        </section>
  
        <section class="signup">
            <div class="container">  
                <a href="https://theyouthbuzz.com/social/" target="_blank" class="signup-image-link">Contact us</a>     
                <p >Copyrights Youth Buzz educom LLP 2021</p>
            </div>
        </section>
       </div>
    </div>
        </div>
    )
}
export default Profile
import React, { useState } from "react";
import axios from "axios";
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserIdFromAuth } from "../../Redux/actions/GetSellerIdFromAuthActionCreators";
import toast, { Toaster } from 'react-hot-toast';
import OtpInput from 'react-otp-input';
import ImageUploading from 'react-images-uploading';
import { UseSelector } from "react-redux/es/hooks/useSelector";
const log = new URL("../../images/log.webp", import.meta.url)
const register = new URL("../../images/register.webp", import.meta.url)


function Signup2() {
  const baseUrl = "https://server.youthbuzz.in";
  const [show, setShow] = useState("case1")
  const [show3, setShow3] = useState(true)
  const [name, setfirstName] = useState("");
  const [sign, setSign] = useState("firstVerify")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setCPassword] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [token, setToken] = useState("")
  const [cookie, setCookie] = useState("")
  const [isActive, setIsActive] = useState(false);
  const [gender, setGender] = useState("")
  const [OTP, setOTP] = useState("")
  const [sign2, setSign2] = useState("login")
  const [dob, setDob] = useState()
  const [number, setNumber] = useState("")
  const [lastname, setLastname] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [showUpload, setUpload] = useState(false)
  const [country, setcountry] = useState("")
  const [file, setFile] = useState("")
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailphoneNumber, setemailPhoneNumber] = useState('');
  const [code, setCode] = useState(0);

  const firebaseConfig = {
    apiKey: "AIzaSyBjepGG8G886Y_AKHW5BYtdasJG-6JmhYc",
    authDomain: "youthbuzzwebtest.firebaseapp.com",
    projectId: "youthbuzzwebtest",
    storageBucket: "youthbuzzwebtest.appspot.com",
    messagingSenderId: "786059551387",
    appId: "1:786059551387:web:a3533c7bf6bbc7cd465c3e",
    measurementId: "G-J4WECXG2CF"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  auth.languageCode = 'en';
  // auth.settings.appVerificationDisabledForTesting = true;

  let mohak = "Mohak22222";
  try {
    mohak = new RecaptchaVerifier(auth, 'Recapta-Verify',
      {
        'size': 'invisible',
        'callback': (response) => {
          console.log(response, "res");
        }
      }
      // {}
    );
  } catch (error) {
    console.log(error, "<--------------  ")
  }
  const appVerifier = mohak;
  console.log(appVerifier, '<===window')


  const handlePhoneChange = (event) => {
    // console.log(event.target.value)
    setPhoneNumber(event.target.value);
  };


  const handleRecaptchaVerify = (response) => {
  };
  const fullPhoneNumber = `+${country}${phoneNumber}`;

  console.log(fullPhoneNumber)
  const sendVerificationCode = async (e) => {
    e.preventDefault()
    try {
      // console.log(appVerifier,"inside sendverification") 
      signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
      
          setSign("otp")
          setMinutes(2);
          setSeconds(59);
         
          toast.success("verification code send to phonenumber")


        }).catch((error) => {
          console.log(error, "<---------- inside catch")
        });

    } catch (error) {
      console.log(error)


    }

  };
  const sendVerificationCode2 = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${baseUrl}/api/v1/user/loginWithOtp`, {

        // lastname:lastname,
        phoneNumber: fullPhoneNumber,



        headers: {
          Authorization: `Bearer ${token}`
        }

        // isEmailVerified: isEmailVerified
      });
    
      // if (response.data.status === "false") {
      //   toast(" Please verify your mail ")
      //   setSign2("OTP2")

      // }
      if (response.data.statusbar === "success") {


        dispatch(getUserIdFromAuth(response.data.data.user._id, response.data.data.user.lastname, response.data.data.user.name, response.data.data.user.email));
        toast.success("Otp sent to phonenumber")

 
        signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
         
            toast.success("verification code send to phonenumber")
            // setSign("otp")
            setMinutes(2);
            setSeconds(59);
            setSign2("Verify")



          }).catch((error) => {
            console.log(error, "<---------- inside catch")
          });









      }
      // console.log(appVerifier,"inside sendverification") 


    } catch (error) {
      console.log(error)


    }

  };
  // const confirmOTP = async (otp) => {
  //   try {
  //     const userCredential = await confirmation.confirm(otp);
  //     const user = userCredential.user;

  //     // If OTP is confirmed successfully, you can make an API request to your server
  //     // to retrieve the user's data from MongoDB based on their phone number.
  //     const response = await axios.get(`${baseUrl}/api/v1/user/login`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: await user.getIdToken(), // Send Firebase ID token for server authentication
  //       },
  //       body: JSON.stringify({ phoneNumber: user.phoneNumber }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log('User ID:', data.userId);
  //       // You can now use the user ID for further operations in your React app
  //     } else {
  //       // Handle server response error
  //     }
  //   } catch (error) {
  //     // Handle error, e.g., invalid OTP
  //   }
  // };



  const verifyCode = (e) => {
    e.preventDefault()
    // const code = 123456;
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
   
      const user = result.user;

      setSign("signup")

      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      console.log(error, "hii")
      // ...
    });

  };


  const verifyCode2 = async (e) => {
    e.preventDefault()
    // const code = 123456;
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
 
      const user = result.user;
     


      navigate("/")

      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      console.log(error, "hii")
      // ...
    });

  };

  const toggleMode = () => {
    setIsSignUpMode(!isSignUpMode);
  };
  const phones=`${country}${emailphoneNumber}`
  console.log(phones)

  const id = useSelector((state) => state.get_seller_profile_id.user_id);
  const handleLogin = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post(`${baseUrl}/api/v1/user/login`, {

        // lastname:lastname,
        emailOrphoneNumber:phones ,
        password: password,
       


        headers: {
          Authorization: `Bearer ${token}`
        }

        // isEmailVerified: isEmailVerified
      });
      console.log("hi");
      if (response.data.status === "false") {
        toast.success(" Please verify your mail ")
        setSign2("OTP2")

      }
      console.log(response)

      if (response.data.statusbar === "success") {
        navigate("/")

        dispatch(getUserIdFromAuth(response.data.data.user._id, response.data.data.user.lastname, response.data.data.user.name, response.data.data.user.email));
        toast.success("Login successfull")

      








      }
      // if (response.data.statusbar === "success") {
      //   dispatch(getUserIdFromAuth(response.data.data.user._id, response.data.data.user.lastname, response.data.data.user.name, response.data.data.user.email));
      //   navigate("/home")
      // }
    } catch (error) {
      console.log(error)
      // if (error.message === "Request failed with status code 403") {
      //   setsign("OTP")

      // }


    }



  }
  const [inputType, setInputType] = useState('text');
  const [date, setDate] = useState('');

  const handleFocus = () => {
    setInputType('date');
  };
  const handleLogin2 = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post(`${baseUrl}/api/v1/user/loginWithOtp`, {

        // lastname:lastname,
        email: email,
        OTP: OTP,


        // headers: {
        //   Authorization: `Bearer ${token}`
        // }

        // isEmailVerified: isEmailVerified

      });

      if (response.data.statusbar === 'success') {

        dispatch(getUserIdFromAuth(response.data.data.user._id, response.data.data.user.lastname, response.data.data.user.name, response.data.data.user.email));


        toast.success("Login successfull")
        navigate("/")











      }
      // if (response.data.statusbar === "success") {
      //   dispatch(getUserIdFromAuth(response.data.data.user._id, response.data.data.user.lastname, response.data.data.user.name, response.data.data.user.email));
      //   navigate("/home")
      // }
    } catch (error) {
      console.log(error)
      // if (error.message === "Request failed with status code 403") {
      //   setsign("OTP")

      // }


    }



  }

  const handleFileChange = (event) => {
    console.log(event.target.value)
    setFile(event.target.files[0]);
    // setUpload("show")
  };
  const handleSubmitphoto = async () => {
    navigate("/")
    toast.success("image uploaded")
    const formData = new FormData();
    formData.append('photo', file);
    try {
      const response = await axios.patch(`${baseUrl}/api/v1/user/updatePhoto/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // Handle the response from the server
      if (response.data.status === "success") {




      }
      // setFile(response.data);
    } catch (error) {
      setUpload(false)
      console.error(error);
    }
  };
  const handlleUpdate = async (e) => {
    e.preventDefault();



    try {
      const response = await axios.post(`${baseUrl}/api/v1/user/signup`, {
        name: name,
        lastname:lastname,
        phoneNumber: fullPhoneNumber,
        email: email,
        gender: gender,
        DOB: dob,
        password: password,
        confirm_password: confirm_password,
        country: country




      });
      // Handle the response from the server
      console.log(response)
      if (response.data.statusbar === "success") {
        setSign("imageUpload")
        dispatch(getUserIdFromAuth(response.data.data.user._id, response.data.data.user.lastname, response.data.data.user.name, response.data.data.user.email));
        toast.success("signup success")





      }
      // setFile(response.data);
    } catch (error) {
      setUpload(false)
      console.error(error);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const sendOTP = () => {
    setMinutes(2);
    setSeconds(59);
  };
  const resendOTP = () => {
    setMinutes(2);
    setSeconds(59);
  };

  const handlechange = (caseName) => {
    setShow(caseName)
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/v1/user/verify`, {

        // lastname:lastname,
        OTP: OTP,




        // isEmailVerified: isEmailVerified
      });
      if (response.data.statusbar === "true") {
        console.log("verified")
        setSign2("login")
        toast.success("Verification successfull")


      }
    } catch (error) {
      console.log(error)

    }



  }

  const handleSend2 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/v1/user/resend`, {

        // lastname:lastname,
        email: email,




        // isEmailVerified: isEmailVerified
      });
      if (response.data.status === true) {
        console.log("verified")
        setMinutes(2);
        setSeconds(59);
        setSign2("Verify2")
        toast.success("mail send to mail")
        console.log(response)

      }
    } catch (error) {
      console.log(error)

    }



  }
  const handleforgot = async (e) => {
    e.preventDefault();
    toast.success("Link send to mail")
    try {
      const response = await axios.post(`${baseUrl}/api/v1/user/forgot`, {

        // lastname:lastname,
        email: email,




        // isEmailVerified: isEmailVerified
      });
      if (response.data.status === true) {
        console.log("verified")
        setSign2("login")

      }
    } catch (error) {
      console.log(error)

    }



  }


  const handleSend3 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/v1/user/resend`, {

        // lastname:lastname,
        email: email,




        // isEmailVerified: isEmailVerified
      });
      if (response.data.status === true) {
        console.log("verified")
        setMinutes(2);
        setSeconds(59);
        setSign2("OTPLogin")

      }
    } catch (error) {
      console.log(error)

    }



  }
  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/v1/user/resend`, {

        // lastname:lastname,
        email: email,




        // isEmailVerified: isEmailVerified
      });
      if (response.data.status === true) {
        console.log("verified")
        setMinutes(2);
        setSeconds(59);
        setSign("otp")
        toast.success("mail send to mail")

      }
    } catch (error) {
      console.log(error)

    }



  }
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/v1/verify/register`, {

        email2: email






        // isEmailVerified: isEmailVerified
      });

      // dispatch(getUserIdFromAuth(response.data.data.user._id, response.data.data.user.name, response.data.data.user.email));
      if (response.data.statusbar === "success") {

        setSign("otp")
        setMinutes(2);
        setSeconds(59);
        toast("Otp Sent to mail")






        console.log(response.data)
      }
    } catch (error) {
      console.log(error)

    }
  }


  return (

    <div className={`container2 ${isSignUpMode ? 'sign-up-mode' : ''}`} >
      {sign == "signup" &&
        <div className="signup-popup">

          <form onSubmit={handlleUpdate} style={{}} class="signup2 ">
            <button onClick={() => setSign("firstVerify")} style={{ position: "absolute", right: "10px", top: "0px", background: "none", border: "none", fontSize: "25px" }}>X</button>
            <h2 class="title">Sign up</h2>
            <div className="signup-flex">
              <div >

                <input class="input-field earth" required maxLength="20" value={name} onChange={(e) => setfirstName(e.target.value)} type="text" placeholder="First Name" />
              </div>
              <div >

                <input class="input-field earth" required maxLength="20" value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" placeholder="Last Name" />
              </div>
            </div>
            <div className="signup-flex">
              <div class="">

                <input
                  type={inputType}
                  className="input-field birthday"
                  placeholder="Date of birth"
                  onFocus={handleFocus}
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
                </div>
              <div >

                <input class="input-field email" required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" />
              </div>
            </div>


            <div className="signup-flex">

              <div class="">

                <select required class="input-field gender" value={gender} onChange={(e) => setGender(e.target.value)} id="country" name="country">
                  <option value="none"> Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>

                </select>
              </div>
              <div >

                <input required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" class="input-field password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
              </div>
            </div>
            <div className="signup-flex">

              <div >

                <input required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" class="input-field password" value={confirm_password} onChange={(e) => setCPassword(e.target.value)} type="password" placeholder="retype password" />
              </div>
            </div>
            <div className="signup-flex" >
              <div>
                {/* <select required value={country} onChange={(e) => setcountry(e.target.value)} class="input-field" id="country" name="country">

                  <option>select country</option>
                  <option value="93">Afghanistan (+93)</option>
                  <option value="358">Aland Islands (+358)</option>
                  <option value="355">Albania (+355)</option>
                  <option value="213">Algeria (+213)</option>
                  <option value="1684">American Samoa (+1684)</option>
                  <option value="376">Andorra (+376)</option>
                  <option value="244">Angola (+244)</option>
                  <option value="1264">Anguilla (+1264)</option>
                  <option value="1268">Antigua and Barbuda (+1268)</option>
                  <option value="54">Argentina (+54)</option>
                  <option value="374">Armenia (+374)</option>
                  <option value="297">Aruba (+297)</option>
                  <option value="61">Australia (+61)</option>
                  <option value="43">Austria (+43)</option>
                  <option value="994">Azerbaijan (+994)</option>
                  <option value="1242">Bahamas (+1242)</option>
                  <option value="973">Bahrain (+973)</option>
                  <option value="880">Bangladesh (+880)</option>
                  <option value="1246">Barbados (+1246)</option>
                  <option value="375">Belarus (+375)</option>
                  <option value="32">Belgium (+32)</option>
                  <option value="501">Belize (+501)</option>
                  <option value="229">Benin (+229)</option>
                  <option value="1441">Bermuda (+1441)</option>
                  <option value="975">Bhutan (+975)</option>
                  <option value="591">Bolivia (+591)</option>
                  <option value="599">Bonaire, Sint Eustatius and Saba (+599)</option>
                  <option value="387">Bosnia and Herzegovina (+387)</option>
                  <option value="267">Botswana (+267)</option>
                  <option value="55">Brazil (+55)</option>
                  <option value="246">British Indian Ocean Territory (+246)</option>
                  <option value="673">Brunei Darussalam (+673)</option>
                  <option value="359">Bulgaria (+359)</option>
                  <option value="226">Burkina Faso (+226)</option>
                  <option value="257">Burundi (+257)</option>
                  <option value="855">Cambodia (+855)</option>
                  <option value="237">Cameroon (+237)</option>
                  <option value="1">Canada (+1)</option>
                  <option value="238">Cape Verde (+238)</option>
                  <option value="1345">Cayman Islands (+1345)</option>
                  <option value="236">Central African Republic (+236)</option>
                  <option value="235">Chad (+235)</option>
                  <option value="56">Chile (+56)</option>
                  <option value="86">China (+86)</option>
                  <option value="61">Christmas Island (+61)</option>
                  <option value="672">Cocos (Keeling) Islands (+672)</option>
                  <option value="57">Colombia (+57)</option>
                  <option value="269">Comoros (+269)</option>
                  <option value="242">Congo (+242)</option>
                  <option value="242">Congo, the Democratic Republic of the (+242)</option>
                  <option value="682">Cook Islands (+682)</option>
                  <option value="506">Costa Rica (+506)</option>
                  <option value="225">Cote D'Ivoire (+225)</option>
                  <option value="385">Croatia (+385)</option>
                  <option value="53">Cuba (+53)</option>
                  <option value="599">Curacao (+599)</option>
                  <option value="357">Cyprus (+357)</option>
                  <option value="420">Czech Republic (+420)</option>
                  <option value="45">Denmark (+45)</option>
                  <option value="253">Djibouti (+253)</option>
                  <option value="1767">Dominica (+1767)</option>
                  <option value="1809">Dominican Republic (+1809)</option>
                  <option value="593">Ecuador (+593)</option>
                  <option value="20">Egypt (+20)</option>
                  <option value="503">El Salvador (+503)</option>
                  <option value="240">Equatorial Guinea (+240)</option>
                  <option value="291">Eritrea (+291)</option>
                  <option value="372">Estonia (+372)</option>
                  <option value="251">Ethiopia (+251)</option>
                  <option value="500">Falkland Islands (Malvinas) (+500)</option>
                  <option value="298">Faroe Islands (+298)</option>
                  <option value="679">Fiji (+679)</option>
                  <option value="358">Finland (+358)</option>
                  <option value="33">France (+33)</option>
                  <option value="594">French Guiana (+594)</option>
                  <option value="689">French Polynesia (+689)</option>
                  <option value="241">Gabon (+241)</option>
                  <option value="220">Gambia (+220)</option>
                  <option value="995">Georgia (+995)</option>
                  <option value="49">Germany (+49)</option>
                  <option value="233">Ghana (+233)</option>
                  <option value="350">Gibraltar (+350)</option>
                  <option value="30">Greece (+30)</option>
                  <option value="299">Greenland (+299)</option>
                  <option value="1473">Grenada (+1473)</option>
                  <option value="590">Guadeloupe (+590)</option>
                  <option value="1671">Guam (+1671)</option>
                  <option value="502">Guatemala (+502)</option>
                  <option value="44">Guernsey (+44)</option>
                  <option value="224">Guinea (+224)</option>
                  <option value="245">Guinea-Bissau (+245)</option>
                  <option value="592">Guyana (+592)</option>
                  <option value="509">Haiti (+509)</option>
                  <option value="39">Holy See (Vatican City State) (+39)</option>
                  <option value="504">Honduras (+504)</option>
                  <option value="852">Hong Kong (+852)</option>
                  <option value="36">Hungary (+36)</option>
                  <option value="354">Iceland (+354)</option>
                  <option value="91">India (+91)</option>
                  <option value="62">Indonesia (+62)</option>
                  <option value="98">Iran, Islamic Republic of (+98)</option>
                  <option value="964">Iraq (+964)</option>
                  <option value="353">Ireland (+353)</option>
                  <option value="44">Isle of Man (+44)</option>
                  <option value="972">Israel (+972)</option>
                  <option value="39">Italy (+39)</option>
                  <option value="1876">Jamaica (+1876)</option>
                  <option value="81">Japan (+81)</option>
                  <option value="44">Jersey (+44)</option>
                  <option value="962">Jordan (+962)</option>
                  <option value="7">Kazakhstan (+7)</option>
                  <option value="254">Kenya (+254)</option>
                  <option value="686">Kiribati (+686)</option>
                  <option value="850">Korea, Democratic People"s Republic of (+850)</option>
                  <option value="82">Korea, Republic of (+82)</option>
                  <option value="381">Kosovo (+381)</option>
                  <option value="965">Kuwait (+965)</option>
                  <option value="996">Kyrgyzstan (+996)</option>
                  <option value="856">Lao People's Democratic Republic (+856)</option>
                  <option value="371">Latvia (+371)</option>
                  <option value="961">Lebanon (+961)</option>
                  <option value="266">Lesotho (+266)</option>
                  <option value="231">Liberia (+231)</option>
                  <option value="218">Libyan Arab Jamahiriya (+218)</option>
                  <option value="423">Liechtenstein (+423)</option>
                  <option value="370">Lithuania (+370)</option>
                  <option value="352">Luxembourg (+352)</option>
                  <option value="853">Macao (+853)</option>
                  <option value="389">Macedonia, the Former Yugoslav Republic of (+389)</option>
                  <option value="261">Madagascar (+261)</option>
                  <option value="265">Malawi (+265)</option>
                  <option value="60">Malaysia (+60)</option>
                  <option value="960">Maldives (+960)</option>
                  <option value="223">Mali (+223)</option>
                  <option value="356">Malta (+356)</option>
                  <option value="692">Marshall Islands (+692)</option>
                  <option value="596">Martinique (+596)</option>
                  <option value="222">Mauritania (+222)</option>
                  <option value="230">Mauritius (+230)</option>
                  <option value="269">Mayotte (+269)</option>
                  <option value="52">Mexico (+52)</option>
                  <option value="691">Micronesia, Federated States of (+691)</option>
                  <option value="373">Moldova, Republic of (+373)</option>
                  <option value="377">Monaco (+377)</option>
                  <option value="976">Mongolia (+976)</option>
                  <option value="382">Montenegro (+382)</option>
                  <option value="1664">Montserrat (+1664)</option>
                  <option value="212">Morocco (+212)</option>
                  <option value="258">Mozambique (+258)</option>
                  <option value="95">Myanmar (+95)</option>
                  <option value="264">Namibia (+264)</option>
                  <option value="674">Nauru (+674)</option>
                  <option value="977">Nepal (+977)</option>
                  <option value="31">Netherlands (+31)</option>
                  <option value="599">Netherlands Antilles (+599)</option>
                  <option value="687">New Caledonia (+687)</option>
                  <option value="64">New Zealand (+64)</option>
                  <option value="505">Nicaragua (+505)</option>
                  <option value="227">Niger (+227)</option>
                  <option value="234">Nigeria (+234)</option>
                  <option value="683">Niue (+683)</option>
                  <option value="672">Norfolk Island (+672)</option>
                  <option value="1670">Northern Mariana Islands (+1670)</option>
                  <option value="47">Norway (+47)</option>
                  <option value="968">Oman (+968)</option>
                  <option value="92">Pakistan (+92)</option>
                  <option value="680">Palau (+680)</option>
                  <option value="970">Palestinian Territory, Occupied (+970)</option>
                  <option value="507">Panama (+507)</option>
                  <option value="675">Papua New Guinea (+675)</option>
                  <option value="595">Paraguay (+595)</option>
                  <option value="51">Peru (+51)</option>
                  <option value="63">Philippines (+63)</option>
                  <option value="64">Pitcairn (+64)</option>
                  <option value="48">Poland (+48)</option>
                  <option value="351">Portugal (+351)</option>
                  <option value="1787">Puerto Rico (+1787)</option>
                  <option value="974">Qatar (+974)</option>
                  <option value="262">Reunion (+262)</option>
                  <option value="40">Romania (+40)</option>
                  <option value="70">Russian Federation (+70)</option>
                  <option value="250">Rwanda (+250)</option>
                  <option value="590">Saint Barthelemy (+590)</option>
                  <option value="290">Saint Helena (+290)</option>
                  <option value="1869">Saint Kitts and Nevis (+1869)</option>
                  <option value="1758">Saint Lucia (+1758)</option>
                  <option value="590">Saint Martin (+590)</option>
                  <option value="508">Saint Pierre and Miquelon (+508)</option>
                  <option value="1784">Saint Vincent and the Grenadines (+1784)</option>
                  <option value="684">Samoa (+684)</option>
                  <option value="378">San Marino (+378)</option>
                  <option value="239">Sao Tome and Principe (+239)</option>
                  <option value="966">Saudi Arabia (+966)</option>
                  <option value="221">Senegal (+221)</option>
                  <option value="381">Serbia (+381)</option>
                  <option value="381">Serbia and Montenegro (+381)</option>
                  <option value="248">Seychelles (+248)</option>
                  <option value="232">Sierra Leone (+232)</option>
                  <option value="65">Singapore (+65)</option>
                  <option value="1">Sint Maarten (+1)</option>
                  <option value="421">Slovakia (+421)</option>
                  <option value="386">Slovenia (+386)</option>
                  <option value="677">Solomon Islands (+677)</option>
                  <option value="252">Somalia (+252)</option>
                  <option value="27">South Africa (+27)</option>
                  <option value="500">South Georgia and the South Sandwich Islands (+500)</option>
                  <option value="211">South Sudan (+211)</option>
                  <option value="34">Spain (+34)</option>
                  <option value="94">Sri Lanka (+94)</option>
                  <option value="249">Sudan (+249)</option>
                  <option value="597">Suriname (+597)</option>
                  <option value="47">Svalbard and Jan Mayen (+47)</option>
                  <option value="268">Swaziland (+268)</option>
                  <option value="46">Sweden (+46)</option>
                  <option value="41">Switzerland (+41)</option>
                  <option value="963">Syrian Arab Republic (+963)</option>
                  <option value="886">Taiwan, Province of China (+886)</option>
                  <option value="992">Tajikistan (+992)</option>
                  <option value="255">Tanzania, United Republic of (+255)</option>
                  <option value="66">Thailand (+66)</option>
                  <option value="670">Timor-Leste (+670)</option>
                  <option value="228">Togo (+228)</option>
                  <option value="690">Tokelau (+690)</option>
                  <option value="676">Tonga (+676)</option>
                  <option value="1868">Trinidad and Tobago (+1868)</option>
                  <option value="216">Tunisia (+216)</option>
                  <option value="90">Turkey (+90)</option>
                  <option value="7370">Turkmenistan (+7370)</option>
                  <option value="1649">Turks and Caicos Islands (+1649)</option>
                  <option value="688">Tuvalu (+688)</option>
                  <option value="256">Uganda (+256)</option>
                  <option value="380">Ukraine (+380)</option>
                  <option value="971">United Arab Emirates (+971)</option>
                  <option value="44">United Kingdom (+44)</option>
                  <option value="1">United States (+1)</option>
                  <option value="1">United States Minor Outlying Islands (+1)</option>
                  <option value="598">Uruguay (+598)</option>
                  <option value="998">Uzbekistan (+998)</option>
                  <option value="678">Vanuatu (+678)</option>
                  <option value="58">Venezuela (+58)</option>
                  <option value="84">Viet Nam (+84)</option>
                  <option value="1284">Virgin Islands, British (+1284)</option>
                  <option value="1340">Virgin Islands, U.s. (+1340)</option>
                  <option value="681">Wallis and Futuna (+681)</option>
                  <option value="212">Western Sahara (+212)</option>
                  <option value="967">Yemen (+967)</option>
                  <option value="260">Zambia (+260)</option>
                  <option value="263">Zimbabwe (+263)</option>
                </select> */}
              </div>


            </div>

            <button type="submit" class="btn"  >Register</button>


          </form>
          {sign == "imageUpload" &&
            <form onSubmit={handleSubmitphoto} className="signup2" >
              <h5 className="title">Upload Image</h5>
              <div>

                <input required className="input-field" onChange={handleFileChange} type="file"></input><br></br>
              </div>
              <button class="btn wide" type="submit">upload</button>


            </form>
          }
        </div>
      }
      <div class="forms-container">
        <div class="signin-signup">
          {sign2 == "OTPLogin" &&

            <form onSubmit={handleLogin2} class="sign-in-form">
              <h2 class="title">Sign in</h2>
              <div>
                {/* <select value={country} onChange={(e) => setcountry(e.target.value)} class="input-field" name="country">

                  <option disabled>select country</option>
                  <option value="93">Afghanistan (+93)</option>
                  <option value="358">Aland Islands (+358)</option>
                  <option value="355">Albania (+355)</option>
                  <option value="213">Algeria (+213)</option>
                  <option value="1684">American Samoa (+1684)</option>
                  <option value="376">Andorra (+376)</option>
                  <option value="244">Angola (+244)</option>
                  <option value="1264">Anguilla (+1264)</option>
                  <option value="1268">Antigua and Barbuda (+1268)</option>
                  <option value="54">Argentina (+54)</option>
                  <option value="374">Armenia (+374)</option>
                  <option value="297">Aruba (+297)</option>
                  <option value="61">Australia (+61)</option>
                  <option value="43">Austria (+43)</option>
                  <option value="994">Azerbaijan (+994)</option>
                  <option value="1242">Bahamas (+1242)</option>
                  <option value="973">Bahrain (+973)</option>
                  <option value="880">Bangladesh (+880)</option>
                  <option value="1246">Barbados (+1246)</option>
                  <option value="375">Belarus (+375)</option>
                  <option value="32">Belgium (+32)</option>
                  <option value="501">Belize (+501)</option>
                  <option value="229">Benin (+229)</option>
                  <option value="1441">Bermuda (+1441)</option>
                  <option value="975">Bhutan (+975)</option>
                  <option value="591">Bolivia (+591)</option>
                  <option value="599">Bonaire, Sint Eustatius and Saba (+599)</option>
                  <option value="387">Bosnia and Herzegovina (+387)</option>
                  <option value="267">Botswana (+267)</option>
                  <option value="55">Brazil (+55)</option>
                  <option value="246">British Indian Ocean Territory (+246)</option>
                  <option value="673">Brunei Darussalam (+673)</option>
                  <option value="359">Bulgaria (+359)</option>
                  <option value="226">Burkina Faso (+226)</option>
                  <option value="257">Burundi (+257)</option>
                  <option value="855">Cambodia (+855)</option>
                  <option value="237">Cameroon (+237)</option>
                  <option value="1">Canada (+1)</option>
                  <option value="238">Cape Verde (+238)</option>
                  <option value="1345">Cayman Islands (+1345)</option>
                  <option value="236">Central African Republic (+236)</option>
                  <option value="235">Chad (+235)</option>
                  <option value="56">Chile (+56)</option>
                  <option value="86">China (+86)</option>
                  <option value="61">Christmas Island (+61)</option>
                  <option value="672">Cocos (Keeling) Islands (+672)</option>
                  <option value="57">Colombia (+57)</option>
                  <option value="269">Comoros (+269)</option>
                  <option value="242">Congo (+242)</option>
                  <option value="242">Congo, the Democratic Republic of the (+242)</option>
                  <option value="682">Cook Islands (+682)</option>
                  <option value="506">Costa Rica (+506)</option>
                  <option value="225">Cote D'Ivoire (+225)</option>
                  <option value="385">Croatia (+385)</option>
                  <option value="53">Cuba (+53)</option>
                  <option value="599">Curacao (+599)</option>
                  <option value="357">Cyprus (+357)</option>
                  <option value="420">Czech Republic (+420)</option>
                  <option value="45">Denmark (+45)</option>
                  <option value="253">Djibouti (+253)</option>
                  <option value="1767">Dominica (+1767)</option>
                  <option value="1809">Dominican Republic (+1809)</option>
                  <option value="593">Ecuador (+593)</option>
                  <option value="20">Egypt (+20)</option>
                  <option value="503">El Salvador (+503)</option>
                  <option value="240">Equatorial Guinea (+240)</option>
                  <option value="291">Eritrea (+291)</option>
                  <option value="372">Estonia (+372)</option>
                  <option value="251">Ethiopia (+251)</option>
                  <option value="500">Falkland Islands (Malvinas) (+500)</option>
                  <option value="298">Faroe Islands (+298)</option>
                  <option value="679">Fiji (+679)</option>
                  <option value="358">Finland (+358)</option>
                  <option value="33">France (+33)</option>
                  <option value="594">French Guiana (+594)</option>
                  <option value="689">French Polynesia (+689)</option>
                  <option value="241">Gabon (+241)</option>
                  <option value="220">Gambia (+220)</option>
                  <option value="995">Georgia (+995)</option>
                  <option value="49">Germany (+49)</option>
                  <option value="233">Ghana (+233)</option>
                  <option value="350">Gibraltar (+350)</option>
                  <option value="30">Greece (+30)</option>
                  <option value="299">Greenland (+299)</option>
                  <option value="1473">Grenada (+1473)</option>
                  <option value="590">Guadeloupe (+590)</option>
                  <option value="1671">Guam (+1671)</option>
                  <option value="502">Guatemala (+502)</option>
                  <option value="44">Guernsey (+44)</option>
                  <option value="224">Guinea (+224)</option>
                  <option value="245">Guinea-Bissau (+245)</option>
                  <option value="592">Guyana (+592)</option>
                  <option value="509">Haiti (+509)</option>
                  <option value="39">Holy See (Vatican City State) (+39)</option>
                  <option value="504">Honduras (+504)</option>
                  <option value="852">Hong Kong (+852)</option>
                  <option value="36">Hungary (+36)</option>
                  <option value="354">Iceland (+354)</option>
                  <option value="91">India (+91)</option>
                  <option value="62">Indonesia (+62)</option>
                  <option value="98">Iran, Islamic Republic of (+98)</option>
                  <option value="964">Iraq (+964)</option>
                  <option value="353">Ireland (+353)</option>
                  <option value="44">Isle of Man (+44)</option>
                  <option value="972">Israel (+972)</option>
                  <option value="39">Italy (+39)</option>
                  <option value="1876">Jamaica (+1876)</option>
                  <option value="81">Japan (+81)</option>
                  <option value="44">Jersey (+44)</option>
                  <option value="962">Jordan (+962)</option>
                  <option value="7">Kazakhstan (+7)</option>
                  <option value="254">Kenya (+254)</option>
                  <option value="686">Kiribati (+686)</option>
                  <option value="850">Korea, Democratic People"s Republic of (+850)</option>
                  <option value="82">Korea, Republic of (+82)</option>
                  <option value="381">Kosovo (+381)</option>
                  <option value="965">Kuwait (+965)</option>
                  <option value="996">Kyrgyzstan (+996)</option>
                  <option value="856">Lao People's Democratic Republic (+856)</option>
                  <option value="371">Latvia (+371)</option>
                  <option value="961">Lebanon (+961)</option>
                  <option value="266">Lesotho (+266)</option>
                  <option value="231">Liberia (+231)</option>
                  <option value="218">Libyan Arab Jamahiriya (+218)</option>
                  <option value="423">Liechtenstein (+423)</option>
                  <option value="370">Lithuania (+370)</option>
                  <option value="352">Luxembourg (+352)</option>
                  <option value="853">Macao (+853)</option>
                  <option value="389">Macedonia, the Former Yugoslav Republic of (+389)</option>
                  <option value="261">Madagascar (+261)</option>
                  <option value="265">Malawi (+265)</option>
                  <option value="60">Malaysia (+60)</option>
                  <option value="960">Maldives (+960)</option>
                  <option value="223">Mali (+223)</option>
                  <option value="356">Malta (+356)</option>
                  <option value="692">Marshall Islands (+692)</option>
                  <option value="596">Martinique (+596)</option>
                  <option value="222">Mauritania (+222)</option>
                  <option value="230">Mauritius (+230)</option>
                  <option value="269">Mayotte (+269)</option>
                  <option value="52">Mexico (+52)</option>
                  <option value="691">Micronesia, Federated States of (+691)</option>
                  <option value="373">Moldova, Republic of (+373)</option>
                  <option value="377">Monaco (+377)</option>
                  <option value="976">Mongolia (+976)</option>
                  <option value="382">Montenegro (+382)</option>
                  <option value="1664">Montserrat (+1664)</option>
                  <option value="212">Morocco (+212)</option>
                  <option value="258">Mozambique (+258)</option>
                  <option value="95">Myanmar (+95)</option>
                  <option value="264">Namibia (+264)</option>
                  <option value="674">Nauru (+674)</option>
                  <option value="977">Nepal (+977)</option>
                  <option value="31">Netherlands (+31)</option>
                  <option value="599">Netherlands Antilles (+599)</option>
                  <option value="687">New Caledonia (+687)</option>
                  <option value="64">New Zealand (+64)</option>
                  <option value="505">Nicaragua (+505)</option>
                  <option value="227">Niger (+227)</option>
                  <option value="234">Nigeria (+234)</option>
                  <option value="683">Niue (+683)</option>
                  <option value="672">Norfolk Island (+672)</option>
                  <option value="1670">Northern Mariana Islands (+1670)</option>
                  <option value="47">Norway (+47)</option>
                  <option value="968">Oman (+968)</option>
                  <option value="92">Pakistan (+92)</option>
                  <option value="680">Palau (+680)</option>
                  <option value="970">Palestinian Territory, Occupied (+970)</option>
                  <option value="507">Panama (+507)</option>
                  <option value="675">Papua New Guinea (+675)</option>
                  <option value="595">Paraguay (+595)</option>
                  <option value="51">Peru (+51)</option>
                  <option value="63">Philippines (+63)</option>
                  <option value="64">Pitcairn (+64)</option>
                  <option value="48">Poland (+48)</option>
                  <option value="351">Portugal (+351)</option>
                  <option value="1787">Puerto Rico (+1787)</option>
                  <option value="974">Qatar (+974)</option>
                  <option value="262">Reunion (+262)</option>
                  <option value="40">Romania (+40)</option>
                  <option value="70">Russian Federation (+70)</option>
                  <option value="250">Rwanda (+250)</option>
                  <option value="590">Saint Barthelemy (+590)</option>
                  <option value="290">Saint Helena (+290)</option>
                  <option value="1869">Saint Kitts and Nevis (+1869)</option>
                  <option value="1758">Saint Lucia (+1758)</option>
                  <option value="590">Saint Martin (+590)</option>
                  <option value="508">Saint Pierre and Miquelon (+508)</option>
                  <option value="1784">Saint Vincent and the Grenadines (+1784)</option>
                  <option value="684">Samoa (+684)</option>
                  <option value="378">San Marino (+378)</option>
                  <option value="239">Sao Tome and Principe (+239)</option>
                  <option value="966">Saudi Arabia (+966)</option>
                  <option value="221">Senegal (+221)</option>
                  <option value="381">Serbia (+381)</option>
                  <option value="381">Serbia and Montenegro (+381)</option>
                  <option value="248">Seychelles (+248)</option>
                  <option value="232">Sierra Leone (+232)</option>
                  <option value="65">Singapore (+65)</option>
                  <option value="1">Sint Maarten (+1)</option>
                  <option value="421">Slovakia (+421)</option>
                  <option value="386">Slovenia (+386)</option>
                  <option value="677">Solomon Islands (+677)</option>
                  <option value="252">Somalia (+252)</option>
                  <option value="27">South Africa (+27)</option>
                  <option value="500">South Georgia and the South Sandwich Islands (+500)</option>
                  <option value="211">South Sudan (+211)</option>
                  <option value="34">Spain (+34)</option>
                  <option value="94">Sri Lanka (+94)</option>
                  <option value="249">Sudan (+249)</option>
                  <option value="597">Suriname (+597)</option>
                  <option value="47">Svalbard and Jan Mayen (+47)</option>
                  <option value="268">Swaziland (+268)</option>
                  <option value="46">Sweden (+46)</option>
                  <option value="41">Switzerland (+41)</option>
                  <option value="963">Syrian Arab Republic (+963)</option>
                  <option value="886">Taiwan, Province of China (+886)</option>
                  <option value="992">Tajikistan (+992)</option>
                  <option value="255">Tanzania, United Republic of (+255)</option>
                  <option value="66">Thailand (+66)</option>
                  <option value="670">Timor-Leste (+670)</option>
                  <option value="228">Togo (+228)</option>
                  <option value="690">Tokelau (+690)</option>
                  <option value="676">Tonga (+676)</option>
                  <option value="1868">Trinidad and Tobago (+1868)</option>
                  <option value="216">Tunisia (+216)</option>
                  <option value="90">Turkey (+90)</option>
                  <option value="7370">Turkmenistan (+7370)</option>
                  <option value="1649">Turks and Caicos Islands (+1649)</option>
                  <option value="688">Tuvalu (+688)</option>
                  <option value="256">Uganda (+256)</option>
                  <option value="380">Ukraine (+380)</option>
                  <option value="971">United Arab Emirates (+971)</option>
                  <option value="44">United Kingdom (+44)</option>
                  <option value="1">United States (+1)</option>
                  <option value="1">United States Minor Outlying Islands (+1)</option>
                  <option value="598">Uruguay (+598)</option>
                  <option value="998">Uzbekistan (+998)</option>
                  <option value="678">Vanuatu (+678)</option>
                  <option value="58">Venezuela (+58)</option>
                  <option value="84">Viet Nam (+84)</option>
                  <option value="1284">Virgin Islands, British (+1284)</option>
                  <option value="1340">Virgin Islands, U.s. (+1340)</option>
                  <option value="681">Wallis and Futuna (+681)</option>
                  <option value="212">Western Sahara (+212)</option>
                  <option value="967">Yemen (+967)</option>
                  <option value="260">Zambia (+260)</option>
                  <option value="263">Zimbabwe (+263)</option>
                </select> */}
              </div>
              <div >
                {/* 
                <input class="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /> */}
              </div>
              <div >

                <input class="input-field" type="text" onChange={(e) => setCode(e.target.value)} value={code} placeholder="OTP" />
              </div>
              <div>


              </div>

              <button type="submit" class="btn solid" id="login-btn">Login</button>
              <div className="countdown-text">
                {seconds > 0 || minutes > 0 ? (
                  <p>
                    Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </p>
                ) : (
                  <button className="time-button" onClick={() => setSign2("OTP3")}>Didn't recieve code?</button>
                )}
              </div>

              <button onClick={() => setSign2("OTP3")} class="link" id="login-LOTP-btn">
                Login via OTP
              </button>
              <button class="link" id="login-LPWD-btn">
                Login via Password
              </button>
            </form>
          }

          {sign2 == "login" &&
            <form onSubmit={handleLogin} class="sign-in-form">
              <h2 class="title">Sign in</h2>
              <div>
                <select  value={country} onChange={(e) => setcountry(e.target.value)} class="input-field earth2" id="country" name="country">

                  <option value="" >Select country</option>
                  <option value="+93">Afghanistan (+93)</option>
                  <option value="+358">Aland Islands (+358)</option>
                  <option value="+355">Albania (+355)</option>
                  <option value="+213">Algeria (+213)</option>
                  <option value="+1684">American Samoa (+1684)</option>
                  <option value="+376">Andorra (+376)</option>
                  <option value="+244">Angola (+244)</option>
                  <option value="+1264">Anguilla (+1264)</option>
                  <option value="+1268">Antigua and Barbuda (+1268)</option>
                  <option value="54">Argentina (+54)</option>
                  <option value="374">Armenia (+374)</option>
                  <option value="297">Aruba (+297)</option>
                  <option value="61">Australia (+61)</option>
                  <option value="43">Austria (+43)</option>
                  <option value="994">Azerbaijan (+994)</option>
                  <option value="1242">Bahamas (+1242)</option>
                  <option value="973">Bahrain (+973)</option>
                  <option value="880">Bangladesh (+880)</option>
                  <option value="1246">Barbados (+1246)</option>
                  <option value="375">Belarus (+375)</option>
                  <option value="32">Belgium (+32)</option>
                  <option value="501">Belize (+501)</option>
                  <option value="229">Benin (+229)</option>
                  <option value="1441">Bermuda (+1441)</option>
                  <option value="975">Bhutan (+975)</option>
                  <option value="591">Bolivia (+591)</option>
                  <option value="599">Bonaire, Sint Eustatius and Saba (+599)</option>
                  <option value="387">Bosnia and Herzegovina (+387)</option>
                  <option value="267">Botswana (+267)</option>
                  <option value="55">Brazil (+55)</option>
                  <option value="246">British Indian Ocean Territory (+246)</option>
                  <option value="673">Brunei Darussalam (+673)</option>
                  <option value="359">Bulgaria (+359)</option>
                  <option value="226">Burkina Faso (+226)</option>
                  <option value="257">Burundi (+257)</option>
                  <option value="855">Cambodia (+855)</option>
                  <option value="237">Cameroon (+237)</option>
                  <option value="1">Canada (+1)</option>
                  <option value="238">Cape Verde (+238)</option>
                  <option value="1345">Cayman Islands (+1345)</option>
                  <option value="236">Central African Republic (+236)</option>
                  <option value="235">Chad (+235)</option>
                  <option value="56">Chile (+56)</option>
                  <option value="86">China (+86)</option>
                  <option value="61">Christmas Island (+61)</option>
                  <option value="672">Cocos (Keeling) Islands (+672)</option>
                  <option value="57">Colombia (+57)</option>
                  <option value="269">Comoros (+269)</option>
                  <option value="242">Congo (+242)</option>
                  <option value="242">Congo, the Democratic Republic of the (+242)</option>
                  <option value="682">Cook Islands (+682)</option>
                  <option value="506">Costa Rica (+506)</option>
                  <option value="225">Cote D'Ivoire (+225)</option>
                  <option value="385">Croatia (+385)</option>
                  <option value="53">Cuba (+53)</option>
                  <option value="599">Curacao (+599)</option>
                  <option value="357">Cyprus (+357)</option>
                  <option value="420">Czech Republic (+420)</option>
                  <option value="45">Denmark (+45)</option>
                  <option value="253">Djibouti (+253)</option>
                  <option value="1767">Dominica (+1767)</option>
                  <option value="1809">Dominican Republic (+1809)</option>
                  <option value="593">Ecuador (+593)</option>
                  <option value="20">Egypt (+20)</option>
                  <option value="503">El Salvador (+503)</option>
                  <option value="240">Equatorial Guinea (+240)</option>
                  <option value="291">Eritrea (+291)</option>
                  <option value="372">Estonia (+372)</option>
                  <option value="251">Ethiopia (+251)</option>
                  <option value="500">Falkland Islands (Malvinas) (+500)</option>
                  <option value="298">Faroe Islands (+298)</option>
                  <option value="679">Fiji (+679)</option>
                  <option value="358">Finland (+358)</option>
                  <option value="33">France (+33)</option>
                  <option value="594">French Guiana (+594)</option>
                  <option value="689">French Polynesia (+689)</option>
                  <option value="241">Gabon (+241)</option>
                  <option value="220">Gambia (+220)</option>
                  <option value="995">Georgia (+995)</option>
                  <option value="49">Germany (+49)</option>
                  <option value="233">Ghana (+233)</option>
                  <option value="350">Gibraltar (+350)</option>
                  <option value="30">Greece (+30)</option>
                  <option value="299">Greenland (+299)</option>
                  <option value="1473">Grenada (+1473)</option>
                  <option value="590">Guadeloupe (+590)</option>
                  <option value="1671">Guam (+1671)</option>
                  <option value="502">Guatemala (+502)</option>
                  <option value="44">Guernsey (+44)</option>
                  <option value="224">Guinea (+224)</option>
                  <option value="245">Guinea-Bissau (+245)</option>
                  <option value="592">Guyana (+592)</option>
                  <option value="509">Haiti (+509)</option>
                  <option value="39">Holy See (Vatican City State) (+39)</option>
                  <option value="504">Honduras (+504)</option>
                  <option value="852">Hong Kong (+852)</option>
                  <option value="36">Hungary (+36)</option>
                  <option value="354">Iceland (+354)</option>
                  <option value="+91">India (+91)</option>
                  <option value="62">Indonesia (+62)</option>
                  <option value="98">Iran, Islamic Republic of (+98)</option>
                  <option value="964">Iraq (+964)</option>
                  <option value="353">Ireland (+353)</option>
                  <option value="44">Isle of Man (+44)</option>
                  <option value="972">Israel (+972)</option>
                  <option value="39">Italy (+39)</option>
                  <option value="1876">Jamaica (+1876)</option>
                  <option value="81">Japan (+81)</option>
                  <option value="44">Jersey (+44)</option>
                  <option value="962">Jordan (+962)</option>
                  <option value="7">Kazakhstan (+7)</option>
                  <option value="254">Kenya (+254)</option>
                  <option value="686">Kiribati (+686)</option>
                  <option value="850">Korea, Democratic People"s Republic of (+850)</option>
                  <option value="82">Korea, Republic of (+82)</option>
                  <option value="381">Kosovo (+381)</option>
                  <option value="965">Kuwait (+965)</option>
                  <option value="996">Kyrgyzstan (+996)</option>
                  <option value="856">Lao People's Democratic Republic (+856)</option>
                  <option value="371">Latvia (+371)</option>
                  <option value="961">Lebanon (+961)</option>
                  <option value="266">Lesotho (+266)</option>
                  <option value="231">Liberia (+231)</option>
                  <option value="218">Libyan Arab Jamahiriya (+218)</option>
                  <option value="423">Liechtenstein (+423)</option>
                  <option value="370">Lithuania (+370)</option>
                  <option value="352">Luxembourg (+352)</option>
                  <option value="853">Macao (+853)</option>
                  <option value="389">Macedonia, the Former Yugoslav Republic of (+389)</option>
                  <option value="261">Madagascar (+261)</option>
                  <option value="265">Malawi (+265)</option>
                  <option value="60">Malaysia (+60)</option>
                  <option value="960">Maldives (+960)</option>
                  <option value="223">Mali (+223)</option>
                  <option value="356">Malta (+356)</option>
                  <option value="692">Marshall Islands (+692)</option>
                  <option value="596">Martinique (+596)</option>
                  <option value="222">Mauritania (+222)</option>
                  <option value="230">Mauritius (+230)</option>
                  <option value="269">Mayotte (+269)</option>
                  <option value="52">Mexico (+52)</option>
                  <option value="691">Micronesia, Federated States of (+691)</option>
                  <option value="373">Moldova, Republic of (+373)</option>
                  <option value="377">Monaco (+377)</option>
                  <option value="976">Mongolia (+976)</option>
                  <option value="382">Montenegro (+382)</option>
                  <option value="1664">Montserrat (+1664)</option>
                  <option value="212">Morocco (+212)</option>
                  <option value="258">Mozambique (+258)</option>
                  <option value="95">Myanmar (+95)</option>
                  <option value="264">Namibia (+264)</option>
                  <option value="674">Nauru (+674)</option>
                  <option value="977">Nepal (+977)</option>
                  <option value="31">Netherlands (+31)</option>
                  <option value="599">Netherlands Antilles (+599)</option>
                  <option value="687">New Caledonia (+687)</option>
                  <option value="64">New Zealand (+64)</option>
                  <option value="505">Nicaragua (+505)</option>
                  <option value="227">Niger (+227)</option>
                  <option value="234">Nigeria (+234)</option>
                  <option value="683">Niue (+683)</option>
                  <option value="672">Norfolk Island (+672)</option>
                  <option value="1670">Northern Mariana Islands (+1670)</option>
                  <option value="47">Norway (+47)</option>
                  <option value="968">Oman (+968)</option>
                  <option value="92">Pakistan (+92)</option>
                  <option value="680">Palau (+680)</option>
                  <option value="970">Palestinian Territory, Occupied (+970)</option>
                  <option value="507">Panama (+507)</option>
                  <option value="675">Papua New Guinea (+675)</option>
                  <option value="595">Paraguay (+595)</option>
                  <option value="51">Peru (+51)</option>
                  <option value="63">Philippines (+63)</option>
                  <option value="64">Pitcairn (+64)</option>
                  <option value="48">Poland (+48)</option>
                  <option value="351">Portugal (+351)</option>
                  <option value="1787">Puerto Rico (+1787)</option>
                  <option value="974">Qatar (+974)</option>
                  <option value="262">Reunion (+262)</option>
                  <option value="40">Romania (+40)</option>
                  <option value="70">Russian Federation (+70)</option>
                  <option value="250">Rwanda (+250)</option>
                  <option value="590">Saint Barthelemy (+590)</option>
                  <option value="290">Saint Helena (+290)</option>
                  <option value="1869">Saint Kitts and Nevis (+1869)</option>
                  <option value="1758">Saint Lucia (+1758)</option>
                  <option value="590">Saint Martin (+590)</option>
                  <option value="508">Saint Pierre and Miquelon (+508)</option>
                  <option value="1784">Saint Vincent and the Grenadines (+1784)</option>
                  <option value="684">Samoa (+684)</option>
                  <option value="378">San Marino (+378)</option>
                  <option value="239">Sao Tome and Principe (+239)</option>
                  <option value="966">Saudi Arabia (+966)</option>
                  <option value="221">Senegal (+221)</option>
                  <option value="381">Serbia (+381)</option>
                  <option value="381">Serbia and Montenegro (+381)</option>
                  <option value="248">Seychelles (+248)</option>
                  <option value="232">Sierra Leone (+232)</option>
                  <option value="65">Singapore (+65)</option>
                  <option value="1">Sint Maarten (+1)</option>
                  <option value="421">Slovakia (+421)</option>
                  <option value="386">Slovenia (+386)</option>
                  <option value="677">Solomon Islands (+677)</option>
                  <option value="252">Somalia (+252)</option>
                  <option value="27">South Africa (+27)</option>
                  <option value="500">South Georgia and the South Sandwich Islands (+500)</option>
                  <option value="211">South Sudan (+211)</option>
                  <option value="34">Spain (+34)</option>
                  <option value="94">Sri Lanka (+94)</option>
                  <option value="249">Sudan (+249)</option>
                  <option value="597">Suriname (+597)</option>
                  <option value="47">Svalbard and Jan Mayen (+47)</option>
                  <option value="268">Swaziland (+268)</option>
                  <option value="46">Sweden (+46)</option>
                  <option value="41">Switzerland (+41)</option>
                  <option value="963">Syrian Arab Republic (+963)</option>
                  <option value="886">Taiwan, Province of China (+886)</option>
                  <option value="992">Tajikistan (+992)</option>
                  <option value="255">Tanzania, United Republic of (+255)</option>
                  <option value="66">Thailand (+66)</option>
                  <option value="670">Timor-Leste (+670)</option>
                  <option value="228">Togo (+228)</option>
                  <option value="690">Tokelau (+690)</option>
                  <option value="676">Tonga (+676)</option>
                  <option value="1868">Trinidad and Tobago (+1868)</option>
                  <option value="216">Tunisia (+216)</option>
                  <option value="90">Turkey (+90)</option>
                  <option value="7370">Turkmenistan (+7370)</option>
                  <option value="1649">Turks and Caicos Islands (+1649)</option>
                  <option value="688">Tuvalu (+688)</option>
                  <option value="256">Uganda (+256)</option>
                  <option value="380">Ukraine (+380)</option>
                  <option value="971">United Arab Emirates (+971)</option>
                  <option value="44">United Kingdom (+44)</option>
                  <option value="1">United States (+1)</option>
                  <option value="1">United States Minor Outlying Islands (+1)</option>
                  <option value="598">Uruguay (+598)</option>
                  <option value="998">Uzbekistan (+998)</option>
                  <option value="678">Vanuatu (+678)</option>
                  <option value="58">Venezuela (+58)</option>
                  <option value="84">Viet Nam (+84)</option>
                  <option value="1284">Virgin Islands, British (+1284)</option>
                  <option value="1340">Virgin Islands, U.s. (+1340)</option>
                  <option value="681">Wallis and Futuna (+681)</option>
                  <option value="212">Western Sahara (+212)</option>
                  <option value="967">Yemen (+967)</option>
                  <option value="260">Zambia (+260)</option>
                  <option value="263">Zimbabwe (+263)</option>
                </select>
              </div>
              <div >

                <input class="input-field email" required type="text" value={emailphoneNumber} onChange={(e) => setemailPhoneNumber(e.target.value)} placeholder="Email/Phone" />
              </div>
              <div>

              </div>
              <div >

                <input class="input-field password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
              </div>
              <div>


              </div>

              <input type="submit" value="Login" class="btn solid" id="login-btn" />
              <button onClick={() => setSign2("OTP3")} style={{marginTop:"10px"}} class="link" id="login-LOTP-btn">
                Sign in with Otp
              </button>
              {/* <button onClick={() => setSign2("login")} class="btn wide" id="login-LPWD-btn">
                Login via Password
              </button> */}
              <button onClick={() => setSign2("forgot")} style={{marginTop:"10px"}} class="link" id="login-LPWD-btn">
                Forgot password ?
              </button>
            </form>
          }
          {sign2 == "OTP2" &&
            <form onSubmit={handleSend2} class="sign-in-form">
              <h2 class="title">Genrate OTP</h2>

              <div >

                <input required class="input-field email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
              </div>

              <div>


              </div>

              <input type="submit" value="Send otp" class="btn solid" id="login-btn" />
              <button onClick={() => setSign2("OTP3")} class="link" id="login-LOTP-btn">
                Login via OTP
              </button>
              <button onClick={() => setSign2("login")} class="link" id="login-LPWD-btn">
                Login via Password
              </button>
            </form>
          }

          {sign2 == "forgot" &&
            <form onSubmit={handleforgot} class="sign-in-form">
              <h2 class="title">Genrate link</h2>

              <div >

                <input required class="input-field email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
              </div>

              <div>


              </div>

              <input type="submit" value="SEND LINK" class="btn solid" id="login-btn" />
              <button onClick={() => setSign2("OTP3")} class="link" id="login-LOTP-btn">
                Login via OTP
              </button>
              <button onClick={() => setSign2("login")} class="link" id="login-LPWD-btn">
                Login via Password
              </button>
            </form>
          }
          {sign2 == "OTP3" &&
            <form onSubmit={sendVerificationCode2} class="sign-in-form">
              <h2 class="title">Genrate OTP</h2>
              <div>
                <select required value={country} onChange={(e) => setcountry(e.target.value)} class="input-field earth2" id="country" name="country">

                  <option disabled>select country</option>
                  <option value="93">Afghanistan (+93)</option>
                  <option value="358">Aland Islands (+358)</option>
                  <option value="355">Albania (+355)</option>
                  <option value="213">Algeria (+213)</option>
                  <option value="1684">American Samoa (+1684)</option>
                  <option value="376">Andorra (+376)</option>
                  <option value="244">Angola (+244)</option>
                  <option value="1264">Anguilla (+1264)</option>
                  <option value="1268">Antigua and Barbuda (+1268)</option>
                  <option value="54">Argentina (+54)</option>
                  <option value="374">Armenia (+374)</option>
                  <option value="297">Aruba (+297)</option>
                  <option value="61">Australia (+61)</option>
                  <option value="43">Austria (+43)</option>
                  <option value="994">Azerbaijan (+994)</option>
                  <option value="1242">Bahamas (+1242)</option>
                  <option value="973">Bahrain (+973)</option>
                  <option value="880">Bangladesh (+880)</option>
                  <option value="1246">Barbados (+1246)</option>
                  <option value="375">Belarus (+375)</option>
                  <option value="32">Belgium (+32)</option>
                  <option value="501">Belize (+501)</option>
                  <option value="229">Benin (+229)</option>
                  <option value="1441">Bermuda (+1441)</option>
                  <option value="975">Bhutan (+975)</option>
                  <option value="591">Bolivia (+591)</option>
                  <option value="599">Bonaire, Sint Eustatius and Saba (+599)</option>
                  <option value="387">Bosnia and Herzegovina (+387)</option>
                  <option value="267">Botswana (+267)</option>
                  <option value="55">Brazil (+55)</option>
                  <option value="246">British Indian Ocean Territory (+246)</option>
                  <option value="673">Brunei Darussalam (+673)</option>
                  <option value="359">Bulgaria (+359)</option>
                  <option value="226">Burkina Faso (+226)</option>
                  <option value="257">Burundi (+257)</option>
                  <option value="855">Cambodia (+855)</option>
                  <option value="237">Cameroon (+237)</option>
                  <option value="1">Canada (+1)</option>
                  <option value="238">Cape Verde (+238)</option>
                  <option value="1345">Cayman Islands (+1345)</option>
                  <option value="236">Central African Republic (+236)</option>
                  <option value="235">Chad (+235)</option>
                  <option value="56">Chile (+56)</option>
                  <option value="86">China (+86)</option>
                  <option value="61">Christmas Island (+61)</option>
                  <option value="672">Cocos (Keeling) Islands (+672)</option>
                  <option value="57">Colombia (+57)</option>
                  <option value="269">Comoros (+269)</option>
                  <option value="242">Congo (+242)</option>
                  <option value="242">Congo, the Democratic Republic of the (+242)</option>
                  <option value="682">Cook Islands (+682)</option>
                  <option value="506">Costa Rica (+506)</option>
                  <option value="225">Cote D'Ivoire (+225)</option>
                  <option value="385">Croatia (+385)</option>
                  <option value="53">Cuba (+53)</option>
                  <option value="599">Curacao (+599)</option>
                  <option value="357">Cyprus (+357)</option>
                  <option value="420">Czech Republic (+420)</option>
                  <option value="45">Denmark (+45)</option>
                  <option value="253">Djibouti (+253)</option>
                  <option value="1767">Dominica (+1767)</option>
                  <option value="1809">Dominican Republic (+1809)</option>
                  <option value="593">Ecuador (+593)</option>
                  <option value="20">Egypt (+20)</option>
                  <option value="503">El Salvador (+503)</option>
                  <option value="240">Equatorial Guinea (+240)</option>
                  <option value="291">Eritrea (+291)</option>
                  <option value="372">Estonia (+372)</option>
                  <option value="251">Ethiopia (+251)</option>
                  <option value="500">Falkland Islands (Malvinas) (+500)</option>
                  <option value="298">Faroe Islands (+298)</option>
                  <option value="679">Fiji (+679)</option>
                  <option value="358">Finland (+358)</option>
                  <option value="33">France (+33)</option>
                  <option value="594">French Guiana (+594)</option>
                  <option value="689">French Polynesia (+689)</option>
                  <option value="241">Gabon (+241)</option>
                  <option value="220">Gambia (+220)</option>
                  <option value="995">Georgia (+995)</option>
                  <option value="49">Germany (+49)</option>
                  <option value="233">Ghana (+233)</option>
                  <option value="350">Gibraltar (+350)</option>
                  <option value="30">Greece (+30)</option>
                  <option value="299">Greenland (+299)</option>
                  <option value="1473">Grenada (+1473)</option>
                  <option value="590">Guadeloupe (+590)</option>
                  <option value="1671">Guam (+1671)</option>
                  <option value="502">Guatemala (+502)</option>
                  <option value="44">Guernsey (+44)</option>
                  <option value="224">Guinea (+224)</option>
                  <option value="245">Guinea-Bissau (+245)</option>
                  <option value="592">Guyana (+592)</option>
                  <option value="509">Haiti (+509)</option>
                  <option value="39">Holy See (Vatican City State) (+39)</option>
                  <option value="504">Honduras (+504)</option>
                  <option value="852">Hong Kong (+852)</option>
                  <option value="36">Hungary (+36)</option>
                  <option value="354">Iceland (+354)</option>
                  <option value="91">India (+91)</option>
                  <option value="62">Indonesia (+62)</option>
                  <option value="98">Iran, Islamic Republic of (+98)</option>
                  <option value="964">Iraq (+964)</option>
                  <option value="353">Ireland (+353)</option>
                  <option value="44">Isle of Man (+44)</option>
                  <option value="972">Israel (+972)</option>
                  <option value="39">Italy (+39)</option>
                  <option value="1876">Jamaica (+1876)</option>
                  <option value="81">Japan (+81)</option>
                  <option value="44">Jersey (+44)</option>
                  <option value="962">Jordan (+962)</option>
                  <option value="7">Kazakhstan (+7)</option>
                  <option value="254">Kenya (+254)</option>
                  <option value="686">Kiribati (+686)</option>
                  <option value="850">Korea, Democratic People"s Republic of (+850)</option>
                  <option value="82">Korea, Republic of (+82)</option>
                  <option value="381">Kosovo (+381)</option>
                  <option value="965">Kuwait (+965)</option>
                  <option value="996">Kyrgyzstan (+996)</option>
                  <option value="856">Lao People's Democratic Republic (+856)</option>
                  <option value="371">Latvia (+371)</option>
                  <option value="961">Lebanon (+961)</option>
                  <option value="266">Lesotho (+266)</option>
                  <option value="231">Liberia (+231)</option>
                  <option value="218">Libyan Arab Jamahiriya (+218)</option>
                  <option value="423">Liechtenstein (+423)</option>
                  <option value="370">Lithuania (+370)</option>
                  <option value="352">Luxembourg (+352)</option>
                  <option value="853">Macao (+853)</option>
                  <option value="389">Macedonia, the Former Yugoslav Republic of (+389)</option>
                  <option value="261">Madagascar (+261)</option>
                  <option value="265">Malawi (+265)</option>
                  <option value="60">Malaysia (+60)</option>
                  <option value="960">Maldives (+960)</option>
                  <option value="223">Mali (+223)</option>
                  <option value="356">Malta (+356)</option>
                  <option value="692">Marshall Islands (+692)</option>
                  <option value="596">Martinique (+596)</option>
                  <option value="222">Mauritania (+222)</option>
                  <option value="230">Mauritius (+230)</option>
                  <option value="269">Mayotte (+269)</option>
                  <option value="52">Mexico (+52)</option>
                  <option value="691">Micronesia, Federated States of (+691)</option>
                  <option value="373">Moldova, Republic of (+373)</option>
                  <option value="377">Monaco (+377)</option>
                  <option value="976">Mongolia (+976)</option>
                  <option value="382">Montenegro (+382)</option>
                  <option value="1664">Montserrat (+1664)</option>
                  <option value="212">Morocco (+212)</option>
                  <option value="258">Mozambique (+258)</option>
                  <option value="95">Myanmar (+95)</option>
                  <option value="264">Namibia (+264)</option>
                  <option value="674">Nauru (+674)</option>
                  <option value="977">Nepal (+977)</option>
                  <option value="31">Netherlands (+31)</option>
                  <option value="599">Netherlands Antilles (+599)</option>
                  <option value="687">New Caledonia (+687)</option>
                  <option value="64">New Zealand (+64)</option>
                  <option value="505">Nicaragua (+505)</option>
                  <option value="227">Niger (+227)</option>
                  <option value="234">Nigeria (+234)</option>
                  <option value="683">Niue (+683)</option>
                  <option value="672">Norfolk Island (+672)</option>
                  <option value="1670">Northern Mariana Islands (+1670)</option>
                  <option value="47">Norway (+47)</option>
                  <option value="968">Oman (+968)</option>
                  <option value="92">Pakistan (+92)</option>
                  <option value="680">Palau (+680)</option>
                  <option value="970">Palestinian Territory, Occupied (+970)</option>
                  <option value="507">Panama (+507)</option>
                  <option value="675">Papua New Guinea (+675)</option>
                  <option value="595">Paraguay (+595)</option>
                  <option value="51">Peru (+51)</option>
                  <option value="63">Philippines (+63)</option>
                  <option value="64">Pitcairn (+64)</option>
                  <option value="48">Poland (+48)</option>
                  <option value="351">Portugal (+351)</option>
                  <option value="1787">Puerto Rico (+1787)</option>
                  <option value="974">Qatar (+974)</option>
                  <option value="262">Reunion (+262)</option>
                  <option value="40">Romania (+40)</option>
                  <option value="70">Russian Federation (+70)</option>
                  <option value="250">Rwanda (+250)</option>
                  <option value="590">Saint Barthelemy (+590)</option>
                  <option value="290">Saint Helena (+290)</option>
                  <option value="1869">Saint Kitts and Nevis (+1869)</option>
                  <option value="1758">Saint Lucia (+1758)</option>
                  <option value="590">Saint Martin (+590)</option>
                  <option value="508">Saint Pierre and Miquelon (+508)</option>
                  <option value="1784">Saint Vincent and the Grenadines (+1784)</option>
                  <option value="684">Samoa (+684)</option>
                  <option value="378">San Marino (+378)</option>
                  <option value="239">Sao Tome and Principe (+239)</option>
                  <option value="966">Saudi Arabia (+966)</option>
                  <option value="221">Senegal (+221)</option>
                  <option value="381">Serbia (+381)</option>
                  <option value="381">Serbia and Montenegro (+381)</option>
                  <option value="248">Seychelles (+248)</option>
                  <option value="232">Sierra Leone (+232)</option>
                  <option value="65">Singapore (+65)</option>
                  <option value="1">Sint Maarten (+1)</option>
                  <option value="421">Slovakia (+421)</option>
                  <option value="386">Slovenia (+386)</option>
                  <option value="677">Solomon Islands (+677)</option>
                  <option value="252">Somalia (+252)</option>
                  <option value="27">South Africa (+27)</option>
                  <option value="500">South Georgia and the South Sandwich Islands (+500)</option>
                  <option value="211">South Sudan (+211)</option>
                  <option value="34">Spain (+34)</option>
                  <option value="94">Sri Lanka (+94)</option>
                  <option value="249">Sudan (+249)</option>
                  <option value="597">Suriname (+597)</option>
                  <option value="47">Svalbard and Jan Mayen (+47)</option>
                  <option value="268">Swaziland (+268)</option>
                  <option value="46">Sweden (+46)</option>
                  <option value="41">Switzerland (+41)</option>
                  <option value="963">Syrian Arab Republic (+963)</option>
                  <option value="886">Taiwan, Province of China (+886)</option>
                  <option value="992">Tajikistan (+992)</option>
                  <option value="255">Tanzania, United Republic of (+255)</option>
                  <option value="66">Thailand (+66)</option>
                  <option value="670">Timor-Leste (+670)</option>
                  <option value="228">Togo (+228)</option>
                  <option value="690">Tokelau (+690)</option>
                  <option value="676">Tonga (+676)</option>
                  <option value="1868">Trinidad and Tobago (+1868)</option>
                  <option value="216">Tunisia (+216)</option>
                  <option value="90">Turkey (+90)</option>
                  <option value="7370">Turkmenistan (+7370)</option>
                  <option value="1649">Turks and Caicos Islands (+1649)</option>
                  <option value="688">Tuvalu (+688)</option>
                  <option value="256">Uganda (+256)</option>
                  <option value="380">Ukraine (+380)</option>
                  <option value="971">United Arab Emirates (+971)</option>
                  <option value="44">United Kingdom (+44)</option>
                  <option value="1">United States (+1)</option>
                  <option value="1">United States Minor Outlying Islands (+1)</option>
                  <option value="598">Uruguay (+598)</option>
                  <option value="998">Uzbekistan (+998)</option>
                  <option value="678">Vanuatu (+678)</option>
                  <option value="58">Venezuela (+58)</option>
                  <option value="84">Viet Nam (+84)</option>
                  <option value="1284">Virgin Islands, British (+1284)</option>
                  <option value="1340">Virgin Islands, U.s. (+1340)</option>
                  <option value="681">Wallis and Futuna (+681)</option>
                  <option value="212">Western Sahara (+212)</option>
                  <option value="967">Yemen (+967)</option>
                  <option value="260">Zambia (+260)</option>
                  <option value="263">Zimbabwe (+263)</option>
                </select>
              </div>
              <div >

                <input required class="input-field tel" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="phone number" />
              </div>

              <div>


              </div>

              <input type="submit" value="Send otp" class="btn solid" id="login-btn" />
              {/* <button onClick={() => setSign2("OTP3")} class="btn wide" id="login-LOTP-btn">
                Login via OTP
              </button> */}
              <button onClick={() => setSign2("login")} class="link" id="login-LPWD-btn">
                Login via Password
              </button>
              <button onClick={() => setSign2("forgot")} class="link" id="login-LPWD-btn">
                Forgot password?
              </button>
            </form>
          }
          {sign2 == "Verify" &&
            <form onSubmit={verifyCode2} class="sign-in-form">
              <h2 class="title">Verify OTP</h2>
              <div >
                <OtpInput
                  value={code}
                  onChange={setCode}
                  numInputs={6}
                  inputStyle=" color"
                  required
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input  {...props} />}></OtpInput>


              </div>

              <div>


              </div>

              <input type="submit" value="verify" class="btn solid" id="login-btn" />
              <div className="countdown-text">
                {seconds > 0 || minutes > 0 ? (
                  <p>
                    Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </p>
                ) : (
                  <button className="time-button" onClick={() => setSign2("OTP2")}>Didn't recieve code?</button>
                )}
              </div>

              {/* <button class="btn wide" onClick={() => setSign2("OTP2")} id="login-LOTP-btn">
                Login via OTP
              </button> */}
              <button onClick={() => setSign2("login")} class="btn wide" id="login-LPWD-btn">
                Login via Password
              </button>
            </form>
          }
          {sign2 == "Verify2" &&
            <form onSubmit={handleVerify} class="sign-in-form">
              <h2 class="title">Verify OTP</h2>
              <div >
                <OtpInput
                  value={OTP}
                  onChange={setOTP}
                  numInputs={4}
                  inputStyle=" color"
                  required
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input  {...props} />}></OtpInput>


              </div>

              <div>


              </div>

              <input type="submit" value="verify" class="btn solid" id="login-btn" />
              <div className="countdown-text">
                {seconds > 0 || minutes > 0 ? (
                  <p>
                    Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </p>
                ) : (
                  <button className="time-button" onClick={() => setSign2("OTP2")}>Didn't recieve code?</button>
                )}
              </div>

              {/* <button class="btn wide" onClick={() => setSign2("OTP2")} id="login-LOTP-btn">
                Login via OTP
              </button> */}
              <button onClick={() => setSign2("login")} class="link" id="login-LPWD-btn">
                Login via Password
              </button>
            </form>
          }




          {sign == "otp" &&
            <form onSubmit={verifyCode} className="sign-up-form">
              <h5 className="title">Enter OTP</h5>
              <OtpInput
                value={code}
                onChange={setCode}
                numInputs={6}
                inputStyle=" color"
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input  {...props} />}
              />
              <button class="btn wide" type="submit" id="login-LPWD-btn">
                Verify Otp
              </button>
              <div className="countdown-text">
                {seconds > 0 || minutes > 0 ? (
                  <p>
                    Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </p>
                ) : (
                  <button className="time-button" onClick={() => setSign2("OTP3")}>Didn't recieve code?</button>
                )}
              </div>


            </form>
          }
          {sign == "resend" &&
            <form onSubmit={handleSend} className="sign-up-form">
              <h5 className="title">Genrate OTP</h5>
              <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" style={{ margin: "10px auto 10px auto" }} className="input-field"></input>
              <button class="btn wide" type="submit" id="login-LPWD-btn">
                Genrate Otp
              </button>
              {/* <div className="countdown-text">
          {seconds > 0 || minutes > 0 ? (
            <p>
              Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </p>
          ) : (
            <p>Didn't recieve code?</p>
          )}
          </div> */}


            </form>
          }
          {sign == "imageUpload" &&
            <form onSubmit={handleSubmitphoto} className="sign-up-form" >
              <h5>Upload Image</h5>
              <div>

                <input required className="input-field" onChange={handleFileChange} type="file"></input><br></br>
              </div>
              <button class="btn wide" type="submit">upload</button>


            </form>
          }
          {sign == "firstVerify" &&
            <form onSubmit={sendVerificationCode} className="sign-up-form" >
              <h5 className="title">Get Otp</h5>
              <div>
                <select value={country} onChange={(e) => setcountry(e.target.value)} class="input-field earth2" id="country" name="country">

                  <option disabled>select country</option>
                  <option value="93">Afghanistan (+93)</option>
                  <option value="358">Aland Islands (+358)</option>
                  <option value="355">Albania (+355)</option>
                  <option value="213">Algeria (+213)</option>
                  <option value="1684">American Samoa (+1684)</option>
                  <option value="376">Andorra (+376)</option>
                  <option value="244">Angola (+244)</option>
                  <option value="1264">Anguilla (+1264)</option>
                  <option value="1268">Antigua and Barbuda (+1268)</option>
                  <option value="54">Argentina (+54)</option>
                  <option value="374">Armenia (+374)</option>
                  <option value="297">Aruba (+297)</option>
                  <option value="61">Australia (+61)</option>
                  <option value="43">Austria (+43)</option>
                  <option value="994">Azerbaijan (+994)</option>
                  <option value="1242">Bahamas (+1242)</option>
                  <option value="973">Bahrain (+973)</option>
                  <option value="880">Bangladesh (+880)</option>
                  <option value="1246">Barbados (+1246)</option>
                  <option value="375">Belarus (+375)</option>
                  <option value="32">Belgium (+32)</option>
                  <option value="501">Belize (+501)</option>
                  <option value="229">Benin (+229)</option>
                  <option value="1441">Bermuda (+1441)</option>
                  <option value="975">Bhutan (+975)</option>
                  <option value="591">Bolivia (+591)</option>
                  <option value="599">Bonaire, Sint Eustatius and Saba (+599)</option>
                  <option value="387">Bosnia and Herzegovina (+387)</option>
                  <option value="267">Botswana (+267)</option>
                  <option value="55">Brazil (+55)</option>
                  <option value="246">British Indian Ocean Territory (+246)</option>
                  <option value="673">Brunei Darussalam (+673)</option>
                  <option value="359">Bulgaria (+359)</option>
                  <option value="226">Burkina Faso (+226)</option>
                  <option value="257">Burundi (+257)</option>
                  <option value="855">Cambodia (+855)</option>
                  <option value="237">Cameroon (+237)</option>
                  <option value="1">Canada (+1)</option>
                  <option value="238">Cape Verde (+238)</option>
                  <option value="1345">Cayman Islands (+1345)</option>
                  <option value="236">Central African Republic (+236)</option>
                  <option value="235">Chad (+235)</option>
                  <option value="56">Chile (+56)</option>
                  <option value="86">China (+86)</option>
                  <option value="61">Christmas Island (+61)</option>
                  <option value="672">Cocos (Keeling) Islands (+672)</option>
                  <option value="57">Colombia (+57)</option>
                  <option value="269">Comoros (+269)</option>
                  <option value="242">Congo (+242)</option>
                  <option value="242">Congo, the Democratic Republic of the (+242)</option>
                  <option value="682">Cook Islands (+682)</option>
                  <option value="506">Costa Rica (+506)</option>
                  <option value="225">Cote D'Ivoire (+225)</option>
                  <option value="385">Croatia (+385)</option>
                  <option value="53">Cuba (+53)</option>
                  <option value="599">Curacao (+599)</option>
                  <option value="357">Cyprus (+357)</option>
                  <option value="420">Czech Republic (+420)</option>
                  <option value="45">Denmark (+45)</option>
                  <option value="253">Djibouti (+253)</option>
                  <option value="1767">Dominica (+1767)</option>
                  <option value="1809">Dominican Republic (+1809)</option>
                  <option value="593">Ecuador (+593)</option>
                  <option value="20">Egypt (+20)</option>
                  <option value="503">El Salvador (+503)</option>
                  <option value="240">Equatorial Guinea (+240)</option>
                  <option value="291">Eritrea (+291)</option>
                  <option value="372">Estonia (+372)</option>
                  <option value="251">Ethiopia (+251)</option>
                  <option value="500">Falkland Islands (Malvinas) (+500)</option>
                  <option value="298">Faroe Islands (+298)</option>
                  <option value="679">Fiji (+679)</option>
                  <option value="358">Finland (+358)</option>
                  <option value="33">France (+33)</option>
                  <option value="594">French Guiana (+594)</option>
                  <option value="689">French Polynesia (+689)</option>
                  <option value="241">Gabon (+241)</option>
                  <option value="220">Gambia (+220)</option>
                  <option value="995">Georgia (+995)</option>
                  <option value="49">Germany (+49)</option>
                  <option value="233">Ghana (+233)</option>
                  <option value="350">Gibraltar (+350)</option>
                  <option value="30">Greece (+30)</option>
                  <option value="299">Greenland (+299)</option>
                  <option value="1473">Grenada (+1473)</option>
                  <option value="590">Guadeloupe (+590)</option>
                  <option value="1671">Guam (+1671)</option>
                  <option value="502">Guatemala (+502)</option>
                  <option value="44">Guernsey (+44)</option>
                  <option value="224">Guinea (+224)</option>
                  <option value="245">Guinea-Bissau (+245)</option>
                  <option value="592">Guyana (+592)</option>
                  <option value="509">Haiti (+509)</option>
                  <option value="39">Holy See (Vatican City State) (+39)</option>
                  <option value="504">Honduras (+504)</option>
                  <option value="852">Hong Kong (+852)</option>
                  <option value="36">Hungary (+36)</option>
                  <option value="354">Iceland (+354)</option>
                  <option value="91">India (+91)</option>
                  <option value="62">Indonesia (+62)</option>
                  <option value="98">Iran, Islamic Republic of (+98)</option>
                  <option value="964">Iraq (+964)</option>
                  <option value="353">Ireland (+353)</option>
                  <option value="44">Isle of Man (+44)</option>
                  <option value="972">Israel (+972)</option>
                  <option value="39">Italy (+39)</option>
                  <option value="1876">Jamaica (+1876)</option>
                  <option value="81">Japan (+81)</option>
                  <option value="44">Jersey (+44)</option>
                  <option value="962">Jordan (+962)</option>
                  <option value="7">Kazakhstan (+7)</option>
                  <option value="254">Kenya (+254)</option>
                  <option value="686">Kiribati (+686)</option>
                  <option value="850">Korea, Democratic People"s Republic of (+850)</option>
                  <option value="82">Korea, Republic of (+82)</option>
                  <option value="381">Kosovo (+381)</option>
                  <option value="965">Kuwait (+965)</option>
                  <option value="996">Kyrgyzstan (+996)</option>
                  <option value="856">Lao People's Democratic Republic (+856)</option>
                  <option value="371">Latvia (+371)</option>
                  <option value="961">Lebanon (+961)</option>
                  <option value="266">Lesotho (+266)</option>
                  <option value="231">Liberia (+231)</option>
                  <option value="218">Libyan Arab Jamahiriya (+218)</option>
                  <option value="423">Liechtenstein (+423)</option>
                  <option value="370">Lithuania (+370)</option>
                  <option value="352">Luxembourg (+352)</option>
                  <option value="853">Macao (+853)</option>
                  <option value="389">Macedonia, the Former Yugoslav Republic of (+389)</option>
                  <option value="261">Madagascar (+261)</option>
                  <option value="265">Malawi (+265)</option>
                  <option value="60">Malaysia (+60)</option>
                  <option value="960">Maldives (+960)</option>
                  <option value="223">Mali (+223)</option>
                  <option value="356">Malta (+356)</option>
                  <option value="692">Marshall Islands (+692)</option>
                  <option value="596">Martinique (+596)</option>
                  <option value="222">Mauritania (+222)</option>
                  <option value="230">Mauritius (+230)</option>
                  <option value="269">Mayotte (+269)</option>
                  <option value="52">Mexico (+52)</option>
                  <option value="691">Micronesia, Federated States of (+691)</option>
                  <option value="373">Moldova, Republic of (+373)</option>
                  <option value="377">Monaco (+377)</option>
                  <option value="976">Mongolia (+976)</option>
                  <option value="382">Montenegro (+382)</option>
                  <option value="1664">Montserrat (+1664)</option>
                  <option value="212">Morocco (+212)</option>
                  <option value="258">Mozambique (+258)</option>
                  <option value="95">Myanmar (+95)</option>
                  <option value="264">Namibia (+264)</option>
                  <option value="674">Nauru (+674)</option>
                  <option value="977">Nepal (+977)</option>
                  <option value="31">Netherlands (+31)</option>
                  <option value="599">Netherlands Antilles (+599)</option>
                  <option value="687">New Caledonia (+687)</option>
                  <option value="64">New Zealand (+64)</option>
                  <option value="505">Nicaragua (+505)</option>
                  <option value="227">Niger (+227)</option>
                  <option value="234">Nigeria (+234)</option>
                  <option value="683">Niue (+683)</option>
                  <option value="672">Norfolk Island (+672)</option>
                  <option value="1670">Northern Mariana Islands (+1670)</option>
                  <option value="47">Norway (+47)</option>
                  <option value="968">Oman (+968)</option>
                  <option value="92">Pakistan (+92)</option>
                  <option value="680">Palau (+680)</option>
                  <option value="970">Palestinian Territory, Occupied (+970)</option>
                  <option value="507">Panama (+507)</option>
                  <option value="675">Papua New Guinea (+675)</option>
                  <option value="595">Paraguay (+595)</option>
                  <option value="51">Peru (+51)</option>
                  <option value="63">Philippines (+63)</option>
                  <option value="64">Pitcairn (+64)</option>
                  <option value="48">Poland (+48)</option>
                  <option value="351">Portugal (+351)</option>
                  <option value="1787">Puerto Rico (+1787)</option>
                  <option value="974">Qatar (+974)</option>
                  <option value="262">Reunion (+262)</option>
                  <option value="40">Romania (+40)</option>
                  <option value="70">Russian Federation (+70)</option>
                  <option value="250">Rwanda (+250)</option>
                  <option value="590">Saint Barthelemy (+590)</option>
                  <option value="290">Saint Helena (+290)</option>
                  <option value="1869">Saint Kitts and Nevis (+1869)</option>
                  <option value="1758">Saint Lucia (+1758)</option>
                  <option value="590">Saint Martin (+590)</option>
                  <option value="508">Saint Pierre and Miquelon (+508)</option>
                  <option value="1784">Saint Vincent and the Grenadines (+1784)</option>
                  <option value="684">Samoa (+684)</option>
                  <option value="378">San Marino (+378)</option>
                  <option value="239">Sao Tome and Principe (+239)</option>
                  <option value="966">Saudi Arabia (+966)</option>
                  <option value="221">Senegal (+221)</option>
                  <option value="381">Serbia (+381)</option>
                  <option value="381">Serbia and Montenegro (+381)</option>
                  <option value="248">Seychelles (+248)</option>
                  <option value="232">Sierra Leone (+232)</option>
                  <option value="65">Singapore (+65)</option>
                  <option value="1">Sint Maarten (+1)</option>
                  <option value="421">Slovakia (+421)</option>
                  <option value="386">Slovenia (+386)</option>
                  <option value="677">Solomon Islands (+677)</option>
                  <option value="252">Somalia (+252)</option>
                  <option value="27">South Africa (+27)</option>
                  <option value="500">South Georgia and the South Sandwich Islands (+500)</option>
                  <option value="211">South Sudan (+211)</option>
                  <option value="34">Spain (+34)</option>
                  <option value="94">Sri Lanka (+94)</option>
                  <option value="249">Sudan (+249)</option>
                  <option value="597">Suriname (+597)</option>
                  <option value="47">Svalbard and Jan Mayen (+47)</option>
                  <option value="268">Swaziland (+268)</option>
                  <option value="46">Sweden (+46)</option>
                  <option value="41">Switzerland (+41)</option>
                  <option value="963">Syrian Arab Republic (+963)</option>
                  <option value="886">Taiwan, Province of China (+886)</option>
                  <option value="992">Tajikistan (+992)</option>
                  <option value="255">Tanzania, United Republic of (+255)</option>
                  <option value="66">Thailand (+66)</option>
                  <option value="670">Timor-Leste (+670)</option>
                  <option value="228">Togo (+228)</option>
                  <option value="690">Tokelau (+690)</option>
                  <option value="676">Tonga (+676)</option>
                  <option value="1868">Trinidad and Tobago (+1868)</option>
                  <option value="216">Tunisia (+216)</option>
                  <option value="90">Turkey (+90)</option>
                  <option value="7370">Turkmenistan (+7370)</option>
                  <option value="1649">Turks and Caicos Islands (+1649)</option>
                  <option value="688">Tuvalu (+688)</option>
                  <option value="256">Uganda (+256)</option>
                  <option value="380">Ukraine (+380)</option>
                  <option value="971">United Arab Emirates (+971)</option>
                  <option value="44">United Kingdom (+44)</option>
                  <option value="1">United States (+1)</option>
                  <option value="1">United States Minor Outlying Islands (+1)</option>
                  <option value="598">Uruguay (+598)</option>
                  <option value="998">Uzbekistan (+998)</option>
                  <option value="678">Vanuatu (+678)</option>
                  <option value="58">Venezuela (+58)</option>
                  <option value="84">Viet Nam (+84)</option>
                  <option value="1284">Virgin Islands, British (+1284)</option>
                  <option value="1340">Virgin Islands, U.s. (+1340)</option>
                  <option value="681">Wallis and Futuna (+681)</option>
                  <option value="212">Western Sahara (+212)</option>
                  <option value="967">Yemen (+967)</option>
                  <option value="260">Zambia (+260)</option>
                  <option value="263">Zimbabwe (+263)</option>
                </select>
              </div>
              <div>


                <input  required className="input-field tel" value={phoneNumber}  onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" type="text"></input><br></br>
              </div>
              <button class="btn wide" type="submit">Send Otp</button>


            </form>
          }

        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>New here ?</h3>
            <p>
              Create your one point Youth Buzz account and use a range of awesome services
            </p>
            <button class="btn transparent" id="sign-up-btn" onClick={toggleMode}>
              Sign up
            </button>
          </div>
          <img src={log} class="image" alt="loading" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>One of us ?</h3>
            <p>
              Login to your one point Youth Buzz account and use a range of awesome services
            </p>
            <button class="btn transparent" id="sign-in-btn" onClick={toggleMode}>
              Sign in
            </button>
          </div>
          <img src={register} class="image" alt="loading" />
        </div>
        <div id="Recapta-Verify" className="Recapta-Verify"></div>
      </div>
      <Toaster />
    </div>




  )
}
export default Signup2
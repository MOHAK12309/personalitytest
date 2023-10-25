import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import OtpInput from 'react-otp-input';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast from 'react-hot-toast';
import { initializeApp } from 'firebase/app';

import { getUserIdFromAuth } from "../../Redux/actions/GetSellerIdFromAuthActionCreators";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

function Edit() {
    const baseUrls = "http://localhost:8000";
    const baseUrl = "https://server.youthbuzz.in";
    const id = useSelector((state) => state.get_seller_profile_id.user_id);
    const [show, setShow] = useState("case1")
    const [show3, setShow3] = useState(true)
    const [name, setfirstName] = useState("");
    const [sign, setSign] = useState("sendcode")
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
    apiKey: "AIzaSyBSVxrjd1XV4jkCp8tIFKFmJc9RCvJQCpY",
    authDomain: "mywebproject-6ae23.firebaseapp.com",
    projectId: "mywebproject-6ae23",
    storageBucket: "mywebproject-6ae23.appspot.com",
    messagingSenderId: "414379817628",
    appId: "1:414379817628:web:43f57516373b466a674b59",
    measurementId: "G-SQE1QETVE6"
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
  const fullPhoneNumber = `${country}${phoneNumber}`;
console.log(country)
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
      const response = await axios.patch(`${baseUrl}/api/v1/test/update3/6537f43234a5cb13e460b288`, {

        // lastname:lastname,
        testNumber: fullPhoneNumber,



   

        // isEmailVerified: isEmailVerified
      });
    
      // if (response.data.status === "false") {
      //   toast(" Please verify your mail ")
      //   setSign2("OTP2")

      // }
      if (response.data.status === "success") {
        console.log(response)
       setSign("verifycode")
        // dispatch(getUserIdFromAuth(response.data.data.user._id));
  

 
        signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
         
          
            // setSign("otp")
            // setMinutes(2);
            // setSeconds(59);
            // setSign2("Verify")



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
      navigate('/reset')

      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      console.log(error, "hii")
      // ...
    });

  };
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // Implement your data fetching logic here
    };

    const verifycall = () => {
        alert("+" + document.getElementById("CCD").value + "\n" + document.getElementById("verifyPhoneNumber").value);
    };

    // Other functions like onStart, stampAuth, mytoggle, CaptchaVerified, DisplayRes, and myFunction can be defined here.

    return (
        <div>
            <div class="header" id="myHeader">
    <p><a href="https://theyouthbuzz.com/" target = "_blank">
      <img src="images/rEGISTEREDBLACK.png" alt="Youth Buzz - Career counselling & assessment"/ >
      </a></p>

<div>
  <div class="main">
    <section class="signup">
        <div class="container">
              <div class="row">
                <div class="column">
                  <h2 class="form-title">Verify user</h2>           
                <p class="form-title"><span class="msg"></span></p>
                { sign ==="sendcode" &&
                <form onSubmit={sendVerificationCode2}>
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

                    <input  value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} class="input-field" type="text" id="phoneNumber" placeholder="Enter your phone Number"/>
                               
                <button type="submit" class="btn-next" id="sign-in-button" >
                  Send verification code
                </button>
             
              
                </form>
}
                <br></br>  
                { sign ==="verifycode" &&
                <form onSubmit={verifyCode}>
                <input class="input-field" type="text" id="phoneNumber" value={code} onChange={(e)=>setCode(e.target.value)}></input>
                <button class="btn-next" type="submit" id="confirm-code" onclick="submitPhoneNumberAuthCode()">
                  Verify code
                </button>
                </form>   
}                 
              
                
                  
                </div>
            </div>
                <div class="column">
                  <figure><img src="images/verify.svg" alt="sing up image"/></figure>
                  <p class="signup-image-link" >please verify to see your result</p>
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
  <div id="Recapta-Verify" className="Recapta-Verify"></div>
</div>

            

         
        </div>
        </div>
    );
}

export default Edit;

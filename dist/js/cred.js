function verifycall(){
    alert("+" + document.getElementById("CCD").value + "\n" + document.getElementById("verifyPhoneNumber").value);
}

function onStart()
{
  document.querySelector("span.msg").innerHTML = "Choose Your Country";
  console.log("On Start");

        if((sessionStorage.getItem("name") == "") || (sessionStorage.getItem("name") == null))
        {
                location.href = "index.html";
        }
        else 
        {
        console.log(sessionStorage.getItem("name"));
        document.getElementById("confirm-code").style.display = "none";
        document.getElementById("code").style.display = "none";
        document.getElementById("retry-code").style.display = "none";
        stampAuth();
        }      
 } 

 function stampAuth(){

  var meth = "AuthVisit";
  var DTimee = new Date().toISOString();

  var vals = "Do="+meth+"&UserName="+sessionStorage.getItem("name")+"&SessionID="+sessionStorage.getItem("SessionId")+"&UserTime="+DTimee;

  var xhc = new XMLHttpRequest();

  xhc.open("POST", "https://theyouthbuzz.com/YouthBuzzWeb/APIs/Production/CheckIfUserExistsApi.php/", true);

  xhc.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
  xhc.send(vals);

  xhc.onload = function()
  {
    console.log(this.responseText);
  }

 }





function mytoggle() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function CaptchaVerified(){
    document.querySelector("span.msg").innerHTML =  "OTP Sent! Please check your phone for the verification code.";
    document.getElementById("CCD").style.display = "none";
    //document.getElementById("phoneNumber").style.display = "none";
    document.getElementById("recaptcha-container").style.display = "none";
    document.getElementById("sign-in-button").style.display = "none";
      
    document.getElementById("confirm-code").style.display = "block";
    document.getElementById("code").style.display = "block";
}

function DisplayRes(){
  location.href = "end.html";
}




window.onscroll = function() {myFunction()};


var header = document.getElementById("myHeader");


var sticky = header.offsetTop;


function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
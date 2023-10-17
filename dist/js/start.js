function submitForm(e) 
{
    e.preventDefault();
    let name = document.forms["welcome_form"]["name"].value;
  if(name == "")
  {
    alert("Please enter your name");
  }
  else
  {
      sessionStorage.setItem("name", name);  
      location.href = "quiz.html";      
  }
}

function cleardata(){
  sessionStorage.setItem("name","");
  sessionStorage.setItem("phoneNum","");

  sessionStorage.setItem("RealisticScore","");
  sessionStorage.setItem("InvestigativeScore","");
  sessionStorage.setItem("ArtisticScore","");
  sessionStorage.setItem("SocialScore","");
  sessionStorage.setItem("EnterprisingScore","");
  sessionStorage.setItem("ConventionalScore","");
  sessionStorage.setItem("SessionId","");

  console.log("Cleared");

  addVisit();
}

function addVisit(){

  var DTimee = new Date().toISOString();

  let SessionID = (DTimee + Math.floor(100000 + Math.random() * 900000));
  sessionStorage.setItem("SessionId",SessionID);

  console.log(SessionID);

  var meth = "logVisit";

  var TZonee = Intl.DateTimeFormat().resolvedOptions().timeZone;

  var vals = "Do="+meth+"&SessionID="+SessionID+"&UserTime="+DTimee+"&UserZone="+TZonee;

  var xhc = new XMLHttpRequest();

  xhc.open("POST", "https://theyouthbuzz.com/YouthBuzzWeb/APIs/Production/CheckIfUserExistsApi.php/", true);

  xhc.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
  xhc.send(vals);

  xhc.onload = function()
  {
    console.log(this.responseText);
  }
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
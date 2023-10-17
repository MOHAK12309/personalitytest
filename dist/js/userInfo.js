let user_name = sessionStorage.getItem("name");
let user_R = sessionStorage.getItem("RealisticScore");
let user_I = sessionStorage.getItem("InvestigativeScore");
let user_A = sessionStorage.getItem("ArtisticScore");
let user_S = sessionStorage.getItem("SocialScore");
let user_E = sessionStorage.getItem("EnterprisingScore");
let user_C = sessionStorage.getItem("ConventionalScore");


document.querySelector("span.name").innerHTML = user_name;
document.querySelector("span.RealisticS").innerHTML = user_R;
document.querySelector("span.InvestigativeS").innerHTML = user_I;
document.querySelector("span.ArtisticS").innerHTML = user_A;
document.querySelector("span.SocialS").innerHTML = user_S;
document.querySelector("span.EnterprisingS").innerHTML = user_E;
document.querySelector("span.ConventionalS").innerHTML = user_C;

document.querySelector("span.RealisticSS").innerHTML = user_R;
document.querySelector("span.InvestigativeSS").innerHTML = user_I;
document.querySelector("span.ArtisticSS").innerHTML = user_A;
document.querySelector("span.SocialSS").innerHTML = user_S;
document.querySelector("span.EnterprisingSS").innerHTML = user_E;
document.querySelector("span.ConventionalSS").innerHTML = user_C;

document.querySelector("span.RS").innerHTML = user_R;
document.querySelector("span.IV").innerHTML = user_I;
document.querySelector("span.AC").innerHTML = user_A;
document.querySelector("span.SC").innerHTML = user_S;
document.querySelector("span.EP").innerHTML = user_E;
document.querySelector("span.CV").innerHTML = user_C;



function SaveOn(){
  if((sessionStorage.getItem("name") == "") || (sessionStorage.getItem("name") == null))
  {
          location.href = "index.html";
  }
  else if ((sessionStorage.getItem("phoneNum") == "") || (sessionStorage.getItem("phoneNum") == null))
  {
          location.href = "index.html";
  }
  else
  { 
    console.log(sessionStorage.getItem("name"));
    var DTime = new Date().toISOString();
    var TZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    var meth = "SaveScore";
    var score = user_R + "-" + user_I + "-" + user_A + "-" + user_S + "-" + user_E + "-" + user_C;

    var vals = "Do="+meth+"&UserName="+sessionStorage.getItem("name")+"&UserNum="+sessionStorage.getItem("phoneNum")+"&UserScore="+score+"&UserTime="+DTime+"&UserZone="+TZone;

    console.log(vals);

    var xhr = new XMLHttpRequest();

    xhr.open("POST", "https://theyouthbuzz.com/YouthBuzzWeb/APIs/Production/CheckIfUserExistsApi.php/", true);
    
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
    xhr.send(vals);
  
    xhr.onload = function()
    {
      console.log(this.responseText);
    }
  }
}
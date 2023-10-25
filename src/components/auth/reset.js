import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { getUserIdFromAuth } from "../../Redux/actions/GetSellerIdFromAuthActionCreators";
import { useSelector } from "react-redux";
function PasswordReset() {




ChartJS.register(ArcElement, Tooltip, Legend);



  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [cPassword, setcPassword] = useState('');
  const [data2, setdata2] = useState([]);
  const[score2,setscore2]=useState()

  console.log(resetToken)
  const baseUrl = "http://localhost:8000"
  const baseUrls = "https://server.youthbuzz.in"
  const id = useSelector((state) => state.get_seller_profile_id.user_id);

  const fetchData2 = async (e) => {
   
    try {
        const response = await axios.get(`${baseUrl}/api/v1/test/getone2/${id}`);
       

       
        
        console.log(response.data.data.user.score)
        setdata2([response.data.data.user])
    } catch (error) {
    }
};



// Update chart data when scores are available


  useEffect(() => {

    fetchData2()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={{textAlign:"center"}}>
  
      <div class="header" id="myHeader">
    <p><a href="https://theyouthbuzz.com/" target = "_blank">
      <img  src="images/rEGISTEREDBLACK.png" alt="Youth Buzz - Career counselling & assessment" />
      </a></p>
  </div>
  { data2.map((item)=>{
     return(
      <div class="main">
   
      <section class="signup">
          <div class="container">
              <div class="signup-content">
                  <div class="signup-form">
                      <h2 class="form-title">Hey <span class="name">{item.username}</span></h2> 
                      <td >Here are the scores of your Professional and occupational interests according to the test that you just gave.</td>                         
                  </div>
                  <div class="signup-image">
                      <figure><img src="images/careerconfusion.svg" alt="career assesment sing up image"/></figure>
                      <h1 class="signup-image-link">Identify your career potentials</h1>
                  </div>
              </div>
          </div>
      </section>

      <section class="signup">
          <div class="container">
              <div class="signup-content">
                  <div class="signup-form">
                         
                      <h2 class="form-title">Your Score</h2>
                      <td>This score presents your occupational interest scores out of ten on six major occupational fields. </td>  <br/>
                      <td>The higher the number, the more you are aligned towards a particular occupational interest. </td>  
                                         
                    <p class="usertime"> Time taken <span class="time_taken"></span></p> 
                  </div>
                  { item.score.map((item2)=>{

return(
  <div>
  <div class="signup-image">

<table class="table">
<thead>
<tr>
<th>Intrest Field</th>
<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
<th>Score</th>
</tr>
</thead>
<tbody>
<tr>
<td>Realistic</td>
<td></td>
<td><span class="RealisticS">{item2.Realistic
} </span></td>
</tr>
<tr>
<td>Investigative</td>
<td> </td>
<td><span class="InvestigativeS">{item2.Investigative
} </span></td>
</tr>
<tr>
<td>Artistic</td>
<td> </td>
<td><span class="ArtisticS">{item2.Artistic
}</span></td>
</tr>
<tr>
<td>Social</td>
<td> </td>
<td><span class="SocialS">{item2.Social
}</span></td>
</tr>
<tr>
<td>Enterprising</td>
<td> </td>
<td><span class="EnterprisingS">{item2.Enterprising
}</span></td>
</tr>
<tr>
<td>Conventional</td>
<td> </td>
<td><span class="ConventionalS">{item2.Conventional
}</span></td>
</tr>
</tbody>
</table>

</div>
</div>
)
                  })
              
                     
  }

                  
    
              </div>     
              </div>       
      </section>
{ item.score.map((item2)=>{
  return(


    <div> 
  <section class="signup">
          <div class="container">
              <div class="signup-content">
                  <div class="signup-form">
                      <h2 class="form-title">Intrest Radar</h2> 
                      <a>This Radar chart is a graphical presentation of your occupational interests along the same six major occupational fields based on the score of the test that you just gave.</a><br></br>
                      <table >
                          <thead>
                            <tr>
                              <th>Code</th>
                              <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                              <th>Field</th>
                              <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                              <th>Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>R</td>
                              <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                              <td>Realistic</td>
                              <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                              <td><span class="RealisticSS">{item2.Realistic}</span></td>
                            </tr>
                            <tr>
                              <td>I</td>
                              <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                              <td>Investigative</td>
                              <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                              <td><span class="InvestigativeSS">{item2.Investigative}</span></td>
                            </tr>
                            <tr>
                              <td>A</td>
                              <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                              <td>Artistic</td>
                              <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                              <td><span class="ArtisticSS">{item2.Artistic}</span></td>
                            </tr>
                            <tr>
                              <td>S</td>
                              <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                              <td>Social</td>
                              <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                              <td><span class="SocialSS">{item2.Social}</span></td>
                            </tr>
                            <tr>
                              <td>E</td>
                              <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                              <td>Enterprising</td>
                              <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                              <td><span class="EnterprisingSS">{item2.Enterprising}</span></td>
                            </tr>
                            <tr>
                              <td>C</td>
                              <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                              <td>Conventional</td>
                              <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                              <td><span class="ConventionalSS">{item2.Conventional}</span></td>
                            </tr>
                          </tbody>
                        </table><br></br>    
                        <a>Below you can find a detailed explanation of each occupational field along with your score for better insight.</a>                                      
                  </div>
                  <div  >
                  <Doughnut
  
  data={
    {
      labels: ['Realistic', 'Investigative', 'Artistic', 'Social', 'Enterprising', 'Conventional'],
      datasets: [
        {
          label: '# of Votes',
          data: [
            item2.Realistic,
            item2.Investigative,
            item2.Artistic,
            item2.Social,
            item2.Enterprising,
            item2.Conventional
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }




  }

/>
    
               
                  </div>
              </div>
          </div>
      </section>

      <section class="signup">
          <div class="container">
              <div class="signup-content">
                  <div class="signup-form">
                      <h2 class="form-title">Realistic</h2> 
                      <td>Doers. Who prefer to work with things and love to be assertive, competitive & understand by doing.
                      </td>                         
                  </div>
                  <div class="signup-image" >
                    <h2 ><span class="RS">{item2.Realistic}</span>/10</h2>                       
                 </div>
              </div>
          </div>                     
      </section>
      
 
      <section class="signup">
         <div class="container">
             <div class="signup-content">
                <div class="signup-form">
                  <h2 class="form-title">Investigative</h2> 
                  <td>Thinkers. Who prefer to work with data and love to observe, organize and understand information.
                  </td>                         
                  </div>
                  <div class="signup-image">
               <h2 ><span class="IV">{item2.Investigative}</span>/10</h2>                       
             </div>
          </div>
        </div>                     
      </section>

                                           
                                           <section class="signup">
                                            <div class="container">
                                                <div class="signup-content">
                                                    <div class="signup-form">
                                                        <h2 class="form-title">Get the expert's guidance.<span class="name"></span></h2> 
                                                        <td >
                                                          We bring to you the Open Counsellors Network where we match you with a suitable career counselor so that you end up getting guidance the way you expertise in and not in the expertise of others.</td><br></br>
                                                            <td >
                                                              Download the Youth Buzz app now & take your One Giant leap to active learning.</td>
                                                              
                                                    </div>
                                                    <div class="signup-image" >
                                                      <div class="container2"> 
                                                        <iframe class="responsive-iframe" src="https://www.youtube.com/embed/iktv0sG2MII"></iframe>                              
                                                      </div>
                                                      <p><a href="https://play.google.com/store/apps/details?id=youthbuzz.com.youthbuzz" target="_blank">
                                                        <img src="images/google-play-badge.png" alt="Youth buzz Career counselling app on Google play store"/>
                                                        </a></p>                                                
                                                    </div>
                                                </div>
                                            </div>
                                  </section>        

      <section class="signup">
                              <div class="container">
                                  <div class="signup-content">
                                      <div class="signup-form">
                                          <h2 class="form-title">Artistic</h2> 
                                          <td>Creators. Who prefer to work with ideas & things. Love to be open, creative, inventive, and try new against the rule.
                                          </td>                         
                                      </div>
                                      <div class="signup-image">
                                        <h2 ><span class="AC">{item2.Artistic}</span>/10</h2>                       
                                     </div>
                                  </div>
                              </div>                     
      </section>


      <section class="signup">
        <div class="container">
            <div class="signup-content">
                <div class="signup-form">
                    <h2 class="form-title">Social</h2> 
                    <td>Helpers. Who prefer to work with people and find comfort in helping others.
                    </td>                         
                </div>
                <div class="signup-image">
                  <h2 ><span class="SC">{item2.Social}</span>/10</h2>                       
               </div>
            </div>
        </div>                     
      </section>
      
   
      <section class="signup">
                <div class="container">
                    <div class="signup-content">
                        <div class="signup-form">
                            <h2 class="form-title">Access this report later too?<span class="name"></span></h2> 
                            <td >
                              Get the Youth buzz app from the play store and request a copy of this report from the same number to access it later as well.</td><br></br>
                              <td >
                                And also get the benefit of :</td> 
                                <ul>
                                  <li>Career guidance from experts</li>
                                  <li>Detailed report of 10 pages with an improvement plan</li>
                                  <li>Latest info on all thing Youth & Career</li>
                                  <li>Multiple Psychoanalysis tests to further evaluate your skills</li>
                                </ul> 
                                <td >
                                  Download the Youth Buzz app now & take your One Giant leap to active learning.</td>
                                  <p><a href="https://play.google.com/store/apps/details?id=youthbuzz.com.youthbuzz" target="_blank">
                                    <img  src="images/google-play-badge.png" alt="Youth Buzz Career assesment app on google play store"/>
                                    </a></p>
                        </div>
                        <div class="signup-image" >
                            <p><a href="https://play.google.com/store/apps/details?id=youthbuzz.com.youthbuzz" target="_blank">
                              <img  src="images/Webp.net-resizeimage.png" alt="Youth Buzz Career assesment app on google play store"/>
                              </a></p>                      
                        </div>
                    </div>
                </div>
      </section> 


   
      <section class="signup">
        <div class="container">
            <div class="signup-content">
                <div class="signup-form">
                    <h2 class="form-title">Enterprising</h2> 
                    <td>Persuaders. Who prefer to work with people and data, and value reputation, power, money, and status.
                    </td>                         
                </div>
                <div class="signup-image">
                  <h2 ><span class="EP">{item2.Enterprising}</span>/10</h2>                       
               </div>
            </div>
        </div>                     
      </section>        

     
      <section class="signup">
              <div class="container">
                  <div class="signup-content">
                      <div class="signup-form">
                          <h2 class="form-title">Conventional</h2> 
                          <td>Organizers. Who prefer to work with data and find comfort in emphasize rules and regulations.
                          </td>                         
                      </div>
                      <div class="signup-image">
                        <h2><span class="CV">{item2.Conventional}</span>/10</h2>                       
                     </div>
                  </div>
              </div>                     
      </section>   


                                        
      <section class="signup">
                <div class="container">
                    <div class="signup-content">
                        <div class="signup-form">
                            <h2 class="form-title">Know more ?<span class="name"></span></h2> 
                            <td >
                              While this score report reveals a lot about your occupational interests based on your performance in the test, we still recommend having a one-on-one session with the expert counselors to get a complete assured picture.
                              </td><br></br>
                                <td >
                                  Download the Youth Buzz app now & take your One Giant leap to active learning</td>

                        </div>
                        <div class="signup-image" >
                          <div class="container2"> 
                            <iframe class="responsive-iframe" src="https://www.youtube.com/embed/z3-QIappZlY"></iframe>                              
                          </div>
                          <p><a href="https://play.google.com/store/apps/details?id=youthbuzz.com.youthbuzz" target="_blank">
                            <img src="images/google-play-badge.png" alt="Youth Buzz Career assesment app on google play store"/>
                            </a></p>                                                
                        </div>
                    </div>
                </div>
      </section> 


    
              <section class="signup">
                <div class="container">  
                  <p >Analyze again ? Click on the button below</p>  
                    <a  class="signup-image-link"><input type="submit" name="signup" id="signup" class="form-submit" value="Restart the test" onclick="location.href='index.html'" /></a>     
                                                    
                </div>
      </section>

    
      <section class="signup">
                <div class="container">  
                    <a href="https://theyouthbuzz.com/social/" target="_blank" class="signup-image-link">Contact us</a>     
                    <p>Copyrights Youth Buzz educom LLP 2021</p>    
                                
                </div>
      </section>

      </div>


  )
      })
  }

  </div>

     )

   
      })
}
    </div>
  );
}

export default PasswordReset;
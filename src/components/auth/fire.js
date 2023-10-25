import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserIdFromAuth } from "../../Redux/actions/GetSellerIdFromAuthActionCreators";
import { useSelector } from "react-redux";
const baseUrls = "http://localhost:8000";
const baseUrl = "https://server.youthbuzz.in";

let questions = 
[
  {
    id: 1,
    question: "act in plays ?",
    answer: "Artistic",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 2,
    question: "organize your stuff like file, desk, workspace etc ?",
    answer: "Conventional",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 3,
    question: "do experiments ?",
    answer: "Investigative",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 4,
    question: "work independently ?",
    answer: "Artistic",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 5,
    question: "work in team ?",
    answer: "Social",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 6,
    question: "being a practical person ?",
    answer: "Realistic",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 7,
    question: "work in an office environment ?",
    answer: "Conventional",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 8,
    question: "study science ?",
    answer: "Investigative",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 9,
    question: "have a clear set of instructions to follow ?",
    answer: "Enterprising",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 10,
    question: "selling things ?",
    answer: "Enterprising",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 11,
    question: "explore arts ?",
    answer: "Artistic",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 12,
    question: "work on cars ?",
    answer: "Realistic",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 13,
    question: "figure out how things work ?",
    answer: "Investigative",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 14,
    question: "learn about other cultures ?",
    answer: "Social",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 15,
    question: "study maths ?",
    answer: "Investigative",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 16,
    question: "play instruments or sing ?",
    answer: "Artistic",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 17,
    question: "get into discussions about issues ?",
    answer: "Social",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 18,
    question: "taking care of animals ?",
    answer: "Realistic",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 19,
    question: "teach or train people ?",
    answer: "Social",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 20,
    question: "pay attention to the details ?",
    answer: "Conventional",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 21,
    question: "cook ?",
    answer: "Realistic",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 22,
    question: "take responsibilities ?",
    answer: "Enterprising",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 23,
    question: "do filing or typing ?",
    answer: "Conventional",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 24,
    question: "give speeches ?",
    answer: "Enterprising",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 25,
    question: "make drawings and paintings ?",
    answer: "Artistic",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 26,
    question: "observe something working ?",
    answer: "Investigative",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 27,
    question: "creative writing ?",
    answer: "Artistic",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 28,
    question: "do volunteer service ?",
    answer: "Social",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 29,
    question: "be elected ?",
    answer: "Enterprising",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 30,
    question: "design something ?",
    answer: "Artistic",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 31,
    question: "always be physically active ?",
    answer: "Realistic",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 32,
    question: "solve riddles ?",
    answer: "Investigative",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 33,
    question: "work with numbers ?",
    answer: "Conventional",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 34,
    question: "express yourself creatively ?",
    answer: "Artistic",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 35,
    question: "read scientific or technical magazines ?",
    answer: "Investigative",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 36,
    question: "use formal language ?",
    answer: "Conventional",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 37,
    question: "meet Important people ?",
    answer: "Enterprising",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 38,
    question: "mediate disputes ?",
    answer: "Social",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 39,
    question: "fix electrical things ?",
    answer: "Realistic",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 40,
    question: "working with number, charts ?",
    answer: "Investigative",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 41,
    question: "plan and supervise an activity ?",
    answer: "Social",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 42,
    question: "rely more on proved methods than new risks ?",
    answer: "Conventional",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 43,
    question: "help people ?",
    answer: "Social",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 44,
    question: "keep record of work you do ?",
    answer: "Conventional",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 45,
    question: "lead ?",
    answer: "Enterprising",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 46,
    question: "perform lab experiments ?",
    answer: "Investigative",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 47,
    question: "co-oprate with others  ?",
    answer: "Social",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 48,
    question: "take photographs ?",
    answer: "Artistic",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 49,
    question: "obey the rules completely ?",
    answer: "Conventional",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 50,
    question: "spend time exploring nature ?",
    answer: "Realistic",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 51,
    question: "initiate new initiaves ?",
    answer: "Enterprising",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 52,
    question: "have your day structured ?",
    answer: "Conventional",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 53,
    question: "read technical documents of machines ?",
    answer: "Realistic",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 54,
    question: "read fiction, plays, poetry ?",
    answer: "Artistic",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 55,
    question: "solve puzzels ?",
    answer: "Investigative",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 56,
    question: "be ambitious and set your own goals ?",
    answer: "Enterprising",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 57,
    question: "influence or persuade people ?",
    answer: "Social",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 58,
    question: "promote something to others ?",
    answer: "Enterprising",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 59,
    question: "putting things together or assembling things?",
    answer: "Realistic",
    options: [
      "Yes",
      "No",
    ]
  },
  {
    id: 60,
    question: "work outdoors ?",
    answer: "Realistic",
    options: [
      "Yes",
      "No",
    ]
  }
];
const PhoneVerification = () => {
    const id = useSelector((state) => state.get_seller_profile_id.user_id);
    console.log(id)
  const [questionCount, setQuestionCount] = useState(0);
  const [data2,setdata2]=useState([])
  const [score, setScore] = useState({
    Realistic: 0,
    Investigative: 0,
    Artistic: 0,
    Social: 0,
    Enterprising: 0,
    Conventional: 0,
  });
  
  const fetchData = async (e) => {
   
      try {
          const response = await axios.patch(`${baseUrl}/api/v1/test/update3/${id}`,{
            score:[score]
          });
         

        //   console.log(response)
        //   console.log(score)
          if(response.data.status==="success"){
            navigate("/credential")

          }

      } catch (error) {
      }
  };
  const fetchData2 = async (e) => {
   
    try {
        const response = await axios.get(`${baseUrl}/api/v1/test/getone2/${id}`);
       

       
        
        console.log(response.data.data.user)
        setdata2([response.data.data.user])
    } catch (error) {
    }
};
  useEffect(() => {
    logApplicant();
    fetchData2()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logApplicant = () => {
    // Your logApplicant function here
  };

  const next = (userAnswer) => {
    if (questionCount === questions.length - 1) {
   fetchData()
      return;
    }

    // Update the score based on the user's answer
    if (userAnswer === 'Yes') {
      const answer = questions[questionCount].answer;
      setScore((prevScore) => ({
        ...prevScore,
        [answer]: prevScore[answer] + 1,
      }));
    }

    setQuestionCount((prevCount) => prevCount + 1);

  };

  const show = (count) => {
    const question = questions[count];
    return (
      <div id="questions">
        <h2>{question.question}</h2>
        <ul className="option_group">
          {question.options.map((option, index) => (
            <li
              className="option"
              key={index}
              onClick={() => next(option)}
            >
              {option}
             
            </li>
          ))}
        </ul>
      </div>
    );
  };
  const show2 = () => {
    return (
      <div id="questions">
        <div className="quiz_timer">
          <span className="que" id="counter">
            {questionCount + 1}/60
          </span>
        </div>
      </div>
    );
  };
  const navigate = useNavigate();
  return (
    <div>
      {/* Your JSX for the header */}
      <div className="wrapperqz">
        <div />
        <div className="quiz">
          <div className="quiz_header">
            <div className="quiz_user">
              <h4>

                {
                    data2.map((item)=>{
                        return(
                            <span className="name" >
                                hey {item.username}

                            </span>
                        )
                        
                    })
             
}

              </h4>
              <h4 style={{marginLeft:"5px"}}>do you like to ...</h4>
            </div>
            <div>
            <div>{show2(questionCount)}</div>
            </div>
      
          </div>
          <div className="quiz_bodyp">
          <div>{show(questionCount)}</div>
          <button className="btn-next" onClick={() => next('No')}>
            Next Question
          </button>
          <br />
          <br />
          <br />
          <p>Please take your time, think and,</p>
          <p>honestly answer Yes or No.</p>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default PhoneVerification;

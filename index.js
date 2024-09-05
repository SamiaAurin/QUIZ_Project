//getting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");

/* Time Releated*/
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .timer_line");
const timeOff = quiz_box.querySelector(".timer .time_text");


//If start quiz button clicked
start_btn.onclick = ()=>{
    start_btn.classList.add("afterStart");
    info_box.classList.add("activeInfo");
   
}

//If exit button clicked
exit_btn.onclick = ()=>{
    start_btn.classList.remove("afterStart");
    info_box.classList.remove("activeInfo");
   
}

//If continue button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    startTimer(15);
    startTimerLine(0);
   
}


///////////////////////////////////////////////////////////////////
//////////  Questions /////////////////
//////////////////////////////////////////////////////////////////
const quizData = [
    {
        num: 1,
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: 2
    },
    {
        num: 2,
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: 1
    },
    {
        num: 3,
        question: "What is the largest ocean on Earth?",
        choices: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3
    },
    {
        num: 4,
        question: "Who wrote 'Romeo and Juliet'?",
        choices: ["William Shakespeare", "Charles Dickens", "Leo Tolstoy", "Mark Twain"],
        correct: 0
    },
    {
        num: 5,
        question: "What does HTML stands for?",
        choices: ["Hyper Text Language", "Higher Machine Language", "Hyper Text Markup Language", "Hyper Tool Multi Language"],
        correct: 2
    },

];

/////////////////
let que_count = 0;
let Timecounter;
let counterLine;
let timeValue = 15;
let timeWidth = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector('.next_btn');
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = ()=>{
    timeOff.textContent = "Time Left :";
    quiz_box.classList.add("activeQuiz");   
    result_box.classList.remove("activeResult");

    que_count = 0;
    userScore = 0;
    timeValue = 15;
    timeWidth = 0;
    
    showQuestions(que_count);
    clearInterval(Timecounter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(timeWidth);
}
quit_quiz.onclick = ()=>{
    window.location.reload();
}

// If next button clicked
next_btn.onclick = ()=>{
    timeOff.textContent = "Time Left :";
    if(que_count < quizData.length -1 )
    {
        que_count++;
        showQuestions(que_count);
        clearInterval(Timecounter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(timeWidth);
    }
    else{
        clearInterval(Timecounter);
        clearInterval(counterLine);
        showResult();
    }
}

//getting ques and options
function showQuestions(index){
    // ques show
    const que_text = document.querySelector(".que_text");
    let que_tag = `<span>`+ quizData[index].num +`. `+quizData[index].question +`</span>`;
    que_text.innerHTML = que_tag;

    // option show
    let option_tag =    `<div class="option"> ` +quizData[index].choices[0] +`<span></span></div>`
                       +`<div class="option"> ` +quizData[index].choices[1] +`<span></span></div>`
                       +`<div class="option"> ` +quizData[index].choices[2] +`<span></span></div>`
                       +`<div class="option"> ` +quizData[index].choices[3] +`<span></span></div>` ;

    option_list.innerHTML = option_tag;

    // option choice korar js
    let option = option_list.querySelectorAll(".option"); 
    for(let i = 0; i < option.length; i++) {
        option[i].onclick = function() {
            optionSelected(i);
        };
    }
    
    // ques er niche eto of 5
    const bottom_que_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = `<span><p>`+quizData[index].num+`</p>of<p>`+ quizData.length +`</p>Questions.</span>`
    bottom_que_counter.innerHTML = totalQuesCountTag;
}

//tick icon
let tickIcon = `<div class="icon tick">
                <i class="fa-solid fa-check"></i>
                </div>`;
let crossIcon = `<div class="icon cross">
                <i class="fa-solid fa-x"></i>
                </div>` ;               


// option select houar pore js
function optionSelected(answer){
  
  clearInterval(Timecounter);
  clearInterval(counterLine);

  let correctAns = quizData[que_count].correct;
  let options = option_list.querySelectorAll(".option");
  let allOptions = option_list.children.length;


  if(answer === correctAns)
  {
    userScore += 1;
    options[answer].classList.add("correct"); 
    options[answer].insertAdjacentHTML("beforeend", tickIcon);
  }
  else
  {
    options[answer].classList.add("incorrect");
    options[answer].insertAdjacentHTML("beforeend", crossIcon);
    //if answer is wrong then show the correct answer too automatically.
    for(let i = 0; i < allOptions; i++) {
       // console.log(option_list.children[i]);
       // console.log(correctAns);
        if(i == correctAns)
        {
            option_list.children[i].setAttribute("class" ,"option correct");
            options[i].insertAdjacentHTML("beforeend", tickIcon);
        }
    }
  }

  // once user selected all other options will be disabled
  for(let i = 0; i < allOptions; i++)
  {
    option_list.children[i].classList.add("disabled");
  }
}

// result er js
function showResult(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");   
    result_box.classList.add("activeResult");
    let scoreText = result_box.querySelector(".score_text");

    if(userScore > 3){
        let scoreTag = `<span> &#128515; Congratulations! You have scored <p> ` +userScore+ ` </p> out of <p>`+ quizData.length +`</p></span>`;
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = `<span> &#128532; Sorry! You have got only <p> ` +userScore+ ` </p> out of <p>`+ quizData.length +`</p></span>`;
        scoreText.innerHTML = scoreTag;
    }
}


// timer set er code
function startTimer(time){
    
    Timecounter = setInterval(() => {
        timeCount.textContent = time;
        time--;
        if (time < 9)
        {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0)
        {   
            let correctAns = quizData[que_count].correct;
            let options = option_list.querySelectorAll(".option");
            let allOptions = option_list.children.length;

            clearInterval(Timecounter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off";
            
            for(let i = 0; i < allOptions; i++) {
                // console.log(option_list.children[i]);
                // console.log(correctAns);
                 if(i == correctAns)
                 {
                     option_list.children[i].setAttribute("class" ,"option correct");
                     options[i].insertAdjacentHTML("beforeend", tickIcon);
                 }
            }

             for(let i = 0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled");
            }
        }
    }, (1000));
}

function startTimerLine(time){
    const maxLineWidth = quiz_box.offsetWidth; // Get the container's width in pixels
    counterLine = setInterval(timer, 210);
    function timer(){
        time = time + 1;
        let newWidth = (time / 100) * maxLineWidth; // Calculate width as a percentage of container's width
        timeLine.style.width = newWidth + "px";
       
        if(newWidth > maxLineWidth - 30){
            clearInterval(counterLine);
        }
    }
          
}
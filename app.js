var signinbtn = document.getElementById("signinbtn");
var signupbtn = document.getElementById("signupbtn");
var namefield = document.getElementById("namefield");
var title = document.getElementById("title");

var arr = [];

function signup() {
    namefield.style.maxHeight = 0;
    title.innerHTML = "Sign In";
    signupbtn.classList.add("disab");
    signinbtn.classList.remove("disab");



    var getname = document.getElementById("sname");
    var getemail = document.getElementById("semail");
    var getpass = document.getElementById("spass");

    var checkemail = getemail.value;

    if (getname.value.trim().length == 0 || !checkemail.includes("@gmail.com")) {
        alert("Value not found");
    }

    var obj = {
        email: getemail.value,
        pass: getpass.value,
    }
    arr.push(obj);

    localStorage.setItem("Data", JSON.stringify(arr))
    localStorage.setItem("n", getname.value)

    getname.value  = "";
    getemail.value = "";
    getpass.value  = "";

}


function signin() {
    namefield.style.maxHeight = "60px";
    title.innerHTML = "Sign Up";
    signupbtn.classList.remove("disab");
    signinbtn.classList.add("disab");

    var getemails = document.getElementById("semail");
    var getpasse = document.getElementById("spass");

    var filters = arr.filter(function (data) {
        return data.email == getemails.value && data.pass == getpasse.value;
    })

    if (filters.length) {
        alert("login");
    }
    else {
        alert("Not login");
    }

    getemails.value = "";
    getpasse.value  = "";

    location.href = "index.html";

    var sec = 0;
    // function start() 
    // {

    // }
    // start()
}

var getUser = localStorage.getItem("Data");
if (getUser !== null) {
    arr = JSON.parse(getUser);
}














const quizSelector = document.getElementById("quiz-selector");
const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const answerButtonsContainer = document.getElementById("answer-button-container");
const resultContainer = document.getElementById("result-container");

class Quiz {
    constructor (questions) {
    this.questions = questions;
    this.currentQuestionIndex = 0;    
    this.score = 0;    
    this.displayQuestion();
    }

    displayQuestion() {
    answerButtonsContainer.innerHTML = "";    
    const currentQuestion = this.questions[this.currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;
    const answers = currentQuestion.answers;
    answers.forEach((answer) => {
        const button = document.createElement("button");
        button.classList = ["answer-button"];
        button.textContent = answer;
        button.addEventListener("click", this.checkAns.bind(this));
        answerButtonsContainer.appendChild(button)
    });
  }
  
  checkAns(e) {
    const selectAns = e.target.textContent;
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (selectAns === currentQuestion.correctAnswer) {
        this.score++
    }

    this.currentQuestionIndex++;

    if (this.currentQuestionIndex < this.questions.length) {
        this.displayQuestion();
    } else {
        this.showResult();
    }
  }

  showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    resultContainer.innerHTML = `<h2>Quiz Result</h2>
    <p>You Scored ${this.score} out of ${this.questions.length}  questions</p>
    <button id ="reload-quiz">Reload Quiz</button>`;

    document.getElementById("reload-quiz").addEventListener("click", () => {
        quizContainer.style.display = "none";
        resultContainer.style.display = "none";
        quizSelector.style.display = "flex";
    })
  }

}

const loadQuiz = (questions) => {
    const quiz = new Quiz(questions)
    quizContainer.style.display = "block";
    quizSelector.style.display = "none";
}

const loadALLQuiz  = async () => {
    const response = await fetch("./quiz.json");
    const quize = await response.json();

    quize.forEach((quiz, index) => {
    const quizCard = document.createElement("div");
    quizCard.classList = ["quiz-card"];
    quizCard.innerText = "Quiz " + (index + 1);
    quizCard.addEventListener("click", () => loadQuiz(quiz))
    quizSelector.appendChild(quizCard)

    var sec= 0
    var dispaly = document.getElementById("ti");
    if (sec === 20) 
    {
        dispaly.innerText = 0;
        sec = 0;
    }
    var count = setInterval(function () 
    {  
        sec++;
        dispaly.innerText = sec;
    
        if(sec >= 20)
        {
            clearInterval(count)
        }
    },1000)
   });
};

loadALLQuiz();
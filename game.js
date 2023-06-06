const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const nextBtn = document.getElementById("next-btn");
const endQuizBtn = document.getElementById("end-quiz");
const questionCounterD = document.getElementById("questionCounter");
const msgFeedback = document.getElementById("msgFeedback");
const scoreD = document.getElementById("score");

let currentQuestion = {};
let acceptquestion = false;
let staut = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript ?",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    numAnswer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script src='xxx.js'>",
    choice2: "<script href='xxx.js'>",
    choice3: "<script name='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    numAnswer: 1,
  },
  {
    question: " How do you write 'Hello World' in an alert box ?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    numAnswer: 4,
  },
  {
    question: "Why We Use <br> Element ?",
    choice1: "To Make Text Bold",
    choice2: "To Make Text Italic",
    choice3: "To Add Breakline",
    choice4: "To Create Horizontal Line",
    numAnswer: 3,
  },
  {
    question: "Is <img> Element Has Attribute href ?",
    choice1: "Yes",
    choice2: "No Its For Anchor Tag <a>",
    choice3: "All Elements Has This Attribute",
    choice4: "Answer 1 And 3 Is Right",
    numAnswer: 2,
  },
  {
    question: "How Can We Make Element Text Bold ?",
    choice1: "Putting It Inside <b> Tag",
    choice2: "All Answers Is Right",
    choice3: "Putting It Inside <strong> Tag",
    choice4: "Customizing It With Font-Weight Property InSS",
    numAnswer: 2,
  },
  {
    question: "What Is The Right Hierarchy For Creating Part Of Page ?",
    choice1: "<h2> Then <p> Then <h1> Then <p> Then <h3> Then p> Then<img>",
    choice2: "<h1> Then <p Then <h3> Then <p> Then <h2> Then <p> Then <img>",
    choice3: "<h2> Then <p> Then <h3> Then <p> Then <h1> Then <p> Then <img>",
    choice4: "All Solutions Is Wrong",
    numAnswer: 4,
  },
  {
    question: "How Can We Include External Page Inside Our HTML Page?",
    choice1: "By Using Include in HTML",
    choice2: "By Using Load In HTML",
    choice3: "By Using iFrame Tag",
    choice4: "All Solutions Is Wrong",
    numAnswer: 3,
  },
  {
    question: "What Is The Tag That Not Exists in HTML?",
    choice1: "<object>",
    choice2: "All Tags Is Exists in HTML",
    choice3: "<basefont>",
    choice4: "<abbr>",
    numAnswer: 2,
  },
  {
    question: "How We Specify Document Type Of HTML5 Page?",
    choice1: "<DOCTYPE html>",
    choice2: "<DOCTYPE html5>",
    choice3: "<!DOCTYPE html5>",
    choice4: "<!DOCTYPE html>",
    numAnswer: 4,
  },
  {
    question: "What Is The Element Thats Not Exists in HTML5 Semantics?",
    choice1: "<article>",
    choice2: "<section>",
    choice3: "<blockquote>",
    choice4: "<aside>",
    numAnswer: 3,
  },
  {
    question: "In HTML Can We Use This Way To Add Attributes?",
    choice1: "All Is Right",
    choice2: "<div class=class-name>",
    choice3: '<div class="class-name">',
    choice4: "<div class='class-name'>",
    numAnswer: 1,
  },
];

const correctAnswer = 10;
const incorrectAnswer = 5;
const maxQuestions = 5;

/*---------------------Start Game---------------- */

function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
}
/*---------------------Get New Question---------------- */

function getNewQuestion() {
  if (availableQuestions.lenthg === 0 || questionCounter >= maxQuestions) {
    endQuiz();
  }

  nextBtn.classList.remove("active");

  questionCounter++;
  // get data : "Question Counter"
  questionCounterD.innerText = ` ${questionCounter}/${maxQuestions}`;

  //get question
  const index = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[index];
  question.innerText = currentQuestion.question;

  //get answers
  for (let i = 0; i < choices.length; i++) {
    const number = choices[i].dataset["number"];
    choices[i].innerText = currentQuestion["choice" + number];
  }
  acceptquestion = false;
  staut = false;
  availableQuestions.splice(index, 1);
}

/*---------------------Select Answer---------------- */
let selectedChoice = document.querySelector(".choice-text");
let classFeedback;

for (let i = 0; i < choices.length; i++) {
  choices[i].addEventListener("click", function (e) {
    if (acceptquestion == true) return;
    staut = true;
    acceptquestion = true;

    nextBtn.classList.add("active");
    selectedChoice = e.target;
    const numSelectedChoice = selectedChoice.dataset["number"];

    /*------------ Feedback ------------ */
    classFeedback =
      numSelectedChoice == currentQuestion.numAnswer ? "true" : "false";
    // Score and Comment
    if (classFeedback == "true") {
      incrementScore(correctAnswer);
      msgFeedback.innerHTML = ` Bravo your answer is correct (+10), 🥳 
      <style> 
        #msgFeedback{
          padding: 1rem
        };
      </style>
      `;
    } else {
      decrementScore(incorrectAnswer);
      msgFeedback.innerHTML = `  Ooops your answer is incorrect(-5),😭 
      <style> 
        #msgFeedback{
          padding: 1rem
        };
      </style>
      `;
    }

    selectedChoice.parentElement.classList.add(classFeedback);
  });
}

/*---------------------Next Question---------------- */
nextBtn.addEventListener("click", function () {
  if (staut) {
    getNewQuestion();
    selectedChoice.parentElement.classList.remove(classFeedback);
    msgFeedback.innerHTML = "";
  }
  if (maxQuestions == questionCounter) {
    nextBtn.remove();
  }
});

/*---------------------increment and decrement Score---------------- */

function incrementScore(incrNum) {
  score += incrNum;
  scoreD.innerText = score;
}
function decrementScore(decrNum) {
  score -= decrNum;
  scoreD.innerText = score;
}

/*---------------------End Quiz---------------- */

function endQuiz() {
  localStorage.setItem("score", score);
  return window.location.assign("./endGame.html");
}

startGame();
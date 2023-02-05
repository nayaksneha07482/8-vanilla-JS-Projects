const datas = [
    {
        id: 1,
        question: `What is 2 + Undefined?`,
        choices: [
        `Null`,
        `NaN`,
        `When Javascript adds undefined is ignored result is 2`,
        `2undefined`,
        ],
        answer: `NaN`,
    },
    {
        id: 2,
        question: `How do you write "Hello World" in an alert box?`,
        choices: [
        `msgBox("Hello World")`,
        `msg("Hello World")`,
        `alertBox("Hello World")`,
        `alert("Hello World")`,
        ],
        answer: `alert("Hello World")`,
    },
    {
        id: 3,
        question: `How can you add a comment in a JavaScript?`,
        choices: [
        `'This is comment`,
        `// This is comment`,
        `<- This is comment ->`,
        `\\ This is comment`,
        ],
        answer: `// This is comment`,
    },
    {
        id: 4,
        question: `What is the correct way to write a JavaScript array?`,
        choices: [
        `let colors = (1:"red", 2:"green", 3:"blue")`,
        `let colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")`,
        `let colors = "red", "green", "blue"`,
        `let colors = ["red", "green", "blue"]`,
        ],
        answer: `let colors = ["red", "green", "blue"]`,
    },
    {
        id: 5,
        question: `How do you find the number with the highest value of x and y?`,
        choices: [`Math.max(x, y)`, `Math.ceil(x, y)`, `ceil(x, y)`, `top(x, y)`],
        answer: `Math.max(x, y)`,
    },
  ];
    const shuffledQuizData = datas.sort(() => 0.5 - Math.random());
  
    const progressEl = document.getElementById("progress");
    const answerContEl = document.getElementById("answerCont");
    const questionEl = document.getElementById("question");
    const nextBtnEl = document.getElementById("nextBtn");
    const quizContainerEl = document.getElementById("quizContainer");
  
    let quizCount = 0;
    let result = 0;
    let isAnswerSelected = false;
  
  // Counting El
  
    let circleCount = 0;
    let answerElCount = 0;
  
  // Disabling button when no choice is selected
  
    nextBtnEl.disabled = true;
  
  // Create Progress
  
function createProgress() {
    const circleEl = document.createElement("div");
    circleEl.className = `circle circle${++circleCount}`;
    const circlePara = document.createElement("p");
    circlePara.innerHTML = circleCount;
    circleEl.appendChild(circlePara);
    progressEl.appendChild(circleEl);
}
  
    datas.forEach((data) => {
    createProgress();
});

// Create Quiz

function createQuizChoices(data) {
    const answerEl = document.createElement("div");
    const attr = document.createAttribute("data-value");
    attr.value = data;
    answerEl.setAttributeNode(attr);
    answerEl.className = `answer answer${++answerElCount}`;
    const answerPara = document.createElement("p");
    answerPara.innerHTML = data;
    answerEl.appendChild(answerPara);
    answerContEl.appendChild(answerEl);
  
    // Event Listener
    answerEl.addEventListener("click", (e) => {
      if (!isAnswerSelected) {
        let allAnswerEl = answerContEl.querySelectorAll(`.answer`);
        checkAnswer(answerEl, allAnswerEl);
        isAnswerSelected = true;
        nextBtnEl.disabled = false;
        if (quizCount === shuffledQuizData.length - 1) {
          nextBtnEl.innerHTML = `Show Result`;
        }
      }
    });
  }
  
  function createQuiz() {
    let currentQuiz = shuffledQuizData[quizCount];
    questionEl.innerHTML = currentQuiz.question;
  
    answerContEl.innerHTML = ``;
  
    currentQuiz.choices
      .sort(() => 0.5 - Math.random())
      .forEach((choice) => {
        createQuizChoices(choice);
      });
  }
  
  createQuiz();
  
  function checkAnswer(selectedAnswerEl, allAnswerEl) {
    let currentProgress = [...progressEl.querySelectorAll(".circle")];
  
    let currentQuizAnswer = shuffledQuizData[quizCount].answer;
    let selectedAnswer = selectedAnswerEl.dataset.value;
    if (selectedAnswer === currentQuizAnswer) {
      selectedAnswerEl.classList.add("correct");
      selectedAnswerEl.prepend(createCorrectIcon());
      currentProgress[quizCount].classList.add("correct");
      ++result;
    } else if (selectedAnswer !== currentQuizAnswer) {
      selectedAnswerEl.classList.add("wrong");
      selectedAnswerEl.prepend(createWrongIcon());
      currentProgress[quizCount].classList.add("wrong");
      allAnswerEl.forEach((ans) => {
        if (ans.dataset.value === currentQuizAnswer) {
          ans.classList.add("correct");
          ans.prepend(createCorrectIcon());
        }
      });
    }
  }
  
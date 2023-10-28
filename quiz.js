 const questions =[
    {
        question:"Which is the largest tower in the world",
        answers:[
            { text:"Eiffel", correct: false },
            { text:"Burj-Khalifa", correct: true },
            { text:"Qutub Minar", correct: false },
            { text:"Shanghai Tower", correct: false },
        ]
    },
    {
        question:"Which is the largest Sea in the world",
        answers:[
            { text:"Pacific Ocean", correct: true },
            { text:"South Pacific Sea", correct: false },
            { text:"Indian Ocean", correct: false },
            { text:" Mediterranean Sea	", correct: false },
        ]
    },
    {
        question:"Which is the largest country in the world",
        answers:[
            { text:"Brazil", correct: false },
            { text:"China", correct: false },
            { text:"Russia", correct: true },
            { text:"India", correct: false },
        ]
    },
    {
        question:"Which is the largest City in the world",
        answers:[
            { text:"Moscow", correct: false },
            { text:"New York", correct: false },
            { text:"Dubai", correct: false },
            { text:"Tokyo", correct: true },
        ]
    }
    
 ];

 const questionElement = document.getElementById("question");
 const answerButton = document.getElementById("answer-buttons"); 
 const nextButton = document.getElementById("next-btn");

 let currentQuestionIndex = 0;
 let score = 0;

 function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
 }
 
 function showQuestion(){
            resetState();
            let currentQuestion = questions[currentQuestionIndex];
            let questionNo = currentQuestionIndex + 1;
            questionElement.innerHTML = questionNo + "." + currentQuestion.question;

            currentQuestion.answers.forEach(answer =>{
                const button = document.createElement("button");
                button.innerHTML = answer.text;
                button.classList.add("btn");
                answerButton.appendChild(button);
                if(answer.correct){
                    button.dataset.correct = answer.correct;//true/false
                }
                button.addEventListener("click", selectAnswer);
            });
 }

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    } 
}
function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}
  
function  showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",() =>{
    if(currentQuestionIndex < questions.length){
             handleNextButton();
    }else{
        startQuiz();
    }
});


 startQuiz()
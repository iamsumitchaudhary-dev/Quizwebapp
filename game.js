const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questioncountereText=document.getElementById("questioncounter");
const scoretext=document.getElementById("score");

let currentQuestion ={};
let acceptingAnswers = true;
let score = 0;
let questioncounter =0;
let availablequestions=[];

let questions = [
    {
        question:"How do you initialize an array in C?",
        choice1:"<int arr[3] = (1,2,3);>",
        choice2:"<int arr(3) = {1,2,3};>",
        choice3:"<int arr[3] = {1,2,3};>",
        choice4:"<int arr(3) = (1,2,3);>",
        answer: 3
    },
    {
        question:"How do you instantiate an array in Java?",
        choice1:"<int arr[] = new int(3);>",
        choice2:"< int arr[];>",
        choice3:"<int arr[] = new int[3];>",
        choice4:"<int arr() = new int(3);>",
        answer: 3
    },
    {
        question:"Which of the following is the correct way to declare a multidimensional array in Java?",
        choice1:"<int[] arr;>",
        choice2:"<int arr[[]];>",
        choice3:"<int[][]arr;>",
        choice4:"<int[[]] arr;>",
        answer: 3
    },
    {
        question:"When does the Array Index Out Of Bounds Exception occur?",
        choice1:"<Compile-time>",
        choice2:"<Run-time>",
        choice3:"<Not an error>",
        choice4:"<Not an exception at all>",
        answer: 2
    },
    {
        question:"Which of the following concepts make extensive use of arrays?",
        choice1:"<Binary trees>",
        choice2:"<Scheduling of processes>",
        choice3:"<Caching>",
        choice4:"<Spatial locality>",
        answer: 4
    }
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questioncounter = 0;
    score = 0;
    availablequestions = [...questions];
    console.log(availablequestions);
    getNewQuestion();
};

getNewQuestion = () => {
    if (availablequestions.length == 0 || questioncounter >=MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore",score);
        return window.location.assign("end.html");
    }
    questioncounter++;
    questioncountereText.innerText = questioncounter + "/" + MAX_QUESTIONS;

    const questionIndex = Math.floor(Math.random() * availablequestions.length);
    currentQuestion = availablequestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availablequestions.splice(questionIndex,1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click",e => {

        if (!acceptingAnswers) return;
        acceptingAnswers=false;
        const selectedChoice= e.target;
        const selectedAnswer=selectedChoice.dataset["number"];

        const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply == "correct") {
            incrementScore(CORRECT_BONUS);
        }
            
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },   1000);     
    });
});
incrementScore = num => {
    score += num;
    scoretext.innerText=score;
};
startGame();
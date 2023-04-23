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
        question:"In the layer hierarchy as the data packet moves from the upper to the lower layers, headers are ___________",
        choice1:"Added",
        choice2:"Removed",
        choice3:"Rearranged",
        choice4:"Modified",
        answer: 1
    },
    {
        question:"The structure or format of data is called ___________",
        choice1:"Syntax",
        choice2:" Semantics",
        choice3:"Struct",
        choice4:"Formatting",
        answer: 1
    },
    {
        question:"Communication between a computer and a keyboard involves ______________ transmission.",
        choice1:"Automatic",
        choice2:"Half-duplex",
        choice3:"Full-duplex",
        choice4:"Simplex",
        answer: 4
    },
    {
        question:"A _______ is the physical path over which a message travels.?",
        choice1:"Path",
        choice2:"Medium",
        choice3:"Protocol",
        choice4:"Route",
        answer: 2
    },
    {
        question:"Which of this is not a network edge device?",
        choice1:"PC",
        choice2:"Smartphones",
        choice3:"Servers",
        choice4:"Switches",
        answer: 4
    },
    {
        question:"A _________ set of rules that governs data communication.",
        choice1:"Protocols",
        choice2:"Standars",
        choice3:"RFCs",
        choice4:"Servers",
        answer: 1
    },
    {
        question:"Which of the following computer networks is built on the top of another network?",
        choice1:"prior network",
        choice2:"chief network",
        choice3:"prime network",
        choice4:"overlay network",
        answer: 4
    },
    {
        question:"Communication channel is shared by all the machines on the network in ________",
        choice1:"broadcast network",
        choice2:"unicast network",
        choice3:"multicast network",
        choice4:"anycast network",
        answer: 1
    },
    {
        question:"Bluetooth is an example of __________",
        choice1:"personal area network",
        choice2:"local area network",
        choice3:"virtual private network",
        choice4:"wide area network",
        answer: 1
    },
    {
        question:"A __________ is a device that forwards packets between networks by processing the routing information included in the packet.",
        choice1:"bridge",
        choice2:"firewall",
        choice3:"router",
        choice4:"hub",
        answer: 3
    }
];

const CORRECT_BONUS = 2;
const MAX_QUESTIONS = 10;

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
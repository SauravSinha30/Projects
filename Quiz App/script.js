const question=[
    {
        question:'Which is largest animal in the world?',
        answers:[
            {text:'Shark',correct:false},
            {text:'Blue Whale',correct:true},
            {text:'Elephant',correct:false},
            {text:'Giraaffe',correct:false},
        ]

    },{
        question:'Which is smallest continent in the world?',
        answers:[
            {text:'Asia',correct:false},
            {text:'Austraila',correct:true},
            {text:'Arctic',correct:false},
            {text:'Africa',correct:false},
        ]
    },{
        question:'Which is largest desert in the world?',
        answers:[
            {text:'kalahari',correct:false},
            {text:'Gobi',correct:false},
            {text:'Sahara',correct:false},
            {text:'Antarctica',correct:true},
        ]
    },{
        question:'Which is smallest country in the world?',
        answers:[
            {text:'Vatican city',correct:true},
            {text:'bhutan',correct:false},
            {text:'Nepal',correct:false},
            {text:'Sri Lanka',correct:false},
        ]
    },{
        question:'Which is largest ocean in the world?',
        answers:[
            {text:'Indian ocean',correct:false},
            {text:'Artic ocean',correct:false},
            {text:'Southern Ocean',correct:false},
            {text:'Pacific ocean',correct:true},
        ]
    }
];

const questionElement=document.getElementById('question');
const answerButtons=document.getElementById('answer-buttons');
const nextButton=document.getElementById('next-btn');

let currnetQuestionIndex=0;
let score=0;
function startQuiz(){
    currnetQuestionIndex=0;
    score=0;
    nextButton.innerHTML='Next';
    showQuestion();
};
  
function showQuestion(){
    resetState();
    let currentQuestion=question[currnetQuestionIndex];
    let questionNo=currnetQuestionIndex+1;
    questionElement.innerHTML=questionNo+ '.'+currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button=document.createElement('button');
        button.innerHTML=answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
};

function resetState(){
    nextButton.style.display='no';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    };
};
function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==='true';
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }else{
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct==='true'){
            button.classList.add('correct');
        }
        button.disabled=true;
    });
    nextButton.style.display='block';
};

function showScore(){
    resetState();
    questionElement.innerHTML=`you Scored ${score} out of ${question.length}!`;
    nextButton.innerHTML='Play Again';
    nextButton.style.display='block';
}

function handleNextButton(){
    currnetQuestionIndex++;
    if(currnetQuestionIndex < question.length){
        showQuestion();
    }else{
        showScore();
    }
};

nextButton.addEventListener('click',()=>{
    if(currnetQuestionIndex < question.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz(); 
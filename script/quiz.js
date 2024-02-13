import questions from "./data.js"
const options = document.querySelectorAll(".options")
const btn = document.querySelector("#btnCheck")
const question = document.querySelector("#question")
const result = document.querySelector("#result")
const score = document.querySelector(".score")
const progressElement = document.querySelector(".progress")
let percentProgress = 0;
let user = document.querySelector('#user');
let indexQuestion = 0;
let correct = 'correct'
let incorrect = 'incorrect'
let active = 'active'
let name = localStorage.getItem("name")


function username (){
if (name ) user.textContent = `Jogador(a): ${name}`
else {
    name = prompt("Digite seu nome")
    user.textContent = `Jogador(a): ${name}`
    localStorage.setItem("name" , name)
}
}
username()

function gameProgress(progress) {
    if (progress >0 ){
        percentProgress += progress
        progressElement.style.width = percentProgress +"%"

    }else {
        percentProgress = progress
        progressElement.style.width = percentProgress +"%"
    }
}



function showResult(text, classElement) {
    result.classList.add(classElement);
    result.textContent = text
}

function checkAnswer(value, element) {
    let response = value == questions[indexQuestion].answer;
    if (response) {
        if (indexQuestion == questions.length - 1) {
            score.textContent = `${questions.length}/${questions.length}`;
            element.classList.add(correct);
            showResult('Fim você ganhou');
            indexQuestion = 0;
            startCounter()
            gameProgress(20)
            setTimeout(() => {
                showResult('');
                element.classList.remove(correct);
                user.textContent = '';
                questionList()
            }, 4000)
        } else {
            element.classList.add(correct);
            setTimeout(() => {
                gameProgress(20)
                ++indexQuestion;
                element.classList.remove(correct)
                questionList()
            }, 1000)
        }
    } else {
        element.classList.add(incorrect);
        setTimeout(() => {
            gameProgress(0)
            indexQuestion = 0;
            element.classList.remove(incorrect);
            questionList();
        }, 1000)
    }
}

function checkSelection() {
    let found = false;
    for (let i = 0; i < options.length; i++) {
        let contains = options[i].classList.contains(active);
        if (contains) {
            checkAnswer(options[i].getAttribute('value'), options[i])
            found = true;
            break;
        }
    }
    if (!found) showResult('Selecione uma questão primeiro', 'alert')
}

btn.addEventListener('click', checkSelection);

document.body.addEventListener("keydown" , (event)=> {
    if (event.key == "Enter"){
        checkSelection()
    }
})  

function select() {
    let contains = this.classList.contains('active')
    options.forEach((element) => {
        element.classList.remove(active)
    })
    if (!contains) {
        this.classList.add(active)
        result.classList.remove('alert')
        showResult('')
    }
}

options.forEach((item) => item.addEventListener("click", select))

let shuffleArray = array => array.sort((a, b) => Math.random() - 0.5)
function questionList() {
    let arrayIndex = [0, 1, 2, 3];
    shuffleArray(arrayIndex);

    if (indexQuestion === 0) {
        shuffleArray(questions);
        percentProgress = 0;
        gameProgress(0)
    }
    score.textContent = `${indexQuestion}/${questions.length}`
    question.textContent = questions[indexQuestion].question
    options.forEach((item, i) => {
        item.textContent = questions[indexQuestion].options[arrayIndex[i]];
        item.setAttribute('value', `${arrayIndex[i]}`);
        item.classList.remove(active)
    })
}
questionList()

function startCounter() {
    let contador = 3;

    function updateCounter() {
        user.textContent = `Reiniciando quiz em ${contador}`;
        contador--;
        if (contador >= 0) {
            setTimeout(updateCounter, 1000);
        } else {
            console.log("Contagem regressiva concluída!");
        }
    }
    updateCounter();
}



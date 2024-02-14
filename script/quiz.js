import questions from "./data.js"
const options = document.querySelectorAll(".options")
const btn = document.querySelector(".btnCheck")
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
let processing = false;


function username() {
    if (name) user.textContent = `Jogador(a): ${name}`
    else {
        name = prompt("Digite seu nome")
        user.textContent = `Jogador(a): ${name}`
        localStorage.setItem("name", name)
    }
}
setTimeout(username, 100)

function gameProgress(progress) {
    if (progress > 0) {
        percentProgress += progress
    } else {
        percentProgress = progress
    }
    progressElement.style.width = percentProgress + "%"
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
            showResult('Fim você ganhou', correct);
            indexQuestion = 0;
            gameProgress(20)
            startCounter()
            setTimeout(() => {
                showResult('');
                result.classList.remove(correct)
                element.classList.remove(correct);
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
    btn.disabled = true
    let found = false;
    for (let i = 0; i < options.length; i++) {
        let contains = options[i].classList.contains(active);
        if (contains) {
            checkAnswer(options[i].getAttribute('value'), options[i])

            found = true;
            break;
        }
    }
    if (!found) {
        showResult('Selecione uma alternativa primeiro', 'alert')
        btn.disabled = false
    }

}

btn.addEventListener('click', checkSelection);

document.body.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && window.innerWidth > 600 && btn.disabled === false) {
        checkSelection()
    }
})


function select() {
    let contains = this.classList.contains(active)
    options.forEach((element) => element.classList.remove(active))
    if (!contains) {
        this.classList.add(active)
        btn.classList.add('teste')
    } else if (contains && window.innerWidth < 600) {
        this.classList.add(active)
        btn.classList.add('teste')
    } else {
        btn.classList.remove('teste')
    }
    showResult('')
    result.classList.remove('alert')
}

options.forEach((item) => item.addEventListener("click", select))

let shuffleArray = array => array.sort(() => Math.random() - 0.5)

function questionList() {
    let arrayIndex = [0, 1, 2, 3];
    btn.disabled = false
    btn.classList.remove('teste')
    shuffleArray(arrayIndex);

    if (indexQuestion === 0) {
        shuffleArray(questions);
        percentProgress = 0;
        gameProgress(0)
        showResult('')
    }
    score.textContent = `${indexQuestion}/${questions.length}`
    question.classList.add('hide');
    setTimeout(() => {
        question.textContent = questions[indexQuestion].question
        question.classList.remove('hide');
    }, 100);
    options.forEach((item, i) => {
        item.style.display = ""
        item.textContent = questions[indexQuestion].options[arrayIndex[i]];
        item.setAttribute('value', `${arrayIndex[i]}`);
        item.classList.remove(active)
    })
}
questionList()

function startCounter() {
    let contador = 3;
    function updateCounter() {
        showResult(`Reiniciando quiz em ${contador}`);
        score.textContent = `${contador}/${questions.length}`

        contador--;
        if (contador >= 0) {
            setTimeout(updateCounter, 1000);
        }
    }
    updateCounter();
}

let clear = document.querySelector("#clear")

clear.addEventListener("click", function () {
    for (let i = 0; i < 2; i++) {
        let aux = options[i].getAttribute('value') != questions[indexQuestion].answer
        console.log(aux)
        if (aux) {
            options[i].style.display = "none"
            break
        }
    }
})


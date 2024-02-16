import questions from "./data.js"
const options = document.querySelectorAll(".options")
const btn = document.querySelector(".btnCheck")
const question = document.querySelector("#question")
const result = document.querySelector("#result")
const score = document.querySelector(".score")
const progressElement = document.querySelector(".progress")
const correct = 'correct'
const incorrect = 'incorrect'
const active = 'active'
const btnEnabled = 'btnEnabled'
const title = document.querySelector('#title');
const user = document.querySelector('#user');
let img = document.querySelector('.victory img')
let percentProgress = 0;
let indexQuestion = 0;
let name = localStorage.getItem("name");
let btnDeleteAlternative = document.querySelector("#btnClean")
let btnRestart = document.querySelector('#restart');
let option = document.querySelector('#option')

function username() {
    if (name) user.textContent = `Jogador(a): ${name}`
    else {
        name = prompt("Digite o seu nome")
        while (name == false || name == null) {
            name = prompt("Inválido! Digite o seu nome")

        }
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

function restart() {
    startCounter()
    btnDisabled(true, btnRestart)
    setTimeout(() => {
        showResult('');
        img.style.display = 'none';
        img.classList.remove('teste')
        questionList()
    }, 3000)
}
btnRestart.addEventListener('click', restart)

function endgame(display1, display2, msgTitle) {
    img.style.display = display1
    btnRestart.style.display = display1
    btn.style.display = display2
    btnDeleteAlternative.style.display = display2
    option.style.display = display2
    question.style.display = display2
    title.textContent = msgTitle
}

function checkAnswer(value, element) {
    let response = value == questions[indexQuestion].answer;
    if (response) {
        if (indexQuestion == questions.length - 1) {
            element.classList.add(correct);
            indexQuestion = 0;
            gameProgress(20)
            setTimeout(() => {
                img.classList.add('teste')
                endgame('inline-block', 'none', '   você ganhou!')
                element.classList.remove(correct);
            }, 1000);

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
    btnDisabled(true, btn)
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
        btnDisabled(false, btn)
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
        btn.classList.add(btnEnabled)
    } else if (contains && window.innerWidth < 600) {
        this.classList.add(active)
        btn.classList.add(btnEnabled)
    } else {
        btn.classList.remove(btnEnabled)
    }
    showResult('')
    result.classList.remove('alert')
}

options.forEach(item => item.addEventListener("click", select))

let shuffleArray = array => array.sort(() => Math.random() - 0.5)

function questionList() {
    let arrayIndex = [0, 1, 2, 3];
    shuffleArray(arrayIndex);
    btnDisabled(false, btnRestart, btn)
    btn.classList.remove(btnEnabled, 'solo')

    if (indexQuestion === 0) {
        shuffleArray(questions);
        gameProgress(0)
        showResult('')
        endgame('none', 'inline-block', 'quiz')
        img.classList.remove('teste')
    }
    question.classList.add('hide');
    setTimeout(() => {
        question.textContent = `${indexQuestion + 1}. ${questions[indexQuestion].question}`
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
        contador--;
        if (contador >= 0) setTimeout(updateCounter, 1000);
        else showResult('')
    }
    updateCounter();

}

btnDeleteAlternative.addEventListener("click", () => {
    let numbers = [0, 1, 2, 3];
    shuffleArray(numbers);
    for (let i = 0; i < 2; i++) {
        let aux = options[numbers[i]].getAttribute('value') != questions[indexQuestion].answer
        if (aux) {
            options[numbers[i]].style.display = "none"
            btnDeleteAlternative.style.display = 'none'
            btn.classList.add('solo')
            break
        }
    }
})

function btnDisabled(boolean, ...nums) {
    nums.forEach(button => button.disabled = boolean)
}



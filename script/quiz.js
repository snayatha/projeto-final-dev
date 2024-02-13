import questions from "./data.js" 
const options = document.querySelectorAll(".options")
const btn = document.querySelector("#btnCheck")
const question = document.querySelector("#question")
const result = document.querySelector("#result")
const score = document.querySelector(".score")
const progressElement = document.querySelector(".progress")
let percentProgress = 0;
let indexQuestion = 0;

function select (e){
    options.forEach((element) => {
element.classList.remove("active")
    })
    this.classList.add("active")
}

options.forEach ((item) => {
    item.addEventListener("click",select)
})

function questionList (){
    question.textContent = questions[indexQuestion].question
    options.forEach((item,index) => {
item.textContent = questions[indexQuestion].options[index]
    })
}
questionList()

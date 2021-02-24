// jshint esversion:9

const nextBtn = document.querySelector("#next-button");
const homeLink = document.querySelector("#home-link");
const time = document.querySelector("#final-time");
const score = document.querySelector("#final-score");
const correctAnswers = document.querySelector("#correct-answers");
const wrongAnswers = document.querySelector("#wrong-answers");
const username = document.querySelector("#name");


// /end-game "next" button
nextBtn.addEventListener("click", () => {
  homeLink.click();
});


// end-game user data
username.innerText = localStorage.getItem("trivia-username");
score.innerText = localStorage.getItem("triviaScore");
time.innerText = localStorage.getItem("triviaTime") + " sec";
correctAnswers.innerText = localStorage.getItem("triviaSuccesses");
wrongAnswers.innerText = localStorage.getItem("triviaFailures");

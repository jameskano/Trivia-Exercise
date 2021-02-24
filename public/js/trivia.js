// jshint esversion:9

const question = document.querySelectorAll(".question h2");
const answers = document.querySelector(".answers");
const answersText = document.querySelectorAll(".answer p");
const reloadHome = document.querySelector("#reload-home");
const answerMain = document.querySelectorAll(".answer-main");
const nextBtn = document.querySelector("#next-button");
const questionNum = document.querySelector(".question-num");
const questionNumSum = document.querySelector(".question-num small");
const endGame = document.querySelector(".end-game-form button");
const correctAnswer = document.querySelectorAll(".hit");
const username = document.querySelector("#username");
const score = document.querySelector("#score");
const time = document.querySelector("#time");


// Reset localStorage succeses and failures
localStorage.setItem("triviaSuccesses", 0);
localStorage.setItem("triviaFailures", 0);


// Initial time
let initialTime = Date.now();


// Random answers position
for(let i = answers.children.length; i >= 0; i--) {
  answers.appendChild(answers.children[Math.random() * i | 0]);
}


// Correct html format
function escapeHtml(text) {
  return text
      .replace(/&#039;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&shy;/g, "-")
      .replace(/&rdquo;/g, "'")
      .replace(/&ldquo;/g, "'")
      .replace(/&Uuml;/g, "ü")
      .replace(/&amp;/g, "&")
      .replace(/&rsquo;/g, "'")
      .replace(/&auml;/g, "ä")
      .replace(/&ouml;/g, "ö")
      .replace(/&eacute;/g, "é");
}

question.forEach(q => {
  q.innerText = escapeHtml(q.innerText);
});

answersText.forEach(answer => {
  answer.innerText = escapeHtml(answer.innerText);
});


// Prevent resubmit when reload
if ( window.history.replaceState ) {
  window.history.replaceState( null, null, window.location.href );
}


// Flip card
let clicked = true;
let successSum = 0;
let failureSum = 0;
answerMain.forEach(aMain => {
  aMain.addEventListener("click", e => {
    if(clicked) {
      aMain.classList.add("animation");

      nextBtn.classList.add("show");

      clicked = false;

    // Add successes and failures to localStorage
      if(e.target.classList.contains("hit")) {
        successSum++;
      }
      if(!e.target.classList.contains("hit")) {
        failureSum++;
      }

      localStorage.setItem("triviaSuccesses", successSum);
      localStorage.setItem("triviaFailures", failureSum);
    }
  });
});


// Next question
nextBtn.addEventListener("click", e => {
  if(parseInt(questionNumSum.innerText) < 20) {
    nextBtn.classList.remove("show");
    answerMain.forEach(aMain => aMain.classList.remove("animation"));

    // Random answers position
    for(let i = answers.children.length; i >= 0; i--) {
      answers.appendChild(answers.children[Math.random() * i | 0]);
    }

    // Hide previous question and asnwers
    question.forEach(q => q.style.display = "none");
    answersText.forEach(answer => answer.style.display = "none");

    // Show next question and asnwers
    question[parseInt(questionNumSum.innerText)].style.display = "block";
    answersText[parseInt(questionNumSum.innerText)].style.display = "block";
    answersText[parseInt(questionNumSum.innerText) + 20].style.display = "block";
    answersText[parseInt(questionNumSum.innerText) + 40].style.display = "block";
    answersText[parseInt(questionNumSum.innerText) + 60].style.display = "block";

    questionNumSum.innerText = parseInt(questionNumSum.innerText) + 1;
  }
  else {
    let endTime = Date.now();
    username.value = localStorage.getItem("trivia-username");
    score.value = (successSum * 100) - (failureSum * 50);
    localStorage.setItem("triviaScore", score.value);
    time.value = ((endTime - initialTime) / 1000).toFixed(0);
    localStorage.setItem("triviaTime", time.value);
    console.log(time.value);
    console.log(username.value);
    console.log(score.value);
    endGame.click();
  }

  clicked = true;
});

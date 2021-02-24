// jshint esversion:9

const name = document.querySelector("#name");
const error = document.querySelector("small");
const startBtn = document.querySelector("#start");


// Name requirements
function inputLength() {
  if(name.value.length > 15) {
    error.innerText = "Name must be less than 15 characters";
    error.classList.add("failure");
  }
  else {
    error.innerText = "";
    error.classList.remove("failure");
  }
}

function inputRequired() {
  if(name.value.trim() === "") {
    error.innerText = "Enter your name";
    error.classList.add("failure");
  }
  else {
    error.innerText = "";
    error.classList.remove("failure");
  }
}


// Submit name and category and start the trivia
startBtn.addEventListener("click", e => {
  inputLength();
  inputRequired();

  if(error.classList.contains("failure")) {
    e.preventDefault();
  }

  // Save name in localStorage
  localStorage.setItem("trivia-username", name.value);
});

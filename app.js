// jshint esversion:9

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const Trivia = require("trivia-api");
const trivia = new Trivia();

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.set("view engine", "ejs");


// mongoose.connect("mongodb://localhost:27017/ejercicio2", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
mongoose.connect("mongodb+srv://admin-jaime:pass-jaime@cluster0.s7e1n.mongodb.net/ejercicio-trivia?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const scoreSchema = new mongoose.Schema({
  name: String,
  score: Number,
  time: Number
});

const Score = mongoose.model("Score", scoreSchema);


app.get('/favicon.ico', function(req, res) { res.status(204); });

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/score", function(req, res) {
  Score.find(function(err, results) {
    if(!err) {
      res.render("score", {
        data: results
      });
    }
    else {
      console.log(err);
    }
  });
});

app.get("/end-game", function(req, res) {
  res.render("end-game");
});

// app.get("/trivia", function(req, res) {
//   res.render("trivia");
// });

app.post("/", function(req, res) {
  let categorySelected = req.body.category;
  let options = {
    amount: 20,
    type: "multiple",
    category: parseInt(categorySelected)
  };

  trivia.getQuestions(options)
  .then(questions => {
    console.log(questions.results);
    res.render("trivia", {data: questions.results});
  })
  .catch(console.error);
});

app.post("/trivia", function(req, res) {
  let username = req.body.username;
  let score = req.body.score;
  let time = req.body.time;

  const newScore = new Score({
    name: username,
    score: score,
    time: time
  });

  newScore.save();

  res.redirect("/end-game");
});


let port = process.env.PORT || 3000;
app.listen(port);

// app.listen(3000, function() {
//   console.log("Server is running on port 3000");
// });

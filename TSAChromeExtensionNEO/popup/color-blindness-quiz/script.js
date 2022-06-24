var images = {
  "eight"  : "8.png",
  "six"    : "6.png", 
  "fifteen"  : "15.png",
  "twentysix"    : "26.png",
  "seventyfour"  : "74.png",
  "fourtyfive"  : "45.png",
  "twentynine"    : "29.png",
  "nine"  : "9.png",
  "fourtytwo"  : "42.png",
  "five"  : "5.png",
    "thirtyfive":"35.png",
    "three":"3.png",
    "two":"2.png",
    "fifteen":"15.png",
    "fiftythree":"53.png",
    "thirtytwo":"32.png",
    "ninetyfive":"95.png"
}  

function populate() {
  if (quiz.isEnded()) {
    showScores();
  } 
  else {
    // show question
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().text;

    // show options
    var choices = quiz.getQuestionIndex().choices;
    for (var i = 0; i < choices.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = images[choices[i]]? '<img src="'+images[choices[i]]+'"/>':choices[i];
      guess("btn" + i, choices[i]);
    }

    showProgress();
  }
};

function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function() {
    quiz.guess(guess);
    populate();
  }
};

function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var dict = {}
    n = quiz.score
    d = quiz.deuteranscore
    p = quiz.protanscore
    r = quiz.rgdefscore
    t = quiz.tritscore
    dict[n] = "normal vision"
    dict[d] = "deuteranopia or deuteranomaly";
    dict[p] = "protanopia or protanomaly";
    dict[r] = "red-green deficiency";
    dict[t] = "tritanopia or tritanomaly";
    
    var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> The number of questions you answered correctly: " + quiz.score + ". You may have " + dict[Math.max(d,p,r,n,t)] + "</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
};

// create questions
// var questions = [
//   new Question("Which one is an eight?", ["eight", "six", "fifteen", "twentysix"], "eight"),
//   new Question("Select the six from the pictures below.", ["fifteen", "seventyfour", "six", "eight"], "six"),
//   new Question("Which one says twenty-nine?", ["five", "nine", "twentynine",  "fourtyfive"], "twentynine"),
//   new Question("Find the picture that says fourty-five.", ["six", "fourtyfive", "nine", "fifteen"], "fourtyfive"),
//   new Question("Choose the picture that displays a nine.", ["nine", "seventyfour", "twentysix", "eight"], "nine")
// ];
var questions = [
  new Question("Which one is a 3?", ["fiftythree","three", "thirtyfive", "eight","twentysix"], "three","","thirtyfive","eight","fiftythree"),
 new Question("Which one is a 2?", ["two", "thirtytwo","five", "twentysix", "fourtytwo"], "two","fourtytwo","twentysix","five","thirtytwo"),
    new Question("Which one is a 5?", ["five","three","thirtyfive","ninetyfive","fifteen"],"five","thirtyfive","","three","ninetyfive")
  
];

function Question(text, choices, answer,prot,deut,rg,trit) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
  this.prot = prot;
    this.deut =deut;
    this.rg = rg;
    this.trit=trit;
}




function Quiz(questions) {
  this.score = 0
  this.normalvisionscore = 0;
  this.protanscore = 0;
  this.deuteranscore = 0;
  this.rgdefscore = 0;
  this.tritscore = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
}

Question.prototype.isProtAnswer = function(choice) {
  return this.prot === choice;
}

Question.prototype.isDeutAnswer = function(choice) {
  return this.deut === choice;
}

Question.prototype.isRgAnswer = function(choice) {
  return this.rg === choice;
}

Question.prototype.isTritAnswer = function(choice) {
  return this.trit === choice;
}


Question.prototype.isCorrectAnswer = function(choice) {
  return this.answer === choice;
}


Quiz.prototype.guess = function(answer) {
  if (this.getQuestionIndex().isCorrectAnswer(answer)) {
    this.score++;
  }
  if (this.getQuestionIndex().isProtAnswer(answer)) {
    this.protanscore++;
  }
  if (this.getQuestionIndex().isDeutAnswer(answer)) {
    this.deuteranscore++;
  }
  if (this.getQuestionIndex().isRgAnswer(answer)) {
    this.rgdefscore++;
  }
  if (this.getQuestionIndex().isTritAnswer(answer)) {
    this.tritscore++;
  }
  this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
  return this.questionIndex === this.questions.length;
}

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();
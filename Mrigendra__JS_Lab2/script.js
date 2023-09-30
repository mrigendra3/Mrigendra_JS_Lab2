//Quiz Prototype
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionNumber = 0;
}

//Question Prototype
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}


Quiz.prototype.getquestionNumber = function () {
    return this.questions[this.questionNumber];
}


// Questions 
var questions = [
    new Question("1. What does HTML stand for?", 
    ["1. HyperText Makeup Language", "2. Hyperlink Markup Language", "3. Hypertext Markup Language", "4. None of the above"],
     "3. Hypertext Markup Language"),

    new Question("2. Inside which HTML element do we put the JavaScript?", 
    ["1. script", "2. javascript", "3. scripting", "4. js"], 
    "1. script"),

    new Question("3. JavaScript is a .... ", 
    ["1. Language", "2. Programming Language", "3. Development", "4. All of the above"], 
    "2. Programming Language"),

    new Question("4. The .... CSS property used to control the element's font-size is", 
    ["1. text-style", "1. text-size", "3. font-size", "4. None of the above"], 
    "3. font-size"),

    new Question("5. The .... HTML attribute used to define the inline-css is", 
    ["1. style", "2. styles", "3. class", "4. None of the above"], 
    "1. style")
];

// Create function for checking quiz length
Quiz.prototype.isEnded = function () {
    return this.questionNumber === this.questions.length;
}

// Check the quiz ans
Quiz.prototype.checkAnswer = function (answer) {
    if (this.getquestionNumber().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionNumber++;
}


Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}


// Handle click event
function handleClickedBtn(btnNumber, choice) {
    var button = document.getElementById(btnNumber);
    button.onclick = function () {
        quiz.checkAnswer(choice);
        loadQuestions();
    }
};


//show progress 
function showProgress() {
    var currentQuestionNumber = quiz.questionNumber + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + "/" + quiz.questions.length;
};

// show score
function showScore() {
    var result = "<h1>Result</h1>";
    result += "<h2 id='score'> Your score is: " + quiz.score + " and your percentage is: " + (quiz.score / questions.length * 100) + "%" + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = result;
};

//load the questions
function loadQuestions() {
    if (quiz.isEnded()) {
        showScore();
    }
    else {
        var element = document.getElementById("question");
        element.innerHTML = quiz.getquestionNumber().text;
        var choices = quiz.getquestionNumber().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            handleClickedBtn("btn" + i, choices[i]);
        }

        // calling the progress function
        showProgress();
    }
};




var quiz = new Quiz(questions);

// calling the load question function to display the quiz
loadQuestions();
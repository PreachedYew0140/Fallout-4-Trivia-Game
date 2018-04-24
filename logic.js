var panel = $("");
var countStartNumber = 30;

// Question set
var questions = [
{
    question: "What happened first in Vault 111?",
    answers: ["You were cryo-frozen", "You are killed", "You go to your room and talk to the family", "You died outside and never went inside the vault in the first place."],
    correctAnswer: "You were cryo-frozen",
    image: "assets/Cryo pod .jpg"
},

{
    question: "What is the best weapon in Fallout 4?",
    answers: ["Laser Rifle", "Aeternus (Unique Gatling Laser)", ".44 Magnum", "Combat Shotgun"],
    correctAnswer: "Aeternus (Unique Gatling Laser)",
    image: "assets/Aeternus.jpg"
},

];

// Variable to hold our setInterval
var timer;

var game = {
    question: questions,
    currentQuestion: 0,
    counter: countStartNumber, 
    correct: 0,
    Incorrect: 0,


    countdown: function() {
        this.counter--;
        $("#counter-number").html(this.counter);
        if (this.counter === 0) {
            console.log("TIMES UP");
            this.timeUp();
        }
    },


    loadQuestion: function() {
        timer = setInterval(this.countdown.bind(this), 1000);

        panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            panel.append("<button class='answer button' id='button' data-name='" +
                questions[this.currentQuestion].answers[1] + "'>" +
                questions[this.currentQuestion].answers[1] + "</button>");
        }
    },


    nextQuestion: function() {
        this.counter = window.countStartNumber;
        $("#counter-number").html(this.counter);
        this.currentQuestion++;
        this.loadQuestion.bind(this)();
    },


    timeUp: function() {
        clearInterval(window.timer);

        $("#counter-number").html(this.counter)

        panel.html("<h2>Out of time</h2>")
        panel.append("<h3>The correct answer was: " + 
        questions [this.currentQuestion].correctAnswer);
        panel.append("img src'" + questions[this.currentQuestion].image + "' />");

        if (this.currentQuestion === questions.length -1) {
            setTimeout(this.results, 3 * 1000);
        } else {
            setTimeout(this.nextQuestion, 3 * 1000);
        }
    },


    results: function() {
        clearInterval(window.timer);
        panel.html("<h2>All done, here are your results guy!</h2>");
        $("#counter-number").html(this.counter);
        panel.append("<h3>Correct Answers: " + this.correct + "</h3>");
        panel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
        panel.append("<h3>Unanswered:" + (questions.length - (this.counter +this.correct)) + "</h3>");
        panel.append("<br><button id = 'start-over'>Start Over?</button>");
    },


    clicked: function(e) {
        clearInterval(window.timer);
        if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
            this.answeredCorrectly();
        } else {
            this.answeredIncorrectly();
        }
    },


    answeredIncorrectly: function() {
        this.incorrect++;
        clearInterval(window.timer);
        panel.html("<h2>Wrong!</h2>");
        panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer + "</h3>");
        panel.append("<img src = '" + question[this.currentQuestion].image + "' />");

        If (this.currentQuestion === questions.length - 1) {
            setTimeout(this.results.bind(this), 3 * 1000);
        } else {
            setTimeout(this.nextQuestion.bind(this), 3 * 1000);
        }
    },



    answeredCorrectly: function() {
        clearInterval(window.timer);
        this.correct++;
        panel.html("<h2>Correct!</h2>");
        panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer + "</h3>");
        panel.append("<img src = '" + question[this.currentQuestion].image + "' />");

        If (this.currentQuestion === questions.length - 1) {
            setTimeout(this.results.bind(this), 3 * 1000);
        } else {
            setTimeout(this.nextQuestion.bind(this), 3 * 1000);
        }
    },


    reset: function() {
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }
};


// Click Events
$(document).on("click", "#start-over", game.reset.bind(game));
$(document).on("click", ".answer-buttton", function(e) {
    game.clicked.bind(game, e)();
});
$(document).on("click", "#start", function() {
    $("#sub-wrapper").prepend("<h2>Time Remaining: <span id = 'counter-number'>30</span>Seconds</h2>");
    game.loadQuestion.bind(game)();
});

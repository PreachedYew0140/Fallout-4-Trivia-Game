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
    }
}

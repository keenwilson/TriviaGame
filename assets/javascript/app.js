$(document).ready(function () {


    var selectAnswer;
    var currentCorrectAnswer;
    var isAnswered = null;
    var isCorrect = null;
    var gameMessage;
    var numberOfCorrectAnswers = 0;
    var numberOfIncorrectAnswers = 0;
    var numberOfUnanswered = 0;
    var seconds = 10;
    var intervalId;
    var invervalTrivia;//hold setInterval when we start the trivia
    var count = 0;
    var gameTrivia = [
        {
            question: "Which dog breed is a true working dog excelling in sheep herding?",
            choices: ["Border Collie", "Bassen Hound", "Chow Chow", "German Shepherds"],
            correctAnswer: "Border Collie",
            giphy: '<iframe src="https://giphy.com/embed/10E8Jj1TSQaul2" width="480" height="272" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
            funFact: "Border collies are also known for their “herding eye,” an intense gaze used to stare down and herd other animals."
        },
        {
            question: "Which dogs are the national dog of France??",
            choices: ["Poodles", "Retrievers", "Barbets", "Spaniels"],
            correctAnswer: "Poodles",
            giphy: '<iframe src="https://giphy.com/embed/NntkYBzcdJxm" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
            funFact: "First bred as a water dog, the French poodle actually originated in Germany! “Poodle” derives from the German word for “puddle”. "
        },
        {
            question: "How fast can the Greyhound reach at their top speed?",
            choices: ["15 miles per hour", "20 miles per hour", "30 miles per hour", "45 miles per hour"],
            correctAnswer: "45 miles per hour",
            giphy: '<iframe src="https://giphy.com/embed/c9QYMdmcCRGh2" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
            funFact: "Greyhound dogs can run up to 45 miles per hour, rivaling the cheetah for land speed records over distance, although cheetahs beat them handily in a sprint."
        },
        {
            question: "Which human foods are safe for dogs to eat?",
            choices: ["Chocolate", "Onions", "Blueberries", "Turkey Skin"],
            correctAnswer: "Blueberries",
            giphy: '<iframe src="https://giphy.com/embed/T7YwFIJpG6eGc" width="268" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
            funFact: "Blueberry helps maintain optimal health. Frozen Blueberries make a crunchy treat."
        },
        {
            question: "How often should you bathe most indoor dogs who have normal healthy skin?",
            choices: ["2-3 times a week", "Once a week", "2-3 times a month", "Once a month"],
            correctAnswer: "Once a month",
            giphy: '<iframe src="https://giphy.com/embed/Xeu98yGdKIKoo" width="480" height="421" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
            funFact: "Unless they have a skin allergy or disease of some sort that requires bathing to help treat, indoor dogs should be good to go for a month or so."
        },       
        {
            question: "Which one of U.S. states had the most dog owners?",
            choices: ["California", "Arkansas", "Vermont", "Massachusetts"],
            correctAnswer: "Arkansas",
            giphy: '<iframe src="https://giphy.com/embed/3o6ZtgpVprZMriwoyA" width="480" height="255" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
            funFact: "Arkansas is the state with most dog owners (47.9% of households that owned a dog), while Massachusetts is the state with the fewest dog owners (23.6%)."
        },  
        {
            question: "What is the most dog friendly U.S. city?",
            choices: ["San Diego, CA", "New Your, NY", "Seattle, WA", "Portland, OR"],
            correctAnswer: "Portland, OR",
            giphy: '<iframe src="https://giphy.com/embed/3og0IJeBDcZQBhrPS8" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
            funFact: "Along with Portland's many pet friendly parks and dining, a local brewery even welcomes dogs on their beer tour."
        },  
        {
            question: "What signs indicate your dog is most likely happy?",
            choices: ["Ears are pinned back", "White eyes are showing", "A tail is wagging loosely", "A tail pinned under her body"],
            correctAnswer: "A tail is wagging loosely",
            giphy: '<iframe src="https://giphy.com/embed/1LweXxLwVT0J2" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
            funFact: "The best way to interact with the happy, panting, and wagging dog is to invite the dog over to see you rather than moving into the dog's space."
        },  
        {
            question: "What is NOT true about the Labrador Retriever?",
            choices: ["Nearly went extinct", "Practically waterproof", "Coat color indicates temperament", "Low maintenance"],
            correctAnswer: "Coat color indicates her temperament",
            giphy: '<iframe src="https://giphy.com/embed/FuTuYgqYaRFe0" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>',
            funFact: "A Labrador’s color has nothing to do with her temperament. Black Labs, Yellow Labs, and Chocolate Labs are equally sweet and loving."
        },  
        {
            question: "What is a human child age that dogs’ intelligence are close to?",
            choices: ["1 years old", "2 years old", "3 years old", "4 years old"],
            correctAnswer: "2 years old",
            giphy: '<iframe src="https://giphy.com/embed/E4h8tIXnXBH7W" width="269" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p>',
            funFact: "Dogs have the same level of intelligence as a two-year-old. Dogs can understand up to 250 words and phrases, and can count up to five."
        },  
    ];


    initiateStartButton();
    activateStartButton();
    
    function initiateStartButton() {
        var startButton = $("<button>").attr({
            class: "btn-lg btn-outline-dark",
            id: "start-button"
        });
        startButton.text('Start');
        $("#game-area").append(startButton);
    }

    function activateStartButton() {
        $("#start-button").on("click", function () {
            clearStartButton();
            $("#timer-area").removeClass("collapse");
            startGame();
        })
    };

    function runTimer() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000); 
    };

    function decrement() {
        $("#show-timer").html(seconds);
        seconds--;
        
        if (seconds === 0) {
            $("#show-timer").html(seconds);
            stop();
            isAnswered = false;
            displayAnswer();
        };
    };

    function stop() {
        clearInterval(intervalId);
    }

    function nextQuestion() {
        // reset timer
        clearTimer(); 
        seconds = 10;
        count++;
        startGame();
        
    }

    function displayTrivia(count) {

        clearTriviaArea(); 

        var questionDiv = $('<div>').attr("id", "current-question");
        var choiceOne = $('<div>').attr({
            id: "choiceone",
            class: "current-choices btn-lg btn-block btn-outline-dark",
        });
        var choiceTwo = $('<div>').attr({
            id: "choice-two",
            class: "current-choices btn-lg btn-block btn-outline-dark"
        });
        var choiceThree = $('<div>').attr({
            id: "choice-three",
            class: "current-choices btn-lg btn-block btn-outline-dark"
        });
        var choiceFour = $('<div>').attr({
            id: "choice-four",
            class: "current-choices btn-lg btn-block btn-outline-dark"
        });

        questionDiv.text(gameTrivia[count].question);        
        choiceOne.text(gameTrivia[count].choices[0]);
        choiceTwo.text(gameTrivia[count].choices[1]);
        choiceThree.text(gameTrivia[count].choices[2]);
        choiceFour.text(gameTrivia[count].choices[3]);

        $("#trivia-area").append(questionDiv, choiceOne, choiceTwo, choiceThree, choiceFour);
        setCorrestAnswer(count);
        reviewAnswer();
        
    };

    function setCorrestAnswer(count) {
        currentCorrectAnswer = gameTrivia[count].correctAnswer;
        console.log(currentCorrectAnswer,"is set to the correct answer");
    };

    function reviewAnswer() {
        $('.current-choices').on("click", function() {
            isAnswered = true;
            selectAnswer = $(this).text();
            compareWithCorrestAnswer(selectAnswer, currentCorrectAnswer);
            
        })
    }


    function compareWithCorrestAnswer(select, correct) {
        if (select === correct) {
            isCorrect = true;         
        } else {
            isCorrect = false;
        }
        displayAnswer();       
    }

    function displayAnswer() {  
        //stop watch
        stop();
        if (isAnswered) {
            if (isCorrect) {
                console.log("Correct!")
                gameMessage = "Correct!";
                numberOfCorrectAnswers++;
                console.log("current correct answers:",numberOfCorrectAnswers, "current incorrect answers:",numberOfIncorrectAnswers, "current unanswered:", numberOfUnanswered);
                renderAnswer();
                setTimeout(nextQuestion, 5000)
            } else {
                console.log("Nope!");
                gameMessage = "Nope!";
                numberOfIncorrectAnswers++;
                console.log("current correct answers:",numberOfCorrectAnswers, "current incorrect answers:",numberOfIncorrectAnswers, "current unanswered:", numberOfUnanswered);
                renderAnswer();
                setTimeout(nextQuestion, 5000)
            }
        } else {
            console.log("Out of Time!")
            gameMessage = "Out of Time!";
            numberOfUnanswered++;
            console.log("current correct answers:",numberOfCorrectAnswers, "current incorrect answers:",numberOfIncorrectAnswers, "current unanswered:", numberOfUnanswered);
            renderAnswer();
            setTimeout(nextQuestion, 5000);
        }
    }

    function renderAnswer() {
        clearTriviaArea();
        var gameMessageTitleDisplay = "<h2>" + gameMessage + "</h2>";
        var triviaAnswerDisplay = "<div id='correct-answer'> The Correct Answer was: " + currentCorrectAnswer + ". </div>"
        var triviaFactDisplay = "<div id='trivia-fact'>" + gameTrivia[count].funFact + "</div>";

        if (isAnswered) {
            if (isCorrect) {
                // show giphy and facts
                $("#trivia-area").append(gameMessageTitleDisplay, gameTrivia[count].giphy, triviaFactDisplay);
            } else {
                // show correct answer and giphy
                $("#trivia-area").append(gameMessageTitleDisplay, triviaAnswerDisplay, gameTrivia[count].giphy, triviaFactDisplay);
            }
        } else {
            // show correct answer and giphy
            $("#trivia-area").append(gameMessageTitleDisplay, triviaAnswerDisplay, gameTrivia[count].giphy, triviaFactDisplay);
        }
    }

    function renderPagination() {
        var questionNumber = count + 1;
        var pagination = "<p> You are answering " + questionNumber + " out of 10 questions. </p>";
        $("#trivia-area").prepend(pagination);
    }

    function renderSummary() {
        clearTimeRemainingArea();
        clearTriviaArea();
        var summary = "<h2> All done! Here is how you did. </h2>" +
        "<h3> Correct Answers: " + numberOfCorrectAnswers + "</h3>" +
        "<h3> Incorrect Answers: " + numberOfIncorrectAnswers + "</h3>" +
        "<h3> Unanswered: " + numberOfUnanswered + "</h3>";

        var startOverButton = $("<button>").attr({
            "id": "start-over",
            "class": "btn-lg btn-outline-dark"
        });
        startOverButton.text("Start Over?");
        
        $("#trivia-area").append(summary, startOverButton);

        $("#start-over").on("click", function() {
            gameStatsSetup();
        });
    };

    function gameStatsSetup() {
        numberOfCorrectAnswers = 0;
        numberOfIncorrectAnswers = 0;
        numberOfUnanswered = 0;
        count = 0;
        showTimeRemainingArea();
        startGame();
    }


    function startGame() {
        console.log("startGame runs", "your current count is", count);
        if (count === 10) {
            renderSummary();
            console.log("show summary when count is 4");
        } else {
            console.log("run game as normal");
            runTimer(); 
            displayTrivia(count);
            renderPagination();
        }

    }

    function clearTriviaArea() {
        $("#trivia-area").empty();
    }

    function clearStartButton() {
        $("#game-area").empty();
    }

    function clearTimer() {
        $("#show-timer").empty();
    }

    function clearTimeRemainingArea() {
        $("#timer-area").addClass("collapse");
    }

    function showTimeRemainingArea() {
        $("#timer-area").removeClass("collapse");
    }



}); //End $(document).ready()

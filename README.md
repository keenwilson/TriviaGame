# Trivia Game


 [Click to Play a Dog-themed Trivia Game](https://keenwilson.github.io/TriviaGame/ "Dog Trivia Game")
---
## How This Application Works

![Show question](./assets/screenshots/dogtrivia-askingquestion.png)
* A trivia game shows only one question until the player answers it or their time runs out (10 seconds per question).

![The user answers correctly](./assets/screenshots/dogtrivia-correctanswer.png)
* If the player selects the correct answer, it shows a screen congratulating them for choosing the right option. After a few seconds, it will move to the next question with no user input at all.


* The scenario is similar for incorrect answers and time-outs.

    ![The user selects an incorrect answer](./assets/screenshots/dogtrivia-wronganswer.png)
    * If the player chooses the wrong answer, it tells the player they selected the wrong option and then display the correct answer. Wait a few seconds, then display the next question.
    
    ![The user does not answer in time](./assets/screenshots/dogtrivia-outoftime.png)
    * If the player runs out of time, it tells the player that time's up and display the correct answer. Wait a few seconds, then display the next question.

![Show results](./assets/screenshots/dogtrivia-stat.png)
* On the final screen, show the number of correct answer, incorrect answers, and _a start over button_ to restart the game so that the user doesn't have to refresh browser to play again.

---
## Technological Approach

* `CSS Bootstrap` and `Google Fonts`  to create a clean look.
* `JavaScript` timing events such as  for the logic 
* Use `jQuery Selectors` like `#id` and `.class` to select the elements with specific IDs and classes.
* Use the `on()` method of `jQuery` to attach event handlers to the selected elements.
    * Attach a click event to answer choices
* manipulate HTML.

---
## Author

[Keen Wilson](https://github.com/keenwilson/keenwilson.github.io "Keen Wilson's Portfolio")



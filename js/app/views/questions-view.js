define(function () {
  const internals = {
    tag: {},
    index: 0,
    correctAnswers: 0,
    options: [],
    rightAnswer: "",
  };
  const externals = {};

  internals.createQuestions = function (question) {
    /* HTML */
    return `<div class="container">
    <h2>Quiz Section</h2>

    <div class="form-group">
        <label for="theme">${question.category}</label>
    </div>

    <div class="form-group">
        <label for="num_right_answers">Number of Right Answers ${
          internals.correctAnswers
        }</label>
    </div>

    <div class="form-group">
        <label for="question_number">Question Number ${
          internals.index + 1
        }</label>
    </div>
    <div>
    <label for="question">${question.question}</label>
    
    </div>

    <div class="form-group">
        <label>Options</label>
        <div class="answer">
            <button id="0"> ${internals.options[0].text}</button>
        </div>
        <div class="answer">
            <button id="1"> ${internals.options[1].text}</button>
        </div>
        <div class="answer">
            <button id="2"> ${internals.options[2].text}</button>
        </div>
        <div class="answer">
            <button id="3"> ${internals.options[3].text}</button>
        </div>
    </div>
</div>

<!-- Bootstrap JS and jQuery (required for Bootstrap 3) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
`;
  };

  internals.createView = function (question) {
    internals.tag.questions = $(internals.createQuestions(question));
    $("#trivia").append(internals.tag.questions);
  };

  externals.render = async function (questions) {
    if (internals.tag.questions) {
      internals.tag.questions.empty();
    }
    internals.options = internals.buildText(questions[internals.index]);
    internals.createView(questions[internals.index]);

    $("button").on("click", function () {
      if (internals.rightAnswer === $(this).text().trim()) {
        internals.index++;
        internals.correctAnswers++;
        internals.rightAnswer = "";
      } else {
        internals.index++;
        internals.rightAnswer = "";
      }
      if (internals.index == questions.length) {
        window.location.hash = "#menu";
      } else {
        externals.render(questions);
      }
    });

    internals.options.length = 0;
  };

  internals.buildText = function (question) {
    const correct = {
      text: question.correct_answer,
      correct: 1,
    };

    internals.rightAnswer = question.correct_answer;

    internals.options.push(correct);
    question.incorrect_answers.forEach((element) => {
      var wrong = {
        text: element,
        correct: 0,
      };
      internals.options.push(wrong);
    });

    return internals.shuffle(internals.options);
  };

  internals.shuffle = function (array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  return externals;
});

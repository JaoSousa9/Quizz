define(["views/questions-view", "services/trivia-service", "router"], function (
  questionsView,
  triviaService,
  router
) {
  internals = {
    questions: [],
  };
  externals = {};

  externals.start = async function () {
    const searchParameters = new URLSearchParams(window.location.hash);

    const questions = await triviaService.getTriviaQuestions(
      searchParameters.get("num"),
      searchParameters.get("category"),
      "hard",
      "multiple"
    );

    questions.results.forEach((question) => {
      internals.questions.push(question);
    });

    await questionsView.render(internals.questions);
  };
  return externals;
});

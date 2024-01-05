define(["views/menu-view", "services/trivia-service", "router"], function (
  menuView,
  triviaService,
  router
) {
  const externals = {};
  const internals = {};

  externals.start = async function () {
    const categories = triviaService.getTriviaCategories();
    menuView.render(await categories);
    menuView.tag.button = $("#start").on("click", function () {
      router.setQuestions($('#theme').val(),$('#num_questions_output').val(),$('#difficulty').val())
      window.location.hash = "#gameQuestions/game&category="+$('#theme').val()+"&num="+$('#num_questions_output').val()+"&diff="+$('#difficulty').val();
      console.log(window.location.hash);
      menuView.clean();
    });
    //vai buscar as categories com o trivia service
  };

  return externals;
});

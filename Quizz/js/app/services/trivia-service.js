define(function () {
  const internals = {}; // internal state
  const externals = {}; // external api

  //opentdb.com/api.php?amount=20&category=15&difficulty=hard&type=multiple
  externals.getTriviaQuestions = async function (
    amountQ,
    category,
    difficulty,
    type
  ) {
    const url =
      "https://opentdb.com/api.php?amount=" +
      amountQ +
      "&category=" +
      category +
      "&difficulty=" +
      difficulty +
      "&type=" +
      type;
    const options = {
      method: "GET",
    };

    try {
      return await (await fetch(url, options)).json();
    } catch (error) {
      console.error(error);
    }
  };

  externals.getTriviaCategories = async function(){
    const url = "https://opentdb.com/api_category.php";
    const options = {
      method: "GET"
    };

    try{
      const categories = await (await fetch(url, options)).json();
      return await categories;
    }catch(error){
      console.error(error + "FETCHING CATEGORIES")
    }
  }
  return externals;
});

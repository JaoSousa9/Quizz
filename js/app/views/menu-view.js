define(function () {
  const internals = {};
  const externals = {
    tag: {},
  };

  internals.createMenu = function (categories) {
    /* HTML */
    return `<div class='container'>
        <h2>Choose Options</h2>
        <div class='form-group'>
        <label>Difficulty</label>
        <div>
        <select class='form-control' id='difficulty' name='difficulty'>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
        </select>
        </div>
        </div>
        
        <div class='form-group'>
        <label for='theme'>Theme</label>
        <select class='form-control' id='theme' name='theme'>
        <option value=23>History</option>
        </select>
        </div>
        
        <div class='form-group'>
        <label for='num_questions'>Number of Questions</label>
        <input type='range' class='form-control-range' id='num_questions' name='num_questions' min='1' max='20' step='1'>
        <output for='num_questions' id='num_questions_output'>5</output>
        </div>
        <button id="start">Start</button>
        </div>
        
        <script src='https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js'></script>
        <script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'></script>
        
        <script>
        document.getElementById('num_questions').addEventListener('input', function() {
            document.getElementById('num_questions_output').value = this.value;
        });
        </script>`;
  };

  internals.createView = function () {
    externals.tag.menu = $(internals.createMenu());
    $("#trivia").append(externals.tag.menu);
  };
//vai receber as categories
  externals.render = function (categories) {

    console.log(categories);
    externals.clean();
    internals.createView(categories);
    categories.trivia_categories.forEach(element => {
      const option = `<option value = ${element.id}>${element.name}</option>`
      $("#theme").append(option);
    })
  };

  externals.clean = function () {
    if (externals.tag.menu) {
      externals.tag.menu.empty();
      externals.tag.button.empty();
    }
  };
  return externals;
});

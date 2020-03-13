(function() {
    var questions = [
	  {
        question: "Ако видите котка с рана ще и помогнете ли?",
        choices: ["Не", "Да"],
        correctAnswer: 1
      },
      {
        question: "Какво тряба да направите когато видите бездомно куче?",
        choices: ["Ще го ритна", "Ще му дам храна", "Ще хвърля камъни по него", "Ще го изплаша чрез викане"],
        correctAnswer: 1
      },
      {
        question: "Ще помогнете ли на връбчето дадено в видеото на началната страница?",
        choices: ["Не", "Да", "Ще го оставя, не е моя работа"],
        correctAnswer: 2
      },
      {
        question: "Дисоциацирайте H2SO4 във воден разтвор",
        choices: ["H- + SO4+", "H+ + SO4-", "H+SO4", "Никое от изброените"],
        correctAnswer: 3
      },
	  {
        question: "В кой ред са записани следните химични елементи: калий, хлор, калций, кислород и йод",
        choices: ["К,Са,Сl,O", "K,Cl,Ca,O", "K,Cl,Ca,I", "Ca,Cl,K,I"],
        correctAnswer: 1
      },
	  {
        question: "Как се означават две молекули бром(Br)?",
        choices: ["2Br<sub>2</sub>", "2Br", "(2Br)<sup>2</sup>", "Br<sub>2</sub>"],
        correctAnswer: 0
      },
	  {
        question: "Коя е формулата на дихлорен оксид?",
        choices: ["ClO<sub>2</sub>", "Cl<sub>2</sub>O<sub>2</sub>", "Cl<sub>2</sub>O", "2Clo"],
        correctAnswer: 2
      },
	  {
        question: "Eлементите от II А група образуват оксиди, които са:",
        choices: ["Киселинни", "Основни", "Неутрални", "Амфотерни"],
        correctAnswer: 1
      },
	  {
        question: "Коя е химичната формула на негасената вар?",
        choices: ["CaO", "NaOH", "Na<sub>2</sub>CO<sub3</sub>", "NaHCO<sub>3</sub>"],
        correctAnswer: 0
      },
	  {
        question: "Ако към вода се прибави сярна киселина, разтворът ще има: ",
        choices: ["pH=7", "pH<7", "pH=9", "pH>7"],
        correctAnswer: 1
      },
	  {
        question: "Кое от влакната е естествено?",
        choices: ["Полиакрилонитрил", "Ликра", "Памук", "Вискоза"],
        correctAnswer: 2
      },
	  {
        question: "Коя е мерната единица за величината маса?",
        choices: ["mol", "kg", "m<sup>3</sup>", "величината е безразмерна"],
        correctAnswer: 1
      },
    ];
  
    var questionCounter = 0; 
    var selections = []; 
    var quiz = $("#quiz"); 

    displayNext();

    $("#next").on("click", function(e) {
      e.preventDefault();
	  
	  choose();
	  
	  if (isNaN(selections[questionCounter])) {
        alert("Моля изберете отговор!");
		return;
      }
	  
	  checkAnswer();
	  
		questionCounter++;
		displayNext();
  
      if (quiz.is(":animated")) {
        return false;
      }
	  
    });
  
    $("#prev").on("click", function(e) {
      e.preventDefault();
  
      if (quiz.is(":animated")) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });

    $("#start").on("click", function(e) {
      e.preventDefault();
  
      if (quiz.is(":animated")) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $("#start").hide();
    });
  
    $(".button").on("mouseenter", function() {
      $(this).addClass("active");
    });
    $(".button").on("mouseleave", function() {
      $(this).removeClass("active");
    });
  
    function createQuestionElement(index) {
      var qElement = $("<div>", {
        id: "question"
      });
  
      var header = $("<h2>Въпрос " + (index + 1) + ":</h2>");
      qElement.append(header);
  
      var question = $("<p>").append(questions[index].question);
      qElement.append(question);
  
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
  
      return qElement;
    }
  
    function createRadios(index) {
      var radioList = $("<ul>");
      var item;
      var input = "";
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $("<li>");
        input = '<input type="radio" name="answer" value=' + i + " />";
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
  
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
	
	function checkAnswer()
	{
		if (questions[questionCounter].correctAnswer == selections[questionCounter])
		{
			alert('Верен отговор!');
		}
		else
		{
			alert('Грешен отговор!');
		}
	}
  
    function displayNext() {
      quiz.fadeOut(function() {
        $("#question").remove();
  
        if (questionCounter < questions.length) {
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!isNaN(selections[questionCounter])) {
            $("input[value=" + selections[questionCounter] + "]").prop(
              "checked",
              true
            );
          }
  
          if (questionCounter === 1) {
            $("#prev").show();
          } else if (questionCounter === 0) {
            $("#prev").hide();
            $("#next").show();
          }
        } else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $("#next").hide();
          $("#prev").hide();
          $("#start").show();
        }
      });
    }
  
    function displayScore() {
      var score = $("<p>", { id: "question" });
  
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
  
      score.append(
        "Ти позна " +numCorrect + " въпроса от " + questions.length + " верни!");
      return score;
    }
  })();
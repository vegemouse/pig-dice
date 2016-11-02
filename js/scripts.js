//Globals
var tempScore = 0;
var compScore = 0;
var compHoldLimit = 10;
var compThoughts, player1, computer, diceOne, diceImageDisplay, happyComp, sadComp, defaultComp, compRoundDisplay, compOneDisplay;
var Player = function(name, score, turn) {
  this.name = name;
  this.score = score;
  this.turn = turn;
}
//Player constructor
var createPlayers = function(){
  player1 = new Player(name, 0, true);
  computer = new Player('Computer', 0, false);
}
//Computer AI
var computerTurn = function(){
  $("#temp-score").hide();
  while (player1.turn === false){
    var compRoll = rollDice();
    if (compRoll === 1) {
      compScore = 0;
      compOneDisplay();
      player1.turn = true;
      $("#roll").prop("disabled", false);
    } else {
      compScore += compRoll;
    }
    checkWin();
    if (compScore > compHoldLimit){
      computer.score += compScore;
      compRoundDisplay();
      compScore = 0;
      player1.turn = true;
      $("#roll").prop("disabled", false);
    }
    $("#temp-score").hide()
  }
}
//Check for win condition
var checkWin = function() {
  if((player1.score + tempScore) >= 100){
    $("#win").show();
    return player1.name;
  } else if((computer.score + compScore) >= 100){
    $("#lose").show();
    return computer.name;
  }
}
//Alter computer AI based on score differential
var scoreCheck = function() {
  var difference = (player1.score - computer.score);
  if (difference > 10){
    compHoldLimit = 15;
    compThoughts = "I'm getting killed...";
    sadComp();
  }else if (difference < -10){
    compHoldLimit = 7;
    compThoughts = "You'll never beat me!";
    happyComp();
  }else {
    compHoldLimit = 10;
    compThoughts = "You're going down!"
    defaultComp();
  }
}
//Dice value generator
var rollDice = function(){
  return 1 + (Math.floor(Math.random() * 6));
}
//Roll the dice and record the value, check for 1
var checkRoll = function() {
  var roll = rollDice();
  if (roll === 1) {
    diceOne();
    tempScore = 0;
    player1.turn = false;
    setTimeout(computerTurn, 1500);
  } else {
    tempScore += roll;
    for(var i=2;i<7;i++) {
      if(i === roll) {
        diceImageDisplay(i);
      }
    }
  }
  checkWin();
}
//hold button logic
var hold = function() {
  if (player1.turn === true) {
    player1.score += tempScore;
    tempScore = 0;
    player1.turn = false;
    computerTurn();
  }
}

// Front End
$(function() {
  $("#start").submit(function(event){
    event.preventDefault();
    createPlayers();
    player1.name = $('#name').val();
    if (!player1.name){
      alert('Please enter your name to continue.')
    }else{
      $('#start-section').hide();
      $('#header').hide();
      $('#computer').fadeIn(1000);
      $('#buttonSection').delay(1000).fadeIn();
      $('#scoreName').html(player1.name + "'s");
      $('#scores').delay(1000).fadeIn();
    }
  });

  $("#roll").click(function() {
    checkRoll();
    $("#output").fadeIn();
    $("#temp-score").show();
    $("#bankNumber").html(tempScore);
  })

  $("#hold").click(function() {
    hold();
    scoreCheck();
    $("#playerScore").html(player1.score);
    $("#comp-output").html(compThoughts);
  })

  $(".refresh").click(function() {
    location.reload();
  })
  diceOne = function(){
    $('#dice').html("<h2>You rolled a <img src='img/1.png' alt='1' width='50px'> Computer's turn...</h2>");
    $("#roll").prop("disabled", true);
  }
  diceImageDisplay = function(diceResult) {
    $('#dice').html("<img src='img/" + diceResult + ".png' alt='" + diceResult + "' width='75px'>");
  }
  happyComp = function(){
    $('#computerFace').html("^_^");
  }
  sadComp = function(){
    $('#computerFace').html(">_<");
  }
  defaultComp = function(){
    $('#computerFace').html("0_0");
  }
  compRoundDisplay = function(){
    $("#dice").html("<h2>The computer banked a score of " + compScore + ". Your turn!</h2>");
    $("#computerScore").html(computer.score);
  }
  compOneDisplay = function(){
    $("#dice").html("<h2>The computer rolled a 1. Your turn!</h2>");
  }


})

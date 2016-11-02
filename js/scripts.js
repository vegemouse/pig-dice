var tempScore = 0;
var compScore = 0;
var compHoldLimit = 10;
var compThoughts;
var player1, computer;
var Player = function(name, score, turn) {
  this.name = name;
  this.score = score;
  this.turn = turn;
}

var createPlayers = function(){
  player1 = new Player(name, 0, true);
  computer = new Player('Computer', 0, false);

}

var computerTurn = function(){
  $("#temp-score").hide();
  while (player1.turn === false){
    var compRoll = rollDice();
    if (compRoll === 1) {
      compScore = 0;
      // alert("The computer rolled a 1.")
      $("#dice").html("<h2>The computer rolled a 1. Your turn!</h2>");
      player1.turn = true;
      $("#roll").prop("disabled", false);
    } else {
      compScore += compRoll;
    }
    checkWin();
    if (compScore > compHoldLimit){
      $("#dice").html("<h2>The computer banked a score of " + compScore + ". Your turn!</h2>");
      computer.score += compScore;
      compScore = 0;
      player1.turn = true;
      $("#computerScore").html(computer.score);
      $("#roll").prop("disabled", false);
    }
    console.log("computer roll " +compRoll + " computer score "+computer.score);
    $("#temp-score").hide()
  }
}

var checkWin = function() {
  if((player1.score + tempScore) >= 100){
    $("#win").show();
    return player1.name;
  } else if((computer.score + compScore) >= 100){
    $("#lose").show();
    return computer.name;
  }
}

var scoreCheck = function() {
  var difference = (player1.score - computer.score);
  if (difference > 10){
    compHoldLimit = 15;
    compThoughts = "I'm getting killed... Better start banking bigger numbers!";
  }else if (difference < -10){
    compHoldLimit = 7;
    compThoughts = "You'll never beat me! I'm gonna play it safe with this big lead!";
  }else {
    compHoldLimit = 10;
    compThoughts = "You're going down!"
  }
}

var rollDice = function(){
  return 1 + (Math.floor(Math.random() * 6));

}

// Front End
$(function() {
  $("#roll").click(function() {
    var roll = rollDice();
    if (roll === 1) {
      $('#dice').html("<h2>You rolled a 1. Computer's turn...</h2>");
      tempScore = 0;
      player1.turn = false;
      $("#roll").prop("disabled", true);
      setTimeout(computerTurn, 2000);
    } else {
      tempScore += roll;
      $('#dice').html("<h2>" + player1.name + "'s roll: " + roll + "</h2>")
    }
    checkWin();
    $("#output").fadeIn();
    $("#temp-score").show();
    $("#bankNumber").html(tempScore);

  })

  $("#start").submit(function(event){
    event.preventDefault();
    createPlayers();
    player1.name = $('#name').val();
    if (!player1.name){
      alert('Please enter your name to continue.')
    }else{
      $('#start-section').hide();
      $('#buttonSection').fadeIn();
      $('#scoreName').html(player1.name + "'s");
      $('#scores').fadeIn();
    }
  });

  $("#hold").click(function() {
    if (player1.turn === true) {
      player1.score += tempScore;
      tempScore = 0;
      player1.turn = false;
      computerTurn();
    }
    scoreCheck();
    $("#playerScore").html(player1.score);
    $("#comp-output").html(compThoughts);
  })

  $(".refresh").click(function() {
    location.reload();
  })

})

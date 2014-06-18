function AI() {
  this.gamesPerCycle = 20;
  this.gameCount     = 0;
  this.cycleScores   = [];
};

AI.prototype.move = function(cells) {
  // 0: up, 1: right, 2: down, 3: left
  return Math.floor((Math.random() * 4));
}

AI.prototype.recordGameResults = function(game) {
  this.cycleScores.push(game.score);
  console.log("score: " + game.score);
}

AI.prototype.recordCycleResults = function() {
  var sum = 0;
  $.each(this.cycleScores, function(i, s) {
    sum += parseInt(s);
  });
  console.log("average: " + sum / this.cycleScores.length);
}
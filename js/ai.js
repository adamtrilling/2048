function AI(size) {
  this.gamesPerCycle = 1;
  this.gameCount = 0;

  this.boardSize     = size;
  this.cycleScores   = [];
  this.nn            = new NN(this.getWeights());
};

AI.prototype.getWeights = function() {
  var hidden = [],
      output = [];

  for(var i = 0; i < 6; i++) {
    hidden.push([]);

    for(var j = 0; j < 16; j++) {
      hidden[i].push(Math.floor((Math.random() * 256) ));
    }
  }

  for(var i = 0; i < 4; i++) {
    output.push([]);

    for(var j = 0; j < 6; j++) {
      output[i].push(Math.floor((Math.random() * 256) ));
    }
  }

  return [hidden, output];
}

AI.prototype.cellsToInputs = function(cells) {
  var inputs = []
  for(var x = 0; x < this.boardSize; x++) {
    for(var y = 0; y < this.boardSize; y++) {
      if (cells[x][y] === null) {
        inputs.push(0);
      }
      else {
        inputs.push(Math.log(cells[x][y].value) / Math.log(2));
      }
    }
  }
  return inputs;
}

AI.prototype.getMoves = function(cells) {
  var moves = this.nn.getOutputs(this.cellsToInputs(cells)),
      moveTuples = [];

  // sort the moves by output value
  for(var i = 0; i < 4; i++) {
    moveTuples.push([[i], moves[i]])
  }

  return $.map(moveTuples.sort(function(a, b) {
    a = a[1];
    b = b[1];

    return a > b ? -1 : (a < b ? 1 : 0);
  }), function(tuple) {
    return tuple[0];
  });
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
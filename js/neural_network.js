function NN(board_size, phenotype) {
  this.boardSize = board_size;

  var num_hidden = phenotype.weights.length / (Math.pow(board_size, 2) + 4)

  this.inputs = [];
  this.hidden = new Layer(num_hidden, phenotype.weights.substr(0, Math.pow(board_size, 2) * num_hidden));
  this.outputs = new Layer(4, phenotype.weights.substr(num_hidden * -4));
}

NN.prototype.cellsToInputs = function(cells) {
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

NN.prototype.getMove = function(cells) {
  var moves = this.getOutputs(this.cellsToInputs(cells)),
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

NN.prototype.getOutputs = function(input_vals) {
  var hidden_vals = [],
      output_vals = [];

  for(var i = 0; i < this.hidden.neurons.length; i++) {
    hidden_vals.push(this.hidden.neurons[i].output(input_vals));
  }

  for(var i = 0; i < this.outputs.neurons.length; i++) {
    output_vals.push(this.outputs.neurons[i].output(hidden_vals));
  }

  return output_vals;
}

NN.prototype.serializeWeights = function() {
  return this.hidden.serializeWeights() + this.outputs.serializeWeights();
}

function Layer(num_neurons, weights) {
  this.neurons = [];
  var inputs_per_neuron = weights.length / num_neurons;

  for(var i = 0; i < num_neurons; i++) {
    this.neurons.push(new Neuron(weights.substr(inputs_per_neuron * i, inputs_per_neuron)));
  }
}

Layer.prototype.serializeWeights = function() {
  return $.map(this.neurons, function(n) {
    return n.serializeWeights();
  }).join('');
}

function Neuron(weights) {
  this.weights = []
  for(var i = 0; i < weights.length; i++) {
    this.weights.push(weights.charCodeAt(i));
  }
}

Neuron.prototype.output = function(inputs) {
  var sum = 0;
  for(var i = 0; i < inputs.length; i++) {
    sum += (inputs[i] * this.weights[i]);
  }
  return sum;
}

Neuron.prototype.setWeights = function(weights) {
  this.weights = weights;
}

Neuron.prototype.serializeWeights = function() {
  return String.fromCharCode.apply(String, this.weights)
}
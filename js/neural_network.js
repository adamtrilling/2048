function NN(weights) {
  this.inputs = [];
  this.hidden = [];
  this.outputs = [];

  for(var i = 0; i < weights[0].length; i++) {
    this.hidden.push(new Perceptron(weights[0][i]));
  }

  for (var i = 0; i < weights[1].length; i++) {
    this.outputs.push(new Perceptron(weights[1][i]));
  }
}

NN.prototype.getOutputs = function(input_vals) {
  var hidden_vals = [],
      output_vals = [];

  for(var i = 0; i < this.hidden.length; i++) {
    hidden_vals.push(this.hidden[i].output(input_vals));
  }

  for(var i = 0; i < this.outputs.length; i++) {
    output_vals.push(this.outputs[i].output(hidden_vals));
  }

  return output_vals;
}

function Perceptron(weights) {
  this.weights = weights;
}

Perceptron.prototype.output = function(inputs) {
  var sum = 0;
  for(var i = 0; i < inputs.length; i++) {
    sum += (inputs[i] * this.weights[i]);
  }
  return sum;
}

Perceptron.prototype.setWeights = function(weights) {
  this.weights = weights;
}
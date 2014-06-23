function NN(weights) {
  this.inputs = [];
  this.hidden = new Layer(weights[0]);
  this.outputs = new Layer(weights[1]);
}

NN.prototype.getOutputs = function(input_vals) {
  var hidden_vals = [],
      output_vals = [];

  for(var i = 0; i < this.hidden.length; i++) {
    hidden_vals.push(this.hidden.neurons[i].output(input_vals));
  }

  for(var i = 0; i < this.outputs.length; i++) {
    output_vals.push(this.outputs.neurons[i].output(hidden_vals));
  }

  return output_vals;
}

NN.prototype.serializeWeights = function() {
  return this.hidden.serializeWeights() + this.outputs.serializeWeights();
}

function Layer(weights) {
  this.neurons = [];

  for(var i = 0; i < weights[0].length; i++) {
    this.neurons.push(new Neuron(weights[i]));
  }
}

Layer.prototype.serializeWeights = function() {
  return $.map(this.neurons, function(n) {
    return n.serializeWeights();
  }).join('');
}

function Neuron(weights) {
  this.weights = weights;
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
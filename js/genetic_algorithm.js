function Population(size, members) {
  this.pop_size = size;
  if (members === null) {
    this.members = [];
  } else {
    this.members = members;
  }

  while (this.members.length < pop_size) {
    this.members.push(new Phenotype());
  }
}

Population.prototype.sort = function() {
  this.members.sort(function(a, b) {
    return b.score - a.score;
  });
}

Population.prototype.push = function(new_member) {
  this.sort();
  if (this.members[this.pop_size - 1].score < new_member.score) {
    this.members.push(new_member);
    this.sort();
    this.members.length = this.pop_size;
  }
}

function Phenotype(weights, score) {
  if (weights) {
    this.weights = weights;
  } else {
    this.weights = this.generateRandomWeights();
  }
  if (score) {
    this.score = score;
  }
}

Phenotype.prototype.generateRandomWeights = function() {
  length = 120;
  while (length--) {
    this.weights += String.fromCharCode(Math.floor(Math.random() * 255));
  }
}
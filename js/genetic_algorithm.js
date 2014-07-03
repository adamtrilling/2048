function Population(size, members) {
  this.pop_size = size;
  if (members === null || typeof members == 'undefined') {
    this.members = [];
  } else {
    this.members = members;
  }

  while (this.members.length < this.pop_size) {
    var newMember = new Phenotype();
    newMember.generateRandomWeights();
    this.members.push(newMember);
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

Population.prototype.getMember = function() {
  var weights = "";

  // search for a member one with no score
  this.sort();
  for (i in this.members) {
    if (this.members[i].score == 0) {
      return this.members[i];
    }
  }

  // mate
  var parent1 = Math.floor(Math.random() * (this.members.length - 2)),
      parent2 = Math.floor(Math.random() * (this.members.length - 2)),
      new_vals = [];

  while (parent1 == parent2) {
    parent2 = Math.floor(Math.random() * (this.members.length - 2));
  }
  new_vals = this.members[parent1].mate(this.members[parent2]);
  this.members.splice(this.members.length - 2, 2, new_vals[0], new_vals[1]);

  // mutate, except the first one
  for (var i = 1; i < this.members.length; i++) {
    this.members[i].mutate(0.75);
  }

  return this.members[this.members.length - 1];
}

Population.prototype.topScore = function() {
  this.sort();
  return this.members[0].score;
}

Population.prototype.to_s = function() {
  var retval = "";
  for (var i = 0; i < this.members.length; i++) {
    retval = retval + "" + this.members[i].score + " - " + this.members[i].weights + "\n";
  }
  return retval;
}

function Phenotype(weights, score) {
  if (weights) {
    this.weights = weights;
  } else {
    this.generateRandomWeights();
  }
  if (score) {
    this.score = score;
  } else {
    this.score = 0;
  }
}

Phenotype.prototype.generateRandomWeights = function() {
  length = 240;
  this.weights = "";
  while (length--) {
    this.weights += String.fromCharCode(Math.floor(Math.random() * 255));
  }
}

Phenotype.prototype.mate = function(phenotype) {
  var pivot = Math.round(this.weights.length / 2) - 1;

  var child1 = this.weights.substr(0, pivot) + phenotype.weights.substr(pivot);
  var child2 = phenotype.weights.substr(0, pivot) + this.weights.substr(pivot);

  return [new Phenotype(child1, 0), new Phenotype(child2, 0)];
};

Phenotype.prototype.mutate = function(chance) {
  if (Math.random() > chance) return;

  var index = Math.floor(Math.random() * this.weights.length);
  var upOrDown = Math.random() <= 0.5 ? -1 : 1;
  var newChar = String.fromCharCode(this.weights.charCodeAt(index) + upOrDown);
  var newString = '';
  for (i = 0; i < this.weights.length; i++) {
    if (i == index) newString += newChar;
    else newString += this.weights[i];
  }

  this.weights = newString;
}

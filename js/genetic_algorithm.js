function Population(size, members) {
  this.pop_size = size;
  if (members === null) {
    this.members = [];
  } else {
    this.members = members;
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
  this.weights = weights;
  this.score = score;
}
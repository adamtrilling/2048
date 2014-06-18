function AI() {
  
};

AI.prototype.move = function(cells) {
  // 0: up, 1: right, 2: down, 3: left
  return Math.floor((Math.random() * 4));
}
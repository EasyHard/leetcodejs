module.exports = {};
module.exports.buildTree = function buildTree(seq, Node) {
  if (seq.length === 0) return null;
  var curr = seq.shift();
  if (curr !== '#') {
    var node = new Node(curr);
    node.left = buildTree(seq, Node);
    node.right = buildTree(seq, Node);
  }
  return node;
};

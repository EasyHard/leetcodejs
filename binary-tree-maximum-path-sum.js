var DEBUG = process.env.DEBUG;
var inf = Math.pow(2, 32);
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

function c(node) {
  if (!node) return -inf;
  if (node.c) return node.c;
  return node.c = Math.max(c(node.left), c(node.right), 0) + node.val;
}



/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function(root) {
  if (!root) return -inf;
  var ans = Math.max(c(root), c(root.left) + c(root.right) + root.val);
  return ans = Math.max(ans, maxPathSum(root.left), maxPathSum(root.right));
};


function test(f) {

  [
    [{val: 1, left: {val:2}, right: {val:3}}],
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(maxPathSum);

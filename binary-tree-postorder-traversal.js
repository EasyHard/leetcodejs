var DEBUG = process.env.DEBUG;

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
  if (!root) return [];
  var stack = [];
  var ans = [];
  stack.push({
    node: root,
    next: 'L'
  });
  while (stack.length) {
    var c = stack.pop();
    if (!c.node) continue;
    if (c.next === 'L') {
      stack.push({
        node: c.node,
        next: 'R'
      });
      stack.push({
        node: c.node.left,
        next: 'L'
      });
    } else if (c.next === 'R') {
      stack.push({
        node: c.node
      });
      stack.push({
        node: c.node.right,
        next: 'L'
      });
    } else {
      ans.push(c.node.val);
    }
  }
  return ans;
};

function test(f) {

  [
    [{val: 9, left: {val: 1}, right: {val: 10}}]
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(postorderTraversal);

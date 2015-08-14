var DEBUG = process.env.DEBUG;

/**
 * @param {number} n
 * @return {string[]}
 */
var ans = [];
function dfs(nleft, nright, curr) {
  if (nleft === 0 && nright === 0) {
    ans.push(curr);
    return;
  }
  if (nleft > 0)
    dfs(nleft-1, nright, curr+'(');
  if (nright > nleft)
    dfs(nleft, nright-1, curr+')');
}
var generateParenthesis = function(n) {
  ans = [];
  dfs(n, n, '');
  return ans;
};


function test(f) {
  [
    [3],
    [2],
    [4]
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}
if (DEBUG) test(generateParenthesis);

var DEBUG = process.env.DEBUG;

var charlist = {
  1: "",
  2: "abc",
  3: "def",
  4: "ghi",
  5: "jkl",
  6: "mno",
  7: "pqrs",
  8: "tuv",
  9: "wxyz"
};
var ans = [];
function dfs(digits, nd, curr) {
  if (nd === digits.length) {
    if (curr.length)
      ans.push(curr);
    return;
  }
  var cd = digits[nd];
  for (var i = 0; i < charlist[cd].length; i++) {
    var cc = charlist[cd][i];
    dfs(digits, nd+1, curr+cc);
  }
}

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  ans = [];
  var check = '';
  for (var i = 1; i <= 9; i++)
    check += charlist[i];
  if (check.length != 26) throw new Error('bad charlist.');
  dfs(digits, 0, '');
  return ans;
};


if (DEBUG) {
  [
    "3",
    "23",
  ].forEach(function (input) {
    console.log(letterCombinations(input));
  });
}

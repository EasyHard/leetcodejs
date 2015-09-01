var DEBUG = process.env.DEBUG;


/**
 * @param {number} n
 * @return {string[][]}
 */
var loc = [];
var ans = [];
var usedCols = {};
var N;
function cons(t) {
  var s = '';
  for (var i = 0; i < t; i++)
    s += '.';
  s += 'Q';
  for (var i = t + 1; i < N; i++)
    s += '.';
  return s;
}

function dfs(d) {
  if (d === N) {
    var tmp = [], t1 = [];
    for (var j = 0; j < N; j++) {
      tmp.push(cons(loc[j]));
      //t1.push(cons(N-loc[j]));
    }
    ans.push(tmp);
    return;
  }
  for (var i = 0; i < N; i++) {
    if (!usedCols[i]) {
      var bad = false;
      for (var j = 0; j < d; j++)
        if (d - j === Math.abs(i - loc[j]))
          bad = true;
      if (!bad) {
        usedCols[i] = true;
        loc.push(i);
        dfs(d+1);
        loc.pop();
        usedCols[i] = false;
      }
    }
  }
}
var solveNQueens = function(n) {
  N = n;
  ans = [];
  usedCols = {};
  //for (var i = 0; i < Math.floor((n + 1) / 2); i++) {
    loc = [];
    dfs(0);
  //}
  return ans;
};


function test(f) {

  [
    [4],
    [5],
    [6],
    [7],
    [8],
    [9]
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(solveNQueens);

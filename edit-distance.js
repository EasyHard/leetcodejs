var DEBUG = process.env.DEBUG;

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
  var n = word1.length; var m = word2.length;
  var t = [];
  for (var i = 0; i <= n; i++) {
    var row = [];
    for (var j = 0; j <= m; j++) {
      row.push(undefined);
    }
    t.push(row);
  }
  t[n][m] = 0;
  function f(i, j) {
    if (t[i][j] !== undefined) return t[i][j];
    t[i][j] = Number.MAX_SAFE_INTEGER;
    if (j < m) t[i][j] = Math.min(t[i][j], f(i, j+1) + 1);
    if (i < n) t[i][j] = Math.min(t[i][j], f(i+1, j) + 1);
    if (i < n && j < m) t[i][j] = Math.min(t[i][j], f(i+1, j+1) + 1);
    if (i < n && j < m && word1[i] === word2[j]) t[i][j] = Math.min(t[i][j], f(i+1, j+1));
    return t[i][j];
  }
  return f(0, 0);
};

function test(f) {

  [
    ["abc", "abc"],
    ["bc", "abc"],
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(minDistance);

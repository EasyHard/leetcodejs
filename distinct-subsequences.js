var DEBUG = process.env.DEBUG;

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */

function f(s, t) {
  var memo = {};
  function g(i, j) {
    if (typeof memo[[i,j]] !== 'undefined') return memo[[i, j]];
    if (j === t.length && i === s.length) {
        return memo[[i, j]] = 1;
    }
    if (j === t.length && i !== s.length) return memo[[i, j]] = 0;
    if (j !== t.length && i === s.length) return memo[[i, j]] = 0;

    var ans = 0;
    if (t[j] === s[i])
      ans = g(i+1, j+1);
    ans += g(i+1, j);
    return memo[[i, j]] = ans;
  }
  return g;
}
var numDistinct = function(s, t) {
  var g = [];
  // g(s.length, j)
  for (var i = 0; i < t.length; i++) g.push(0);
  g.push(1);
  for (var i = s.length - 1; i >= 0; i--) {
    // for new i
    for (var j = 0; j < t.length; j++)
      if (t[j] === s[i]) g[j] += g[j+1];
  }
  return g[0];
};

function test(f) {

  [
    ["a", "a"],
    ["rabbbit", "rabbit"],
    ['aaaaaaaaaaaaaaaaaaaaa', 'aaaa'],
    ['stt', 's'],
    ["daacaedaceacabbaabdccdaaeaebacddadcaeaacadbceaecddecdeedcebcdacdaebccdeebcbdeaccabcecbeeaadbccbaeccbbdaeadecabbbedceaddcdeabbcdaeadcddedddcececbeeabcbecaeadddeddccbdbcdcbceabcacddbbcedebbcaccac", "ceadbaa"],
//    require('./distinct-subsequences.in1.js')
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(numDistinct);

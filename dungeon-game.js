var DEBUG = process.env.DEBUG;

/**
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function(dungeon) {
  var n = dungeon.length;
  var m = dungeon[0].length;
  var ans = [];
  for (var i = 0; i < m; i++) ans.push(0);
  ans.push(Math.pow(2, 31));
  ans[m-1] = dungeon[n-1][m-1] > 0 ? 1 : -dungeon[n-1][m-1] + 1;
  for (var i = m-2; i >= 0; i--) {
    var t = ans[i+1];
    t = t - dungeon[n-1][i];
    if (t <= 0) t = 1;
    ans[i] = t;
  }
  for (var j = n-2; j >= 0; j--) {
    for (var i = m - 1; i >= 0; i--) {
      t = Math.min(ans[i+1], ans[i]);
      t = t - dungeon[j][i];
      if (t <= 0) t = 1;
      ans[i] = t;
    }
  }
  return ans[0];
};


function test(f) {

  [
    [[[-2, -3, 3],
     [-5, -10, 1],
     [10, 30, -5]]
    ]
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(calculateMinimumHP);

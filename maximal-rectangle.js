var DEBUG = process.env.DEBUG;

var arrayMax = arr => Math.max.apply(undefined, arr);
var deepCopy = matrix => matrix.map(row => row.slice(0));
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function(matrix) {
  var n = matrix.length;
  if (n === 0) return 0;
  var m = matrix[0].length;
  var r = [];
  matrix.forEach(row => {
    var result = [];
    for (var i = row.length - 1; i >= 0; i--) {
      if (row[i] === '1') {
        result.unshift((result[0] || 0) + 1);
      } else {
        result.unshift(0);
      }
    }
    r.push(result);
  });
  // r is also f(i, j, 0);
  var f = deepCopy(r);
  var ans = arrayMax(r.map(arrayMax));
  // updating f and ans.
  for (var k = 1; k < matrix.length; k++) {
    // for new k
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < m; j++) {
        if (i+k >= matrix.length) {
          f[i][j] = 0;
        } else {
          f[i][j] = Math.min(r[i][j], f[i+1][j]);
          ans = Math.max(ans, f[i][j]*(k+1));
        }
      }
    }
  }
  return ans;
};

function test(f) {

  [
    [['1011',
      '1101',
      '1111',
      '0110',
     ]],
    [['1111',
      '1101',
      '1111',
      '1110',
     ]],
    [['1']],
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(maximalRectangle);

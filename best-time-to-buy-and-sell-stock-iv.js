var DEBUG = process.env.DEBUG;

var maxProfit = function(k, prices) {
  var inf = Math.pow(2, 31);
  var p = prices; p.push(-inf);
  var np = p.length;
  if (k >= np) {
    var ans = 0;
    for (var i = 0; i < np - 1; i++)
      if (p[i+1] > p[i]) ans += p[i+1] - p[i];
    return ans;
  }
  var f = [], b = [];
  for (var i = 0; i <= np; i++) {
    f.push(0);
    b.push(0);
  }
  b[np] = -inf; b[np-1] = inf;
  for (var t = 1; t <= k; t++) {
    // b for new k
    for (var i = np - 2; i >= 0; i--) {
      b[i] = Math.max(b[i+1], f[i+2]) + p[i+1] - p[i];
    }
    // f for new k
    for (var i = np - 2; i >= 0; i--) {
      f[i] = Math.max(b[i], f[i+1]);
    }
  }
  return f[0];
};


function test(f) {

  [
    [1, [2,1]],
    [1, [2,1, 5, 7]],
    [3, [2,1, 5, 7, 3, 7]],
    require('./bttbass4.in1.js'),
    require('./bttbass4.in2.js')
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(maxProfit);

var DEBUG = process.env.DEBUG;

var maxProfit = function(prices) {
  var inf = Math.pow(2, 31);
  var p = prices; p.push(-inf);
  var np = p.length;
  var f = [], b = [];
  for (var i = 0; i <= np; i++) {
    f.push(0);
    b.push(0);
  }
  b[np] = -inf; b[np-1] = inf;
  for (var t = 1; t <= 2; t++) {
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

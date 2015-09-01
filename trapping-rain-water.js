var DEBUG = process.env.DEBUG;


/**
 * @param {number[]} height
 * @return {number}
 */
var trap1 = function(height) {
  var upper = 0;
  for (var i = 0; i < height.length; i++)
    if (height[i] > upper) upper = height[i];
  var ans = 0;
  for (var curr = 1; curr <= upper; curr++) {
    var temp = height.map(function (h) {
      return h >= curr ? 1 : 0;
    });
    var lo = 0;
    while (temp[lo] !== 1 && lo !== temp.length) lo++;
    var hi = temp.length - 1;
    while (temp[hi] !== 1 && hi >= 0) hi--;
    if (hi === lo || hi < 0 || lo === temp.length) break;
    for (var i = lo; i < hi; i++)
      ans += temp[i] === 0 ? 1 : 0;
  }
  return ans;
};

var trap = function(height) {
  var f = {}, g = {};
  var h = 0;
  for (var i = 0; i < height.length; i++) {
    f[i] = h;
    h = Math.max(h, height[i]);
  }
  h = 0;
  for (var i = height.length - 1; i >= 0; i--) {
    g[i] = h;
    h = Math.max(h, height[i]);
  }
  var ans = 0;
  for (var i = 0; i < height.length; i++) {
    h = Math.min(f[i], g[i]);
    if (height[i] < h)
      ans += h - height[i];
  }
  return ans;
};

function test(f) {

  [
    [[0,1,0,2,1,0,1,3,2,1,2,1]],
    [[2,0,2,1,2]],
    [[4]],
    [[199*199*199,0, 199*199*199]]
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(trap);

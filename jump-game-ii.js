var DEBUG = process.env.DEBUG;

/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
  var n = nums.length;
  var f = [];
  f[n-1] = 0;
  for (var i = n - 2; i >= 0; i--) {
    if (i + nums[i] >= n - 1) f[i] = 1;
    else {
      var ans = Number.MAX_SAFE_INTEGER;
      for (var j = nums[i]; j >= 1; j--) {
        ans = Math.min(ans, f[i+j] + 1);
        if (ans === 2 || ans === f[i+1] && nums[i] < nums[i+1])
          break;
      }
      f[i] = ans;
    }
  }
  return f[0];
};

function test(f) {

  [
    [[5]],
    [[2,3,1,1,4]],
    require('./jump-game-ii.in1.js'),
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(jump);

var DEBUG = process.env.DEBUG;

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
  nums = nums.sort(function (a, b) {
    return a - b;
  });
  var len = nums.length;
  var best = Math.pow(2, 31);
  for (var i = 0; i < len; i++) {
    var v = nums[i];
    var j = i + 1;
    var k = len - 1;
    while (j < len && k >= 0 && j < k) {
      var curr = v + nums[j] + nums[k];
      if (Math.abs(curr - target) < Math.abs(best - target))
        best = curr;
      if (curr > target) {
        k--;
      } else if (curr < target) {
        j++;
      } else {
        break;
      }
    }
  }
  return best;
};

if (DEBUG) {
  [
    [[-1, 2, 1, -4], 1],
    [[-1, 2, 1, -4], -99],
    [[1,2,3,4,5,6], 14]
  ].forEach(function (input) {
    console.log(threeSumClosest.apply(undefined, input));
  });
}

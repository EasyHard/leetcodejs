var DEBUG = process.env.DEBUG;
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
  nums = nums.sort(function (a, b) {
    return a - b;
  });
  var ans = [];
  for (var i = 0; i < nums.length;) {
    for (var l = i + 1; l < nums.length;) {
      var fixed = nums[i] + nums[l];
      var j = l + 1; var k = nums.length - 1;
      while (j < nums.length && k >= 0 && j < k) {
        var curr = fixed + nums[j] + nums[k];
        if (curr === target) {
          ans.push([nums[i], nums[l], nums[j], nums[k]]);
          do {
            j++;
          } while (j < nums.length && nums[j-1] === nums[j])
          do {
            k--;
          } while (k >= 0 && nums[k+1] === nums[k])
        } else if (curr < target) {
          j++;
        } else {
          k--;
        }
      }
      do {
        l++;
      } while (l < nums.length && nums[l] == nums[l-1]);
    }
    do {
      i++;
    } while (i < nums.length && nums[i] == nums[i-1]);
  }
  return ans;
};


if (DEBUG) {
  [
    [[], 0],
    [[1, 0, -1, 0, -2, 2], 0],
    [[1, 0, -1, 0, -2, 2, 2], 0]
  ].forEach(function (input) {
    console.log(fourSum.apply(undefined, input));
  });
}

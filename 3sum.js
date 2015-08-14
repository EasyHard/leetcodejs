var DEBUG = process.env.DEBUG;

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  nums = nums.sort(function (a, b) {
    return a - b;
  });
  var ans = [];
  for (var i = 0; i < nums.length;) {
    var fixed = nums[i];
    var j = i + 1; var k = nums.length - 1;
    while (j < nums.length && k >= 0 && j < k) {
      var curr = fixed + nums[j] + nums[k];
      if (curr === 0) {
        ans.push([fixed, nums[j], nums[k]]);
        do {
          j++;
        } while (j < nums.length && nums[j-1] === nums[j])
        do {
          k--;
        } while (k >= 0 && nums[k+1] === nums[k])
      } else if (curr < 0) {
        j++;
      } else {
        k--;
      }
    }
    do {
      i++;
    } while (i < nums.length && nums[i] == nums[i-1]);
  }
  return ans;
};

if (DEBUG) {
  [
    [],
    [-1,0,1,2,-1,-4],
    [1, 2, -1],
    [-1, -1, -1, -1, -1, -1, 2, 0, 0],
    [-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6]
  ].forEach(function (input) {
    console.log(threeSum(input));
  });
}

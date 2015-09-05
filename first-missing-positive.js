var DEBUG = process.env.DEBUG;

/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
  // make the array 1-indexed. If you dont like this trick,
  // the following loop needs to be more carefully,
  nums.unshift(-1);
  for (var i = 1; i < nums.length; i++) {
    if (nums[i] !== i && nums[i] > 0 && nums[i] < nums.length) {
      var to = nums[i];
      while (to > 0 && to < nums.length && nums[to] !== to && to !== i) {
        var tmp = nums[to];
        nums[to] = to;
        to = tmp;
      }
      if (to === i) nums[i] = to;
    }
  }
  console.log(nums);
  for (var i = 1; i < nums.length; i++)
    if (nums[i] !== i) return i;
  return nums.length;
};

function test(f) {

  [
    [[1, 2, 0]],
    [[3,4,-1,1]],
    [[1]],
    [[1,2,3,5]],
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(firstMissingPositive);

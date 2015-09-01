var DEBUG = process.env.DEBUG;

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if (nums.length === 0) return 0;
    var count = 0; var j = 1;
    for (var i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i-1]) count++;
        else {
            nums[j] = nums[i];
            j++;
        }
    }
    nums.length -= count;
    return nums.length;
};



function test(f) {

  [
    [[]]
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test();

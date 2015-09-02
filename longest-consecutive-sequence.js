var DEBUG = process.env.DEBUG;

/**
 * @param {number[]} nums
 * @return {number}
 */

 var memo = {};
 var h = {};
 function t(n) {
    if (memo[n]) return memo[n];
    if (h[n-1]) return memo[n] = t(n-1) + 1;
    return memo[n] = 1;
 }
var longestConsecutive = function(nums) {
    memo = {};
    h = {};
    nums.forEach(function (n) {
        h[n] = true;
    });
    var max = 0;
    nums.forEach(function (n) {
        if (t(n) > max) {
            max = t(n);
        }
    });
    return max;
};

function test(f) {

  [
    [[]]
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test();

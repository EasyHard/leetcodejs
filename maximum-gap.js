var DEBUG = process.env.DEBUG;


/**
 * @param {number[]} nums
 * @return {number}
 */

Array.prototype.max = function () {
  return this.reduce((p, c) => Math.max(p, c), -1);
};

Array.prototype.min = function () {
  return this.reduce((prev, curr) => Math.min(prev, curr), Math.pow(2, 32));
};
var maximumGap = function(nums) {
  if (nums.length < 2) return 0;
  var nb = nums.length*2;
  var min = nums.min();
  var max = nums.max();
  var len = Math.ceil( (max-min) / nb);

  var b = {};
  nums.forEach(num => {
    var idx = Math.floor((num - min) / len);
    b[idx] = b[idx] || {nums: []};
    b[idx].nums.push(num);
  });
  for (var idx in b) {
    b[idx].max = b[idx].nums.max();
    b[idx].min = b[idx].nums.min();
  }
  var ans = 0;
  for (var i = 0; i <= nb;) {
    var j = i + 1;
    while (j <= nb && !b[j]) j++;
    if (j > nb) break;
    ans = Math.max(ans, b[j].min - b[i].max);
    i = j;
  }
  return ans;
};

function test(f) {

  [
    [[1, 2]],
    [[2, 2, 2, 2, 2, 2]],
    [[1,2,3,4,5]],
    [[77, 55, 22, 33, 1]]
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(maximumGap);

var DEBUG = process.env.DEBUG;
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

 function push(q, num, i) {
    while (q.length !== 0 && q[q.length - 1].v < num)
        q.pop();
    q.push({
        v: num,
        pos: i
    });
 }
var maxSlidingWindow = function(nums, k) {
    if (nums.length === 0) return [];
    var q = [], ans = [];
    for (var i = 0; i < k; i++) {
        push(q, nums[i], i);
    }
    for (var st = 0; st <= nums.length - k; st++) {
        ans.push(q[0].v);
        if (q[0].pos === st) q.shift();
        if (st + k < nums.length)
            push(q, nums[st+k], st+k);
    }
    return ans;
};



function test(f) {

  [
    [[]]
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test();

var DEBUG = process.env.DEBUG;

/**
 * @param {number[]} height
 * @return {number}
 */
var largestRectangleArea = function(height) {
  if (height.length === 0) return 0;
  function recttol(height) {
    var ans = [];
    var stack = [];
    height.forEach((h, idx) => {
      while (stack.length && stack[stack.length - 1].h > h) {
        var curr = stack.pop();
        ans[curr.idx] = curr.h * (idx - curr.idx);
      }
      stack.push({h: h, idx: idx});
    });
    while (stack.length) {
      var curr = stack.pop();
      ans[curr.idx] = curr.h * (height.length - curr.idx);
    }
    return ans;
  }
  var l = recttol(height);
  var r = recttol(height.reverse());
  l.reverse();
  var t = l.map((x, idx) => x + r[idx] - height[idx]);
  return Math.max.apply(undefined, t);
};

function test(f) {

  [
    [[5]],
    [[5,6, 5]],
    [[5,4,5]],
    [[2,1,5,6,2,3]],
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(largestRectangleArea);

var DEBUG = process.env.DEBUG;

function nfind(nums, st, ed, target) {
  if (ed - st <= 2) {
    for (var i = st; i < ed; i++)
      if (nums[i] === target) return i;
    return -1;
  }
  // at least 3 nums
  var mid = (st + ed) >> 1;
  if (nums[mid] === target) return mid;
  if (nums[mid] < target) {
    return nfind(nums, mid+1, ed, target);
  } else {
    return nfind(nums, st, mid, target);
  }
}

function find(nums, st, ed, target) {
  if (ed - st <= 2) {
    for (var i = st; i < ed; i++)
      if (nums[i] === target) return i;
    return -1;
  }
  // at least 3 nums
  var mid = (st + ed) >> 1;
  if (nums[mid] === target) return mid;
  if (nums[mid] > nums[st]) {
    if (target >= nums[st] && target < nums[mid]) {
      return nfind(nums, st, mid, target);
    } else {
      return find(nums, mid, ed, target);
    }
  } else {
    if (target > nums[mid] && target < nums[st]) {
      return nfind(nums, mid, ed, target);
    } else {
      return find(nums, st, mid+1, target);
    }
  }
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  return find(nums, 0, nums.length, target);
};

function test(f) {

  for (var i = 0; i <= 7; i++)
    console.log(f([4, 5, 6, 7, 0, 1, 2], i));
  [
    [[4,5,6,7,0,1,2], -2],
    [[2, 1], -2],
    [[2, 1], 1],
    [[2, 1], 0],
    [[], 0],
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(search);

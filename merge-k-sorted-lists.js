var DEBUG = process.env.DEBUG;

function Heap(less) {
  this.less = less;
  this.array = [];
  this.length = 0;
}

Heap.prototype.insert = function (element) {
  this.array[this.length + 1] = element;
  this.length = this.length + 1;
  this.fixup(Math.floor(this.length/2));
};

Heap.prototype.top = function () {
  if (this.length <= 0)
    throw new Error('No top element.');
  return this.array[1];
};

Heap.prototype.pop = function () {
  if (this.length <= 0)
    throw new Error('No top element.');
  var ans = this.array[1];
  this.array[1] = this.array[this.length];
  this.length = this.length - 1;
  this.fixdown(1);
  return ans;
};

Heap.prototype.fixup = function (idx) {
  while (idx !== 0 && this.fix(idx) !== idx) {
    idx = Math.floor(idx / 2);
  }
};

Heap.prototype.fixdown = function (idx) {
  var minp;
  while ((minp = this.fix(idx)) !== idx) {
    idx = minp;
  }
};

Heap.prototype.fix = function (idx) {
  var leftidx = idx*2;
  var rightidx = idx*2+1;
  var minp = idx;
  var self = this;
  [leftidx, rightidx].forEach(function (compareIdx) {
    if (compareIdx <= self.length && self.less(self.array[compareIdx], self.array[minp]))
      minp = compareIdx;
  });
  if (minp !== idx) {
    var tmp = this.array[minp];
    this.array[minp] = this.array[idx];
    this.array[idx] = tmp;
  }
  return minp;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  var head = {
    val: null,
    next: null
  };
  var curr = head;

  function compare(a, b) {
    if (b === null) return true;
    if (a === null) return false;
    return a.val < b.val;
  }

  var heap = new Heap(compare);

  for (var i = 0; i < lists.length; i++) {
    heap.insert(lists[i]);
  }

  while (heap.length !== 0 && heap.top() !== null) {
    var min = heap.pop();
    curr.next = min;
    curr = curr.next;
    heap.insert(min.next);
  }
  return head.next;
};


function test(f) {
  console.log('--------Test for Heap----------');
  var heap = new Heap(function (a, b) {
    return a < b;
  });
  var heapTestSize = 100;
  for (var i = 0; i < heapTestSize; i++) {
    heap.insert(Math.random());
  }
  var prev = null;
  for (var i = 0; i < heapTestSize; i++) {
    var curr = heap.pop();
    process.assert(prev === null || prev <= curr, 'heap is bad.');
    prev = curr;
  }
  console.log('------Test for Heap Passed-------');
  [
    [[]]
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}
if (DEBUG) test(mergeKLists);

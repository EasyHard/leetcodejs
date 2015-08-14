var DEBUG = process.env.DEBUG;

function Heap(f) {
  this.f = f;
  this.array = [];
  this.length = 0;
}

Heap.prototype.insert = function (element) {

};

Heap.prototype.top = function () {
  if (this.length <= 0)
    throw new Error('No top element.');
  return this.array[0];
};

Heap.prototype.pop = function () {
  if (this.length <= 0)
    throw new Error('No top element.');
  var ans = this.array[0];
  this.array[0] = this.array[this.length - 1];
  this.fixup(0);
  return ans;
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
  var minp;

  while (true) {
    minp = null;
    for (var i = 0; i < lists.length; i++) {
      if (lists[i] !== null) {
        if (minp === null || lists[i].val < lists[minp].val) {
          minp = i;
        }
      }
    }
    if (minp === null) break;
    curr.next = lists[minp];
    curr = curr.next;
    lists[minp] = lists[minp].next;
  }
  return head.next;
};

function test(f) {
  [
    [[[1,2,3], []]]
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}
if (DEBUG) test(mergeKLists);

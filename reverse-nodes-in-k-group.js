var DEBUG = process.env.DEBUG;

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
  if (k === 1) return head;
  var p = {
    val: null,
    next: head
  };
  var length = 0;
  var curr = head;
  while (curr) {
    length++;
    curr = curr.next;
  }
  var nGroup = Math.floor(length / k);
  var groupHead = p, groupTail;
  while (nGroup) {
    groupTail = forward(groupHead, k);
    reverse(groupHead, groupTail);
    groupHead = forward(groupHead, k);
    nGroup--;
  }
  return p.next;
};

// head->a->b->c->tail->x ==>
// head->tail->c->b->a->x
function reverse(head, tail) {
  var c = head.next;
  var prev = head;
  while (prev !== tail) {
    var tmp = c.next;
    c.next = prev;
    prev = c;
    c = tmp;
  }
  head.next.next = c;
  head.next = tail;
}

function forward(node, step) {
  while (step) {
    node = node.next;
    step--;
  }
  return node;
}

function test(f) {

  [
    [[]]
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test();

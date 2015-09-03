var DEBUG = process.env.DEBUG;

function Node(k, v, prev, next) {
  this.k = k;
  this.v = v;
  this.prev = prev;
  this.next = next;
}

Node.prototype.remove = function () {
  var prev = this.prev;
  var next = this.next;
  prev.next = next;
  next.prev = prev;
};
Node.prototype.insertAfter = function (node) {
  var next = this.next;
  this.next = node;
  node.next = next;
  node.prev = this;
  next.prev = node;
};
/**
 * @constructor
 */
var LRUCache = function(capacity) {
  this.head = new Node();
  this.tail = new Node();
  this.head.next = this.tail;
  this.tail.prev = this.head;
  this.m = {};
  this.size = 0;
  this.capacity = capacity;
};

/**
 * @param {number} key
 * @returns {number}
 */
LRUCache.prototype.get = function(key) {
  if (this.m[key]) {
    this.lift(this.m[key]);
    return this.m[key].v;
  } else {
    return -1;
  }
};

LRUCache.prototype.lift = function (node) {
  node.remove();
  this.head.insertAfter(node);
};

/**
 * @param {number} key
 * @param {number} value
 * @returns {void}
 */
LRUCache.prototype.set = function(key, value) {
  var node;
  if (this.m[key]) {
    node = this.m[key];
    this.lift(node);
    node.v = value;
  } else {
    if (this.size === this.capacity) {
      var r = this.tail.prev;
      delete this.m[r.k];
      r.remove();
      this.size--;
    }
    node = new Node(key, value);
    this.head.insertAfter(node);
    this.m[key] = node;
    this.size++;
  }
};

if (DEBUG) {
  var cache = new LRUCache(1);
  cache.set(2, 1);
  console.log(cache.get(2));
  cache.set(2, 3);
  console.log(cache.get(2));
  cache.set(4, 3);
  console.log(cache.get(2));
  console.log(cache.get(4));
}

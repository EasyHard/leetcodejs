var DEBUG = process.env.DEBUG;

function Node(st, ed) {
  this.st = st;
  this.ed = ed;
  if (ed - st > 1) {
    this.l = new Node(st, (st+ed) >> 1);
    this.r = new Node((st+ed) >> 1, ed);
  } else if (ed - st === 1) {
    this.l = new Node(st, st);
    this.r = new Node(ed, ed);
  }
  this.c = false;
}

Node.prototype.cover = function (st, ed) {
  if (st > ed) return;
  if (this.c) return ;
  if (this.st >= st && this.ed <= ed) {
    this.c = true;
    return ;
  }
  if ((ed <= this.st && st < this.st) || (st >= this.ed && ed > this.ed))
    return ;
  if (this.l) this.l.cover(st, ed);
  if (this.r) this.r.cover(st, ed);
  return ;
};

function dfs(tree, result) {
  if (!tree) return;
  if (tree.c) {
    if (result.length && result[result.length - 1].end === tree.st) {
      result[result.length - 1].end = tree.ed;
    } else {
      result.push(new Interval(tree.st, tree.ed));
    }
  } else {
    dfs(tree.l, result);
    dfs(tree.r, result);
  }
}

function Interval(start, end) {
    this.start = start;
    this.end = end;
}

Interval.prototype.toArray = function () {
  return [this.start, this.end];
};
/**
 * @param {Interval[]} intervals
 * @return {Interval[]}
 */
var merge = function(intervals) {
  var left = Math.min.apply(undefined, intervals.map(i => i.start));
  var right = Math.max.apply(undefined, intervals.map(i => i.end));
  var tree = new Node(left, right);
  intervals.forEach(i => tree.cover(i.start, i.end));
  var result = [];
  dfs(tree, result);
  return result.map(function (i) {
    return i.toArray();
  });
};

function buildInterval(array) {
  return new Interval(array[0], array[1]);
}
function test(f) {

  [
    [ [1,3], [2, 6], [8, 10], [15, 18]],
    [ [1, 3] ],
    [ [0, 0] ],
    [ [0, 0], [2, 2] ],
    [ [0, 0], [2, 2], [2, 7] ],
    [ [0, 0], [5, 5], [0, 8] ],
  ].forEach(function (input) {
    input = input.map(buildInterval);
    console.log(f.call(undefined, input).map(i => i.toArray ? i.toArray() : i ));
  });
}

if (DEBUG) test(merge);

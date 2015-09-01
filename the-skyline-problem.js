var DEBUG = process.env.DEBUG;

function Node(l, r, lo, hi) {
  this.l = l;
  this.r = r;
  this.lo = lo;
  this.hi = hi;
  this.maxh = this.height = 0;
}

Node.prototype.insert = function (lo, hi, height) {
  if (this.hi <= lo || this.lo >= hi) return;
  if (lo <= this.lo && hi >= this.hi) {
    if (this.maxh <= height) {
      this.maxh = this.height = height;
      return;
    } else {
      if ( this.height > height)
        return ;
    }
  }
  if (height >= this.maxh) this.maxh = height;
  if (this.height !== -1) {
    if (this.l) this.l.insert(this.lo, this.hi, this.height);
    if (this.r) this.r.insert(this.lo, this.hi, this.height);
  }
  if (this.l) this.l.insert(lo, hi, height);
  if (this.r) this.r.insert(lo, hi, height);
  this.height = -1;
}

function createTree(lo, hi) {
  var l, r;
  var mid = Math.floor((lo+hi) / 2);
  if (lo !== mid && lo + 1 !== hi) {
    l = createTree(lo, mid);
  }
  if (hi !== mid && lo + 1 !== hi) {
    r = createTree(mid, hi);
  }
  return new Node(l, r, lo, hi);
}


var ans, curr, num2idx, idx2num;
function dfs(node) {
  if (node.height === -1 && node.maxh !== -1) {
    if (node.l) dfs(node.l);
    if (node.r) dfs(node.r);
    return ;
  }
  if (node.height !== curr) {
    ans.push([idx2num[node.lo], node.height]);
    curr = node.height;
  }
  return;
}
var getSkyline = function(buildings) {
  if (buildings.length === 0) return [];
  var st = buildings[0][0];
  var ed = 0;
  buildings.forEach(function (item) { if (item[1] > ed) ed = item[1];});
  var nums = [];
  buildings.forEach(function (item) { nums.push(item[0]); nums.push(item[1]);});
  nums.sort(function (a, b) { return a - b;});
  num2idx = {};
  idx2num = {};
  for (var i = 0; i < nums.length; i++) {
    var num = nums[i];
    if (num2idx[num] === undefined) {
      num2idx[num] = i;
    }
    var idx = num2idx[num];
    idx2num[idx] = num;
  }
  var tree = createTree(num2idx[st], num2idx[ed]);
  buildings.forEach(function (data) {
    tree.insert(num2idx[data[0]], num2idx[data[1]], data[2]);
  });
  ans = []; curr = -1;
  dfs(tree);
  ans.push([ed, 0]);
  return ans;

};

function test(f) {

  [
    [ [[3,5,10]] ],
    [ [[2,9,10], [3,7,15], [5,12,12], [15,20,10], [19,24,8]] ],
    [ [[2,4,7],[2,4,5],[2,4,6]] ]
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(getSkyline);

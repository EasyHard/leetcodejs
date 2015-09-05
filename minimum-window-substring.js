var DEBUG = process.env.DEBUG;

function MultiSet(elements) {
  this.h = {};
  this.size = 0;
  elements = elements || [];
  elements.forEach(ele => {
    this.add(ele);
  }, this);
}

MultiSet.prototype.add = function(element) {
  this.h[element] = this.h[element] || 0;
  this.size += 1;
  this.h[element] += 1;
};

MultiSet.prototype.has = function (element) {
  return this.h[element] || 0;
};

MultiSet.prototype.delete = function (element) {
  if (!this.h[element]) return;
  this.size -= 1;
  this.h[element] -= 1;
};

MultiSet.prototype.clear = function () {
  this.size = 0;
  this.h = {};
};

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
  var keychar = new Set();
  var countT = new MultiSet();
  for (var i = 0; i < t.length; i++) {
    keychar.add(t[i]);
    countT.add(t[i]);
  }
  var hint = [];
  for (var i = s.length - 1; i >= 0; i--) hint.push(0);
  var lastidx = s.length;
  for (var i = s.length - 1; i >= 0; i--) {
    if (keychar.has(s[i])) {
      hint[i] = lastidx;
      lastidx = i;
    }
  }
  var seen = new MultiSet();
  var overflow = new MultiSet();
  var ans = {st: 0, end: s.length+1, length: s.length+1};
  var start;
  for (var i = 0; i < s.length; i++) {
    if (!keychar.has(s[i])) continue;
    if (seen.size === 0) {
      start = i;
    }
    seen.add(s[i]);
    if (seen.has(s[i]) > countT.has(s[i]))
      overflow.add(s[i]);
    while (seen.has(s[start]) > countT.has(s[start])) {
      overflow.delete(s[start]);
      seen.delete(s[start]);
      start = hint[start];
    }
    if (seen.size - overflow.size === countT.size) {
      if (i - start + 1 < ans.length) {
        ans.st = start;
        ans.end = i+1;
        ans.length = i - start + 1;
      }
    }
  }
  if (ans.length === s.length + 1)
    return "";
  return s.substring(ans.st, ans.end);
};

function test(f) {

  [
    require('./minimum-window-substring.in1.js'),
    ["AEBECBADEE", "BACG"],
    ["AEBECBADEE", "BAC"],
    ["AEBECBADEE", "BAC"],
p    ["AEBECBDEE", "BACD"],
    ["AEBECBADEE", "ABACD"],
  ].forEach(function (input) {
    console.log('output =', f.apply(undefined, input));
  });
}

if (DEBUG) test(minWindow);

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

function find(words, s) {
  var wordset = new Set(words);
  var wordmset = new MultiSet(words);
  var used = new MultiSet();
  var result = [];
  var i = 0;
  while (i !== s.length) {
    if (wordset.has(s[i]) && used.has(s[i]) !== wordmset.has(s[i])) {
      used.add(s[i]);
      if (used.size === wordmset.size) {
        result.push(i - wordmset.size + 1);
        used.delete(s[i - wordmset.size + 1]);
      }
      i++;
    } else if (!wordset.has(s[i])) {
      used.clear();
      i++;
    } else {
      for (var j = i - used.size; j < i && s[j] !== s[i]; j++) {
        used.delete(s[j]);
      }
      // always be able to find s[j] === s[i];
      used.delete(s[j]);
    }
  }
  return result;
}

/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function(s, words) {
  if (words.length === 0) return [];
  var wordlen = words[0].length;
  var result = [];
  for (var i = 0; i < wordlen; i++) {
    var splits = [];
    var j = i;
    while (j + wordlen <= s.length) {
      splits.push(s.substr(j, wordlen));
      j += wordlen;
    }
    var splitsidx = find(words, splits);
    result = result.concat(splitsidx.map(idx => idx*wordlen + i));
  }
  return result;
};

function test(f) {

  [
    ["barfoothefoobarman", ["foo", "bar"]],
    ["aabb", ["aa", "bb"]],
    ["aab", ["aa", "bb"]],
    ["aaaa", ["aa", "aa"]],
    ["aab", ["sadsdsdds"]],
    require('./substring-with-concatenation-of-all-words.in1.js'),
    ["wordgoodgoodgoodbestword", ["word","good","best","good"]],
    ["aawordgoodgoodgoodbestword", ["word","good","best","good"]]
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(findSubstring);

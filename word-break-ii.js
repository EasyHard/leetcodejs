var DEBUG = process.env.DEBUG;


function Node() {
  this.children = [];
}

Node.prototype.insert = function (s, idx) {
  if (idx === s.length) {
    this.children['$'] = new Node();
  } else {
    this.children[s[idx]] = this.children[s[idx]] || new Node();
    this.children[s[idx]].insert(s, idx+1);
  }
};

function buildTrie(words) {
  var trie = new Node();
  words.forEach(word => trie.insert(word, 0));
  return trie;
}

function getNext(s, idx, node, next) {
  if (!node) return next;
  if (node.children['$']) {
    next.push(idx);
  }
  if (idx === s.length) {
    return next;
  }
  return getNext(s, idx+1, node.children[s[idx]], next);
}

function dfs(s, jumpto, curr, result, ans, path) {
  if (curr === s.length) {
    ans.push(path.join(' '));
    return true;
  }
  if (result[curr] === false) return false;
  var p = false;
  jumpto[curr].forEach(next => {
    path.push(s.substring(curr, next));
    p = p || dfs(s, jumpto, next, result, ans, path);
    path.pop();
  });
  if (result[curr] === undefined)
    result[curr] = p;
}

/**
 * @param {string} s
 * @param {set<string>} wordDict
 * @return {string[]}
 */
var ans, trie;
var wordBreak = function(s, wordDict) {
  trie = buildTrie(wordDict);
  var jumpto = [];
  for (var i = 0; i < s.length; i++) {
    var next = [];
    jumpto.push(getNext(s, i, trie, next));
  }
  ans = [];
  dfs(s, jumpto, 0, [], ans, []);
  return ans;
};

function test(f) {

  [
    ["catsanddog", new Set(["cat", "cats", "and", "sand", "dog"])],
    ["at", new Set(["at", "t"])],
    ["", new Set(["at", "t"])],
    ["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab", ["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"]]
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(wordBreak);

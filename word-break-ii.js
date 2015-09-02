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

function dfs(s, idx, node, prefix, word) {
  if (node.children['$']) {
    prefix.push(word);
    dfs(s, idx, trie, prefix, '');
    prefix.pop();
  }
  if (idx === s.length) {
    if (node === trie) {
      ans.push(prefix.join(' '));
    }
    return ;
  }
  if (node.children[s[idx]]) {
    dfs(s, idx+1, node.children[s[idx]], prefix, word+s[idx]);
  }
}
/**
 * @param {string} s
 * @param {set<string>} wordDict
 * @return {string[]}
 */
var ans, trie;
var wordBreak = function(s, wordDict) {
  trie = buildTrie(wordDict);
  ans = [];
  dfs(s, 0, trie, [], '');
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

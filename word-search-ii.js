var DEBUG = process.env.DEBUG;

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
function Node() {
  this.children = {};
}

Node.prototype.insert = function (word, i) {
  if (i === word.length) {
    this.children['$'] = new Node();
  } else {
    this.children[word[i]] = this.children[word[i]] || new Node();
    this.children[word[i]].insert(word, i+1);
  }
  return this;
};

function buildTrie(words) {
  var trie = new Node();
  words.forEach(word => trie.insert(word, 0));
  return trie;
}
var ans, visited;
var di = [1, -1, 0, 0];
var dj = [0, 0, -1, 1];
function dfs(board, i, j, node, word) {
  if (visited[[i, j]]) return;
  var c = null;
  if (board[i] && board[i][j]) c = board[i][j];
  if (c === null) return;
  if (!node.children[c]) return;
  visited[[i, j]] = true;
  for (var t = 0; t < 4; t++) {
    var ni = i + di[t];
    var nj = j + dj[t];
    dfs(board, ni, nj, node.children[c], word + c);
  }
  if (node.children[c].children['$']) {
    ans.push(word + c);
  }
  visited[[i, j]] = false;
}

var findWords = function(board, words) {
  var trie = buildTrie(words);
  var n = board.length;
  if (n === 0) return [];
  var m = board[0].length;
  ans = []; visited = {};
  if (trie.children['$']) ans.push('');
  for (var i = 0; i < n; i++)
    for (var j = 0; j < m; j++) {
      dfs(board, i, j, trie, '');
    }
  ans = new Set(ans);
  var s = [];
  ans.forEach(item => s.push(item));
  return s;
};


function test(f) {

  [
    [ [['a', 'b', 'a', 'a', 'b'],
       ['a', 'b', 'a', 'a', 'b']], ['', 'a', 'aab', 'baabbb']]
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(findWords);

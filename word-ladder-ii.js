var DEBUG = process.env.DEBUG;

function getPaths(state, curr, path, paths) {
  path.unshift(curr);
  if (state[curr].p === null) {
    paths.push(path.slice(0));
  } else {
    state[curr].p.forEach(p => getPaths(state, p, path, paths));
  }
  path.shift(curr);
}

/**
 * @param {string} start
 * @param {string} end
 * @param {set} dict
 * @return {string[][]}
 */
var findLadders = function(start, end, dict) {
  dict.add(start);
  dict.add(end);
//  constructGraph(dict);
  var state = {};
  // bfs
  var queue = [];
  queue.push(start);
  state[start] = {
    depth: 1,
    p: null
  };

  while (queue.length) {
    var curr = queue.shift();
    var sword = curr.split('');
    for (var j = 0; j < curr.length; j++) {
      for (var k = 'a'.charCodeAt(0); k <= 'z'.charCodeAt(0); k++) {
        var tmp = sword[j];
        sword[j] = String.fromCharCode(k);
        var newword = sword.join('');
        if (dict.has(newword) && newword !== curr) {
          var next = newword;
          if (!state[next]) {
            queue.push(next);
            state[next] = {
              depth: state[curr].depth + 1,
              p: [curr]
            };
          } else {
            if (state[next].depth === state[curr].depth + 1)
              state[next].p.push(curr);
          }
        }
        sword[j] = tmp;
      }
    }
  }

  if (!state[end]) return [];
  var ans = [];
  getPaths(state, end, [], ans);
  return ans;
};


function test(f) {

  [
    ["hit", "cog", new Set(["hot","dot","dog","lot","log"])],
    ["hot", "dog", new Set(["hot","dog"])],
    ["a", "c", new Set(["a", "b", "c"])],
    ["a", "c", new Set(["b"])],
    require('./word-ladder-ii-in1.js'),
    require('./word-ladder-ii-in2.js')
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(findLadders);

var DEBUG = process.env.DEBUG;
var INF = Math.pow(2, 31);

function getl(s) {
  var l = [0];
  for (var i = 1; i <= s.length; i++) {
    var j = i - 1;
    l.push(0);
    while (j !== 0) {
      j = l[j];
      if (s[j] === s[i - 1]) {
        l[i] = j + 1;
        break;
      }
    }
  }
  return l;
}

function buildJumpTo(s, pos) {
  var t = s.substring(pos);
  var l = getl(t);
  var r = t.split('').reverse().join('');
  var i = 0, j = 0;
  while (i !== r.length) {
    if (r[i] === t[j]) {
      i++; j++;
    } else {
      if (j === 0) {
        i++;
      } else {
        j = l[j];
      }
    }
  }
  var result = [];
  while (j) {
    result.push(pos + j);
    j = l[j];
  }
  return result;
}

/**
 * @param {string} s
 * @return {number}
 */
var minCut = function(s) {
  var jumpTo = [];
  var minC = [];
  for (var i = 0; i < s.length; i++) {
    minC.push(INF);
  }
  minC.push(-1);
  for (var i = s.length - 1; i >= 0; i--) {
    jumpTo = buildJumpTo(s, i);
    jumpTo.forEach(next => minC[i] = Math.min(minC[i], minC[next] + 1));
  }
  return minC[0];
};

function test(f) {

  [
    ["aab"]
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(minCut);

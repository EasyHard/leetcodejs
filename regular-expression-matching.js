var DEBUG = process.env.DEBUG;

function Reg(char, suffix) {
  this.char = char;
  this.suffix = suffix;
}

function match(s, r, idxs, idxr) {
  if (idxs === s.length && idxr === r.length)
    return true;
  if (idxr === r.length && idxs !== s.length)
    return false;
  var result = false;
  if (r[idxr].suffix === '*')
    result = result || match(s, r, idxs, idxr+1);
  if (idxs === s.length) {
      return result;
  }
  if (s[idxs] === r[idxr].char || r[idxr].char === '.') {
    if (r[idxr].suffix === '*')
      result = result || match(s, r, idxs+1, idxr);
    else
      result = result || match(s, r, idxs+1, idxr+1);
  }
  return result;
}

var isMatch = function(s, p) {
  var last = null;
  var reg = [];
  p.split('').forEach(char => {
    if (last === null) {
      last = char;
    } else {
      if (char === '*') {
        reg.push(new Reg(last, char));
        last = null;
      } else {
        reg.push(new Reg(last));
        last = char;
      }
    }
  });
  if (last) reg.push(new Reg(last));
  return match(s, reg, 0, 0);
};


function test(f) {

  [
    ["aa", "a"],
    ["aa", "aa"],
    ["aa", "a*"],
    ["a", "a*"],
    ["", "a*"],
    ["c", "a*"],
    ["c", ".*"],
    ["aa", ".*"],
    ["aab", ".*"],
    ["aab", "c*a*b"],
    ["aab", "ca*b"],

  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(isMatch);

var DEBUG = process.env.DEBUG;

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isScramble = function(s1, s2) {
  var m = {};
  function f(s, t) {
    if (m[[s, t]] !== undefined) return m[s, t];
    if (s === t) return m[[s, t]] = true;
    for (var i = 1; i < s.length; i++) {
      if (f(s.substr(0, i), t.substr(-i)) &&
          f(s.substr(i), t.substr(0, t.length-i)))
        return m[[s,t]] = true;
      if (f(s.substr(0, i), t.substr(0, i)) &&
          f(s.substr(i), t.substr(i)))
        return m[[s,t]] = true;
    }
    return m[[s,t]] = false;
  }
  return f(s1, s2);
};

function test(f) {

  [
    ["great", "great"],
    ["great", "eatgr"],
    ["great", "rgeat"],
    ["great", "rgtae"],
    ["great", "rtgea"],
    ["dsanujiiqwfsysnfsrwbrfhhpqicbw", "dabbciwqphhfrwrsfnsysfwqiijuns"],
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(isScramble);

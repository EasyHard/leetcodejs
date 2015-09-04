var DEBUG = process.env.DEBUG;

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isScramble = function(s1, s2) {
  var m = {};
  function set(s, t, v) {
    m[s] = m[s] || {};
    m[s][t] = v;
    return v;
  }
  function get(s, t) {
    if (m[s] === undefined) return m[s];
    else return m[s][t];
  }
  function f(s, t) {
    var v;
    if ((v = get(s, t)) !== undefined) return v;
    if (s === t) return set(s, t, true);
    for (var i = 1; i < s.length; i++) {
      if (f(s.substr(0, i), t.substr(-i)) &&
          f(s.substr(i), t.substr(0, t.length-i)))
        return set(s,t,true);
      if (f(s.substr(0, i), t.substr(0, i)) &&
          f(s.substr(i), t.substr(i)))
        return set(s,t,true);
    }
    return set(s,t,false);
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
    ["pcighfdjnbwfkohtklrecxnooxyipj", "npodkfchrfpxliocgtnykhxwjbojie"],
    ["iydzdwbqbfixognqhbmimhwyhmdnrm", "nmbywdbnmmfybqqighdriizmxdhwho"],
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(isScramble);

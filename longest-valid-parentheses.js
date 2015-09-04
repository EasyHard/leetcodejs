var DEBUG = process.env.DEBUG;

/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
  function f(char1, char2, s) {
    var nl = 0;
    var curr = 0; var max = 0;
    for (var i = 0; i < s.length; i++) {
      if (s[i] === char1) {
        nl++;
      } else if (s[i] === char2) {
        if (nl) {
          nl--;
          curr++;
          if (nl === 0) {
            max = Math.max(curr, max);
          }
        } else {
          max = Math.max(curr, max);
          curr = 0;
        }
      }
    }
    if (nl === 0) max = Math.max(curr, max);
    return max*2;
  }
  return Math.max(f('(', ')', s), f(')', '(', s.split('').reverse().join('')));
};

function test(f) {

  [
    ['))'],
    ['(())()'],
    ['(())()'],
    ['(()'],
    ['())'],
    [')()())'],
    ['()(()'],
    ['))))())()()(()'],
    ['(()'],
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(longestValidParentheses);

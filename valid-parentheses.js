var DEBUG = process.env.DEBUG;

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  var stack = [];
  var left = {
    "(": ")",
    "{": "}",
    "[": "]"
  };
  for (var i = 0; i < s.length; i++) {
    if (s[i] in left) {
      stack.push(s[i]);
    } else {
      if (stack.length === 0 || left[stack[stack.length - 1]] !== s[i])
        return false;
      stack.pop();
    }
  }
  return stack.length === 0;
};

if (DEBUG) {
  [
    "(",
    "[",
    "{",
    "}",
    "}{}",
    "([)]",
    "()",
    "((((()))))",
    "()[]{}"
  ].forEach(function (input) {
    console.log(isValid(input));
  });
}

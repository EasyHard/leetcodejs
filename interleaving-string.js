var DEBUG = process.env.DEBUG;

/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function(s1, s2, s3) {
  var m = {};
  function f(i, j, k) {
    if (m[[i,j,k]] !== undefined) return m[[i,j,k]];
    var end1 = i === s1.length,
        end2 = j === s2.length,
        end3 = k === s3.length;
    if (end3) {
      if (end1 && end2 && end3) return m[[i,j,k]] = true;
      else return m[[i,j,k]] = false;
    } else {
      var result = false;
      if (!end1 && s3[k] === s1[i])
        result = result || f(i+1, j, k+1);
      if (!result && !end2 && s2[j] === s3[k])
        result = result || f(i, j+1, k+1);
      return m[[i,j,k]] = result;
    }
  }
  return f(0, 0, 0);
};


function test(f) {

  [
    ["aabcc", "dbbca", "aadbbcbcac"],
    ["aabcc", "dbbca", "aadbbbaccc"],
    ["a", "b", "ba"],
    ["a", "", "a"],
    ["a", "", ""],
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(isInterleave);

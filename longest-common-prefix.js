var DEBUG = process.env.DEBUG;
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  var ans = '';
  var nstr = strs.length;
  if (nstr === 0) return ans;
  var i = 0, j, end;
  while (true) {
    end = false;
    for (j = 0; j < nstr; j++)
      if (strs[j].length == i) {
        end = true;
        break;
      }
    if (end) break;
    for (j = 0; j < nstr - 1; j++)
      if (strs[j][i] !== strs[j+1][i]) {
        end = true;
        break;
      }
    if (end) break;
    ans += strs[0][i];
    i++;
  }
  return ans;
};


if (DEBUG) {
  console.log(longestCommonPrefix(['abc', 'a', 'ab']));
  console.log(longestCommonPrefix(['abc', 'aa', 'ab']));
  console.log(longestCommonPrefix(['abc', 'ab', 'ab']));
  console.log(longestCommonPrefix(['abc', 'abc', 'abc']));
  console.log(longestCommonPrefix(['a', '', 'abc']));
  console.log(longestCommonPrefix([]));
}

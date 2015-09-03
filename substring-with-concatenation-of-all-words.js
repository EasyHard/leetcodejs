var DEBUG = process.env.DEBUG;
var M = 1572869;
var M1 = 100663319;

String.prototype.hash = function () {
  var result = 0;
  for (var i = 0; i < this.length; i++) {
    result *= 26;
    result += this.charCodeAt(i);
    result %= M;
  }
  return result;
};

/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function(s, words) {
  if (words.length === 0) return [];
  var sl = s.length;
  var wl = words[0].length;
  var nw = words.length;

  words.forEach(word => word.h = word.hash());
  var T = 1;
  for (var i = 0; i < s.length - 1; i++) T *= 26;
  var h = s.substring(0, wl).hash();
  var sh = [];
  for (var i = wl; i < sl; i++) {
    sh.push(h);
    h = Math.floor((h / 26)) + s.charCodeAt(i) * T;
  }

  var wordsHashSum = 0;
  words.forEach(word => wordsHashSum = (wordsHashSum + word.h) % M1);
  var hashSum = [];
  for (var t = 0; t < wl; t++) {
    var currSum = 0;
    if (t + (nw-1) * wl < sh.length) break;
    for (var i = 0; i < nw; i++)
      currSum = (currSum + sh[t + i*wl]) % M1;
    i = t + nw * wl;
    while (9 )
  }
};

function test(f) {

  [
    [[]]
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(findSubstring);

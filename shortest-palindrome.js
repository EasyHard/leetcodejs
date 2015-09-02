var DEBUG = process.env.DEBUG;

/**
 * @param {string} s
 * @return {string}
 */
 function getl(s) {
     var l = [];
     l.push(0);
     for (var i = 1; i <= s.length; i++) {
         l.push(0);
         var j = i - 1;
         while (j) {
             j = l[j];
             if (s[j] === s[i-1]) {
                 l[i] = j + 1;
                 break;
             }
         }
     }
     return l;
 }

 String.prototype.reverse = function () {
     return this.split('').reverse().join('');
 };

var shortestPalindrome = function(s) {
    var l = getl(s);
    var rs = s.reverse();
    var i = 0, matchedL = 0;
    while (true) {
        if (i === rs.length)
            break;
        if (rs[i] === s[matchedL]) {
            i++;
            matchedL++;
        } else {
            if (matchedL === 0) i++;
            else matchedL = l[matchedL];
        }
    }
    return s.substring(matchedL).reverse() + s;
};

function test(f) {

  [
    [[]]
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test();

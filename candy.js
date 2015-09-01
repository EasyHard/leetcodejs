var DEBUG = process.env.DEBUG;


/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function(ratings) {
  if (ratings.length === 0) return 0;
  var v = [1];
  var count = 1;
  for (var i = 1; i < ratings.length; i++) {
    if (ratings[i-1] < ratings[i]) {
      count++;
      v.push(count);
    } else {
      count = 1;
      v.push(count);
    }
  }
  for (var i = ratings.length - 2; i >= 0; i--) {
    if (ratings[i+1] < ratings[i]) {
      v[i] = Math.max(v[i], v[i+1]+1);
    }
  }
  return v.reduce(function (prev, item) {
    return prev + item;
  }, 0);
};


function test(f) {

  [
    [[1]],
    [[2]],
    [[2,2]],
    [[3,2,1]],
    [[3,2,1,1,2,3]],
    [[3,3,2,1,1,2,3,3]],
    [require('./candy-input1.js')],
    [require('./candy-input2.js')]
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(candy);

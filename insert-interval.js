var DEBUG = process.env.DEBUG;

/**
 * Definition for an interval.
 * function Interval(start, end) {
 *     this.start = start;
 *     this.end = end;
 * }
 */
/**
 * @param {Interval[]} intervals
 * @param {Interval} newInterval
 * @return {Interval[]}
 */
var insert = function(intervals, newInterval) {
  var result = [];
  var st = newInterval.start;
  var ed = newInterval.end;
  intervals.forEach(int => {
    if (int.end < st) {
      result.push(int);
    } else {
      // int.end >= st
      if (int.start <= ed) {
        st = Math.min(st, int.start);
        ed = Math.max(ed, int.end);
      } else {
        if (newInterval) {
          newInterval.start = st;
          newInterval.end = ed;
          result.push(newInterval);
          newInterval = null;
        }
        result.push(int);
      }
    }
  });
  if (newInterval) {
    newInterval.start = st;
    newInterval.end = ed;
    result.push(newInterval);
    newInterval = null;
  }
  return result;
};

function test(f) {

  [
    [ [[1,2],[3,5],[6,7],[8,10],[12,16]], [4,9] ],
    [ [[1,3],[6,9]], [2,5] ],
    [ [], [2,5] ],
  ].forEach(function (input) {
    var ints = input[0].map(buildInterval);
    var insert = buildInterval(input[1]);
    console.log(f(ints, insert));
  });
}

function Interval(start, end) {
    this.start = start;
    this.end = end;
}

Interval.prototype.toArray = function () {
  return [this.start, this.end];
};

function buildInterval(array) {
  return new Interval(array[0], array[1]);
}

if (DEBUG) test(insert);

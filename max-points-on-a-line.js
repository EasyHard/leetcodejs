var DEBUG = process.env.DEBUG;

/*
 * Definition for a point.
 * function Point(x, y) {
 *     this.x = x;
 *     this.x = y;
 * }
 */

/**
 * @param {Point[]} points
 * @return {number}
 */
var maxPoints = function(points) {
  points = points.sort((p1, p2) => {
    if (p1.x === p2.x) return p1.y - p2.y;
    else return p1.x - p2.x;
  });
  var newpoints = [];
  for (var i = 0; i < points.length; i++) {
    if ( newpoints.length === 0 ||
         points[i].x !== newpoints[newpoints.length - 1].x ||
         points[i].y !== newpoints[newpoints.length - 1].y ) {
      newpoints.push(points[i]);
      newpoints[newpoints.length - 1].ndup = 1;
    } else {
      newpoints[newpoints.length - 1].ndup += 1;
    }
  }
  points = newpoints;
  if (points.length === 1) return points[0].ndup;
  var inf = Math.pow(2, 48);
  var max = 0;
  for (i = 0; i < points.length; i++) {
    var h = {};
    for (var j = 0; j < points.length; j++) {
      if (i === j) continue;
      if (points[j].y >= points[i].y) {
        var k, b;
        if (points[j].x === points[i].x) {
          k = inf;
          b = points[i].x;
        } else {
          k = (points[j].y - points[i].y) / (points[j].x - points[i].x);
          b = (points[i].x*points[j].y - points[j].x*points[i].y) / (points[i].x - points[j].x);
        }
        h[[k,b]] = h[[k,b]] || points[i].ndup;
        h[[k,b]] += points[j].ndup;
      }
    }
    var curr = 0;
    for (var l in h) curr = Math.max(curr, h[l]);
    max = Math.max(max, curr);
  }
  return max;
};

function buildp(p) {
  return {
    x:p[0], y:p[1]
  };
}


function test(f) {

  [
    [[{x: 1, y:2}]],
    [[{x: 1, y:2}, {x:1, y:2}]],
    [[{x: 1, y:2}, {x:1, y:3}]],
    [[{x: 1, y:2}, {x:1, y:3}, {x: 1, y: 4}, {x:2, y: 2}]],
    [[{x:4,y:0},{x:4,y:-1},{x:4,y:5}]],
    [[[-4,1],[-7,7],[-1,5],[9,-25]].map(buildp)],
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(maxPoints);

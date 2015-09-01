var DEBUG = process.env.DEBUG;

var ops = {
  '+': function (a, b) { return a + b;},
  '-': function (a, b) { return a - b;},
  '*': function (a, b) { return a * b;}
};

/**
 * @param {string} input
 * @return {number[]}
 */
var diffWaysToCompute = function(input) {
  var m = aExpr(input);
  return m.sort(function (a, b) {return a - b;});
};

function aExpr(input) {
  var ans = [];
  for (var i = 0; i < input.length; i++) {
    if (input[i] in ops) {
      var a1 = aExpr(input.slice(0, i));
      var a2 = aExpr(input.slice(i+1));
      for (var v1 in a1)
        for (var v2 in a2)
          ans.push(ops[input[i]](a1[v1], a2[v2]));
    }
  }
  if (ans.length === 0)
    ans.push(sExpr(input).value());
  return ans;
}

function sExpr(str) {
  var i = 0;
  while (i < str.length && ! (str[i] in ops)) i++;
  if (i === str.length) {
    return new Expr(str);
  } else {
    return new Expr(str[i], sExpr(str.slice(0, i)), sExpr(str.slice(i+1)));
  }
}

function Expr(op, expr1, expr2) {
  this.op = op;
  this.expr1 = expr1;
  this.expr2 = expr2;
}

Expr.prototype.value = function () {
  if (isNaN(Number(this.op))) {
    var v1 = this.expr1.value();
    var v2 = this.expr2.value();
    return ops[this.op](v1, v2);
  } else {
    return Number(this.op);
  }
};


function test(f) {

  [
    ["2*3-4*5"],
    ["2-1-1"]
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test(diffWaysToCompute);

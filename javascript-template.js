var DEBUG = process.env.DEBUG;



function test(f) {

  [
    [[]]
  ].forEach(function (input) {
    console.log(f.apply(undefined, input));
  });
}

if (DEBUG) test();

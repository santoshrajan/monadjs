var monads = require("monadjs");

var result = monads.doMonad(monads.maybeMonad,
    "a", function(scope) {
         if (typeof console === "object" && console.log)
             return 2;
         else
             return null;
         },
    "b", function(scope) {
          with (scope) {
                 return a * 3;
             }
         },
    function(scope) {
        with(scope) {
            return a + b;
        }
    }
);

console.log(result);
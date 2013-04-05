var monads = require("monadjs");

var result = monads.doMonad(monads.identityMonad,
    "a", function(scope) {
             return 2;
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
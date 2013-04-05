var monads = require("monadjs");

var push = function(element) {
    return function(state) {
        var newstate = [element];
        return [undefined, newstate.concat(state)];
    };
};

var pop = function() {
    return function(state) {
        var newstate = state.slice(1);
        return [state[0], newstate];
    };
};

var result = monads.doMonad(monads.stateMonad,
    "a", function(scope) {
             return push(5);
         },
    "b", function(scope) {
             with (scope) {
                 return push(10);
             }
         },
    "c", function(scope) {
             with (scope) {
                 return push(20);
             }
         },
    "d", function(scope) {
             with (scope) {
                 return pop();
             }
         },
    function(scope) {
        with(scope) {
            return d;
        }
    }
);

console.log(result([]));
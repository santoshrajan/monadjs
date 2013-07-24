var monads = require("monadjs");

var push = function(element) {
    return function(state) {
        var newstate = [element]
        return [undefined, newstate.concat(state)]
    }
}

var pop = function() {
    return function(state) {
        var newstate = state.slice(1)
        return [state[0], newstate]
    }
}

var result = monads.do(monads.state,
    [
        push(5),
        push(10),
        push(20),
        pop()
    ],
    function(val1, val2, val3, val4) {
        return val4
    }
)


console.log(result([]))
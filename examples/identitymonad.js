var monads = require("monadjs")

var result = monads.do(monads.identity, [1, 2], function(a, b) {
    return a + b
})

console.log(result);
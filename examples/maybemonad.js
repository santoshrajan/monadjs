var monads = require("monadjs")

// will return 6 on nodejs null on browser
var result = monads.do(monads.mayBe,
    [
        typeof global === "object" ? 2 : null,
        3
    ],
    function(a, b) {return a * b}
)
console.log(result);

// will return 6 on browser null on nodejs
var result = monads.do(monads.mayBe,
    [
        typeof window === "object" ? 2 : null,
        3
    ],
    function(a, b) {return a * b}
)

console.log(result);
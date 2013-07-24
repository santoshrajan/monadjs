var monads = require("monadjs");

function forEach3D(iArray, jArray, kArray, callback) {
    return monads.do(monads.array, [iArray, jArray, kArray], callback)
}

var result = forEach3D([1, 2], [3, 4], [5, 6], function(i, j, k) {
    return i + j + k
})

console.log(result)

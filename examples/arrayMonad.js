var monads = require("monadjs");

function forEach3D(iArray, jArray, kArray, callback) {
    return monads.doMonad(monads.arrayMonad,
        "i", function() {
                 return iArray;
             },
        "j", function() {
                 return jArray;
             },
        "k", function() {
                 return kArray;
             },
        function(scope) {
            with(scope) {
                return callback(i, j, k);
            }
        }
    );
}

var result = forEach3D([1, 2], [3, 4], [5, 6], function(i, j, k) {
    return [i, j, k];
});

console.log(result);

var monads = require("monadjs");
var fs = require("fs");

monads.doMonad(monads.promiseMonad,
    "infile",
        function(scope) {
            return function(continuation) {
                var fname = process.argv[2] || "";
                fs.exists(fname, function (exists) {
                    if (exists) {
                        continuation(fname);
                    } else {
                        console.log("File does not exist: " + fname);
                        continuation(null);
                    }
                });
            }
        },
    "outfile",
        function(scope) {
            return function(continuation) {
                var fname = process.argv[3];
                if (fname) {
                    continuation(fname);
                } else {
                    console.log("Output File Name is Required");
                    continuation(null);
                }
            }
        },
    "contents",
        function(scope) {
            return function(continuation) {
                fs.readFile(scope.infile, function (err, data) {
                    if (err) {
                        console.log("Error reading File: " + scope.infile);
                        continuation(null);
                    } else {
                        continuation(data);
                    }
                });
            }
        },
    function(scope) {
        fs.writeFile(scope.outfile, scope.contents, function (err) {
            if (err) {
                console.log("Error writing File: " + scope.outfile);
            }
        });
    }
);

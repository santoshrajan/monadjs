/*
    monadjs
    Monad Library for JavaScript
    Copyright (c) 2013 Santosh Rajan
    License - MIT - https://github.com/santoshrajan/monadjs/blob/master/LICENSE
*/

exports.version = "0.1.0"

//  Curry function

function curry(fn, numArgs) {
    numArgs = numArgs || fn.length
    return function f(saved_args) {
        return function() {
            var args = saved_args.concat(Array.prototype.slice.call(arguments))
            return args.length === numArgs ? fn.apply(null, args) : f(args)
        }
    }([])
}

// The identity Monad

function identityMonad(mv, mf) {
    return mf(mv)
}
identityMonad.mResult = function(v) {
    return v
}

// The mayBe Monad

function mayBeMonad(mv, mf) {
    return mv === null || mv === undefined || mv === false ? null : mf(mv)
}
mayBeMonad.mResult = function(v) {
    return v
}

// The array Monad

function arrayMonad(mv, mf) {
    var result = []
    mv.forEach(function(v) {
        Array.prototype.push.apply(result, mf(v))
    })
    return result
}
arrayMonad.mResult = function(v) {
    return [v]
}

// The state Monad

function stateMonad(mv, mf) {  
    return function(state) {  
        var compute = mv(state)
        return mf(compute[0])(compute[1])  
    } 
}
stateMonad.mResult = function(value) {  
    return function(state) {  
        return [value, state];  
    }  
}

// The parser Monad

function parserMonad(mv, mf) {  
     return function(str) {  
        var compute = mv(str)
        if (compute === null) {
            return null
        } else {
            return mf(compute[0])(compute[1])
        }  
    } 
}
parserMonad.mResult = function(value) {  
    return function(str) {  
        return [value, str];  
    }  
}
parserMonad.mZero = function(str) {
    return null
}
parserMonad.mPlus = function() {
    var parsers = Array.prototype.slice.call(arguments)
    return function(str) {
        var result, i
        for (i = 0; i < parsers.length; ++i) {
            result = parsers[i](str)
            if (result !== null) {
                break;
            }
        }
        return result
    }
}

// The continuation Monad

function continuationMonad(mv, mf) {
    return function(continuation) {
        return mv(function(value) {
            return mf(value)(continuation);
        })
    }
}
continuationMonad.mResult = function(value) {
    return function(continuation) {
        return continuation(value)
    }
}

function doMonad(monad, values, cb) {
    function wrap(curriedCb, index) {
        return function mf(v) {
            return (index === values.length - 1) ?
                monad.mResult(curriedCb(v)) :
                monad(values[index + 1], wrap(curriedCb(v), index + 1))
        }
    }
    return monad(values[0], wrap(curry(cb), 0))       
}



exports.identity = identityMonad
exports.mayBe = mayBeMonad
exports.array = arrayMonad
exports.state = stateMonad
exports.parser = parserMonad
exports.continuation = continuationMonad
exports.do = doMonad

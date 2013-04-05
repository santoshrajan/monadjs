/*
    monadjs
    Monad Library for JavaScript
    Copyright (c) 2013 Santosh Rajan
    License - MIT - https://github.com/santoshrajan/monadjs/blob/master/LICENSE
*/

(function(exports){

    exports.version = "0.0.4";

    exports.doMonad = function(monad) {
        var args = arguments, scope = {};
        function iterator(i) {
            if (args.length === i + 1) {
                return monad.mResult(args[i](scope));
            }
            var varName = args[i];
            var func = args[i + 1];
            var value = func(scope);
            return monad.mBind(value, function(value) {
                scope[varName] = value;
                return iterator(i + 2);
            });
        }
        return iterator(1);
    };

    exports.identityMonad = {
        mBind: function(mValue, mFunction) {
            return mFunction(mValue);
        },
        mResult: function(value) {
            return value;
        }
    };

    exports.maybeMonad = {
        mBind: function(mValue, mFunction) {
            if (mValue === this.mZero)
                return this.mZero;
            else
                return mFunction(mValue);
        },
        mResult: function(value) {
            return value;
        },
        mZero: null
    };

    exports.arrayMonad = {
        mBind: function(mValue, mFunc) {
            var accum = [];
            mValue.forEach(function(elem){
                accum = accum.concat(mFunc(elem));
            });
            return accum;
        },
        mResult: function(value) {
            return [value];
        }
    };

    exports.stateMonad = {
        mBind: function(mValue, mFunc) {
            return function(state) {
                var compute = mValue(state);
                var value = compute[0];
                var newState = compute[1];
                return mFunc(value)(newState);
            };
        },
        mResult: function(value) {
            return function(state) {
                return [value, state];
            };
        }
    };

    exports.continuationMonad = {
        mBind: function(mValue, mFunc) {
            return function(continuation) {
                return mValue(function(value) {
                    return mFunc(value)(continuation);
                });
            };
        },
        mResult: function(value) {
            return function(continuation) {
                return continuation(value);
            };
        }
    };

})(typeof exports === 'undefined'? this.monads={}: exports);

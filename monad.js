(function(exports){

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
    }

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
    }

})(typeof exports === 'undefined'? this['monadjs']={}: exports);

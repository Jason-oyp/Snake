let tools = {
    inherit: (function () {
        let Temp = function () { }
        return function (origin, target) {
            Temp.prototype = origin.prototype;
            target.prototype = new Temp();
            target.prototype.constructor = target;
        }
    }()),
    extends: function (origin) {
        let result = function () {
            origin.apply(this, arguments);
        }
        this.inherit(origin, result);
        return result;
    },
    single: function (origin) {
        let singleResult = (function () {
            let temp;
            return function () {
                if (typeof temp === "object") {
                    return temp;
                }
                origin && origin.apply(this, arguments);
                temp = this;
            }
        })();
        origin && this.inherit(origin, singleResult);
        return singleResult;
    }
}
'use strict';

var asyncToGenerator = function asyncToGenerator(fn) {
    return function () {
        var info = void 0,
            value = void 0,
            gen = fn.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            function step(key, args) {
                try {
                    info = gen[key](args);
                    value = info.value;
                } catch (e) {
                    reject(e);
                    return;
                }

                if (info.done) {
                    resolve(value);
                } else {
                    return Promise.resolve(value).then(function (val) {
                        step('next', val);
                    }, function (err) {
                        step('throw', err);
                    });
                }
            }

            return step('next');
        });
    };
};

module.exports = asyncToGenerator;
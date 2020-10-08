"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _Safe = require("./Safe.js");

var _Safe2 = _interopRequireDefault(_Safe);

var _CookieHelp = require("./CookieHelp");

var _CookieHelp2 = _interopRequireDefault(_CookieHelp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var localSafe = null;
var spEvtCb = null;
var un_id = "";
var os = "web_0.0.1";
var authCookieName = "_at"; // default Authorize Cookie Name
var authHeader = JSON.parse(_CookieHelp2.default.getCookieInfo(authCookieName) || "{}");

if (typeof window !== "undefined") {
    window.log = window.log || function () {
        var _console;

        var args = [].slice.call(arguments);
        (_console = console).log.apply(_console, _toConsumableArray(args));
    };
}

var typeEnum = {
    POST: "post",
    GET: "get",
    PUT: "put",
    DELETE: "delete"
};

var HttpTool = {
    setOS: function setOS(val) {
        os = val;
    },


    /**
     * set auth header
     * @param val authorize header object
     * @param cookieName(optional) storage cookie name
     */
    setAuthHeader: function setAuthHeader(val, cookieName) {
        var authCookie = null;
        if (cookieName) {
            _CookieHelp2.default.saveCookieInfo(cookieName, val);
        } else {
            _CookieHelp2.default.saveCookieInfo(authCookieName, val);
        }
        authHeader = val;
    },
    setEncrypt: function setEncrypt(key) {
        localSafe = new _Safe2.default(key);
    },
    setSpecialCodeEvent: function setSpecialCodeEvent(cb) {
        spEvtCb = function spEvtCb(code) {
            if (typeof cb === "function") {
                return cb(code);
            } else {
                return true; // true means continue to normal steps;
            }
        };
    },
    clearOS: function clearOS() {
        os = "web_0.0.1";
    },
    clearAuthHeader: function clearAuthHeader(cookieName) {
        var authCookie = null;
        if (cookieName) {
            _CookieHelp2.default.saveCookieInfo(cookieName, _CookieHelp2.default.clearFlag, 0);
        } else {
            _CookieHelp2.default.saveCookieInfo(authCookieName, _CookieHelp2.default.clearFlag, 0);
        }
        authHeader = null;
    },
    clearEncrypt: function clearEncrypt() {
        localSafe = null;
    },
    clearSpecialCodeEvent: function clearSpecialCodeEvent() {
        spEvtCb = null;
    },


    /**
     *
     * @param key
     * @param param _开始参数,为不用参数
     * @returns {{key: (string|*|WordArray), data: *}}
     */
    formatBody: function formatBody(key) {
        var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        //localSafe.AESDecrypt(key,a)

        //如何参数中存在token参数,参数中的token提取,并优先于用户缓存

        // let token = "";
        // if (param && param._token) {
        // 	//清除缓用参数
        // 	token = param._token;
        // 	delete param._token;
        // } else {
        // 	let user = Storage.getUserInfo() || {};
        // 	token = user.token ? user.token.accessToken || "" : "";
        // }

        return {
            key: localSafe.encryptForRSA(key),
            data: localSafe.AESEncryption(key, JSON.stringify({
                os: os + un_id,
                param: param
            }))
        };
    },
    formatParamsTools: function formatParamsTools(params) {
        var paramsBody = "";
        var i = 0;
        for (var key in params) {
            var v = params[key];
            if (v === undefined) {
                continue;
            }
            paramsBody += (i === 0 ? "" : "&") + (key + "=" + encodeURIComponent(v));
            ++i;
        }
        return paramsBody;
    },
    clearParam: function clearParam() {
        var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (param) {
            delete param.navigator;
            delete param.callBack;
            //POST请求,用来跨域
        }
    },
    removeEmpty: function removeEmpty(obj) {
        if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object") {
            for (var key in obj) {
                //判断是否为NULL
                // log("obj"+key+":"+obj[key])
                if (obj[key] === undefined || obj[key] === null) {
                    obj[key] = "";
                    // log("修改"+key+":"+obj[key])
                } else {
                    HttpTool.removeEmpty(obj[key]);
                }
            }
        } else if (HttpTool.isArray(obj)) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = obj[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var v = _step.value;

                    HttpTool.removeEmpty(v);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        } else {
            //其他类型
        }
        return obj;
    },
    isArray: function isArray(object) {
        return object && (typeof object === "undefined" ? "undefined" : _typeof(object)) === "object" && Array == object.constructor;
    },
    randomString: function randomString(len) {
        len = len || 32;
        var $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
        /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length;
        var pwd = "";
        for (var i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },
    changeEncryptOpt: function changeEncryptOpt(url, other, noEncryptArr) {
        if (!url) {
            return other;
        }
        // url is a String
        if (noEncryptArr instanceof Array) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = noEncryptArr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var value = _step2.value;

                    if (url.slice(0, value.length) === value) {
                        other["safe"] = false;
                        break;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
        return other;
    },
    getRequestHeader: function getRequestHeader(other) {
        return authHeader ? _lodash2.default.merge({}, authHeader, {
            "Content-Type": other.contentType,
            os: os
        }) : {
            "Content-Type": other.contentType,
            os: os
        };
    }
};

// post: (url, successCallback, failCallback, param, other) => {
// 	request('post', url, successCallback, failCallback, param, other)
// },
HttpTool["init"] = function init(options) {
    if (options) {
        Object.keys(options).forEach(function (val) {
            switch (val) {
                case "authCookieName":
                    var cookieVal = JSON.parse(_CookieHelp2.default.getCookieInfo(options[val]) || "{}");
                    HttpTool.setAuthHeader(cookieVal, options[val]);
                    break;
                case "os":
                    HttpTool.setOS(options[val]);
                    break;
                case "safeKey":
                    HttpTool.setEncrypt(options[val]);
                    break;
            }
        });
    }
};

/**
 *
 * @param reqType 请求类型 put/get/post/delete
 * @param url 请求URL
 * @param successCallback 成功返回:包含 code, message, json, option
 * @param failCallback 失败返回:code, message, option
 * @param param 请求参数 例:{id:1}
 * @param other 其他参数  {safa:booble类型 true/加密(默认) false/不加密}
 */
function mainReq(reqType, url, successCallback, failCallback, param, other) {
    //option 参数必须是对象,里面包括 (type 请求方式,url 请求路径,param 请求参数)

    // if (process.env.NODE_ENV === 'development') {
    // 	console.warn('You are in Development Mode');
    // }

    if (!other) {
        other = {
            safe: true,
            // contentType: "application/x-www-form-urlencoded;charset=utf-8"
            contentType: "application/json;charset=utf-8"
        };
    }
    HttpTool.clearParam(param);
    other = HttpTool.changeEncryptOpt(url, other, _NOENCRYPT);
    log("请求param: ", param);
    var host = _CONCAT_API + url;
    var headers = HttpTool.getRequestHeader(other);
    log("请求host: ", host);
    var key = localSafe && localSafe.getRandomStr(16) || "";
    var body = localSafe && other.safe ? HttpTool.formatBody(key, param) : JSON.stringify(param);
    body = other.contentType.indexOf("json") === -1 ? HttpTool.formatParamsTools(body) : body;
    log("请求body: ", param);

    var options = {
        url: host,
        method: reqType.toLowerCase(),
        headers: headers,
        timeout: 11000
    };
    reqType === "get" ? options["params"] = param : options["data"] = body;
    (0, _axios2.default)(options).then(function (_ref) {
        var status = _ref.status,
            data = _ref.data;

        var json = data,
            code = status;
        //解密
        if (other.safe && json.isSafe && localSafe) {
            json = localSafe.AESDecrypt(key, json.data);
            if (!json) {
                var _option = {
                    code: -998,
                    message: "系统繁忙,请稍候再试",
                    host: host,
                    option: {}
                };
                failCallback(_option.code, _option.message, _option);
                return;
            } else {
                try {
                    json = JSON.parse(json);
                } catch (e) {
                    var _option2 = {
                        code: -997,
                        message: "返回数据格式化失败",
                        host: host,
                        option: {}
                    };
                    failCallback(_option2.code, _option2.message, _option2);
                    return;
                }
            }
        }

        // json = HttpTool.removeEmpty();
        var option = {
            code: 200 <= json.code && json.code < 300 ? 1 : -json.code,
            message: json.message,
            host: host,
            option: json.option ? json.option : {}
        };
        log("------success--------");
        log(option);
        log(json);
        if (option.code > 0) {
            if (!spEvtCb) {
                successCallback(option.code, option.message, json.data, option);
            } else {
                if (spEvtCb(option.code)) {
                    successCallback(option.code, option.message, json.data, option);
                }
            }
        } else {
            if (!spEvtCb) {
                failCallback(option.code, option.message, option);
            } else {
                if (spEvtCb(option.code)) {
                    failCallback(option.code, option.message, option);
                }
            }
        }
    }).catch(function (error) {
        log("-----error---------");
        console.error(error);
        try {
            if (error.response) {
                var option = {
                    code: error.response.status,
                    message: error.message,
                    host: host,
                    option: {}
                };
                log(option);

                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                log(error.response.data);
                log(error.response.headers);
                failCallback(error.response.status, error.message, option);
            } else if (error.request) {
                var _option3 = {
                    code: error.request.status,
                    message: "请检查网络连接",
                    host: host,
                    option: {}
                };
                log(_option3);
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                failCallback(error.request.status, _option3.message, _option3);
            } else {
                failCallback(-999, "请求未知错误", {});
            }
        } catch (err) {
            failCallback(-999, err.message, {});
        }
        // console.log(error.config);
    });
}

Object.keys(typeEnum).forEach(function (val) {
    HttpTool[val.toLowerCase()] = function (url, successCallback, failCallback, param, reqOptions) {
        mainReq(val.toLowerCase(), url, successCallback, failCallback, param, reqOptions);
    };
});

module.exports = HttpTool;
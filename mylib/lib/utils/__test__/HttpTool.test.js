"use strict";

//mock
jest.mock("axios");
jest.mock("../Safe.js");

if (typeof window !== 'undefined') {
	window._NOENCRYPT = [], window._CONCAT_API = '';
}

//preset
var defaultReqOpt = void 0;
beforeEach(function () {
	jest.mock("../CookieHelp.js");
	defaultReqOpt = { safe: true, contentType: "application/json;charset=utf-8" };
});
afterEach(function () {
	jest.unmock("../CookieHelp.js");
	defaultReqOpt = { safe: true, contentType: "application/json;charset=utf-8" };
});

//test suit
describe("HttpTool TestSuit", function () {
	var httpTool = void 0,
	    url = void 0;
	beforeAll(function () {
		httpTool = require("../HttpTool");
		url = "/base";
	});
	afterAll(function () {});
	// request type support
	it("request should have post type", function () {
		expect(httpTool).toHaveProperty("post");
	});
	it("request should have get type", function () {
		expect(httpTool).toHaveProperty("get");
	});
	it("request should have put type", function () {
		expect(httpTool).toHaveProperty("put");
	});
	it("request should have delete type", function () {
		expect(httpTool).toHaveProperty("delete");
	});

	//region os
	it("should init function with os preset work properly", function () {
		httpTool.init({ os: "web_0.1.0" });
		expect(httpTool.getRequestHeader(defaultReqOpt)).toHaveProperty("os", "web_0.1.0");
		httpTool.clearOS();
	});
	it("have property os", function () {
		expect(httpTool.getRequestHeader(defaultReqOpt)).toHaveProperty("os");
	});
	//endregion

	//region init function
	it("should init function with cookie preset with no target cookie", function () {
		httpTool.init({ authCookieName: "_uac" });
		expect(httpTool.getRequestHeader(defaultReqOpt)).not.toHaveProperty("authHeader");
		httpTool.clearAuthHeader("_uac");
	});
	it("should init function with cookie preset work with default cookie not exist", function () {
		httpTool.init({ authCookieName: "_at" });
		expect(httpTool.getRequestHeader(defaultReqOpt)).not.toHaveProperty("authHeader");
		httpTool.clearAuthHeader();
	});
	it("should init function with safe preset work properly", function () {
		httpTool.init({ safeKey: "private_key" });
		var key = "123";
		var ret = httpTool.formatBody(key);
		expect(ret).toMatchSnapshot();
		httpTool.clearEncrypt();
	});
	it("log workds", function () {
		log("works???");
		log("Yes! It works!!");
	});
	//endregion

	//region setter & getter
	it("should init function with cookie preset work with default cookie saved", function () {
		httpTool.setAuthHeader({ authCookieName: "_at" });
		expect(httpTool.getRequestHeader(defaultReqOpt)).toHaveProperty("authCookieName");
		httpTool.clearAuthHeader();
	});

	it("can change property os through set function", function () {
		var osStr = "web_1.0.0";
		httpTool.setOS(osStr);
		expect(httpTool.getRequestHeader(defaultReqOpt)).toHaveProperty("os", osStr);
	});
	it("can reset property os through clear function", function () {
		var osStr = "web_1.0.0";
		httpTool.setOS(osStr);
		expect(httpTool.getRequestHeader(defaultReqOpt)).toHaveProperty("os", osStr);
		httpTool.clearOS();
		expect(httpTool.getRequestHeader(defaultReqOpt)).toMatchSnapshot();
	});
	it("can set and clear special code event", function () {
		httpTool.setSpecialCodeEvent(function (code) {
			if (code === 200) {
				console.log("Job done");
			} else {
				return true;
			}
		});
		httpTool.clearSpecialCodeEvent();
	});
	//endregion

	//region changeEncryptOpt
	it("if url match the no encryption set flag to false", function () {
		var encryptArr = ["/base"],
		    ret = void 0;
		ret = httpTool.changeEncryptOpt(url, defaultReqOpt, encryptArr);
		expect(ret).toHaveProperty("safe", false);
	});
	it("the no encryption array should be case-sensitive", function () {
		var encryptArr = ["/Base"],
		    ret = void 0;
		ret = httpTool.changeEncryptOpt(url, defaultReqOpt, encryptArr);
		expect(ret).toHaveProperty("safe", true);
	});
	it("the no encryption array should be match exactly", function () {
		var encryptArr = ["/base/"],
		    ret = void 0;
		ret = httpTool.changeEncryptOpt(url, defaultReqOpt, encryptArr);
		expect(ret).toHaveProperty("safe", true);
	});
	it("option should be false once matched the address", function () {
		var encryptArr = ["/base/", "/base", "/base-"],
		    ret = void 0;
		ret = httpTool.changeEncryptOpt(url, defaultReqOpt, encryptArr);
		expect(ret).toHaveProperty("safe", false);
	});
	it("target no encryption array not effect subaddress", function () {
		var tempUrl = "/api/base",
		    encryptArr = ["/base/", "/base", "/base-"],
		    ret = void 0;
		ret = httpTool.changeEncryptOpt(tempUrl, defaultReqOpt, encryptArr);
		expect(ret).toHaveProperty("safe", true);
	});
	//endregion

	//region clearParam
	it("clear param function drop navigator and callback property", function () {
		var param = {
			navigator: {},
			callBack: function callBack() {}
		},
		    ret = httpTool.clearParam(param);
		expect(param).not.toHaveProperty("navigator");
		expect(param).not.toHaveProperty("callBack");
	});
	//endregion

	//region isArray
	it("isArray function with array", function () {
		expect(httpTool.isArray([])).toBeTruthy();
	});
	it("isArray function with string", function () {
		expect(httpTool.isArray("")).toBeFalsy();
	});
	it("isArray function with object", function () {
		expect(httpTool.isArray({})).toBeFalsy();
	});
	it("isArray function with null", function () {
		expect(httpTool.isArray(null)).toBeFalsy();
	});
	it("isArray function with number", function () {
		expect(httpTool.isArray(1)).toBeFalsy();
	});
	it("isArray function with undefined", function () {
		expect(httpTool.isArray(undefined)).toBeFalsy();
	});
	//endregion

	//region formatParamsTools
	it("formatParamsTools output string connect with &", function () {
		var ret = httpTool.formatParamsTools({ a: 1, b: 2 });
		expect(ret).toMatchSnapshot();
	});
	it("formatParamsTools output string connect with &", function () {
		var ret = httpTool.formatParamsTools({ a: 1, b: [1, 2, 3] });
		expect(ret).toMatchSnapshot();
	});
	it("formatParamsTools output string connect with &", function () {
		var ret = httpTool.formatParamsTools({
			a: { aa: ["1", 2, "tobe"] },
			b: [1, 2, 3]
		});
		expect(ret).toMatchSnapshot();
	});
	it("formatParamsTools output string skip undefined property", function () {
		var ret = httpTool.formatParamsTools({
			a: { aa: ["1", 2, "tobe"] },
			b: [1, 2, 3],
			c: undefined
		});
		expect(ret).not.toContain("c=");
	});
	it("formatParamsTools output string work with null", function () {
		var ret = httpTool.formatParamsTools({
			a: { aa: ["1", 2, "tobe"] },
			b: [1, 2, 3],
			c: null
		});
		expect(ret).toContain("c=null");
	});
	//endregion

	//region request Test
	//region callback switch
	it("should success with status equal 20x and code over 0", function () {
		var mockFn = jest.fn();
		var ret = new Promise(function (resolve, reject) {
			httpTool.post(url, function (val) {
				mockFn();
				resolve(val);
			}, reject);
		});
		ret.then(function (val) {
			return expect(mockFn).toHaveBeenCalled();
		}).catch();
	});
	it("should fail with status equal 200 but code not over 0", function () {
		var mockFn = jest.fn();
		var ret = new Promise(function (resolve, reject) {
			httpTool.post("/success-failure", resolve, function () {
				mockFn();
				reject();
			});
		});
		ret.then().catch(function (val) {
			return expect(mockFn).toHaveBeenCalled();
		});
	});
	it('should fail when request url is empty', function () {
		var mockFn = jest.fn(),
		    emptyUrl = void 0;
		var ret = new Promise(function (resolve, reject) {
			httpTool.post(emptyUrl, resolve, function () {
				mockFn();
				reject();
			});
		});
		ret.then().catch(function (val) {
			return expect(mockFn).toHaveBeenCalled();
		});
	});
	//endregion

	//region success callback
	it("should not execute any function if set special event return false before success", function () {
		httpTool.clearSpecialCodeEvent();
		var mockFnResolve = jest.fn(),
		    mockFnReject = jest.fn();
		httpTool.setSpecialCodeEvent(function (code) {
			if (code === 1) {
				log("Everything is blocked after return false");
				return false;
			} else {
				return true;
			}
		});
		var ret = new Promise(function (resolve, reject) {
			httpTool.post(url, function () {
				mockFnResolve();
				resolve();
			}, function () {
				mockFnReject();
				reject();
			});
		});
		ret.then(function () {
			return expect(mockFnResolve).not.toHaveBeenCalled();
		}).catch(function () {
			return expect(mockFnReject).not.toHaveBeenCalled();
		});
	});
	it("should go next if set special event return true before success", function () {
		httpTool.clearSpecialCodeEvent();
		var mockFn = jest.fn();
		httpTool.setSpecialCodeEvent(function (code) {
			if (code === 1) {
				log("Go through after execute this.");
				mockFn();
				return true;
			} else {
				return false;
			}
		});
		var ret = new Promise(function (resolve, reject) {
			httpTool.post(url, resolve, reject);
		});
		ret.then(function () {
			return expect(mockFn).toHaveBeenCalled();
		}).catch();
	});
	//endregion

	//region failure callback

	it("should run fail callback when code not over 0 when status is 200", function () {
		httpTool.clearSpecialCodeEvent();
	});
	it("should run any resulting if set special event return false", function () {
		httpTool.clearSpecialCodeEvent();
		var mockFnResolve = jest.fn(),
		    mockFnReject = jest.fn();
		httpTool.setSpecialCodeEvent(function (code) {
			if (code === 1) {
				log("Go through after execute this.");
				return false;
			} else {
				return true;
			}
		});
		var ret = new Promise(function (resolve, reject) {
			httpTool.post(url, function () {
				mockFnResolve();
				resolve();
			}, function () {
				return mockFnReject();
			}, reject());
		});
		ret.then(function () {
			return expect(mockFnResolve).not.toHaveBeenCalled();
		}).catch(function () {
			return expect(mockFnReject).not.toHaveBeenCalled();
		});
	});
	it("should block fail if special event return false and status equals 200 but code not over 0", function () {
		httpTool.clearSpecialCodeEvent();
		var mockFn = jest.fn();
		httpTool.setSpecialCodeEvent(function (code) {
			if (code < 0) {
				log("code is not over 0! Stop!");
				return false;
			} else {
				return true;
			}
		});
		var ret = new Promise(function (resolve, reject) {
			httpTool.post("/success-failure", resolve, function () {
				return mockFn();
			}, reject());
		});
		ret.catch(function () {
			return expect(mockFn).not.toHaveBeenCalled();
		});
	});
	it("should run fail if special event return true and status is 20x but code is below 0", function () {
		httpTool.clearSpecialCodeEvent();
		var mockFn = jest.fn();
		httpTool.setSpecialCodeEvent(function (code) {
			if (code < 0) {
				log("code is not over 0! Go next!");
				return true;
			} else {
				return false;
			}
		});
		var ret = new Promise(function (resolve, reject) {
			httpTool.post("/success-failure", resolve, function () {
				return mockFn();
			}, reject());
		});
		ret.catch(function () {
			return expect(mockFn).toHaveBeenCalled();
		});
	});
	it("should go next if set special event with no function", function () {
		httpTool.clearSpecialCodeEvent();
		var mockFn = jest.fn();
		httpTool.setSpecialCodeEvent("f**k");
		var ret = new Promise(function (resolve, reject) {
			httpTool.post("/success", function () {
				mockFn(), resolve();
			}, reject);
		});
		ret.then(function () {
			return expect(mockFn).toHaveBeenCalled();
		});
	});
	it("should fail if request is rejected", function () {
		httpTool.clearSpecialCodeEvent();
		var mockFn = jest.fn();
		var ret = new Promise(function (resolve, reject) {
			httpTool.post("/failure", resolve, function () {
				mockFn();
				reject();
			});
		});
		ret.catch(function () {
			return expect(mockFn).toHaveBeenCalled();
		});
	});
	it("should fail if request is none", function () {
		httpTool.clearSpecialCodeEvent();
		var mockFn = jest.fn();
		var ret = new Promise(function (resolve, reject) {
			httpTool.post("/failure-direct", resolve, function () {
				mockFn(), reject();
			});
		});
		ret.catch(function () {
			return expect(mockFn).toHaveBeenCalled();
		});
	});
	it("should fail if request goes unknown", function () {
		httpTool.clearSpecialCodeEvent();
		var mockFn = jest.fn();
		var ret = new Promise(function (resolve, reject) {
			httpTool.post("/failure-none", resolve, function () {
				mockFn(), reject();
			});
		});
		ret.catch(function () {
			return expect(mockFn).toHaveBeenCalled();
		});
	});
	//endregion
	//endregion

	//region encrypt return
	it("should decrypt to empty return data to failure", function () {
		httpTool.clearEncrypt();
		httpTool.setEncrypt("key");
		var mockFn = jest.fn();
		var ret = new Promise(function (resolve, reject) {
			httpTool.post("/success-empty", function () {
				resolve();
			}, function () {
				mockFn();
				reject();
			});
		});
		ret.catch(function () {
			expect(mockFn).toHaveBeenCalled();
		});
	});
	it("should decrypt return data to string ", function () {
		httpTool.clearEncrypt();
		httpTool.setEncrypt("key");
		var mockFn = jest.fn();
		var ret = new Promise(function (resolve, reject) {
			httpTool.post("/success-string", function () {
				resolve();
			}, function () {
				mockFn();
				reject();
			});
		});
		ret.catch(function () {
			expect(mockFn).toHaveBeenCalled();
		});
	});
	it("should decrypt return data to success", function () {
		httpTool.clearEncrypt();
		httpTool.setEncrypt("key");
		var mockFn = jest.fn();
		var ret = new Promise(function (resolve, reject) {
			httpTool.post("/success-right", function () {
				mockFn();
				resolve();
			}, function () {
				reject();
			});
		});
		ret.then(function () {
			expect(mockFn).toHaveBeenCalled();
		});
	});
	//endregion
});
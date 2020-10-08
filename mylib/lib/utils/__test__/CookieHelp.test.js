"use strict";

var cookieStr = void 0,
    cookieObj = void 0,
    cookieUser = void 0,
    cookieHelp = void 0;
beforeEach(function () {
	cookieStr = "wow";
	cookieObj = { a: "wooo", b: ["ddee", "ffaa"] };
	cookieUser = {
		name: "a",
		pwd: "b",
		likes: ["o", "c", "u"],
		location: {
			code: 1,
			short: "BJ",
			geo: [112, 35]
		}
	};
	cookieHelp = require("../CookieHelp");
});

describe("CookieHelp TestSuit", function () {
	var CookieHelp = void 0;
	beforeAll(function () {
		CookieHelp = require("../CookieHelp");
	});
	afterAll(function () {
		CookieHelp = null;
	});
	test("Have Default User key", function () {
		expect(cookieHelp.getUserKey()).toBe("DEMON_USER");
	});
	test("clearCookie not breakdown if no cookie", function () {
		cookieHelp.clearCookie();
	});
	test("Default User Info Should not Exists", function () {
		expect(cookieHelp.getUserInfo()).toBeFalsy();
	});
	test("Can normally storage object to cookie", function () {
		cookieHelp.saveCookieInfo("cookieObj", cookieObj, 1);
		var ret = JSON.parse(cookieHelp.getCookieInfo("cookieObj"));
		expect(ret.b).toMatchSnapshot();
	});
	test("Can normally storage object to cookie", function () {
		cookieHelp.saveCookieInfo("cookieStr", cookieStr, 1);
		var ret = cookieHelp.getCookieInfo("cookieStr");
		expect(ret).toMatchSnapshot();
	});
	test("Clear cookie work properly", function () {
		CookieHelp.clearCookie();
		expect(cookieHelp.getCookieInfo("a")).toBeFalsy();
	});
	test("saveUserInfo can save User cookie and get user info not first time works", function () {
		cookieHelp.saveUserInfo(cookieUser, false);
		expect(cookieHelp.getUserInfo()).toMatchSnapshot();
	});
	test("get user info first time after save user info", function () {
		cookieHelp.first = false;
		expect(cookieHelp.getUserInfo().likes).toHaveLength(3);
	});
	test("ClearUserInfo should clean user cookie", function () {
		cookieHelp.clearUserInfo();
		expect(cookieHelp.getUserInfo()).toBeFalsy();
	});
});
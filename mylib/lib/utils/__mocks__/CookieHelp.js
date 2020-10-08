"use strict";

var cookieHelp = {};
var cookieName = "_at";
var savedCookie = null;
var firstVisit = false;

function getCookieInfo(cn) {
	if (cookieName === cn) {
		return JSON.stringify(savedCookie);
	} else if (firstVisit === true) {
		return JSON.stringify({ Authorization: "babara" });
	} else {
		return null;
	}
}

function saveCookieInfo(cn, value) {
	firstVisit = true;
	cookieName = cn;
	savedCookie = value;
}

cookieHelp = {
	getCookieInfo: getCookieInfo,
	saveCookieInfo: saveCookieInfo
};

module.exports = cookieHelp;
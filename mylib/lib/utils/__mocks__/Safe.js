"use strict";

function encryptForRSA(key) {
	return "key";
}

/**
 * @return {string}
 */
function AESEncryption(key, body) {
	return "" + key + body;
}

function AESDecrypt(key, data) {
	return data.slice(key.length);
}

function getRandomStr(len) {
	return "1";
}

var safe = function safe(privateKey) {};

safe.prototype = {
	AESEncryption: AESEncryption,
	getRandomStr: getRandomStr,
	encryptForRSA: encryptForRSA,
	AESDecrypt: AESDecrypt
};

module.exports = safe;
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 李喜锋
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 加密文件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

// aes 加解密


var _jsencrypt = require("./jsencrypt");

var _jsencrypt2 = _interopRequireDefault(_jsencrypt);

var _cryptoJs = require("crypto-js");

var _cryptoJs2 = _interopRequireDefault(_cryptoJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Safe = function () {
	function Safe(key) {
		_classCallCheck(this, Safe);

		this.pubKey = key;
	}
	/**
  * 加密码字符 for RSA
  * @param value
  * @returns {string|*|WordArray}
  */


	_createClass(Safe, [{
		key: "encryptForRSA",
		value: function encryptForRSA() {
			var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

			var encrypt = new _jsencrypt2.default();
			encrypt.setPublicKey(this.pubKey);
			var encrypted = encrypt.encrypt(value);
			return encrypted;
		}

		/**
   * 解密RSA
   * @param encrypted
   * @returns {string|*|WordArray}
   */

	}, {
		key: "decryptForRSA",
		value: function decryptForRSA(encrypted) {
			var decrypt = new _jsencrypt2.default();
			decrypt.setPrivateKey("YOU PRIVATE KEY ");
			return decrypt.decrypt(encrypted);
		}

		/**
   * 动态生成16位的key值 用于AES加密
   *
   *
   * */

	}, {
		key: "getRandomStr",
		value: function getRandomStr(length) {
			var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			var maxPos = chars.length;
			var noceStr = "";
			for (var i = 0; i < (length || 32); i++) {
				noceStr += chars.charAt(Math.floor(Math.random() * maxPos));
			}
			return noceStr;
		}

		//AES 加密

	}, {
		key: "AESEncryption",
		value: function AESEncryption(keystr, parmasStr) {
			var key = _cryptoJs2.default.enc.Utf8.parse(keystr);
			var encrypted = _cryptoJs2.default.AES.encrypt(parmasStr, key, {
				mode: _cryptoJs2.default.mode.ECB,
				padding: _cryptoJs2.default.pad.Pkcs7
			});
			return encrypted.ciphertext.toString();
		}

		//AES 解密

	}, {
		key: "AESDecrypt",
		value: function AESDecrypt(keystrs, parmasStr) {
			var keystr = _cryptoJs2.default.enc.Utf8.parse(keystrs);
			var encryptedHexStr = _cryptoJs2.default.enc.Hex.parse(parmasStr);
			var encryptedBase64Str = _cryptoJs2.default.enc.Base64.stringify(encryptedHexStr);
			var decryptedData = _cryptoJs2.default.AES.decrypt(encryptedBase64Str, keystr, {
				mode: _cryptoJs2.default.mode.ECB,
				padding: _cryptoJs2.default.pad.Pkcs7
			});
			return decryptedData.toString(_cryptoJs2.default.enc.Utf8);
		}
	}]);

	return Safe;
}();

module.exports = Safe;
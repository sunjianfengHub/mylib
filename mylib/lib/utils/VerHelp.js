"use strict";

/**
 * Created by demon on 2017/6/13.
 */
var VerHelp = {
    /**
     *
     * @param phone {string}手机号
     * @returns {bool} 返回 true or false
     */
    getPhone: function getPhone(phone) {
        if (!phone || phone.length < 1) {
            return false;
        }
        var isMobile = /^1[34578]\d{9}$/.test(phone);
        if (isMobile) {
            return true;
        } else {
            return false;
        }
    },
    getTel: function getTel(tel) {
        if (!tel || tel.length < 1) {
            return false;
        }
        var isTel = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel);
        if (isTel) {
            return true;
        } else {
            return false;
        }
    },


    /**
     * 正则表达式
     * sumweal
     */
    stipulateVerifyCharsAndChinese: function stipulateVerifyCharsAndChinese(str) {
        //校验只能输入字符或者中文
        var flg = false;
        str = this.handleNullUndefined(str);
        if (/(^[\u4e00-\u9fa5]{1,}|[a-zA-Z]{1,})$/.test(str) || /(^[a-zA-Z]{1,}|[\u4e00-\u9fa5]{1,})$/.test(str)) {
            flg = true;
        }
        return flg;
    },
    stipulateVerifyChinese: function stipulateVerifyChinese(str) {
        //校验至少一个中文
        var flg = false;
        str = this.handleNullUndefined(str);
        if (/^[\u4e00-\u9fa5]{1,}$/.test(str)) {
            flg = true;
        }
        return flg;
    },
    stipulateVerifyChars: function stipulateVerifyChars(str) {
        //校验至少一个a-zA-Z
        var flg = false;
        str = this.handleNullUndefined(str);
        if (/^[a-zA-Z]{1,}$/.test(str)) {
            flg = true;
        }
        return flg;
    },
    stipulateVerifyCharLength: function stipulateVerifyCharLength(str, stratnum, endnum) {
        //校验字节长度 字节在的区间范围
        var valNum = 0;
        var flg = false;
        if (stratnum == 0 || endnum == 0 || endnum < stratnum) {
            return flg;
        }
        valNum = this.getCharsLength(str);
        if (stratnum <= valNum && valNum <= endnum) {
            flg = true;
        }
        return flg;
    },
    getCharsLength: function getCharsLength(str) {
        //获取字节长度
        str = this.handleNullUndefined(str);
        var char = str.match(/[^\x00-\xff]/ig);
        return str.length + (char == null ? 0 : char.length);
    },

    //空处理
    handleNullUndefined: function handleNullUndefined(str) {
        //空字符处理-去空首尾处理
        console.log("handleNullUndefined:" + str);
        if (str == null || str == undefined || str == "") {
            return "";
        }
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
};
module.exports = VerHelp;
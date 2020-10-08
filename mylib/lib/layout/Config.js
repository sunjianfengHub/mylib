'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Input = require('./lib/Input.js');

var _Input2 = _interopRequireDefault(_Input);

var _TextArea = require('./lib/TextArea.js');

var _TextArea2 = _interopRequireDefault(_TextArea);

var _InputNumber = require('./lib/InputNumber.js');

var _InputNumber2 = _interopRequireDefault(_InputNumber);

var _Select = require('./lib/Select.js');

var _Select2 = _interopRequireDefault(_Select);

var _index = require('./lib/areaSelect/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./lib/file/upFile/index.js');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 区域选择
 */

/**
 * 数字输入
 */


/** 输入框 **/
module.exports = {
    getViewArr: function getViewArr() {
        return [{
            type: ["input", "Input"],
            component: _Input2.default
        }, {
            type: "TextArea",
            component: _TextArea2.default
        }, {
            type: ["InputNumber", "inputNumber", "inputnumber"],
            component: _InputNumber2.default
        }, {
            type: ["select", "Select"],
            component: _Select2.default
        }, {
            type: ["area", "areaselect", "AreaSelect"],
            component: _index2.default
        }, {
            type: ["file", "File"],
            component: _index4.default
        }];
    }
};
/**
 * 文件选择
 */

/**
 * 文本区域输入
 */

/**
 * 文本区域输入
 */
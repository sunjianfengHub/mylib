'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _select = require('antd/lib/select');

var _select2 = _interopRequireDefault(_select);

require('antd/lib/select/style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Option = _select2.default.Option;
/**
 * 输入框模板
 *
 * 默认值写法
 * 当用于selectTyle：value时
 otpion.defaultValue:{
                            key:"这是data【0】.value值",
                             value:"2222"

                        }
 * 当用于selectTyle：title时
 otpion.defaultValue:{
                            key:这是data【0】.value值",
                             title:"这是显示值"

                        }
 */

var LayoutSelect = function (_Component) {
    _inherits(LayoutSelect, _Component);

    function LayoutSelect(props) {
        _classCallCheck(this, LayoutSelect);

        return _possibleConstructorReturn(this, (LayoutSelect.__proto__ || Object.getPrototypeOf(LayoutSelect)).call(this, props));
    }

    _createClass(LayoutSelect, [{
        key: '_initDefaultValue',
        value: function _initDefaultValue(data) {
            return data.option.defaultValue[data.selectType];
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var data = this.props.data;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _select2.default,
                    _extends({
                        labelInValue: true
                    }, this.props.option, {
                        onChange: function onChange(e) {
                            log(e);
                            if (data.selectType === "value") {
                                //value是唯一值，拿到value对应的类型，进行反转
                                var _iteratorNormalCompletion = true;
                                var _didIteratorError = false;
                                var _iteratorError = undefined;

                                try {
                                    for (var _iterator = data.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                        var _ref2 = _step.value;
                                        var temp = _ref2.temp;

                                        if (temp.value === e.key) {
                                            data.resultValue = _this2.formatValueType(temp.type, temp.value);
                                            break;
                                        }
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
                                data.resultValue = e.label;
                            }

                            _this2.props.verification(data, data.resultValue);
                        }
                    }),
                    data.data ? data.data.map(function (obj, key) {
                        obj.temp = _this2.getValueTypeObject(obj.value);
                        return _react2.default.createElement(
                            Option,
                            { value: obj.temp.value, key: key },
                            obj.title
                        );
                    }) : null
                )
            );
        }
    }, {
        key: 'getValueTypeObject',
        value: function getValueTypeObject(value) {
            var type = undefined;
            if (!value && typeof value != "undefined" && value != 0) {
                type = "null";
            } else {
                type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
            }
            return {
                type: type,
                value: type === "object" ? JSON.stringify(value) : value.toString()
            };
        }
    }, {
        key: 'formatValueType',
        value: function formatValueType(type, value) {

            switch (type) {
                case "boolean":
                    return value === "true";
                case "number":
                    return new Number(value).valueOf();
                case "string":
                    return new String(value).valueOf();
                case "object":
                    return JSON.parse(value);
                case "undefined":
                    return undefined;
                case "null":
                    return null;
                default:
                    return value;

            }
        }
    }, {
        key: 'test',
        value: function test(t) {
            var obj = this.getValueTypeObject(t);
            var c = this.formatValueType(obj.type, obj.value);
            return c;
        }
    }]);

    return LayoutSelect;
}(_react.Component);

module.exports = LayoutSelect;
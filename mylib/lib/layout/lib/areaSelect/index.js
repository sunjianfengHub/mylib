"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _index = require("./area/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 输入框模板
 */
var LayoutAreaSelect = function (_Component) {
    _inherits(LayoutAreaSelect, _Component);

    function LayoutAreaSelect(props) {
        _classCallCheck(this, LayoutAreaSelect);

        return _possibleConstructorReturn(this, (LayoutAreaSelect.__proto__ || Object.getPrototypeOf(LayoutAreaSelect)).call(this, props));
    }

    _createClass(LayoutAreaSelect, [{
        key: "_mergeParameter",
        value: function _mergeParameter(parameter, resultValue) {
            _.merge(parameter, resultValue);
        }
    }, {
        key: "_verParameter",
        value: function _verParameter(data) {
            return this.rightObject.verValue(data);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                option = _props.option,
                data = _props.data,
                verification = _props.verification;

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(_index2.default, _extends({
                    ref: function ref(_ref) {
                        _this2.rightObject = _ref;
                    }
                }, option, {
                    onChange: function onChange(e) {
                        data.resultValue = e;
                        //去验证
                        verification(data, data.resultValue);
                    }
                }))
            );
        }
    }]);

    return LayoutAreaSelect;
}(_react.Component);

module.exports = LayoutAreaSelect;
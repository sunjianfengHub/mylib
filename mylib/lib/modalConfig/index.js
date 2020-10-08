'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

require('antd/lib/modal/style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var prefix = "mylib-modalconfig";
var id = "layer_modal";

var Index = function (_Component) {
    _inherits(Index, _Component);

    function Index(props) {
        _classCallCheck(this, Index);

        return _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));
    }

    _createClass(Index, [{
        key: 'show',
        value: function show() {
            var _this2 = this;

            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var content = arguments[1];


            var div = document.getElementById(id);
            if (!div) {
                div = document.createElement('div');
                div.id = id;
                document.body.appendChild(div);
            }
            _reactDom2.default.render(_react2.default.createElement(
                Content,
                _extends({
                    ref: function ref(_ref) {
                        _this2.content = _ref;
                    },
                    removeDiv: function removeDiv() {
                        //删除
                        document.body.removeChild(div);
                    }
                }, props),
                content
            ), div);
        }
    }, {
        key: 'close',
        value: function close() {
            if (this.content) {
                this.content.close();
            } else {
                var div = document.getElementById(id);
                if (div) {
                    document.body.removeChild(div);
                }
            }
        }
    }]);

    return Index;
}(_react.Component);

var Content = function (_Component2) {
    _inherits(Content, _Component2);

    function Content(props) {
        _classCallCheck(this, Content);

        var _this3 = _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));

        _this3.state = {
            visible: true
        };
        return _this3;
    }

    _createClass(Content, [{
        key: 'close',
        value: function close() {
            this.setState({
                visible: false
            }, function () {});
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            return _react2.default.createElement(
                'div',
                { className: prefix + "-show", ref: "test" },
                _react2.default.createElement('div', { ref: "modal" }),
                _react2.default.createElement(
                    _modal2.default,
                    _extends({}, this.props, {
                        getContainer: function getContainer() {
                            return _this4.refs.modal;
                        },
                        visible: this.state.visible,
                        onCancel: function onCancel() {
                            _this4.setState({
                                visible: !_this4.state.visible
                            }, function () {});
                        },
                        afterClose: function afterClose() {
                            _this4.props.removeDiv();
                        }

                    }),
                    this.props.children
                )
            );
        }
    }]);

    return Content;
}(_react.Component);

module.exports = new Index();
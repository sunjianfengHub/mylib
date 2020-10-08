'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _message = require('antd/lib/message');

var _message2 = _interopRequireDefault(_message);

require('antd/lib/message/style');

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

require('antd/lib/button/style');

var _utils = require('../utils');

var _index = require('../modalConfig/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../layout/index.js');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var prefix = "mylib-modalbase";

/**
 * 添加、编辑业务模块
 */

var Index = function () {
    function Index() {
        _classCallCheck(this, Index);
    }

    _createClass(Index, [{
        key: 'getContent',
        value: function getContent(option, props, apiConfig) {
            var _this = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_index4.default, _extends({
                    ref: function ref(_ref2) {
                        _this.layoutAction = _ref2;
                    }
                }, props, {
                    load: function load(_ref) {
                        var loadAPI = _ref.loadAPI,
                            loadAPIError = _ref.loadAPIError;
                    }
                })),
                _react2.default.createElement(
                    'div',
                    { className: prefix + "-btnBox" },
                    this.base_getBottomLeft(apiConfig),
                    option.closeTitle ? _react2.default.createElement(
                        _button2.default,
                        {
                            size: 'large',
                            className: prefix + "-btn",
                            onClick: function onClick() {
                                _this.close();
                            }
                        },
                        option.closeTitle
                    ) : null,
                    option.okTitle ? _react2.default.createElement(
                        ButtonNet,
                        {
                            ref: function ref(_ref3) {
                                _this.buttonNet = _ref3;
                            },
                            size: 'large',
                            className: prefix + "-btn",
                            type: 'primary',
                            onClick: function onClick() {
                                var obj = _this.layoutAction.getLayoutValue(true);
                                if (obj.error) {
                                    _message2.default.error("请填写正确的信息");
                                } else {
                                    //禁用所有可输入值
                                    _this.layoutAction.disableLayout(true, function () {
                                        _this.base_disableLayout(true);
                                        _this.buttonNet.setLoading(true, function () {
                                            if (apiConfig.beforeSubmit) {
                                                if (apiConfig.beforeSubmit(obj.parameter)) {
                                                    _this.doSubmit(_.merge(obj.parameter, _this.base_getLayoutValue()), apiConfig);
                                                } else {
                                                    _this.layoutAction.disableLayout(false, function () {
                                                        _this.base_disableLayout(false);
                                                        _this.buttonNet.setLoading(false, function () {});
                                                    });
                                                }
                                            } else {
                                                _this.doSubmit(_.merge(obj.parameter, _this.base_getLayoutValue()), apiConfig);
                                            }
                                        });
                                    });
                                }
                            }
                        },
                        option.okTitle
                    ) : null
                )
            );
        }
    }, {
        key: 'base_getBottomLeft',
        value: function base_getBottomLeft(apiConfig) {
            return null;
        }
    }, {
        key: 'base_disableLayout',
        value: function base_disableLayout(action) {}
    }, {
        key: 'base_getLayoutValue',
        value: function base_getLayoutValue() {

            return null;
        }
    }, {
        key: 'close',
        value: function close() {
            _index2.default.close();
        }
    }, {
        key: 'show',
        value: function show(option, props) {
            var apiConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


            _index2.default.show(_extends({
                maskClosable: false
            }, option, {
                width: "60%",
                footer: null
            }), this.getContent(option, props, apiConfig));
        }

        /**
         * 提交数据
         * @param values
         */

    }, {
        key: 'doSubmit',
        value: function doSubmit(values, apiConfig) {
            var _this2 = this;

            var param = _.merge(values, apiConfig.otherParam);
            var exe = function exe(state, msg, data) {
                _this2.layoutAction.disableLayout(false, function () {
                    _this2.base_disableLayout(false);
                    _this2.buttonNet.setLoading(false, function () {
                        _message2.default[state](msg);

                        if (state === "success") {
                            if (apiConfig.callBack) {
                                apiConfig.callBack(state, msg, data, param);
                            }
                            _this2.close();
                        }
                    });
                });
            };
            var successCB = function successCB(code, msg, json, option) {
                exe("success", msg, json);
            };
            var failureCB = function failureCB(code, msg, option) {
                exe("error", msg);
            };

            _utils.HttpTool[apiConfig.apiType || "post"](apiConfig.url, successCB, failureCB, param);
        }
    }]);

    return Index;
}();

var ButtonNet = function (_Component) {
    _inherits(ButtonNet, _Component);

    function ButtonNet(props) {
        _classCallCheck(this, ButtonNet);

        var _this3 = _possibleConstructorReturn(this, (ButtonNet.__proto__ || Object.getPrototypeOf(ButtonNet)).call(this, props));

        _this3.state = {
            loading: false
        };
        return _this3;
    }

    _createClass(ButtonNet, [{
        key: 'setLoading',
        value: function setLoading(loading, cb) {
            this.setState({ loading: loading }, cb);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _button2.default,
                _extends({}, this.props, {
                    loading: this.state.loading
                }),
                this.props.children
            );
        }
    }]);

    return ButtonNet;
}(_react.Component);

module.exports = Index;
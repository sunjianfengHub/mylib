'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _Demo = require('./Demo.less');

var _Demo2 = _interopRequireDefault(_Demo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_Component) {
    _inherits(Index, _Component);

    function Index() {
        _classCallCheck(this, Index);

        return _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).apply(this, arguments));
    }

    _createClass(Index, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var style = {
                width: 98,
                height: 98
            };

            var fileList = ["http://p7q2rvr0g.bkt.clouddn.com/cloudfile/IBMwumAL3V4YXE-b_8h7HbxZ.png"];

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { style: { width: 800 } },
                    _react2.default.createElement(_index2.default, {
                        item1: {
                            uploadIngView: function uploadIngView(file) {
                                return _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        '\u4E0A\u4F20\u4E2D...',
                                        file.percent
                                    )
                                );
                            },
                            uploadButtonView: function uploadButtonView(file) {
                                return _react2.default.createElement(
                                    'div',
                                    {
                                        className: _Demo2.default.uploadButton
                                    },
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        '\u4E0A\u4F20\u89C6\u56FE\u4FEE\u6539'
                                    )
                                );
                            }
                        },
                        ref: function ref(_ref) {
                            _this2.upImg = _ref;
                        },
                        fileList: fileList,
                        size: 1024 * 5000,
                        thumbSize: {
                            width: 300,
                            height: 200
                        },
                        rcUpload: {
                            beforeUpload22: function beforeUpload22(file) {
                                console.log('beforeUpload111', file);
                                //校验上传,重写此方法，不生效
                                return false;
                            },
                            accept: "*/*",
                            className: _Demo2.default.item
                        },
                        max: 5,
                        changeImageUrl: function changeImageUrl(param, cb) {
                            log(param);
                            //把base64转成URL
                            // this.changeImageUrl(param,cb);
                        } }),
                    _react2.default.createElement(
                        'div',
                        { onClick: function onClick() {
                                //得到上传参数

                                var value = _this2.upImg.getParamValue();
                                log(value);
                            } },
                        '\u83B7\u53D6\u5F53\u524D\u6587\u4EF6\u4FE1\u606F'
                    ),
                    _react2.default.createElement('br', null)
                )
            );
        }
    }]);

    return Index;
}(_react.Component);

module.exports = Index;
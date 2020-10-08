'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _message = require('antd/lib/message');

var _message2 = _interopRequireDefault(_message);

require('antd/lib/message/style');

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

require('antd/lib/modal/style');

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

require('antd/lib/icon/style');

var _rcUpload = require('rc-upload');

var _rcUpload2 = _interopRequireDefault(_rcUpload);

var _rcProgress = require('rc-progress');

var _reactPlayer = require('react-player');

var _reactPlayer2 = _interopRequireDefault(_reactPlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var prefix = "mylib-upfile";

var UpImg = function (_Component) {
    _inherits(UpImg, _Component);

    function UpImg(props) {
        _classCallCheck(this, UpImg);

        var _this = _possibleConstructorReturn(this, (UpImg.__proto__ || Object.getPrototypeOf(UpImg)).call(this, props));

        _this.ukey = 0;

        var fileList = [];
        if (_this.props.fileList) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _this.props.fileList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var originalUrl = _step.value;

                    if (!_this.checkUrl(originalUrl)) {
                        continue;
                    }
                    var httpType = originalUrl.split("//")[0];
                    var url = originalUrl.split("//")[1];
                    var domain = httpType + "//" + url.split("/")[0];
                    var file = {};
                    file.status = "downing";
                    file.data = {
                        domain: domain,
                        path: originalUrl.replace(domain, "")
                    };
                    fileList.push({
                        ukey: _this.ukey,
                        file: file

                    });
                    log(fileList);
                    _this.ukey += 1;
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
        }

        _this.addPlusItem(fileList);

        _this.state = {
            fileList: fileList,

            previewView: {},
            previewVisible: false
        };

        return _this;
    }

    _createClass(UpImg, [{
        key: 'onChange',
        value: function onChange(e) {
            this.props.onChange && this.props.onChange(e);
        }
    }, {
        key: 'checkUrl',
        value: function checkUrl(str) {
            return str && str.toLowerCase().indexOf("http") === 0;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: prefix + "-layout" },
                this.state.fileList.map(function (data, key) {

                    return _react2.default.createElement(Item, _extends({}, _this2.props, {
                        key: data.ukey,
                        ukey: data.ukey,
                        data: data,
                        action: {
                            addItem: function addItem() {
                                _this2.addItem();
                            },

                            removeItem: function removeItem(ukey) {
                                _this2.removeItem(ukey, function () {
                                    _this2.onChange(_this2.getParamValue());
                                });
                            },
                            refresh: function refresh() {
                                //通知上级，我更新完了
                                _this2.onChange(_this2.getParamValue());
                            },
                            showPreview: function showPreview(file) {

                                _this2.showPreview(file);
                            }

                        }

                    }));
                }),
                _react2.default.createElement('div', { style: { clear: "both" } }),
                _react2.default.createElement(
                    _modal2.default,
                    {
                        width: "90%",
                        key: this.state.previewVisible,
                        visible: this.state.previewVisible, footer: null, onCancel: function onCancel() {
                            return _this2.setState({ previewVisible: false });
                        } },
                    _react2.default.createElement('br', null),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'div',
                        { style: { width: "100%" } },
                        this.state.previewView
                    )
                )
            );
        }
    }, {
        key: 'getParamValue',
        value: function getParamValue() {
            var n = [];
            log(this.state.fileList);
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.state.fileList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var o = _step2.value;


                    log(o.file);
                    if (!o || !o.file || !o.file.originalUrl) continue;
                    n.push(o.file.originalUrl);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            log(n);
            return n.toString();
        }
    }, {
        key: 'showPreview',
        value: function showPreview(file) {
            var previewView = _react2.default.createElement(
                'div',
                null,
                'none'
            );
            if (file.type.indexOf("video/") === 0 || file.type.indexOf("audio/") === 0) {
                //视频类
                var h = file.type.indexOf("video/") === 0 ? document.documentElement.clientHeight * 0.7 : 40;
                previewView = _react2.default.createElement(_reactPlayer2.default, {
                    controls: true,
                    width: "100%",
                    height: h + "px",
                    url: file.originalUrl,
                    playing: true
                });
            } else if (file.type.indexOf("image/") === 0) {
                //图片类
                previewView = _react2.default.createElement('img', { alt: 'example', style: { maxWidth: '100%', maxHeight: '100%' }, src: file.originalUrl });
            } else {
                //鬼知道什么类别，不处理，有可能是MIME_type
                // window.open(file.originalUrl);
                _message2.default.info("不支持此文件预览");
                return;
            }
            // previewView = file.originalUrl;
            this.setState({
                previewView: previewView,
                previewVisible: true
            });
        }
    }, {
        key: 'addPlusItem',
        value: function addPlusItem(fileList) {
            if (this.props.max <= fileList.length) {
                return null;
            }
            fileList.push({
                ukey: this.ukey,
                file: {}
            });
            this.ukey += 1;
            return true;
        }
    }, {
        key: 'addItem',
        value: function addItem(cb) {
            if (!this.addPlusItem(this.state.fileList)) {
                return;
            }
            this.setState({
                fileList: this.state.fileList
            }, cb);
        }
    }, {
        key: 'removeItem',
        value: function removeItem(ukey, cb) {
            for (var i = 0; i < this.state.fileList.length; i++) {
                if (ukey === this.state.fileList[i].ukey) {
                    this.state.fileList.splice(i, 1);
                    var last = this.state.fileList[this.state.fileList.length - 1];
                    if (last && !last.file.type) {
                        //判断最后一个是否是添加
                        //存在添加不处理
                    } else {
                        //添加添加按钮
                        this.addPlusItem(this.state.fileList);
                    }
                    this.setState({
                        fileList: this.state.fileList
                    }, cb);
                    //是否需要添加
                    break;
                }
            }
        }
    }]);

    return UpImg;
}(_react.Component);

var Item = function (_Component2) {
    _inherits(Item, _Component2);

    function Item(props) {
        _classCallCheck(this, Item);

        var _this3 = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));

        var file = _this3.props.data.file;
        _this3.state = {
            file: file
        };

        return _this3;
    }

    _createClass(Item, [{
        key: 'componentDidMount',
        value: function componentDidMount() {

            //如何是解析中，进行处理文件元信息
            if (this.state.file.status === "downing") {
                var file = Object.assign({}, this.state.file);
                this.callBack({ error: null, file: file });
            }
        }
    }, {
        key: 'render',
        value: function render() {

            var file = this.state.file;
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _rcUpload2.default,
                    this.uploaderProps(),
                    this.getContentView(file)
                )
            );
        }
    }, {
        key: 'getUploadIng',
        value: function getUploadIng(file) {
            var _this4 = this;

            var view = null;
            if (this.props.item && this.props.item.uploadIngView) {
                view = this.props.item.uploadIngView(file);
            } else {
                view = _react2.default.createElement(
                    'div',
                    { className: prefix + "-fill" },
                    _react2.default.createElement(_rcProgress.Circle, {
                        percent: file.percent,
                        strokeWidth: '4',
                        strokeColor: '#108ee9',
                        className: prefix + "-circle"
                    }),
                    _react2.default.createElement(
                        'div',
                        { className: prefix + "-itemTitlePro" },
                        _react2.default.createElement(
                            'div',
                            { className: prefix + "-itemTitleProCell" },
                            '\u4E0A\u4F20\u4E2D...'
                        )
                    )
                );
            }
            return _react2.default.createElement(
                'div',
                { className: prefix + "-fill",
                    onClick: function onClick(ev) {
                        _this4.stopEvent(ev);
                    }
                },
                view
            );
        }
    }, {
        key: 'getDownIng',
        value: function getDownIng(file) {
            var _this5 = this;

            var view = null;
            if (this.props.item && this.props.item.downIngView) {
                view = this.props.item.downIngView(file);
            } else {
                view = _react2.default.createElement(
                    'div',
                    { className: prefix + "-fill" },
                    _react2.default.createElement(_rcProgress.Circle, {
                        percent: 95,
                        strokeWidth: '4',
                        strokeColor: '#108ee9',
                        className: prefix + "-circle"
                    }),
                    _react2.default.createElement(
                        'div',
                        { className: prefix + "-itemTitlePro" },
                        _react2.default.createElement(
                            'div',
                            { className: prefix + "-itemTitleProCell" },
                            '\u89E3\u6790\u4E2D...'
                        )
                    )
                );
            }
            return _react2.default.createElement(
                'div',
                { className: prefix + "-fill",
                    onClick: function onClick(ev) {
                        _this5.stopEvent(ev);
                    }
                },
                view
            );
        }
    }, {
        key: 'getUploadButton',
        value: function getUploadButton(file) {
            var view = null;
            if (this.props.item && this.props.item.uploadButtonView) {
                view = this.props.item.uploadButtonView(file);
            } else {
                view = _react2.default.createElement(
                    'div',
                    { className: prefix + "-fileTable" },
                    _react2.default.createElement(
                        'div',
                        { className: prefix + "-fileTitle" },
                        '+ \u4E0A\u4F20'
                    )
                );
            }
            return _react2.default.createElement(
                'div',
                { className: prefix + "-file" },
                view
            );
        }
    }, {
        key: 'getDoneView',
        value: function getDoneView(file) {
            var _this6 = this;

            var iconType = "";
            if (file.type.indexOf("video/") === 0 || file.type.indexOf("audio/") === 0) {
                iconType = "play-circle";
            } else if (file.type.indexOf("image/") === 0) {
                iconType = "eye-o";
            } else {
                iconType = "exception";
            }
            var view = null;
            if (this.props.item && this.props.item.doneView) {
                view = this.props.item.doneView(file);
            } else {
                view = _react2.default.createElement(
                    'div',
                    { className: prefix + "-itemBaseFile",
                        style: { backgroundImage: "url(" + file.thumbUrl + ")" },
                        onClick: function onClick(ev) {
                            _this6.stopEvent(ev);
                        } },
                    _react2.default.createElement(
                        'div',
                        { className: prefix + "-itemTitle" },
                        file.type.split("/")[1] || "未知"
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: prefix + "-itemAction" },
                        _react2.default.createElement(
                            'div',
                            { className: prefix + "-itemActionCell" },
                            _react2.default.createElement(_icon2.default, { type: iconType,
                                className: prefix + "-itemActionCellSee",
                                onClick: function onClick(ev) {
                                    _this6.props.action.showPreview(file);
                                    _this6.stopEvent(ev);
                                } }),
                            '\xA0\xA0',
                            _react2.default.createElement(_icon2.default, { type: 'delete',
                                className: prefix + "-itemActionCellDel",
                                onClick: function onClick(ev) {
                                    //del file
                                    _this6.props.action.removeItem(_this6.props.data.ukey);
                                    _this6.stopEvent(ev);
                                } })
                        )
                    )
                );
            }
            return _react2.default.createElement(
                'div',
                { className: prefix + "-file" },
                view
            );
        }
    }, {
        key: 'getContentView',
        value: function getContentView(file) {

            if (this.props.item && this.props.item.getContentView) {
                //完全自定义
                return this.props.item.getContentView(file);
            } else {
                //默认选项
                switch (file.status) {
                    case "start":
                    case "uploading":
                        return this.getUploadIng(file);
                    case "done":
                        return this.getDoneView(file);
                    case "downing":
                        return this.getDownIng(file);
                    default:
                        return this.getUploadButton(file);
                }
            }
        }
    }, {
        key: 'stopEvent',
        value: function stopEvent(ev) {
            try {
                var oEvent = ev;
                //js阻止事件冒泡
                oEvent.cancelBubble = true;
                oEvent.stopPropagation();

                //js阻止链接默认行为，没有停止冒泡
                oEvent.preventDefault();
                return false;
            } catch (e) {
                //11
            }
        }
    }, {
        key: 'assign',
        value: function assign() {
            for (var _len = arguments.length, arr = Array(_len), _key = 0; _key < _len; _key++) {
                arr[_key] = arguments[_key];
            }

            var n = {};
            if (!arr) return n;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = arr[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var o = _step3.value;

                    if (!o) continue;
                    for (var key in o) {
                        n[key] = o[key];
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return n;
        }
    }, {
        key: 'callBack',
        value: function callBack(_ref) {
            var _this7 = this;

            var error = _ref.error,
                file = _ref.file;

            // log(file)
            if (error) {
                this.showError(error);
            } else {
                //添加新的选择文件
                //更新当前组件

                var fileNew = this.assign(this.state.file, file);
                var upView = function upView(fileNew) {
                    _this7.setState({
                        file: fileNew
                    }, function () {
                        if (fileNew.status === "start") {
                            _this7.setState({
                                file: fileNew
                            }, function () {
                                _this7.props.action.addItem();
                            });
                        }
                    });
                };
                if (fileNew.status === "done") {
                    //获取文件信息
                    this.getFileInfo(fileNew, function (res) {
                        //res.error 存在
                        //错误分为：文件不存，获取错误等。非影音类型的是获取不到文件信息的
                        //res.error   //不存在，上传到七牛成功.
                        fileNew.avinfo = res;
                        _this7.getResultInfo(fileNew);
                        upView(fileNew);
                        _this7.props.data.file = fileNew;
                        //通知上级，我更新完了
                        _this7.props.action.refresh();
                    });
                } else if (fileNew.status === "downing") {
                    //获取文件头信息
                    this.getFileInfoHead(fileNew, function (res) {
                        //res.error 存在
                        //错误分为：文件不存，获取错误等。非影音类型的是获取不到文件信息的
                        //res.error   //不存在，上传到七牛成功.
                        if (res.error) {
                            fileNew.type = "other/file";
                        } else {
                            fileNew.type = res.type;
                        }
                        fileNew.status = "done";
                        //再次获取
                        _this7.callBack({ error: null, file: fileNew });
                    });
                } else {

                    upView(fileNew);
                }

                file.status = "done";
            }
        }
    }, {
        key: 'uploaderProps',
        value: function uploaderProps() {
            var _this8 = this;

            var cb = this.callBack.bind(this);
            // status: 'done', // 状态有：uploading done error removed

            return _extends({
                action: '/cloudfile/upload',
                multiple: true,
                beforeUpload: function beforeUpload(file) {
                    _this8.getBase64(file, cb);
                    file.status = "before";
                    file.percent = 0;
                    // cb({error: null, file: file})
                    // return false
                    return _this8.verificationFile(file, cb);
                },
                onStart: function onStart(file) {
                    file.status = "start";
                    file.percent = 0;
                    cb({ error: null, file: file });
                    // 添加组件
                },
                onSuccess: function onSuccess(file) {
                    file.status = "done";
                    file.percent = 100;
                    if (file.code === 200) {
                        cb({ error: null, file: file });
                    } else {
                        cb({ error: file.message, file: file });
                        _this8.props.action.removeItem(_this8.props.data.ukey);
                    }
                },
                onProgress: function onProgress(step, file) {
                    file.status = "uploading";
                    file.percent = Math.round(step.percent);
                    cb({ error: null, file: file });
                },
                onError: function onError(err) {
                    _this8.showError("" + err.toString());
                    _this8.props.action.removeItem(_this8.props.data.ukey);
                },
                className: prefix + "-item"
            }, this.props.rcUpload);
        }

        /**
         * 获取文件信息，是否在七牛上
         */

    }, {
        key: 'getFileInfo',
        value: function getFileInfo(file, cb) {
            var url = file.data.domain + file.data.path + "?avinfo";
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                        try {
                            var res = JSON.parse(xhr.responseText);
                            cb(res);
                        } catch (e) {
                            console.warn("获取文件元信息非JSON格式，不处理");
                            cb({
                                error: "获取文件元信息未知错误 status：" + xhr.status
                            });
                        }
                    } else {
                        cb({
                            error: "获取文件元信息未知错误 status：" + xhr.status
                        });
                    }
                }
            };
            xhr.open("get", url, true);
            xhr.send(null);

            return "111";
        }
        /**
         * 获取文件头信息，判断得到文件类型
         */

    }, {
        key: 'getFileInfoHead',
        value: function getFileInfoHead(file, cb) {
            var url = file.data.domain + file.data.path;
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                        try {
                            var headers = xhr.getResponseHeader("content-type");
                            log("headers：" + headers);
                            cb({
                                type: headers
                            });
                        } catch (e) {
                            console.warn("获取头信息非JSON格式，不处理");
                            cb({
                                error: "获取头信息未知错误 status：" + xhr.status
                            });
                        }
                    } else {
                        cb({
                            error: "获取头信息未知错误 status：" + xhr.status
                        });
                    }
                }
            };
            xhr.open("head", url, true);
            xhr.send(null);
        }
    }, {
        key: 'getResultInfo',
        value: function getResultInfo(file) {
            if (!file.data) {
                return;
            }
            var fileUrl = file.data.domain + file.data.path;
            var style = this.props.thumbSize || {
                width: 100,
                height: 100
            };
            var hasInfo = !file.avinfo.error;
            //非七牛，不处理缩略图
            if (file.type.indexOf("video/") === 0 && hasInfo) {
                //视频类
                file.thumbUrl = fileUrl;
                //视频帧缩略图小图
                file.thumbUrl = fileUrl + "?vframe/jpg/offset/1/w/" + style.width + "/h/" + style.height + "";
                //视频帧缩略图
                file.originalThumbUrl = fileUrl + "?vframe/jpg/offset/1";

                //视频元信息
            } else if (file.type.indexOf("audio/") === 0 && hasInfo) {
                //音频类
                file.thumbUrl = "data:image/png;base64,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";
                file.originalThumbUrl = file.thumbUrl;
            } else if (file.type.indexOf("image/") === 0 && hasInfo) {
                //图片类
                file.thumbUrl = fileUrl + "?imageView2/1/w/" + style.width + "/h/" + style.height + "";
                file.originalThumbUrl = fileUrl + "?imageView2/1";
            } else {
                //鬼知道什么类别，不处理，有可能是MIME_type
                //也有可能是上传七牛失败，被上传到了本地
                file.thumbUrl = "data:image/png;base64,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";
                file.originalThumbUrl = file.thumbUrl;
                // file.thumbUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525346240331&di=cc7dbf817ef3da6d3520c4c6cd55a511&imgtype=0&src=http%3A%2F%2Fwww.uedsc.com%2Fwp-content%2Fuploads%2F2014%2F04%2FPerspectivePageViewNavigation03.jpg"
            }
            file.originalUrl = fileUrl;
        }
    }, {
        key: 'verificationFile',
        value: function verificationFile(file, cb) {

            //文件格式,由选择过滤
            //文件大小，上传前验证
            //如需要判定图片比例，重写beforeUpload
            var fileSize = this.props.size; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
            if (fileSize !== 0 && fileSize < file.size) {
                cb({
                    error: '文件过大 当前文件：' + this.bytesToSize(file.size) + '  限制大小：' + this.bytesToSize(fileSize),
                    image: null
                });
                return false;
            }

            return true;
        }
    }, {
        key: 'getBase64',
        value: function getBase64(file, cb) {
            if (!this.props.hasBase64) {
                return;
            }
            // let reader = new FileReader();
            // let imgUrl = reader.readAsDataURL(file);
            // file.base64 = reader.result;
        }
    }, {
        key: 'showError',
        value: function showError(e) {
            _message2.default.error(e);
        }
    }, {
        key: 'bytesToSize',
        value: function bytesToSize(bytes) {
            if (bytes === 0) return '0 B';

            var k = 1024;

            var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

            var i = Math.floor(Math.log(bytes) / Math.log(k));

            return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
            //toPrecision(3) 后面保留一位小数，如1.0GB                                                                                                                  //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
        }
    }]);

    return Item;
}(_react.Component);

/**
 *
 * @type {UpImg}
 * size 图片大小:单位字节 default 2 M = 2097152
 * types 图片类型:["jpg,png"] default ["jpg,png"]
 * scale 图片比例:w/h = scale  例:300/150 = 2 default none
 * width 图片大小:单位 PX default auto
 * max 图片数量:单位 int default 9
 * changeImageUrl 图片上传到服务器 function (param,callBack) default none
 *
 * 示例
 * 默认
 * <upFile>
 * 上传一张正方形不超过200KB的图片
 * <upFile max={1} size={1024*200} scale={1}>
 *     atnd 初始化值
 *      {getFieldDecorator('images', {
                        valuePropName: 'file',
                        initialValue: {fileList:[{
                            url:"https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/1c950a7b02087bf46ebfd1f2fed3572c11dfcf5e.jpg",
                            urlPreview:"https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/1c950a7b02087bf46ebfd1f2fed3572c11dfcf5e.jpg"
                        }]},
                        rules: [{ required: true, message: "必填" }],
                    })(
                        <upFile max={2} />
                    )}
 *
 */

UpImg.defaultProps = {
    size: 1024 * 1024 * 2,
    rcUpload: {
        accept: "*/*"
    },
    scale: undefined,
    width: undefined,
    hasBase64: true,
    max: 9
};

module.exports = UpImg;
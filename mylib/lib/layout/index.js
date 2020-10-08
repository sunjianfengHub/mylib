'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

require('antd/lib/form/style');

var _row = require('antd/lib/row');

var _row2 = _interopRequireDefault(_row);

require('antd/lib/row/style');

var _col = require('antd/lib/col');

var _col2 = _interopRequireDefault(_col);

require('antd/lib/col/style');

var _Config = require('./Config.js');

var _Config2 = _interopRequireDefault(_Config);

var _index = require('./lib/file/upFile/index.js');

var _index2 = _interopRequireDefault(_index);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormItem = _form2.default.Item;

var prefix = "mylib-layout";

var Index = function (_Component) {
    _inherits(Index, _Component);

    function Index(props) {
        _classCallCheck(this, Index);

        var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

        _this.state = {
            parameterArr: _this.props.parameterArr,
            loadAPI: false,
            resetCount: 0
        };

        return _this;
    }

    _createClass(Index, [{
        key: 'showLoadAPi',
        value: function showLoadAPi(loadAPI, loadAPIError, cb) {
            var _this2 = this;

            //更新API

            //通知外部，加载中

            this.setState({
                loadAPI: loadAPI
            }, function () {
                !_this2.props.load || _this2.props.load({
                    loadAPI: loadAPI,
                    loadAPIError: loadAPIError
                });
                !cb || cb();
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            this.showLoadAPi(true, null, function () {
                setTimeout(function () {
                    _this3.fillDataForNet();
                }, 0);
            });
        }
    }, {
        key: 'fillDataForNet',
        value: function fillDataForNet() {
            var _this4 = this;

            //获取需要由API填充的属性，进行填充
            var arr = this.state.parameterArr;
            var data = [];
            for (var i = 0; i < arr.length; i++) {
                var obj = arr[i];
                if (obj.apiData) {
                    obj._index = i; //记录下标
                    data.push(obj);
                }
            }
            if (data && data.length > 0) {
                //去获取值
                _utils.HttpTool.post("/base-basedata/dataapi/dictionarys/screen/conditions", function (code, msg, json, option) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {

                        for (var _iterator = json[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var _obj = _step.value;

                            arr[_obj._index].data = _obj.data;
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

                    _this4.oldParameterArr = _.merge([], arr);
                    _this4.state.parameterArr = arr;
                    _this4.showLoadAPi(false);
                }, function (code, msg, option) {
                    //不可选择
                    _this4.oldParameterArr = _.merge([], arr);
                    _this4.showLoadAPi(true, "高级搜索错误:" + msg);
                }, {
                    "data": data
                });
            } else {
                this.oldParameterArr = _.merge([], arr);
                this.showLoadAPi(false);
            }
        }
    }, {
        key: 'disableLayout',
        value: function disableLayout(disable, cb) {
            this.setState({
                loadAPI: disable
            }, cb);
        }
    }, {
        key: 'getLayoutValue',
        value: function getLayoutValue(verification) {

            //通知UI校验
            var errorCount = 0;
            if (verification) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {

                    for (var _iterator2 = this.layoutItemRef[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var ref = _step2.value;

                        if (!ref.verification()) {
                            errorCount += 1;
                        }
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
            }
            var parameter = {};
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.state.parameterArr[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var obj = _step3.value;


                    if (obj.ref && obj.ref._mergeParameter) {
                        //如果存在自定义的值，去采信息
                        obj.ref._mergeParameter(parameter, obj.resultValue);
                    } else {
                        if (obj.field) {
                            parameter[obj.field] = obj.resultValue;
                        } else {
                            //不收集
                        }
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

            return {
                error: errorCount > 0,
                errorCount: errorCount,
                parameter: parameter
            };
        }
    }, {
        key: 'resetLayoutValue',
        value: function resetLayoutValue(cb) {

            if (this.oldParameterArr) {
                this.setState({
                    parameterArr: _.merge([], this.oldParameterArr),
                    resetCount: this.state.resetCount + 1
                }, cb);
            }
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'div',
                { key: this.state.resetCount },
                this.getViewLayout()
            );
        }
    }, {
        key: 'getViewLayout',
        value: function getViewLayout() {
            var _this5 = this;

            var colCount = this.props.colCount;

            this.layoutItemRef = [];
            var rowArr = [];
            var arr = this.state.parameterArr.concat();
            var size = Math.ceil(arr.length / colCount);
            for (var i = 0; i < size; i++) {
                rowArr.push(_react2.default.createElement(
                    _row2.default,
                    { key: i },
                    arr.splice(0, colCount).map(function (obj, key) {
                        return _react2.default.createElement(LayoutItem, {
                            ref: function ref(_ref) {

                                if (_ref) {
                                    _this5.layoutItemRef.push(_ref);
                                }
                            },
                            key: key,
                            data: obj,
                            colCount: colCount,
                            loadAPI: _this5.state.loadAPI,
                            formItemLayout: _this5.props.formItemLayout
                        });
                    })
                ));
            }
            return _react2.default.createElement(
                _form2.default,
                {
                    layout: "inline"

                },
                rowArr
            );
        }
    }]);

    return Index;
}(_react.Component);

var LayoutItem = function (_Component2) {
    _inherits(LayoutItem, _Component2);

    function LayoutItem(props) {
        _classCallCheck(this, LayoutItem);

        var _this6 = _possibleConstructorReturn(this, (LayoutItem.__proto__ || Object.getPrototypeOf(LayoutItem)).call(this, props));

        _this6.state = {
            help: "",
            validateStatus: "",
            upView: 0
        };
        _this6.tempObject = {};
        return _this6;
    }

    _createClass(LayoutItem, [{
        key: 'upDate',
        value: function upDate(cb) {
            this.setState({
                upView: this.state.upView + 1
            }, cb);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                data = _props.data,
                colCount = _props.colCount,
                formItemLayout = _props.formItemLayout;

            //如果子项的formItemLayout存在,以子荐为标准

            !data.formItemLayout || (formItemLayout = data.formItemLayout);

            return _react2.default.createElement(
                _col2.default,
                { span: 24 / colCount, className: prefix + "-item" },
                _react2.default.createElement(
                    FormItem,
                    _extends({
                        key: this.state.upView
                    }, formItemLayout, {
                        required: data.required,
                        style: { width: "100%" },
                        label: data.name,
                        colon: true,
                        validateStatus: this.state.validateStatus,
                        help: this.state.help
                    }),
                    this.clearPasswordSave(data)
                )
            );
        }
    }, {
        key: 'clearPasswordSave',
        value: function clearPasswordSave(data) {
            var view = this.getRightType(data);
            var props = { style: { display: "none", width: 0, height: 0, zIndex: -999999 } };
            if (data && data.type === "input" && data.option && data.option.type === "password") {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('input', _extends({ type: 'text' }, props)),
                    _react2.default.createElement('input', _extends({ type: 'password' }, props)),
                    view,
                    _react2.default.createElement('input', _extends({ type: 'text' }, props)),
                    _react2.default.createElement('input', _extends({ type: 'password' }, props))
                );
            } else {
                return view;
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var data = this.props.data;

            if (data && data.option && data.option.defaultValue) {
                //默认选择值
                if (data.ref && data.ref._initDefaultValue) {
                    //执行初始化值方案
                    data.resultValue = data.ref._initDefaultValue(data);
                } else {
                    if (typeof data.option.defaultValue === "string") {
                        data.resultValue = data.option.defaultValue;
                    } else {
                        //无初始化值方案，
                        data.resultValue = data.option.defaultValue;
                        // console.warn("Layout 子项【"+data.type +"】组件无初始值方案 defaultValue = undefined,请添加_initDefaultValue（data）=>{}")
                    }
                }
            }
            if (data.apiConfig) {
                //url param apiType in data.data
                this.fillDataForNet(data);
            }
        }
    }, {
        key: 'fillDataForNet',
        value: function fillDataForNet(data) {
            var _this7 = this;

            //获取需要由API填充的属性，进行填充

            var apiConfig = data.apiConfig;
            if (!apiConfig.apiType) {
                apiConfig.apiType = "post";
            }
            if (!apiConfig.url) {
                console.error("please add url for apiConfig");
            }

            _utils.HttpTool[apiConfig.apiType](apiConfig.url, function (code, msg, json, option) {
                data.data = apiConfig.fillObject ? apiConfig.fillObject(json) : json;
                _this7.upDate(function () {});
            }, function (code, msg, option) {
                message.error(apiConfig.url + " 错误:" + msg);
            }, apiConfig.param);
        }
    }, {
        key: 'setHelpState',
        value: function setHelpState(validateStatus, help, cb) {
            this.setState({
                validateStatus: validateStatus,
                help: help
            }, cb);
        }
    }, {
        key: 'verValue',
        value: function verValue(data, value) {
            if (!value) {
                value = "";
            }
            var state = false;
            //其他校对

            if (data.ref && data.ref._verParameter) {
                try {
                    state = data.ref._verParameter(data);
                } catch (e) {
                    console.error(e);
                }
            } else {

                //字符串校对
                if (typeof data.reg == 'function') {
                    state = data.reg(value);
                } else {
                    state = data.reg.test(value);
                }

                // console.error("please  add "+data.verMethod+" method for "+data.type)
                // console.error("请在"+data.type+"中添加"+data.verMethod+"方法")
            }

            return state;
        }
    }, {
        key: 'verification',
        value: function verification(data, value) {
            if (!data) {
                data = this.props.data;
                value = this.props.data.resultValue;
            }

            if (data.ver && data.reg) {
                if (this.verValue(data, value)) {
                    this.setHelpState("success", "");
                    data.resultValue = value;
                } else {
                    this.setHelpState("error", data.verMessage);
                    data.resultValue = value;
                    return false;
                }
            } else {
                data.resultValue = value;
            }
            return true;
        }
    }, {
        key: 'getRightType',
        value: function getRightType(data) {
            var _this8 = this;

            var option = _.merge({}, data.option) || {};
            if (!option.placeholder) {
                option.placeholder = "请输入" + data.name;
            }
            if (!option.maxLength) {
                option.maxLength = '50';
            }
            //加载中，禁用输入框 如果本身是禁用，一直禁用
            option.disabled = this.props.loadAPI || option.disabled;

            var props = {
                option: option,
                data: data,
                verification: function verification(data, value) {
                    _this8.verification(data, value);
                }
            };
            var arr = _Config2.default.getViewArr(props);

            //查打匹配的类型
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = arr[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var obj = _step4.value;

                    var has = typeof obj.type === "string" ? obj.type === data.type : obj.type.indexOf(data.type) >= 0;
                    if (has) {
                        var _View = obj.component;
                        return _react2.default.createElement(_View, _extends({
                            ref: function ref(_ref3) {
                                data.ref = _ref3;
                            }
                        }, props));
                    }
                }
                //添加额外扩展
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            if (data.component) {
                var View = data.component;
                return _react2.default.createElement(View, _extends({
                    ref: function ref(_ref2) {
                        data.ref = _ref2;
                    }
                }, props));
            }
            //不存在，执行
            return _react2.default.createElement(
                'div',
                { className: prefix + "-text" },
                option.defaultValue && option.defaultValue.toString()
            );

            // switch (data.type) {
            //     case "input":
            //         return (
            //             <div>
            //                 <Input
            //
            //                     {...option}
            //                     onChange={(e) => {
            //                       this.verification(data,e.target.value)
            //                     }}
            //
            //                 />
            //             </div>
            //         );
            //     case "TextArea":
            //         return (
            //             <div>
            //                 <TextArea
            //                     {...option}
            //                     onChange={(e) => {
            //                       this.verification(data,e.target.value)
            //                     }}
            //
            //                 />
            //             </div>
            //         );
            //
            //     case "inputNumber":
            //         return (
            //             <div>
            //                 <InputNumber
            //                     {...option}
            //                     onChange={(value) => {
            //                         this.verification(data,value)
            //                     }}
            //
            //                 />
            //             </div>
            //         );
            //     case "select":
            //         return (
            //             <div>
            //                 <Select
            //                     labelInValue={true}
            //                     {...option}
            //                     onChange={(e) => {
            //                         if (data.selectType === "value") {
            //                             //value是唯一值，拿到value对应的类型，进行反转
            //                             for(let {temp} of data.data){
            //                                 if(temp.value===e.key){
            //                                     data.resultValue = this.formatValueType(temp.type,temp.value);
            //                                     break;
            //                                 }
            //                             }
            //
            //                         } else {
            //                             data.resultValue = e.label;
            //                         }
            //
            //                         this.verification(data,data.resultValue);
            //                     }}
            //                 >
            //                     {data.data?data.data.map((obj, key) => {
            //                         obj.temp=  this.getValueTypeObject(obj.value)
            //                         return <Option value={obj.temp.value} key={key}>{obj.title}</Option>
            //                     }):null}
            //                 </Select>
            //             </div>
            //         );
            //     case "areaSelect":
            //         return (
            //             <div>
            //                 <areaSelect
            //                     ref={(ref)=>{
            //                         this.tempObject.rightObject = ref;
            //                     }}
            //                     {...option}
            //                     onChange={(e) => {
            //                         data.resultValue = e;
            //                         //去验证
            //                         this.verification(data,data.resultValue);
            //
            //                     }}
            //                 />
            //             </div>
            //         );
            //     case "File":
            //         return (
            //             <UpFile
            //                 {...option}
            //                 onChange={(e) => {
            //                     data.resultValue = e;
            //                     log("v:"+e);
            //                     //去验证
            //                     this.verification(data,data.resultValue);
            //
            //                 }}
            //             />
            //         )
            //
            //     default:
            //         return (
            //             <div className={prefix+"-text"}>
            //                 {option.defaultValue&&option.defaultValue.toString()}
            //             </div>
            //         );
            // }
        }
    }]);

    return LayoutItem;
}(_react.Component);

Index.defaultProps = {
    defaultShow: false,
    colCount: 4,
    parameterArr: [],
    formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 16, offset: 0 }
    }
};

module.exports = Index;
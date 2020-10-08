'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _select = require('antd/lib/select');

var _select2 = _interopRequireDefault(_select);

require('antd/lib/select/style');

var _message = require('antd/lib/message');

var _message2 = _interopRequireDefault(_message);

require('antd/lib/message/style');

var _index = require('../../../../utils/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Option = _select2.default.Option;
var prefix = "mylib-area";

var Index = function (_Component) {
    _inherits(Index, _Component);

    function Index(props) {
        _classCallCheck(this, Index);

        //获取默认值
        var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

        _this.initData = _this.props.defaultValue;
        var countryValue = _this.initData.countryId ? {
            id: _this.initData.countryId,
            name: _this.initData.country
        } : undefined;
        var provinceValue = countryValue && (_this.initData.provinceId ? {
            id: _this.initData.provinceId,
            name: _this.initData.province
        } : undefined);
        var cityValue = countryValue && provinceValue && (_this.initData.cityId ? { id: _this.initData.cityId, name: _this.initData.city } : undefined);
        var countyValue = countryValue && provinceValue && cityValue && (_this.initData.countyId ? { id: _this.initData.countyId, name: _this.initData.county } : undefined);

        //配置状态机
        _this.state = {
            countrySel: true, //国家选框是否可选
            provinceSel: provinceValue ? true : false, //省/区
            citySel: cityValue ? true : false, //城市
            countySel: countyValue ? true : false, //区县

            countryData: [], //国家下拉数据
            provinceData: [],
            cityData: [],
            countyData: [],

            //已经选择的数据
            countryValue: countryValue,
            provinceValue: provinceValue,
            cityValue: cityValue,
            countyValue: countyValue,

            upDate: 0,
            lv: parseInt(_this.props.lv), //层级

            countryDisable: _this.props.countryDisable, //设置某一栏目禁用
            provinceDisable: _this.props.provinceDisable,
            cityDisable: _this.props.cityDisable,
            countyDisable: _this.props.countyDisable
        };

        //记录每次编辑的数据
        _this.param = {
            countryId: _this.initData.countryId ? _this.initData.countryId : undefined,
            country: _this.initData.country ? _this.initData.country : undefined,
            provinceId: _this.initData.provinceId ? _this.initData.provinceId : undefined,
            province: _this.initData.province ? _this.initData.province : undefined,
            cityId: _this.initData.cityId ? _this.initData.cityId : undefined,
            city: _this.initData.city ? _this.initData.city : undefined,
            countyId: _this.initData.countyId ? _this.initData.countyId : undefined,
            county: _this.initData.county ? _this.initData.county : undefined
        };

        //默认排序和字段名
        _this.itemList = ['country', 'province', 'city', 'county'];

        _this.configList = [{
            typeName: 'country',
            placeholder: '国家'
        }, {
            typeName: 'province',
            placeholder: '省/州'
        }, {
            typeName: 'city',
            placeholder: '城市'
        }, {
            typeName: 'county',
            placeholder: '区/县'
        }];

        return _this;
    }

    _createClass(Index, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getSelectOptionData('country');

            //如果有默认值，是编辑，则加载所有下拉
            this.initData.countryId && this.getSelectOptionData('province', this.initData.countryId);
            this.initData.provinceId && this.getSelectOptionData('city', this.initData.provinceId);
            this.initData.cityId && this.getSelectOptionData('county', this.initData.cityId);
        }

        //改变某个选框的可选状态

    }, {
        key: 'changeSelectState',
        value: function changeSelectState(type, state) {
            this.setState(_defineProperty({}, type + 'Sel', state || false));
        }

        //改变某个选框的值

    }, {
        key: 'changeValue',
        value: function changeValue(type, obj) {
            var _setState2,
                _this2 = this;

            var index = this.itemList.indexOf(type);
            var nearType = this.itemList[index + 1];
            var middleType = this.itemList[index + 2];
            var farType = this.itemList[index + 3];

            this.setState((_setState2 = {}, _defineProperty(_setState2, type + 'Value', obj || undefined), _defineProperty(_setState2, nearType + 'Value', undefined), _defineProperty(_setState2, middleType + 'Value', undefined), _defineProperty(_setState2, farType + 'Value', undefined), _defineProperty(_setState2, nearType + 'Sel', true), _defineProperty(_setState2, middleType + 'Sel', false), _defineProperty(_setState2, farType + 'Sel', false), _setState2), function () {
                _this2.valueChangeCB();
            });
        }

        //值改变的回调，参数为选择的数据 obj

    }, {
        key: 'valueChangeCB',
        value: function valueChangeCB() {
            var _state = this.state,
                countryValue = _state.countryValue,
                provinceValue = _state.provinceValue,
                cityValue = _state.cityValue,
                countyValue = _state.countyValue;

            this.param = {
                countryId: countryValue ? countryValue.id : undefined,
                country: countryValue ? countryValue.name : undefined,
                provinceId: provinceValue ? provinceValue.id : undefined,
                province: provinceValue ? provinceValue.name : undefined,
                cityId: cityValue ? cityValue.id : undefined,
                city: cityValue ? cityValue.name : undefined,
                countyId: countyValue ? countyValue.id : undefined,
                county: countyValue ? countyValue.name : undefined
            };

            this.props.onChange && this.props.onChange(this.param);
        }

        //验证输入

    }, {
        key: 'verValue',
        value: function verValue(config) {
            // log(config);
            // log(!config||!config.required);
            if (!config || !config.required) {
                //如果是非必填的，直接返回true,验证通过
                return true;
            }
            var _state2 = this.state,
                countryValue = _state2.countryValue,
                provinceValue = _state2.provinceValue,
                cityValue = _state2.cityValue,
                countyValue = _state2.countyValue,
                lv = _state2.lv;


            var country = countryValue ? true : false;
            var province = provinceValue ? true : false;
            var city = cityValue ? true : false;
            var county = countyValue ? true : false;

            var state = false;
            switch (lv) {
                case 1:
                    state = country;
                    break;
                case 2:
                    state = country && province;
                    break;
                case 3:
                    state = country && province && city;
                    break;
                case 4:
                    state = country && province && city && county;
                    break;
                default:
                    break;
            }

            return state;
        }

        //配置某个选框的下拉数据

    }, {
        key: 'initSelectOptions',
        value: function initSelectOptions(type, data) {
            var _setState3;

            this.setState((_setState3 = {}, _defineProperty(_setState3, type + 'Data', data || []), _defineProperty(_setState3, type + 'Sel', true), _setState3));
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: prefix + "-container" },
                this.getItem(this.configList[0]),
                _react2.default.createElement(
                    'span',
                    null,
                    '-'
                ),
                this.getItem(this.configList[1]),
                _react2.default.createElement(
                    'span',
                    null,
                    '-'
                ),
                this.getItem(this.configList[2]),
                _react2.default.createElement(
                    'div',
                    {
                        className: this.props.lv >= 4 && this.state.countyData.length > 0 ? prefix + "-inlineBlock" : prefix + "-hidden"
                    },
                    _react2.default.createElement(
                        'span',
                        null,
                        '-'
                    ),
                    this.getItem(this.configList[3])
                )
            );
        }

        //渲染下拉选项

    }, {
        key: 'getOptions',
        value: function getOptions(items) {
            var view = [];
            for (var key in items) {
                view.push(_react2.default.createElement(
                    Option,
                    {
                        key: 'key' + key,
                        value: items[key].id
                    },
                    items[key].name
                ));
            }

            return view;
        }

        /**
         *  请求数据
         */

    }, {
        key: 'getSelectOptionData',
        value: function getSelectOptionData(type, id) {
            var _this3 = this;

            //传入id,查子节点；不传id,查最顶层数据
            if (!type) {
                return;
            }

            var param = {};
            if (id) {
                param.id = id;
            }

            var successCB = function successCB(code, msg, json, option) {
                _this3.initSelectOptions(type, json);
            };
            var failureCB = function failureCB(code, msg, option) {
                _message2.default.warning(msg);
            };

            var apiUrl = id ? "/base-basedata/dataapi/areas/get/children" : "/base-basedata/dataapi/areas/query";

            _index.HttpTool.post(apiUrl, successCB, failureCB, param);
        }

        /**
         * 解析配置返回选框
         * @param config
         */

    }, {
        key: 'getItem',
        value: function getItem(config) {
            var _this4 = this;

            var typeName = config.typeName;
            var index = this.itemList.indexOf(typeName);
            var nextTypeName = this.itemList[index + 1];

            return _react2.default.createElement(
                _select2.default,
                {
                    value: this.state[typeName + 'Value'] ? this.state[typeName + 'Value'].id : undefined,
                    disabled: this.props.disabled || !this.state[typeName + 'Sel'],
                    showSearch: true,
                    style: { width: 70 },
                    placeholder: config.placeholder,
                    optionFilterProp: 'children',
                    onSelect: function onSelect(value, obj) {
                        if (_this4.state[typeName + 'Value'] && value == _this4.state[typeName + 'Value'].id) {
                            return;
                        }
                        var item = {
                            id: value,
                            name: obj.props.children
                        };
                        _this4.changeValue(typeName, item);
                        _this4.getSelectOptionData(nextTypeName, value);
                    },
                    filterOption: function filterOption(input, option) {
                        return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                    }
                },
                this.getOptions(this.state[typeName + 'Data'])
            );
        }
    }]);

    return Index;
}(_react.Component);

Index.defaultProps = {
    lv: 4,
    disabled: false,
    countryDisable: false,
    provinceDisable: false,
    cityDisable: false,
    countyDisable: false,
    defaultValue: {}
};

module.exports = Index;
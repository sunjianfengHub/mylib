import React, {Component} from 'react';

import Form from 'antd/lib/form';
import 'antd/lib/form/style';





import Row from 'antd/lib/row';
import 'antd/lib/row/style';

import Col from 'antd/lib/col';
import 'antd/lib/col/style';



import Config from "./Config.js";
import UpFile from './lib/file/upFile/index.js';
const FormItem = Form.Item;

import {HttpTool} from "../utils";
let prefix = "mylib-layout"

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parameterArr: this.props.parameterArr,
            loadAPI:false,
            resetCount: 0,
        }


    }



    showLoadAPi(loadAPI, loadAPIError,cb) {

        //更新API

        //通知外部，加载中

        this.setState({
            loadAPI
        },()=>{
            !this.props.load||this.props.load({
                loadAPI,
                loadAPIError
            });
            !cb||cb();
        });

    }

    componentDidMount() {
        this.showLoadAPi(true,null,()=>{
            setTimeout(()=>{
                this.fillDataForNet();
            },0)
        })
    }

    fillDataForNet() {
        //获取需要由API填充的属性，进行填充
        let arr = this.state.parameterArr
        let data = [];
        for (let i = 0; i < arr.length; i++) {
            let obj = arr[i];
            if (obj.apiData) {
                obj._index = i;//记录下标
                data.push(obj)

            }
        }
        if (data && data.length > 0) {
//去获取值
            HttpTool.post("/base-basedata/dataapi/dictionarys/screen/conditions",
                (code, msg, json, option) => {

                    for (let obj of json) {
                        arr[obj._index].data = obj.data;
                    }
                    this.oldParameterArr = _.merge([], arr);
                    this.state.parameterArr = arr;
                    this.showLoadAPi(false)
                }, (code, msg, option) => {
                    //不可选择
                    this.oldParameterArr = _.merge([], arr);
                    this.showLoadAPi(true, "高级搜索错误:" + msg)
                }, {
                    "data": data
                });
        } else {
            this.oldParameterArr = _.merge([], arr);
            this.showLoadAPi(false)
        }
    }

    disableLayout(disable,cb){
        this.setState({
            loadAPI:disable
        },cb);
    }

    getLayoutValue(verification) {

        //通知UI校验
        let errorCount = 0;
        if(verification){

            for(let ref of this.layoutItemRef){
                if(!ref.verification()){
                    errorCount+=1;
                }
            }
        }
        let parameter = {};
        for (let obj of this.state.parameterArr) {

            if(obj.ref&&obj.ref._mergeParameter){
                //如果存在自定义的值，去采信息
                obj.ref._mergeParameter(parameter,obj.resultValue);
            }else{
                if(obj.field){
                    parameter[obj.field] = obj.resultValue;
                }else{
                    //不收集
                }
            }

        }
        return {
            error:errorCount>0,
            errorCount,
            parameter
        };

    }

    resetLayoutValue(cb) {

        if (this.oldParameterArr) {
            this.setState({
                parameterArr: _.merge([], this.oldParameterArr),
                resetCount: this.state.resetCount + 1,
            },cb);

        }


    }

    render() {

        return (
            <div key={this.state.resetCount} >
                {this.getViewLayout()}
            </div>
        );
    }

    getViewLayout() {

        let colCount = this.props.colCount;


        this.layoutItemRef = [];
        let rowArr = [];
        let arr = this.state.parameterArr.concat();
        let size = Math.ceil(arr.length / colCount);
        for (let i = 0; i < size; i++) {
            rowArr.push(
                <Row key={i}>
                    {
                        arr.splice(0, colCount).map((obj, key) => {
                            return (
                                <LayoutItem
                                    ref={(ref)=>{

                                        if(ref){
                                            this.layoutItemRef.push(ref);
                                        }

                                    }}
                                    key={key}
                                    data={obj}
                                    colCount={colCount}
                                    loadAPI={this.state.loadAPI}
                                    formItemLayout={this.props.formItemLayout}
                                />
                            )
                        })
                    }
                </Row>
            )
        }
        return (
            <Form
                layout={"inline"}

            >
                {rowArr}

            </Form>
        )
    }


}

class LayoutItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            help: "",
            validateStatus: "",
            upView:0,
        }
        this.tempObject = {};
    }

    upDate(cb){
        this.setState({
            upView:this.state.upView+1
        },cb);
    }
    render() {
        let {data, colCount,formItemLayout} = this.props;

        //如果子项的formItemLayout存在,以子荐为标准
        !data.formItemLayout || (formItemLayout =data.formItemLayout)

        return (<Col span={24 / colCount} className={prefix+"-item"}>

                <FormItem
                    key={this.state.upView}
                    {...formItemLayout}
                    required={data.required}
                    style={{width: "100%"}}
                    label={data.name}
                    colon={true}
                    validateStatus={this.state.validateStatus}
                    help={this.state.help}
                >
                    {this.clearPasswordSave(data)}
                </FormItem>
            </Col>
        );
    }

    clearPasswordSave(data){
        let view = this.getRightType(data);
        let props = {style:{display: "none",width:0,height:0,zIndex:-999999}}
        if(data&&data.type === "input"&&data.option&&data.option.type === "password"){
            return (
                <div>
                    <input type="text" {...props} />
                    <input type="password" {...props} />
                    {view}
                    <input type="text" {...props} />
                    <input type="password" {...props} />
                </div>
            )

        }else{
            return  view
        }

    }

    componentDidMount() {
        let {data} = this.props;
        if (data && data.option && data.option.defaultValue) {
            //默认选择值
            if(data.ref&&data.ref._initDefaultValue){
                //执行初始化值方案
                data.resultValue = data.ref._initDefaultValue(data);
            }else{
                if(typeof (data.option.defaultValue)==="string"){
                    data.resultValue = data.option.defaultValue;
                }else {
                  //无初始化值方案，
                    data.resultValue = data.option.defaultValue;
                    // console.warn("Layout 子项【"+data.type +"】组件无初始值方案 defaultValue = undefined,请添加_initDefaultValue（data）=>{}")
                }
            }
        }
        if(data.apiConfig){
            //url param apiType in data.data
            this.fillDataForNet(data)

        }
    }

    fillDataForNet(data) {
        //获取需要由API填充的属性，进行填充

        let apiConfig = data.apiConfig;
        if(!apiConfig.apiType){
            apiConfig.apiType = "post"
        }
        if(!apiConfig.url){
            console.error("please add url for apiConfig")
        }

        HttpTool[apiConfig.apiType](apiConfig.url,
            (code, msg, json, option) => {
                data.data = apiConfig.fillObject?apiConfig.fillObject(json):json;
            this.upDate(()=>{

            });


            }, (code, msg, option) => {
                message.error(apiConfig.url+" 错误:" + msg)
            }, apiConfig.param);
    }

    setHelpState(validateStatus, help, cb) {
        this.setState({
            validateStatus: validateStatus,
            help: help
        }, cb);
    }

    verValue(data,value){
        if(!value){
            value = ""
        }
        let state = false;
        //其他校对

        if(data.ref&&data.ref._verParameter){
            try{
                state =data.ref._verParameter(data);
            }catch (e) {
                console.error(e)
            }
        }else{

            //字符串校对
            if(typeof data.reg == 'function'){
                state = data.reg(value);
            }else{
                state  = data.reg.test(value);
            }

            // console.error("please  add "+data.verMethod+" method for "+data.type)
            // console.error("请在"+data.type+"中添加"+data.verMethod+"方法")
        }


        return state;
    }

    verification(data,value){
        if(!data){
            data = this.props.data;
            value = this.props.data.resultValue;
        }

        if (data.ver && data.reg) {
            if (this.verValue(data,value)) {
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
    getRightType(data) {

        let option = _.merge({},data.option) || {};
        if (!option.placeholder) {
            option.placeholder = "请输入" + data.name;
        }
        if(!option.maxLength){
            option.maxLength = '50';
        }
        //加载中，禁用输入框 如果本身是禁用，一直禁用
        option.disabled = this.props.loadAPI || option.disabled;


        let props = {
            option:option,
            data:data,
            verification:(data,value)=>{
                this.verification(data,value)
            }
        };
        let arr = Config.getViewArr(props);

        //查打匹配的类型
        for(let obj of arr){
            let has = (typeof (obj.type) ==="string")?obj.type===data.type:obj.type.indexOf(data.type)>=0
            if(has){
                let View = obj.component;
                return <View
                        ref={(ref)=>{
                            data.ref = ref;
                        }}
                    {...props}/>;
            }
        }
        //添加额外扩展
        if(data.component){
            let View = data.component;
            return <View
                ref={(ref)=>{
                    data.ref = ref;
                }}
                {...props}/>;
        }
        //不存在，执行
          return (
            <div className={prefix+"-text"}>
                {option.defaultValue&&option.defaultValue.toString()}
            </div>);

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



}

Index.defaultProps = {
    defaultShow:false,
    colCount: 4,
    parameterArr: [],
    formItemLayout: {
        labelCol: {span: 8},
        wrapperCol: {span: 16, offset: 0},
    }
}

module.exports = Index;
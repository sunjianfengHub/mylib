import React, { Component } from "react";

//打包测试
import {areaSelect,ModalBase,UpFile,Utils} from '../../mylib/';

//源码开发
// import {AreaSelect,ModalBase,UpFile,Utils} from '../../mylib/source/index';
let HttpTool = Utils.HttpTool;


import Test from './Test'
class Index extends Component {
    constructor(props) {
        super(props);
    }


    render(){

        return (
            <div>

                <div
                    onClick={() => {

                        log(HttpTool)
                        let Modal = new ModalBase()
                        let otherParam = {}
                        otherParam.invalid = true;
                        // otherParam.country = '中国';
                        // otherParam.province = '浙江省';
                        // otherParam.city = '杭州市';
                        // otherParam.cityId = 'ceshichengshi001';

                        Modal.show(
                            {

                                title: "添加机场",
                                okTitle: "添加0",
                                closeTitle: "取消0",
                            },
                            this.getAddData(),
                            {
                                otherParam: otherParam,
                                url: '/base-basedata/dataapi/airports/add',
                                callBack: (state) => {
                                    //添加成功回调
                                }
                            });
                    }}
                >
                    打开测试添加面板
                </div>
                <UpFile/>

            </div>
        );
    }

    getAddData() {
        let defaultOption = {
            type: "other",
            ver: true,
            reg: /^\S{1,5}$/,
            verMessage: "1-50个字符",
            required: true,
        }
        return {
            colCount: 2,
            formItemLayout: {
                labelCol: {span: 6},
                wrapperCol: {span: 18, offset: 0},
            },
            parameterArr: [
                {
                    name: "选择城市",
                    unKey: "selectOther1",
                    type: "AreaSelect",
                    verMethod: "verValue",
                    verMessage: "请选择",
                    formItemLayout: {
                        labelCol: {span: 6},
                        wrapperCol: {span: 18, offset: 0},
                    },
                    option: {
                        lv: 3,
                    }

                },
                {
                    ...defaultOption,
                    field: "enName",
                    type:"diyinput",
                    name: "自定义",
                    reg:(v)=>{
                        return true;
                    },
                    component:Test,
                    option:{
                        defaultValue:{
                            a: {
                                b: "adasd"
                            }
                        }
                    },
                    data:[
                        {
                            title:"aaaa",
                            value:"1111",
                        },{
                            title:"bbbb",
                            value:"2222",
                        },{
                            title:"cccc",
                            value:"3333",
                        },
                    ]}
                ,
                {
                    ...defaultOption,
                    field: "enName",
                    name: "机场英语名",
                    selectType:"title",
                    type:"select",
                    option:{
                        defaultValue:{
                            key:"2222",
                            title:"bbbb",

                        }
                    },
                    data:[
                        {
                            title:"aaaa",
                            value:"1111",
                        },{
                            title:"bbbb",
                            value:"2222",
                        },{
                            title:"cccc",
                            value:"3333",
                        },
                    ]}
                ,
                {
                    ...defaultOption,
                    field: "longitude",
                    name: "经度",
                    type: "inputNumber",
                    verMessage: "请输入-180至180",
                    option: {
                        max: 180,
                        min: -180
                    }
                },
                {
                    ...defaultOption,
                    field: "latitude",
                    type: "inputNumber",
                    verMessage: "请输入-90至90",
                    name: "纬度",
                    option: {
                        max: 90,
                        min: -90
                    }
                },
                {
                    ...defaultOption,
                    field: "text",
                    type: "TextArea",
                    reg: /^\S{1,500}$/,
                    verMessage: "1-500个字符",
                    name: "备注",
                    option: {
                        autosize:{
                            minRows:3,
                            maxRows:5,
                        }
                    }
                },
                {
                    ...defaultOption,
                    field: "img",
                    type: "File",
                    required:false,
                    ver:false,
                    reg: (v)=>{
                        return v&&v.split(",").length>=1
                    },
                    verMessage: "最少两个文件",
                    name: "添加文件",
                    option: {
                        item: {
                            uploadIngView_del: (file) => {
                                return (
                                    <div
                                    >
                                        <div>上传中...{file.percent}</div>
                                    </div>
                                )
                            },
                            uploadButtonView_del: (file) => {
                                return (
                                    <div
                                    >
                                        <div>上传视图修改</div>
                                    </div>
                                )
                            }
                        },
                        fileList: [
                            // "http://p7q2rvr0g.bkt.clouddn.com/cloudfile/IBMwumAL3V4YXE-b_8h7HbxZ.png",
                            // "http://p7q2rvr0g.bkt.clouddn.com/cloudfile/d20vAfjhn13xSXlg6Qgt6FKD.png",
                            // "http://p7q2rvr0g.bkt.clouddn.com/cloudfile/L3o7vfTC7X9jvtG-llNDWyR0.mp4",
                            // "http://p7q2rvr0g.bkt.clouddn.com/cloudfile/aOiOzGxFoHWINKFYw9cb2pio.apk",
                        ],
                        size: 1024 * 5000000,
                        thumbSize: {
                            width: 99,
                            height: 99,
                        },
                        rcUpload: {
                            beforeUpload_del: (file) => {
                                console.log('beforeUpload111', file);
                                //校验上传,重写此方法，不生效
                                return false;
                            },
                            accept: "*/*",
                        },
                        max: 2,
                    }
                }


            ],
        }
    }
}

module.exports = Index;

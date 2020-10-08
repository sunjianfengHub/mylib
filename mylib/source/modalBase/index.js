import React, {Component} from 'react';
import message from 'antd/lib/message';
import 'antd/lib/message/style';
import Button from 'antd/lib/button';
import 'antd/lib/button/style';

import {HttpTool} from '../utils';
import ModalConfig from "../modalConfig/index.js"
import Layout from '../layout/index.js';
let prefix = "mylib-modalbase"

/**
 * 添加、编辑业务模块
 */
class Index {
    constructor() {
    }


    getContent(option,props,apiConfig) {

        return (
            <div>
                <Layout
                    ref={(ref) => {
                        this.layoutAction = ref;
                    }}
                    {
                        ...props
                    }
                    load={({
                               loadAPI,
                               loadAPIError
                           }) => {

                    }}
                />
                <div className={prefix+"-btnBox"}>
                    {this.base_getBottomLeft(apiConfig)}
                    {
                        option.closeTitle? <Button
                                size={'large'}
                                className={prefix+"-btn"}
                                onClick={() => {
                                    this.close();
                                }}
                            >
                                {option.closeTitle}
                            </Button>:null
                    }
                    {
                        option.okTitle?
                            <ButtonNet
                                ref={(ref)=>{
                                    this.buttonNet = ref;
                                }}
                                size={'large'}
                                className={prefix+"-btn"}
                                type={'primary'}
                                onClick={() => {
                                    let obj = this.layoutAction.getLayoutValue(true);
                                    if (obj.error) {
                                        message.error("请填写正确的信息")
                                    } else {
                                        //禁用所有可输入值
                                        this.layoutAction.disableLayout(true, () => {
                                            this.base_disableLayout(true)
                                            this.buttonNet.setLoading(true,()=>{
                                                if(apiConfig.beforeSubmit){
                                                    if(apiConfig.beforeSubmit(obj.parameter)){
                                                        this.doSubmit(_.merge(obj.parameter,this.base_getLayoutValue()), apiConfig);
                                                    }else {
                                                        this.layoutAction.disableLayout(false, () => {
                                                            this.base_disableLayout(false);
                                                            this.buttonNet.setLoading(false,()=>{

                                                            })
                                                        });
                                                    }
                                                }else{
                                                    this.doSubmit(_.merge(obj.parameter,this.base_getLayoutValue()), apiConfig);
                                                }

                                            })

                                        });
                                    }
                                }}
                            >
                                {option.okTitle}
                            </ButtonNet>
                            :null
                    }

                </div>
            </div>
        )
    }

    base_getBottomLeft(apiConfig){
        return null;
    }
    base_disableLayout(action){

    }
    base_getLayoutValue(){

        return null;
    }

    close(){
        ModalConfig.close();
    }

    show(option, props, apiConfig = {}) {


        ModalConfig.show(
            {
                maskClosable: false,
                ...option,
                width: "60%",
                footer: null,
            }
            , this.getContent(option,props,apiConfig)
        );
    }

    /**
     * 提交数据
     * @param values
     */
    doSubmit(values, apiConfig) {

        let param = _.merge(values, apiConfig.otherParam)
        let exe = (state,msg,data)=>{
            this.layoutAction.disableLayout(false, () => {
                this.base_disableLayout(false);
                this.buttonNet.setLoading(false,()=>{
                    message[state](msg);

                    if(state==="success"){
                        if(apiConfig.callBack){
                            apiConfig.callBack(state,msg,data,param);
                        }
                        this.close();

                    }
                })
            });
        }
        let successCB = (code, msg, json, option) => {
            exe("success",msg,json);
        };
        let failureCB = (code, msg, option) => {
            exe("error",msg);
        };

        HttpTool[apiConfig.apiType||"post"](apiConfig.url, successCB, failureCB,param )
    }


}

class ButtonNet extends Component{
    constructor(props){
        super(props);

        this.state = {
            loading:false
        }
    }
    setLoading(loading,cb){
        this.setState({loading},cb);
    }
    render(){
        return (
            <Button
                {...this.props}
                loading={this.state.loading}
            >
                {this.props.children}
            </Button>
        );
    }
}


module.exports = Index;
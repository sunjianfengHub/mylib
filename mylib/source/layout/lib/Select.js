import React, {Component} from 'react';


import Select from 'antd/lib/select';
import 'antd/lib/select/style';
const Option = Select.Option;
/**
 * 输入框模板
 *
 * 默认值写法
 * 当用于selectTyle：value时
 otpion.defaultValue:{
                            key:"这是data【0】.value值",
                             value:"2222"

                        }
 * 当用于selectTyle：title时
 otpion.defaultValue:{
                            key:这是data【0】.value值",
                             title:"这是显示值"

                        }
 */
class LayoutSelect extends Component {
    constructor(props) {
        super(props);
    }

    _initDefaultValue(data){
        return data.option.defaultValue[data.selectType];
    }

    render(){
        let {data} = this.props;
        return (
            <div>
                <Select
                    labelInValue={true}
                    {...this.props.option}
                    onChange={(e) => {
                        log(e)
                        if (data.selectType === "value") {
                            //value是唯一值，拿到value对应的类型，进行反转
                            for(let {temp} of data.data){
                                if(temp.value===e.key){
                                    data.resultValue = this.formatValueType(temp.type,temp.value);
                                    break;
                                }
                            }

                        } else {
                            data.resultValue = e.label;
                        }

                        this.props.verification(data,data.resultValue);
                    }}
                >
                    {data.data?data.data.map((obj, key) => {
                        obj.temp=  this.getValueTypeObject(obj.value)
                        return <Option value={obj.temp.value} key={key}>{obj.title}</Option>
                    }):null}
                </Select>
            </div>

        );
    }


    getValueTypeObject(value){
        let type = undefined;
        if(!value && typeof(value)!="undefined" && value!=0){
            type =  "null";
        }else{
            type =  typeof(value);
        }
        return {
            type:type,
            value:type==="object"?JSON.stringify(value):value.toString()
        }

    }

    formatValueType(type,value){

        switch (type){
            case "boolean":
                return value==="true";
            case "number":
                return new Number(value).valueOf();
            case "string":
                return new String(value).valueOf();
            case "object":
                return JSON.parse(value);
            case "undefined":
                return undefined;
            case "null":
                return null;
            default:
                return value;


        }
    }
    test(t){
        let obj = this.getValueTypeObject(t)
        let c = this.formatValueType(obj.type,obj.value);
        return c;
    }


}

module.exports = LayoutSelect;
import React, {Component} from 'react';


import Input from 'antd/lib/input';
import 'antd/lib/input/style';


/**
 * 输入框模板
 */
class Test extends Component {
    constructor(props) {
        super(props);
    }
    _initDefaultValue(data){
       return JSON.stringify(data.option.defaultValue)
    }
    //    this.props.verification(data,data.resultValue);
    render(){
        return (
            <div>
                <div
                    {...this.props.option}

                >
                    {this.props.data.resultValue}
                </div>
            </div>
        );
    }


}


module.exports = Test;
import React, {Component} from 'react';


import Input from 'antd/lib/input';
import 'antd/lib/input/style';


/**
 * 输入框模板
 */
class Index extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                <Input
                    {...this.props.option}
                    onChange={(e) => {
                        //输入值事件校对回调
                        this.props.verification(this.props.data,e.target.value)
                    }}

                />
            </div>
        );
    }


}


module.exports = Index;
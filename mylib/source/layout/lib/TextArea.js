import React, {Component} from 'react';


import Input from 'antd/lib/input';
import 'antd/lib/input/style';
let TextArea = Input.TextArea;

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
                        <TextArea
                            {...this.props.option}
                            onChange={(e) => {
                                this.props.verification(this.props.data,e.target.value)
                            }}

                        />
                    </div>
                )
    }


}


module.exports = Index;
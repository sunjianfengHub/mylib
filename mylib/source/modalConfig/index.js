import React, {Component} from 'react';
import ReactDOM from "react-dom";
import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style';
let prefix = "mylib-modalconfig"
let id = "layer_modal";
class Index extends Component {
    constructor(props) {
        super(props);


    }
    show(props = {},content) {

        let div = document.getElementById(id)
        if (!div) {
            div = document.createElement('div');
            div.id = id;
            document.body.appendChild(div);
        }
        ReactDOM.render(
            <Content
                ref={(ref)=>{
                    this.content = ref;
                }}
                removeDiv={() => {
                    //删除
                    document.body.removeChild(div);
                }}
                {...props}
            >
                {content}
            </Content>,
            div
        );
    }


    close(){
        if(this.content){
            this.content.close();
        }else{
            let div = document.getElementById(id)
            if(div){
                document.body.removeChild(div);
            }

        }

    }



}

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
    }
    close(){
        this.setState({
            visible: false
        }, () => {

        });
    }

    render() {

        return (
            <div className={prefix+"-show"} ref={"test"}>
                <div ref={"modal"}/>
                <Modal
                    {...this.props}
                    getContainer={() => {
                        return this.refs.modal;
                    }}
                    visible={this.state.visible}
                    onCancel={() => {
                        this.setState({
                            visible: !this.state.visible
                        }, () => {

                        });

                    }}
                    afterClose={() => {
                        this.props.removeDiv()
                    }}


                >
                    {this.props.children}

                </Modal>
            </div>
        );
    }
}


module.exports = new Index();
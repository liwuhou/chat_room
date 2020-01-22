import React, { Component } from 'react';
import './index.scss';

// import {sendMsg} from '../../api'

class ChatInput extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            message: '',
        }
    }
    handleKeyUpMessage = (event) => {
        if(event.ctrlKey && event.keyCode === 13) this.handleClickSendMessage();
    }
    handleClickSendMessage = () => {
        this.props.onsendMsg(this.state.message);
        this.setState({message: ''});
        // const {message: content} = this.state;
        // if(content.trim() === '') return;

        // const {chatName = '__INVALID_NANE__', ownUserName: username = '__INVALID_NANE__'} = this.props;
        // sendMsg({
        //     chatName,
        //     username,
        //     content
        // }).then((data) => {
        //     if(data.status === 1){
        //         const {data: message} = data;
        //         this.props.onUpdateMsg(message);
        //         this.setState({
        //             message: ''
        //         })
        //     }
        // }).catch(e => {
        //     console.error(e);
        // })
    }
    handleChangeMessage = (event) => {
        this.setState({
            message: event.target.value
        });
    }
    
    render() { 
        return ( 
            <div className="chat__input">
                <textarea
                    className="chat__input_white"
                    value={this.state.message}
                    onChange={this.handleChangeMessage}
                    onKeyUp={this.handleKeyUpMessage}
                />
                <button
                    className="chat__input_btn"
                    onClick={this.handleClickSendMessage}
                >发送</button>
            </div>
        );
    }
}
 
export default ChatInput;
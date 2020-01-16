import React, { Component } from 'react';

import {sendMsg} from '../../api'

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
        const {message: content} = this.state;
        if(content.trim() === '') return;

        const {chatName = '__INVALID_NANE__', ownUserName: userName = '__INVALID_NANE__'} = this.props;
        sendMsg({
            chatName,
            userName,
            content
        }).then(data => {
            console.log(data);
        }).catch(e => {
            console.error(e);
        })
        setTimeout(() => {
            window.history.go(0);
        }, 10);
    }
    handleChangeMessage = (event) => {
        this.setState({
            message: event.target.value
        })
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
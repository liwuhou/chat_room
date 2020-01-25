import React, { Component } from 'react';
import './index.scss';

class ChatInput extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            message: '',
        }
    }
    handleKeyUpMessage = (event) => {
        if(event.keyCode === 13) this.handleClickSendMessage();
    }
    handleClickSendMessage = () => {
        this.props.onsendMsg(this.state.message);
        this.setState({message: ''});
    }
    handleChangeMessage = (event) => {
        this.setState({
            message: event.target.value
        });
    }
    
    render() { 
        return ( 
            <div className="chat__input">
                <input
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
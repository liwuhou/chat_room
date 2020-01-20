import React from 'react'
import {parseTime} from 'utils';
import './index.scss';

class MessageTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formatedTime: '0秒前',
        }
        this.timer = null;
    }
    
    componentDidMount() {
        this.setState({
            formatedTime: this.formatMillisecond(this.props.time)
        })
        this.timer = setInterval(() => {
            this.setState({
                formatedTime: this.formatMillisecond(this.props.time)
            })
        }, 60000);
    }

    componentWillUnmount() {
        if(this.timer) clearInterval(this.timer);
    }
    
    formatMillisecond = (time) => {
        const now = Date.now();
        const diffTime = now - time;
        if(diffTime < 60 * 1000){
            return `${parseInt(diffTime / 1000, 10)}秒前`;
        }else if(diffTime < 60 * 60 * 1000){
            return `${parseInt(diffTime / (60 * 1000), 10)}分前`;
        }else if(diffTime < 12 * 60 * 60 * 1000){
            return `${parseInt(diffTime / (60 * 60 * 1000), 10)}小时前`;
        }else if(diffTime < 30 * 24 * 60 * 60 * 1000){
            return `${parseInt(diffTime / (24 * 60 * 60 * 1000))}天前`;
        }else{
            return parseTime('M月d日EE HH:mm:ss', time);
        }
    }
    render() { 
        return (
            <div className="message_time">
                <p>{this.state.formatedTime}</p>
            </div>
        );
    }
}
 
export default MessageTimer
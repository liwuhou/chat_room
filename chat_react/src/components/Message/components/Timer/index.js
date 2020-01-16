import React from 'react'

// const formatMillisecond = (time) => {
//     const now = Date.now();
//     const diffTime = now - time;
//     if(diffTime < 60 * 1000){
//         return `${parseInt(diffTime / 1000, 10)}秒前`;
//     }else if(diffTime < 60 * 60 * 1000){
//         return `${parseInt(diffTime / (60 * 1000), 10)}分前`;
//     }else if(diffTime < 12 * 60 * 60 * 1000){
//         return `${parseInt(diffTime / (12 * 60 * 60 * 1000), 10)}小时前`
//     }else{
//         return Date(time).toLocaleString().replace(/(上午)|(下午).+GMT\+.+/, '');
//     }
// }

// export default function MessageTimer({time}){
//     return (
//         <div className="message_time">
//             <p>{formatMillisecond(time)}</p>
//         </div>
//     )
// }

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
            return `${parseInt(diffTime / (60 * 60 * 1000), 10)}小时前`
        }else{
            return Date(time).toLocaleString().replace(/(上午)|(下午).+GMT\+.+/, '');
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
import React from 'react';
import Alert from '@/components/Alert';

import './index.scss';

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            AlertProps: {
                isShow: false,
                title: '提示',
                description: '',
                onConfirm: this.onAlertConfirm,
            }
        }
    }
    // 输入用户名
    handleChangeUsername = (event) => {
        const username = event.target.value;
        this.setState({
            username
        })
    }
    
    // 输入密码
    handleChangePawsword = (event) => {
        const password = event.target.value;
        this.setState({
            password
        })
    }

    // 进入
    handleClickSubmitUserData = () => {
        const {username, password} = this.state;
        if(!username) return this.showAlert('请输入摸鱼者大名！');
        if(!password) return this.showAlert('请输入摸鱼口令！');
        
    }

    // 弹框展示
    showAlert(description, title = '提示'){
        this.setState(({AlertProps}) => ({
            AlertProps: {
                ...AlertProps,
                isShow: true,
                title,
                description
            }
        }))
    }

    // 弹框中的确定
    onAlertConfirm = () => {
        this.setState(({AlertProps}) => ({
            AlertProps: {
                ...AlertProps,
                isShow: false,
                description: ''
            }
        }))   
    }
    
    render(){
        return (
            <div className="login">
                <img className="login__sologan" src="./sologan.svg" alt="武陵人摸鱼为业"/>
                <div className="login__input">
                    <label htmlFor="username" className="login__input_label">摸鱼人：</label>
                    <input
                        type="text"
                        id="username" 
                        placeholder="请输入昵称"
                        value={this.state.username}
                        onChange={this.handleChangeUsername}
                    />
                </div>
                <div className="login__input">
                    <label htmlFor="password" className="login__input_label">摸鱼口令：</label>
                    <input 
                        id="password" 
                        type="password" 
                        placeholder="请输入密码"
                        value={this.state.password} 
                        onChange={this.handleChangePawsword}
                    />
                </div>
                <div className="login__submit">
                    <input
                        value="进 入" 
                        type="button" 
                        onClick={this.handleClickSubmitUserData}
                    />
                </div>

                <Alert {...this.state.AlertProps}/>
            </div>
        )
    }
}
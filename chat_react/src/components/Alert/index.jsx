import React from 'react';

import './index.scss';

export default function Alert(props){
    console.log(props);
    const {isShow, title = '提示', description = '', confirmText = '好的吧', cancelText = '算了', onConfirm, onCancel = null} = props;
    return (
        <React.Fragment>
            {
                isShow ? (
                    <div className="alert-cover">
                        <div className="alert">
                            <div className="alert__heading">{title}</div>
                            <div className="alert__description">{description}</div>
                            <div className="alert__buttons">
                                {onCancel && <button className="alert__buttons_cancel" onClick={onCancel}>{cancelText}</button>}
                                <button className="alert__buttons_confirm" onClick={onConfirm}>{confirmText}</button>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </React.Fragment>
    )
}
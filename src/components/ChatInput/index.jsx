import React, { useState } from 'react';
import { Input, Icon } from 'antd';

import './ChatInput.scss';

const ChatInput = () => {
    const [value, setValue] = useState('');

    return (
        <div className="chat-input">
            <Icon 
                className="chat-input__smile-btn"
                type="smile"/>
            <Input
                onChange={e => setValue(e.target.value)}
                placeholder="Input your message"/>
            <div className="chat-input__actions">
                <Icon
                    type="camera"/>
                {value ? 
                <Icon type="check-circle"/>
                : <Icon type="audio"/>}
            </div>
        </div>);
};

export default ChatInput;
import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { UploadField } from '@navjobs/upload';
import { Picker } from 'emoji-mart';
import classNames from 'classnames';

import './ChatInput.scss';

const ChatInput = () => {
    const [value, setValue] = useState(''),
        [emojiTabIsActive, setEmojiTab] = useState(false);

    const toggleEmojiTab = () => {
        setEmojiTab(!emojiTabIsActive);
    }

    return (
        <div className="chat-input">
            <div className="chat-input__emoji-picker-wrapper">
                <div className={classNames("chat-input__emoji-picker", {
                    'chat-input__emoji-picker--visible': emojiTabIsActive,
                })}>
                    <Picker set='emojione'/>
                </div>
            </div>
            <Button
                onClick={toggleEmojiTab}
                type='link'
                shape='circle'
                className="chat-input__smile-btn"
                icon="smile"/>
            <Input
                onChange={e => setValue(e.target.value)}
                placeholder="Input your message"/>
            <div className="chat-input__actions">
                <UploadField
                    onFiles={ files => console.log(files)}
                    containerProps={{
                        className: 'chat-input__actions-upload-photo'
                    }}
                    uploadProps={{
                        accept: '.jpg,.png,.jpeg,.pdf,.webp,.gif,.bmp',
                        multiple: '',
                    }}>
                        <Button
                            type='link'
                            shape='circle'
                            icon='camera'/>
                    </UploadField>
                {value ? 
                <Button type='link' shape='circle' icon="check-circle"/>
                : <Button type='link' shape='circle' icon="audio"/>}
            </div>
        </div>);
};

export default ChatInput;
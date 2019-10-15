import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { UploadField } from '@navjobs/upload';
import { Picker, Emoji } from 'emoji-mart';
import classNames from 'classnames';

import './ChatInput.scss';

const ChatInput = ({
    currentDialogId,
    onMessageSend
}) => {
    const [value, setValue] = useState(''),
        [emojiTabIsActive, setEmojiTab] = useState(false);

    const toggleEmojiTab = () => {
        setEmojiTab(!emojiTabIsActive);
    }

    const handleSendMessage = e => {
        if (e.keyCode === 13 || e.type === 'click') {
            onMessageSend(value, currentDialogId);
            setValue('');
        }
    }

    const handleEmojiSelect = ({ colons }) => {
        setValue((value + " " + colons).trim());
    }

    return (
        <div className="chat-input">
            <div className="chat-input__emoji-picker-wrapper">
                <div className={classNames("chat-input__emoji-picker", {
                    'chat-input__emoji-picker--visible': emojiTabIsActive,
                })}>
                    <Picker set='google' onSelect={(emoji) => handleEmojiSelect(emoji)}/>
                </div>
            </div>
            <Button
                onClick={toggleEmojiTab}
                type='link'
                shape='circle'
                className="chat-input__smile-btn"
                icon="smile"/>
            <Input
                onChange={ e => setValue(e.target.value) }
                onKeyUp={ handleSendMessage }
                placeholder="Input your message"
                value={ value }/>
            <div className="chat-input__actions">
                <UploadField
                    // onFiles={ files => console.log(files)}
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
                <Button type='link' shape='circle' icon="check-circle" onClick={handleSendMessage}/>
                : <Button type='link' shape='circle' icon="audio"/>}
            </div>
        </div>);
};

export default ChatInput;
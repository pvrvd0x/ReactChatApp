import React from 'react';
import { Input, Button } from 'antd';
import { UploadField } from '@navjobs/upload';
import { Picker } from 'emoji-mart';
import classNames from 'classnames';

import { FilesUploader } from '..';
import './ChatInput.scss';
// import dickSVG from 'assets/img/dick.svg';

const { TextArea } = Input;

const ChatInput = ({
    toggleEmojiTab,
    emojiTabIsActive,
    setValue,
    value,
    handleEmojiSelect,
    handleSendMessage,
    handleFileUpload,
    attachments,
}) => {
    return (
            <div className="chat-input">
                <div>
                    <div className={classNames("chat-input__emoji-picker", {
                    'chat-input__emoji-picker--visible': emojiTabIsActive,
                })}>
                        <Picker set='google' onSelect={(emoji) => handleEmojiSelect(emoji)}/>
                    </div>
                    <Button
                        onClick={toggleEmojiTab}
                        type='link'
                        shape='circle'
                        className="chat-input__smile-btn"
                        icon="smile"/>
                    {/* <img src={dickSVG} className='chat-input__send-dick' onClick={() => setValue(':dick:')}/> */}
                    <TextArea
                        style={{height: 20}}
                        autosize={{ maxRows: 6 }}
                        onChange={ e => setValue(e.target.value) }
                        onKeyUp={ handleSendMessage }
                        placeholder="Input your message"
                        value={ value }/>
                    <div className="chat-input__actions">
                        <UploadField
                            onFiles={handleFileUpload}
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
                        {value || (attachments && attachments.length) ?
                        <Button type='link' shape='circle' icon="check-circle" onClick={handleSendMessage}/>
                        : <Button type='link' shape='circle' icon="audio"/>}
                    </div>
                </div>
                <div className='chat-input-attachments'>
                    <FilesUploader attachments={attachments}/>
                </div>
            </div>);
};

export default ChatInput;
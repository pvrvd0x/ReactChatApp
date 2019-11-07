import React from 'react';
import { Input, Button, Icon } from 'antd';
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
    removeAttachment,
    isRecording,
    onRecord,
    onStopRecording,
}) => {
    return (
            <div className="chat-input">
                <div>
                    <div className="chat-input__actions">
                        <div className={classNames("chat-input__emoji-picker", {
                            'chat-input__emoji-picker--visible': emojiTabIsActive,
                        })}>
                            <Picker set='google' style={{width: 290}} onSelect={(emoji) => handleEmojiSelect(emoji)}/>
                        </div>
                        <Button
                            onClick={toggleEmojiTab}
                            type='link'
                            shape='circle'
                            className="chat-input__smile-btn"
                            icon="smile"/>
                        {/* <img src={dickSVG} className='chat-input__send-dick' onClick={() => setValue(':dick:')}/> */}
                        <UploadField
                            onFiles={handleFileUpload}
                            containerProps={{
                                className: 'chat-input__actions-upload-photo'
                            }}
                            uploadProps={{
                                accept: '.jpg,.png,.jpeg,.pdf,.webp,.gif',
                                multiple: "multiple"
                            }}>
                            <Button
                                type='link'
                                shape='circle'
                                icon='camera'/>
                        </UploadField>
                    </div>
                    {!isRecording &&
                    <TextArea
                        style={{height: 20}}
                        autosize={{ maxRows: window.innerWidth <= 480 ? 2 : 6 }}
                        onChange={ e => setValue(e.target.value) }
                        onKeyUp={ handleSendMessage }
                        placeholder="Input your message"
                        value={ value }/>}
                    { isRecording &&
                        <div className="chat-input__record-status">
                            <i className='record-icon'/>
                            <span>Recording</span>
                            <Icon type='close' onClick={onStopRecording}/>
                        </div>}
                        {isRecording || value || (attachments && attachments.length) ?
                        <Button type='link' shape='circle' icon="check-circle" onClick={handleSendMessage}/>
                        : (<div className="chat-input__record-btn">
                                <Button
                                    type='link'
                                    shape='circle'
                                    icon="audio"
                                    onClick={onRecord}/>
                            </div>)}
                </div>
                <div className='chat-input-attachments'>
                    <FilesUploader attachments={attachments} removeAttachment={removeAttachment}/>
                </div>
            </div>);
};

export default ChatInput;
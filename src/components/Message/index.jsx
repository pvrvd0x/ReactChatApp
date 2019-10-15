import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Popover } from 'antd';
import reactStringReplace from 'react-string-replace';
import { Emoji } from 'emoji-mart';

import { DateInfo, IconChecked, Avatar } from '../';
import { AudioMessage } from '../';

import './Message.scss';

const Message = ({
    user,
    text,
    createdAt,
    isMe,
    isChecked,
    attachments,
    audio,
    isTyping,
    onRemoveMessage
}) => {
    return (
    <div className={classNames('message', {
        'message--isme'     : isMe,
        'message--is-typing': isTyping,
        'message--is-audio' : audio,
        'message--image'    : attachments && attachments.length === 1})}>
        <div className="message__content">
            <IconChecked isMe={isMe} isChecked={isChecked}/>
            { isMe &&
            <Popover
                content={
                    <div className="message__actions">
                        <Button onClick={onRemoveMessage}>Delete</Button>
                    </div>
                }
                title='Title'
                trigger='click'>
                    <div className="message__icon-actions">
                        <Button type='link' shape='circle' icon='ellipsis'/>
                    </div>
            </Popover>}
            <div className="message__avatar">
                <Avatar user={user}/>
            </div>
            <div className="message__info">
                { (audio || (!attachments || (attachments && (attachments.length !== 1)))) &&
                <div className="message__bubble">
                    { text && <p className='message__text'>{
                        reactStringReplace(text, /:(.+?):/g, (match) => (
                            <Emoji emoji={match} set='google' size={22} />
                    ))}</p> }
                    { isTyping && <div className="message__typing">
                        <span className="dot one"/>
                        <span className="dot two"/>
                        <span className="dot three"/>
                    </div> }
                    { audio && <AudioMessage 
                                    audio={audio}
                                    isMe={isMe}/>}
                </div>
                }
                    {attachments && 
                    <div className="message__attachments">
                        {attachments.map(item => (
                            <div 
                                key={Math.random()}
                                className='message__attachments-item'>
                                <img src={item.url} alt={item.filename}/>
                            </div>
                        ))}
                    </div>}
                <span className="message__date">
                    <DateInfo date={createdAt}/>
                </span>
            </div>
        </div>
    </div>
)};

Message.propTypes = {
    user        : PropTypes.object,
    isMe        : PropTypes.bool,
    avatar      : PropTypes.string,
    text        : PropTypes.string,
    createdAt   : PropTypes.string,
    attachments : PropTypes.array,
    classNames  : PropTypes.string,
    isTyping    : PropTypes.bool,
};

export default Message;
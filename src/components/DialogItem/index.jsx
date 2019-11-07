import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { format, isToday } from 'date-fns';
import { Icon } from 'antd';
import reactStringReplace from 'react-string-replace';
import { Emoji } from 'emoji-mart';

import { Avatar } from '../';

import { IconChecked } from '../';
import './DialogsItem.scss';
// import dickSVG from 'assets/img/dick.svg';

const getDate = time => {
    time = new Date(time);

    if (isToday(time)) {
        return format(
            time,
            'HH:mm'
        )
    } else {
        return format(
            time,
            'MM.dd.yyyy'
        )
    }
};

const DialogsItem = ({
    _id,
    user,
    currentDialogId, 
    isMe,
    onSelect,
    lastMessage,
    }) => (
        <Link to={`/dialogs/${user.fullname.split(' ').join('_')}`}>
            <div className={classNames('dialogs__item', {
                'dialogs__item--online': user.isOnline,
                'dialogs__item--selected': currentDialogId === _id
                })}
                onClick={onSelect.bind(this, _id)}>
                <div className="dialogs__item-avatar">
                    <Avatar user={user} />
                </div>
                <div className="dialogs__item-content">
                    <div className="dialogs__item-content-top">
                        <b>{user.fullname}</b>
                        <span className="dialogs__item-content-date">
                            {getDate(lastMessage.createdAt)}
                        </span>
                    </div>
                    <div className="dialogs__item-content-bottom">
                        <p>
                            {lastMessage.text ? reactStringReplace(lastMessage.text, /:(.+?):/g, (match) => (
                                // match === 'dick' ? <img src={dickSVG} style={{ width:  22, height: 22}} /> :
                                <Emoji emoji={match} set='google' size={16} />))
                            : lastMessage.attachments.length && lastMessage.attachments[0].ext === 'ogg' ? 
                            (<span><Icon type='audio'/> Voice Message</span>) 
                            : (<span><Icon type='file-image'/> Image</span>)}
                        </p>
                        {isMe && <IconChecked isMe={isMe} unchecked={lastMessage.unchecked} />}
                        {(lastMessage.unchecked > 0 && !isMe) &&
                            <div className='dialogs__item-content-bottom-unchecked-count'>
                                {lastMessage.unchecked > 1 ? lastMessage.unchecked : 1}
                            </div>}
                    </div>
                </div>
            </div>
        </Link>
);

export default DialogsItem;
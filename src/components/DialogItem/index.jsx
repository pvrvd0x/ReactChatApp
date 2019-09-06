import React from 'react';
import classNames from 'classnames';
import { format, isToday } from 'date-fns';

import { IconChecked } from '../';
import './DialogsItem.scss';

const getDate = time => {
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
}

const getAvatar = user => {
    if (user.avatar) {
        return (
            <img
                src={user.avatar}
                alt={`${user.fullName} avatar`}/>
        )
    } else {
        //Gradient Avatar
    }
}

const DialogsItem = ({ user, createdAt, content, unchecked,  isMe }) => (
    <div className={classNames('dialogs__item', {
        'dialogs__item--online': user.isOnline
        })}>
        <div className="dialogs__item-avatar">
            {getAvatar(user)}
        </div>
        <div className="dialogs__item-content">
            <div className="dialogs__item-content-top">
                <b>{user.fullName}</b>
                <span className="dialogs__item-content-date">
                    {/* <DateInfo date={lastMessage.createdAt}/> */}
                    {getDate(createdAt)}
                </span>
            </div>
            <div className="dialogs__item-content-bottom">
                <p>
                    {content}
                </p>
                {isMe && <IconChecked isMe={isMe} isChecked={unchecked === 0} />}
                {(unchecked > 0 && !isMe) && <div className='dialogs__item-content-bottom-unchecked-count'>{unchecked}</div>}
            </div>
        </div>
    </div>
);

export default DialogsItem;
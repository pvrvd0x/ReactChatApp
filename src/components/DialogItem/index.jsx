import React from 'react';
import classNames from 'classnames';
import { format, isToday } from 'date-fns';

import { Avatar } from '../';

import { IconChecked } from '../';
import './DialogsItem.scss';

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
    createdAt,
    content,
    unchecked,
    currentDialogId, 
    isMe,
    onSelect }) => (
    <div className={classNames('dialogs__item', {
        // 'dialogs__item--online': user.isOnline,
        'dialogs__item--selected': currentDialogId === _id
        })}
        onClick={onSelect.bind(this, _id)}>
            {console.log(user)}
        <div className="dialogs__item-avatar">
            <Avatar user={user} />
        </div>
        <div className="dialogs__item-content">
            <div className="dialogs__item-content-top">
                <b>{user.fullName}</b>
                <span className="dialogs__item-content-date">
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
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
    currentDialogId, 
    isMe,
    onSelect,
    lastMessage,
    }) => (
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
                    {lastMessage.text}
                </p>
                {isMe && <IconChecked isMe={isMe} isChecked={lastMessage.unchecked === 0} />}
                {(lastMessage.unchecked > 0 && !isMe) && 
                    <div className='dialogs__item-content-bottom-unchecked-count'>
                        {lastMessage.unchecked > 1 ? lastMessage.unchecked : 1}
                    </div>}
            </div>
        </div>
    </div>
);

export default DialogsItem;
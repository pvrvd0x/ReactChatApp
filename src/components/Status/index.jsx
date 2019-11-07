import React from 'react';
import classNames from 'classnames';

import './Status.scss';

const Status = ({ online, fullname, isMe }) => (
    <div className="chat__dialog-header-info">
        <b className="chat__dialog-fullname">{fullname}</b>
        {!isMe &&
        <span className={classNames('status', {
            'status--online': online
        })}>
            {online ? 'online': 'offline'}
        </span>
        }
    </div>
);

export default Status;
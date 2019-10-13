import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './Status.scss';

const Status = ({ online, fullname }) => (

    <div className="chat__dialog-header-info">
        <b className="chat__dialog-fullname">{fullname}</b>
        <span className={classNames('status', {
            'status--online': online
        })}>
            {online ? 'online': 'offline'}
        </span>
    </div>
);

Status.propTypes = {
    online: PropTypes.bool
};

export default Status;
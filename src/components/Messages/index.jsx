import React from 'react';
import PropTypes from 'prop-types';
import { Empty, Icon } from 'antd';
import classNames from 'classnames';

import { Message } from '../';

import './Messages.scss';

const Messages = ({
    onRemoveMessage,
    baseRef,
    isLoading,
    items,
    myId,
    user
}) => {

    return  <div
        ref={baseRef}
        className={classNames("messages", {
            'messages--loading': isLoading
        })}>
        {
            isLoading || !user ?
            (<Icon type="loading" spin />)
            : !items || !items.length ? <Empty description="Select dialog to start messaging or start new dialog by pressing button right to Dialogs List"/>
            : (<div className='messages-wrapper'>
                {items.map(item =>
                    <Message
                        onRemoveMessage={onRemoveMessage.bind(this, item._id)}
                        key={Math.random()}
                        {...item}
                        isMe={item.user._id === myId}/>
                )}</div>)
    }
    </div>
};

Messages.propTypes = {
    items: PropTypes.array,
};

export default Messages;
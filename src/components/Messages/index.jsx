import React from 'react';
import PropTypes from 'prop-types';
import { Empty, Icon } from 'antd';
import classNames from 'classnames';

import { Message } from '../';

import './Messages.scss';

const Messages = ({ baseRef, isLoading, items, myId }) => {
    return  <div 
                ref={baseRef}
                className={classNames("messages", {
        'messages--loading': isLoading
    })}>{
        isLoading && !items ?    
        (<Icon type="loading" spin />)
            : !items || !items.length ? <Empty description="No messages yet"/>
            : (<div>{items.map(item => 
                <Message 
                    key={Math.random()}
                    {...item}
                    isMe={item.user._id === myId}
            />)}</div>)
    }
    </div>
};

Messages.propTypes = {
    items: PropTypes.array,
};

export default Messages;
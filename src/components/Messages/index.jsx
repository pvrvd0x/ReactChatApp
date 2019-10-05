import React from 'react';
import PropTypes from 'prop-types';
import { Empty, Icon } from 'antd';
import classNames from 'classnames';

import { Message } from '../';

import './Messages.scss';

const Messages = ({ baseRef, isLoading, items }) => {
    return  <div 
                ref={baseRef}
                className={classNames("messages", {
        'messages--loading': isLoading
    })}>{
        isLoading && !items ?    
        (<Icon type="loading" spin />)
            : !items || !items.length ? <Empty description="No messages yet"/>
            : (<div>{items.map(item => <Message key={Math.random()} {...item}/>)}</div>)
    }
    </div>
};

Messages.propTypes = {
    items: PropTypes.array,
};

export default Messages;
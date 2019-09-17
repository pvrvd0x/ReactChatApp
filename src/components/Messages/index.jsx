import React from 'react';
import PropTypes from 'prop-types';
import { Empty, Spin } from 'antd';

import { Message } from '../';

const Messages = ({ isLoading, items }) => {
    return  <div className="messages">{
        isLoading && !items ?
            (<Spin tip='Loading...'/>)
            : !items || !items.length ? <Empty description="No messages yet"/>
            : (<div>{items.map(item => <Message {...item}/>)}</div>)
    }
    </div>
};

Messages.propTypes = {
    items: PropTypes.array,
};

export default Messages;
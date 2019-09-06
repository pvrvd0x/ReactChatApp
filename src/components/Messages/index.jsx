import React from 'react';
import orderBy from 'lodash';

import { Message } from '../';

const Messages = ({items, myId}) => (
    <div className="messages">
        {orderBy(items, ['date'], ['asc']).map(item => (
            <Message
                key={item._id}
                {...item}
                isMe={item.user._id === myId}/>))}
    </div>
)

export default Messages;
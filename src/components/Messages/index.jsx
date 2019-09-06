import React from 'react';
import PropTypes from 'prop-types';
import { Empty } from 'antd';
// import orderBy from 'lodash';

import { Message } from '../';

const Messages = ({items, myId}) => {
    return items ? 
        (
        <div className="messages">
            <Message
                avatar='https://avatarfiles.alphacoders.com/865/86518.png'
                text='Я ебу коров'
                date={new Date(2019, 7, 26, 15)}
                isChecked={true}
                attachments={[
                    {
                        filename: 'image1.jpg',
                        url: 'https://source.unsplash.com/100x100/?random=1&nature,water'
                    },
                    {
                        filename: 'image2.jpg',
                        url: 'https://source.unsplash.com/100x100/?random=2&nature,water'
                    },
                    {
                        filename: 'image3.jpg',
                        url: 'https://source.unsplash.com/100x100/?random=3&nature,water'
                    },
                ]}/>
            <Message
                avatar='https://avatarfiles.alphacoders.com/865/86518.png'
                audio='https://notificationsounds.com/soundfiles/dd458505749b2941217ddd59394240e8/file-sounds-1111-to-the-point.mp3'
                date={new Date(2019, 7, 26, 15)}/>
            <Message
                avatar='https://avatarfiles.alphacoders.com/865/86518.png'
                audio='https://notificationsounds.com/soundfiles/dd458505749b2941217ddd59394240e8/file-sounds-1111-to-the-point.mp3'
                date={new Date(2019, 7, 26, 15)}
                isMe/>
            <Message
                avatar='https://avatoon.net/wp-content/uploads/2019/05/Szilagyi-Zoltan-Avatar-Small-300x300.jpg'
                text='А я нет'
                date={new Date(2019, 7, 26, 15)}
                isMe/>
            <Message
                avatar='https://avatoon.net/wp-content/uploads/2019/05/Szilagyi-Zoltan-Avatar-Small-300x300.jpg'
                text='НЫАААААААААААААААААААААААААААААА'
                date={new Date(2019, 7, 26, 15)}
                isMe/>
            <Message
                avatar='https://avatoon.net/wp-content/uploads/2019/05/Szilagyi-Zoltan-Avatar-Small-300x300.jpg'
                text=''
                date={new Date(2019, 7, 26, 15)}
                isTyping/>
            <Message
                avatar='https://avatoon.net/wp-content/uploads/2019/05/Szilagyi-Zoltan-Avatar-Small-300x300.jpg'
                text=''
                date={new Date(2019, 7, 26, 15)}
                attachments={[
                    {
                        filename: 'image1.jpg',
                        url: 'https://source.unsplash.com/100x100/?random=1&nature,water'
                    },
                ]}/>
        </div>)
        : (<Empty description="No messages yet"/>)
};

Messages.propTypes = {
    items: PropTypes.array,
}

export default Messages;
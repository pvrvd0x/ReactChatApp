import React from 'react';

import { Message, Dialogs } from '../../components';

import './Home.scss';

const Home = () => (
    <section className="home">
        <Dialogs 
        myId={0}
        items={[{
            _id: Math.random(),
            createdAt   : new Date(2019, 5, 2),
            content     : 'Fuck you nigga',
            unchecked   : 0,
            user: {
                _id     : 0,
                fullName: 'Frodo',
                avatar  : 'https://avatarfiles.alphacoders.com/865/86518.png',
                isOnline: true,
            },
            }, {
            _id         : Math.random(),
            createdAt   : new Date(),
            content     : 'No Fuck you nigga',
            unchecked   : 2,
            user: {
                _id     : 1,
                fullName: 'Ceaser',
                avatar  : 'https://avatoon.net/wp-content/uploads/2019/05/Szilagyi-Zoltan-Avatar-Small-300x300.jpg',
                isOnline: true,
            },
        }]}/>
        
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
            audio='https://notificationsounds.com/soundfiles/cbcb58ac2e496207586df2854b17995f/file-sounds-1103-quite-impressed.mp3'
            date={new Date(2019, 7, 26, 15)}/>
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
            ]}/>}
    </section>
);

export default Home;
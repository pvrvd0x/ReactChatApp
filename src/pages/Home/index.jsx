import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Status, Sidebar, Messages, ChatInput } from 'containers';
import { Avatar } from 'components';

import './Home.scss';

const Home = ({
    user
}) => {
    const [myInfo, setMyInfo] = useState('');

    useEffect(() => {
        if (user.data) {
            setMyInfo(user.data);
        }
    }, [user.data])

    return (
    <section className="home">
        <div className="chat">
            <Sidebar/>
            <div className="chat__dialog">
                <div className="chat__dialog-header">
                    <Status/>
                    {myInfo && <div className="chat__account">
                        <Avatar user={myInfo}/>
                    </div>}
                </div>
                <div className="chat__dialog-messages">
                    <Messages 
                        myId={myInfo._id || ''}/>
                </div>
                <ChatInput />
            </div>
        </div>
    </section>)
};

export default connect(
    ({ user }) => ({user})
    )(Home);
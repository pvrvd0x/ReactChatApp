import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Status, Sidebar } from 'containers';
import { Messages, ChatInput } from 'containers';

import './Home.scss';

const Home = ({
    user,
    dialog
}) => {
    const [myId, setMyId] = useState('');

    useEffect(() => {
        if (user.data) {
            setMyId(user.data._id);
        }
    }, [user.data])

    return (
    <section className="home">
        <div className="chat">
            <Sidebar/>
            <div className="chat__dialog">
                <div className="chat__dialog-header">
                    <Status/>
                    <div className="chat__dialog-options-wrapper">
                        <button className="chat__dialog-options">

                        </button>
                    </div>
                </div>
                <div className="chat__dialog-messages">
                    <Messages 
                        myId={myId}/>
                </div>
                <ChatInput />
            </div>
        </div>
    </section>)
};

export default connect(
    ({ user, dialog }) => ({user, dialog})
    )(Home);
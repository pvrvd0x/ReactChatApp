import React, { useState, useEffect } from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';

import { ChatInput, Status } from 'components';
import { Messages, Dialogs } from 'containers';

import './Home.scss';

const Home = ({
    user
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
            <div className="chat__sidebar">
                <div className="chat__sidebar-header">
                    <div>
                        <Icon type="team" style={{color: 'rgba(0, 0, 0, .6)'}}/>
                            <span>
                                Dialogs List
                            </span>
                    </div>
                    <Icon type="form" style={{color: 'rgba(0, 0, 0, .6)'}}/>
                </div>
                <div className="chat__sidebar-dialogs">
                    <Dialogs
                        myId={myId}/>
                </div>
            </div>
            <div className="chat__dialog">
                <div className="chat__dialog-header">
                    <div className="chat__dialog-header-info">
                        <b className="chat__dialog-fullname">Syn Shluhi</b>
                        <Status/>
                    </div>
                    <div className="chat__dialog-options-wrapper">
                        <button className="chat__dialog-options"></button>
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

export default connect(state => state)(Home);
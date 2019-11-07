import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import { Status, Sidebar, Messages, ChatInput } from 'containers';
import { Avatar, GoBackButton } from 'components';

import './Home.scss';

const Home = ({
    user,
    attachments,
}) => {
    const [myInfo, setMyInfo] = useState('');

    useEffect(() => {
        if (user.data) {
            setMyInfo(user.data);
        }
    }, [user.data]);

    return (
    <section className="home">
        <div className="chat">
            <Sidebar/>
            <div className="chat__dialog">
                <div className="chat__dialog-header">
                    <GoBackButton/>
                    <Status/>
                    {myInfo && !myInfo.token && <div className="chat__account">
                        <Avatar user={myInfo}/>
                    </div>}
                </div>
                <div className="chat__dialog-messages" style={{
                    height: `calc(100% - ${attachments.items.length >= 1 ? 263: 138}px)`
                }}>
                    <Messages
                        myId={myInfo._id || ''}/>
                </div>
                <ChatInput />
            </div>
        </div>
    </section>)
};

export default connect(
    ({user, attachments}) => ({user, attachments})
)(withRouter(Home));
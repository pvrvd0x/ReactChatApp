import React from 'react';
import { Icon } from 'antd';

import { ChatInput, Status } from 'components';
import { Messages, Dialogs } from 'containers';

import './Home.scss';

const Home = () => (
    <section className="home">
        <div className="chat">
            <div className="chat__sidebar">
                <div className="chat__sidebar-header">
                    <div>
                        <Icon type="team" style={{color: 'rgba(0,0,0,.6)'}}/>
                            <span>
                                Dialogs List
                            </span>
                    </div>
                    <Icon type="form" style={{color: 'rgba(0,0,0,.6)'}}/>
                </div>

                <div className="chat__sidebar-dialogs">
                    <Dialogs 
                        myId={0}/>
                </div>
            </div>
            <div className="chat__dialog">
                <div className="chat__dialog-header">
                    <div className="chat__dialog-header-info">
                        <b className="chat__dialog-fullname">Yebushi loshadey</b>
                        <Status/>
                    </div>
                    <div className="chat__dialog-options-wrapper">
                        <button className="chat__dialog-options"></button>
                    </div>
                </div>
                <div className="chat__dialog-messages">
                    <Messages />
                </div>
                <ChatInput />
            </div>
        </div>
    </section>
);

export default Home;
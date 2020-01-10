import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { sortBy } from 'lodash';

import { dialogsActions } from "redux/actions";
import { Dialogs as BaseDialogs } from 'components';
import socket from 'core/socket';

const Dialogs = ({ 
    fetchDialogs, 
    currentDialogId, 
    setCurrentDialogId, 
    items, 
    myId }) => {
    const [inputValue, setValue] = useState(''),
        [filtered, setFiltered ] = useState(Array.from(items));

    const onChangeInput = (value = '') => {
        setFiltered(
            items.filter(
                dialog => {
                    let user = {};

                    if (dialog.author._id === myId) {
                        user = dialog.partner;
                    } else {
                        user = dialog.author;
                    }
                    
                    return user.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0
                }
            )
        );

        setValue(value);
    };

    useEffect(() => {
        if (!items.length) {
            fetchDialogs();
        } else {
            setFiltered(items);
        }
    }, [items, fetchDialogs]);

    socket.on('SERVER:DIALOG_CREATED', () => {
        fetchDialogs();
    });

    socket.on('MESSAGES:NEW_MESSAGE', () => {
        fetchDialogs();
    });

    const dialogsArray = filtered.sort((a, b) => (new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt)));

    return (
        <BaseDialogs
            myId={myId}
            items={dialogsArray}
            onSearch={onChangeInput}
            inputValue={inputValue}
            onSelectDialog={setCurrentDialogId}
            currentDialogId={currentDialogId}/>
    )
};

export default connect(
    ({ dialogs }) => dialogs,
    dialogsActions
)(Dialogs);
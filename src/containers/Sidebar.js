import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Sidebar as SidebarBase } from 'components';
import { userApi, dialogsApi } from 'utils/api';
import { dialogsActions } from 'redux/actions';
import { socket } from 'core';


const Sidebar = ({
    user,
    getAll
}) => {
    const [isVisible, setIsVisible]         = useState(false),
        [inputValue, setInputValue]         = useState(''),
        [users, setUsers]                   = useState([]),
        [isSearching, setIsSearching]       = useState(false),
        [selectedUserId, setSelectedUserId] = useState(''),
        [messageText, setMessageText]       = useState('');

    const handleShow = () => {
        setIsVisible(true);
    }

    const handleClose = () => {
        setIsVisible(false);
    }

    const handleInputValueChange = value => {
        setInputValue(value);
    }

    const onSelectUser = userId => {
        setSelectedUserId(userId);
    }

    const onAddDialogs = () => {
        dialogsApi
            .create({
                partnerId: selectedUserId,
                text: messageText,
            })
            .then(() => {
                handleClose();
                setIsSearching(false);
                socket.on('DIALOGS:DIALOG_CREATED', getAll);
            })
            .catch(() => {
                setIsSearching(false);
            })
    }

    const onTextAreaChange = e => {
        setMessageText(e.target.value);
    }

    const onSearch = value => {
        setIsSearching(true);
        userApi
            .findUsers(value)
            .then(({ data }) => {
                setIsSearching(false);
                setUsers(data);
            })
            .catch(() => {
                setIsSearching(true);
            })
    }

    return(
    <div>
        <SidebarBase
            user={user}
            onShow={handleShow}
            onClose={handleClose}
            isVisible={isVisible}
            isSearching={isSearching}
            inputValue={inputValue}
            onModalOk={onAddDialogs}
            onChangeInput={handleInputValueChange}
            onSearch={onSearch}
            onSelectUser={onSelectUser}
            onTextAreaChange={onTextAreaChange}
            users={users}
            messageText={messageText}
            />
    </div>
    )
}

export default connect(({ user }) => ({user: user.data}), dialogsActions)(Sidebar);
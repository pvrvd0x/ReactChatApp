import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { messagesActions } from "redux/actions";
import { Messages as BaseMessages } from 'components';
import socket from 'core/socket';

const Messages = ({
    items,
    fetchMessages,
    currentDialogId,
    removeMessageById,
    addMessage,
    isLoading,
    myId
}) => {
    const messagesRef = useRef(null);

    const onDialogChange = data => {
        addMessage(data);
    }

    useEffect(() => {
        if (currentDialogId) {
            fetchMessages(currentDialogId);
        }

        socket.on('MESSAGES:NEW_MESSAGE', onDialogChange);

        return () => {
            socket.removeListener('MESSAGES:NEW_MESSAGE', onDialogChange);
        }
    }, [currentDialogId]);

    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, [items]);

    return (
        <BaseMessages
            onRemoveMessage={removeMessageById}
            myId={myId}
            baseRef={messagesRef}
            isLoading={isLoading}
            items={items}/>
    )
};

export default connect(
    ({ dialogs, messages }) => ({
        currentDialogId: dialogs.currentDialogId,
        items: messages.items,
        isLoading: messages.isLoading
    }),
    messagesActions
)(Messages);
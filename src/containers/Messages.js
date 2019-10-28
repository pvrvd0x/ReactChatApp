import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

import { messagesActions } from "redux/actions";
import { Messages as BaseMessages } from 'components';
import socket from 'core/socket';

const Messages = ({
    items,
    fetchMessages,
    currentDialogId,
    removeMessageById,
    fetchMessageChange,
    addMessage,
    isLoading,
    myId,
    user
}) => {
    const messagesRef = useRef(null);

    const [previewImage, setPreviewImage] = useState(null);


    const onDialogChange = data => {
        addMessage(data);
    };

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
            user={user}
            onRemoveMessage={removeMessageById}
            myId={myId}
            baseRef={messagesRef}
            isLoading={isLoading}
            items={items}
            setPreviewImage={setPreviewImage}
            previewImage={previewImage}
        />
    )
};

export default connect(
    ({ dialogs, user, messages }) => ({
        currentDialogId: dialogs.currentDialogId,
        items: messages.items,
        isLoading: messages.isLoading,
        user: user.data,
    }),
    messagesActions
)(Messages);
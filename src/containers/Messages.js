import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { messagesActions } from "redux/actions";
import { Messages as BaseMessages } from 'components';

const Messages = ({ items, fetchMessages, currentDialogId, isLoading }) => {
    const messagesRef = useRef(null);

    useEffect(() => {
        if (currentDialogId) {
            fetchMessages(currentDialogId);
        }
    }, [currentDialogId, fetchMessages]);

    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, [items]);

    return (
        <BaseMessages
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
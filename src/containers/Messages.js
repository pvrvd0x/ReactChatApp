import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { messagesActions } from "redux/actions";
import { Messages as BaseMessages } from 'components';

const Messages = ({ items, fetchMessages, currentDialogId, isLoading }) => {
    useEffect(() => {
        if (currentDialogId) {
            fetchMessages(currentDialogId);
        }
    }, [currentDialogId, fetchMessages]);

    return (
        <BaseMessages
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
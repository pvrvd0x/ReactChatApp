import React from 'react';
import { connect } from 'react-redux';

import { Status as StatusBase } from 'components';

const Status = ({ currentDialogId, user, dialogs }) => {
    const currentDialog = dialogs.filter(dialog => dialog._id === currentDialogId)[0];

    if (!dialogs.length || !currentDialogId) {
        return ( user &&
            <StatusBase
                fullname={user.fullname}
                isMe
                />
        );
    }

    let partner = {};

    if (currentDialog.author._id === user._id) {
        partner = currentDialog.partner;
    } else {
        partner = currentDialog.author;
    }

    return (
        <StatusBase
            fullname={partner.fullname}
            online={partner.isOnline}
        />
    )
}

export default connect(
    ({ dialogs, user }) => ({
        currentDialogId: dialogs.currentDialogId,
        dialogs: dialogs.items,
        user: user.data
    })
)(Status);
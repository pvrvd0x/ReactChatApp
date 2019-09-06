import React from 'react';
import PropTypes from 'prop-types';
import { orderBy } from 'lodash';

import { DialogsItem } from '../';

const Dialogs = ({items, myId}) => (
    <div className="dialogs">
        {orderBy(items, ['createdAt'], ['desc']).map(item => (
            <DialogsItem
                key={item._id}
                {...item}
                isMe={item.user._id === myId}/>))}
    </div>
);

Dialogs.propTypes = {
    users: PropTypes.array
};

export default Dialogs;
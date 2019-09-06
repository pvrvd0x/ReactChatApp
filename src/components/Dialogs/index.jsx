import React from 'react';
import PropTypes from 'prop-types';
import { Input, Empty } from 'antd';
import { orderBy } from 'lodash';

import './Dialogs.scss';

import { DialogsItem } from '../';

const Dialogs = ({items, myId, onSearch, inputValue}) => (
    <div className="dialogs">
        <div className="chat__sidebar-search">
            <Input.Search
                placeholder='Search for dialogs'
                onChange={e => onSearch(e.target.value)}
                value={inputValue}/>
        </div>
        {items.length ? orderBy(items, ['createdAt'], ['desc']).map(item => (
            <DialogsItem
                key={item._id}
                {...item}
                isMe={item.user._id === myId}/>))
            : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </div>
);

Dialogs.propTypes = {
    users: PropTypes.array
};

export default Dialogs;
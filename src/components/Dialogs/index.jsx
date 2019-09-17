import React from 'react';
import PropTypes from 'prop-types';
import { Input, Empty } from 'antd';
import { orderBy } from 'lodash';

import './Dialogs.scss';

import { DialogsItem } from '../';

const Dialogs = ({items, myId, onSearch, inputValue, onSelectDialog}) => (
    <div className="dialogs-wrapper">
        <div className="chat__sidebar-search">
            <Input.Search
                placeholder='Search for dialogs'
                onChange={e => onSearch(e.target.value)}
                value={inputValue}/>
        </div>
        <div className="dialogs">
        {items.length ? orderBy(items, ['createdAt'], ['desc']).map(item => (
            <DialogsItem
                onSelect={onSelectDialog}
                key={item._id}
                {...item}
                isMe={item.user._id === myId}/>))
            : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        </div>
    </div>
);

Dialogs.propTypes = {
    users: PropTypes.array
};

export default Dialogs;
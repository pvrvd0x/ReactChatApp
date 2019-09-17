import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { dialogsActions } from "redux/actions";
import { Dialogs as BaseDialogs } from 'components';

const Dialogs = ({ fetchDialogs, setCurrentDialogId, items, myId }) => {
    const [inputValue, setValue] = useState(''),
        [filtered, setFiltered ] = useState(Array.from(items));

    const onChangeInput = (value = '') => {
        setFiltered(
            items.filter(
                dialog => dialog.user.fullName.toLowerCase().indexOf(value.toLowerCase()) >= 0
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

    return (
        <BaseDialogs
            myId={myId}
            items={filtered}
            onSearch={onChangeInput}
            inputValue={inputValue}
            onSelectDialog={setCurrentDialogId}/>
    )
};

export default connect(
    ({ dialogs }) => dialogs,
    dialogsActions
)(Dialogs);
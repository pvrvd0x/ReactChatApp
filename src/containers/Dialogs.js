import React, { useState } from 'react';
import { Dialogs as BaseDialogs } from 'components';

const Dialogs = ({ items, myId }) => {
    const [inputValue, setValue] = useState(''),
        [filtered, setFiltered ] = useState(Array.from(items));


    const onChangeInput = value => {
        setFiltered(
            items.filter(
                dialog => dialog.user.fullName.toLowerCase().indexOf(value.toLowerCase()) >= 0
            )
        );

        setValue(value);
    };

    return (
        <BaseDialogs
            myId={myId}
            items={filtered}
            onSearch={onChangeInput}
            inputValue={inputValue}/>
    )
};

export default Dialogs;
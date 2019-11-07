import React from 'react';
import PropTypes from 'prop-types';

import checkedIcon from 'assets/img/checked.svg';
import unCheckedIcon from 'assets/img/unchecked.svg';

const IconChecked = ({ isMe, unchecked }) =>

    (isMe ?
        (!unchecked ? (
            <img src={checkedIcon} alt="CheckedIcon" className="message__icon-checked"/>
        ) : (
            <img src={unCheckedIcon} alt="UnCheckedIcon" className="message__icon-unchecked"/>
        )) : ''
    );

IconChecked.propTypes = {
    isMe: PropTypes.bool,
    isChecked: PropTypes.bool
};

export default IconChecked;
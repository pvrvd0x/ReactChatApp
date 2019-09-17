import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const DateInfo = ({ date }) => (
    date ?
        (<Fragment>
            {formatDistanceToNow(new Date( date ), {addSuffix: true})}
        </Fragment>) : ''
);

DateInfo.propTypes = {
    date: PropTypes.string
};

export default DateInfo;
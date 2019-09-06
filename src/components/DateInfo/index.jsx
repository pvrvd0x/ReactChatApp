import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const DateInfo = ({ date }) => (
    <Fragment>{formatDistanceToNow(date, {addSuffix: true})}</Fragment>
)

DateInfo.propTypes = {
    date: PropTypes.string
};

export default DateInfo;
import React from 'react';
import PropTypes from 'prop-types';
import { Button as BaseButton} from 'antd';
import classNames from 'classnames';

import 'antd/dist/antd.css';
import './button.scss';

const Button = props => {
    return (
        <BaseButton {...props} className={classNames(props.className, 'button', {
            'button--large': props.size === 'large',
        })}/>
    )
};

Button.propTypes = {
    className: PropTypes.string
};
export default Button;
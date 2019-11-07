import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { generateAvatarFromHash } from 'utils/helpers';

import AccountMenu from "../AccountMenu";

import './avatar.scss';

const Avatar = ({ user, style }) => {

    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const handleOutsideClick = (el, e) => {
        if ((el && !el.contains(e.target))) {
            setIsMenuVisible(false);
        }
    };

    useEffect(() => {
        const accountMenu = document.querySelector('.chat__account');

            document.addEventListener('click', handleOutsideClick.bind(this, accountMenu));
    });

    if (user.avatar) {
        return (
            <Fragment>
                <img
                    style={style}
                    src={user.avatar}
                    alt={`${user.fullname} avatar`}
                    onClick={() => setIsMenuVisible(true)}/>
                <AccountMenu userName={user.fullname} isVisible={isMenuVisible}/>
            </Fragment>
        )
    } else {
        const color = generateAvatarFromHash(user._id),
            firstCharOfName = user.fullname[0];

        return (
            <Fragment>
                <div className='avatar avatar--empty'
                    style={{
                        ...style,
                        background: `linear-gradient(135deg, ${color.color}, ${color.colorLighten} 96%)`
                    }}
                    onClick={() => setIsMenuVisible(true)}>
                    { firstCharOfName }
                </div>
                <AccountMenu userName={user.fullname} isVisible={isMenuVisible}/>
            </Fragment>
        )
    }
}

Avatar.propTypes = {
    user: PropTypes.object,
};

export default Avatar;
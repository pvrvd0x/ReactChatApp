import React from 'react';
import PropTypes from 'prop-types';
import { generateAvatarFromHash } from '../../utils/helpers';

import './avatar.scss';

const Avatar = ({ user }) => {
    if (user.avatar) {
        return (
            <img
                src={user.avatar}
                alt={`${user.fullName} avatar`}/>
        )
    } else {
        const color = generateAvatarFromHash(user._id),
            firstCharOfName = user.fullName[0];

        return (
            <div className='avatar avatar--empty'
                style={{
                    background: `linear-gradient(135deg, ${color.color}, ${color.colorLighten} 96%)`
                }}>
                { firstCharOfName }
            </div>
        )
    }
}

Avatar.propTypes = {
    avatar: PropTypes.string,
    fullName: PropTypes.string
};

export default Avatar;